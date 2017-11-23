/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const path = require( 'path' );
const fs = require( 'fs' );
const createDictionaryFromPoFileContent = require( './createdictionaryfrompofilecontent' );
const translateSource = require( './translatesource' );
const ShortIdGenerator = require( './shortidgenerator' );
const { EventEmitter } = require( 'events' );

/**
 * `MultipleLanguageTranslationService` replaces `t()` call params with short ids
 * and provides assets that translate those ids to target languages.
 *
 * `translationKey` - original english string that occur in `t()` call params.
 */
module.exports = class MultipleLanguageTranslationService extends EventEmitter {
	/**
	 * @param {Array.<String>} languages Target languages.
	 * @param {Object} options
	 * @param {Boolean} [options.compileAllLanguages=false] Flag indicates whether the languages are specified
	 * or should be found at runtime.
	 * @param {Boolean} [options.defaultLanguage] Default language that will be added to the main bundle (if possible).
	 */
	constructor( languages, { compileAllLanguages = false, defaultLanguage } = {} ) {
		super();

		this._languages = new Set( languages );

		this._defaultLanguage = defaultLanguage || languages[ 0 ];

		this._compileAllLanguages = compileAllLanguages;

		this._packagePaths = new Set();

		// language -> translationKey -> targetTranslation dictionary.
		this._dictionary = {};

		// translationKey -> id dictionary gathered from files parsed by loader.
		// @type {Object.<String,Object>}
		this._translationIdsDictionary = {};

		this._idGenerator = new ShortIdGenerator();
	}

	/**
	 * Translate file's source and replace `t()` call strings with short ids.
	 *
	 * @fires error
	 * @param {String} source Source of the file.
	 * @param {String} fileName File name.
	 * @returns {String}
	 */
	translateSource( source, fileName ) {
		const translate = originalString => this._getId( originalString );
		const { output, errors } = translateSource( source, fileName, translate );

		for ( const error of errors ) {
			this.emit( 'error', error );
		}

		return output;
	}

	/**
	 * Load package and tries to get the po file from the package.
	 *
	 * @param {String} pathToPackage Path to the package containing translations.
	 */
	loadPackage( pathToPackage ) {
		if ( this._packagePaths.has( pathToPackage ) ) {
			return;
		}

		this._packagePaths.add( pathToPackage );

		const pathToTranslationDirectory = this._getPathToTranslationDirectory( pathToPackage );

		if ( this._compileAllLanguages ) {
			if ( !fs.existsSync( pathToTranslationDirectory ) ) {
				return;
			}

			for ( const fileName of fs.readdirSync( pathToTranslationDirectory ) ) {
				if ( !fileName.endsWith( '.po' ) ) {
					this.emit( 'error', `Translation directory (${ pathToTranslationDirectory }) should contain only translation files.` );

					continue;
				}

				const language = fileName.replace( /\.po$/, '' );
				const pathToPoFile = path.join( pathToTranslationDirectory, fileName );

				this._languages.add( language );
				this._loadPoFile( language, pathToPoFile );
			}

			return;
		}

		for ( const language of this._languages ) {
			const pathToPoFile = path.join( pathToTranslationDirectory, language + '.po' );

			this._loadPoFile( language, pathToPoFile );
		}
	}

	/**
	 * Return an array of assets based on the stored dictionaries.
	 *
	 * @fires error
	 * @param {Object} [param0]
	 * @param {String} [param0.outputDirectory]
	 * @param {String} [param0.compilationAssets]
	 * @returns {Array.<Object>}
	 */
	getAssets( { outputDirectory = 'lang', compilationAssets } = {} ) {
		const compilationAssetNames = Object.keys( compilationAssets )
			.filter( name => name.endsWith( '.js' ) );

		if ( compilationAssetNames.length > 1 ) {
			this.emit( 'error', [
				'Because of the many found bundles, none bundle will contain the default language.',
				`You should add it directly to the application from the '${ outputDirectory }/${ this._defaultLanguage }.js'.`
			].join( '\n' ) );

			return this._getTranslationAssets( outputDirectory, this._languages );
		}

		const mainAssetName = compilationAssetNames[ 0 ];
		const mainCompilationAsset = compilationAssets[ mainAssetName ];

		const mainTranslationAsset = this._getTranslationAssets( outputDirectory, [ this._defaultLanguage ] )[ 0 ];

		const mergedCompilationAsset = {
			outputBody: mainCompilationAsset.source() + '\n;' + mainTranslationAsset.outputBody,
			outputPath: mainAssetName
		};

		const otherLanguages = Array.from( this._languages )
			.filter( lang => lang !== this._defaultLanguage );

		return [
			mergedCompilationAsset,
			...this._getTranslationAssets( outputDirectory, otherLanguages )
		];
	}

	_getTranslationAssets( outputDirectory, languages ) {
		return Array.from( languages ).map( language => {
			const translatedStrings = this._getIdToTranslatedStringDictionary( language );

			const outputPath = path.join( outputDirectory, `${ language }.js` );
			const stringifiedTranslations = JSON.stringify( translatedStrings )
				.replace( /"([a-z]+)":/g, '$1:' ); // removes unnecessary `""` around property names.

			const outputBody = `CKEDITOR_TRANSLATIONS.add('${ language }',${ stringifiedTranslations })`;

			return { outputBody, outputPath };
		} );
	}

	// Walk through the `translationIdsDictionary` and find corresponding strings in the target language's dictionary.
	// Use original strings if translated ones are missing.
	_getIdToTranslatedStringDictionary( lang ) {
		let langDictionary = this._dictionary[ lang ];

		if ( !langDictionary ) {
			this.emit( 'error', `No translation found for ${ lang } language.` );

			// Fallback to the original translation strings.
			langDictionary = {};
		}

		const translatedStrings = {};

		for ( const originalString in this._translationIdsDictionary ) {
			const id = this._translationIdsDictionary[ originalString ];
			const translatedString = langDictionary[ originalString ];

			if ( !translatedString ) {
				this.emit( 'error', `Missing translation for '${ originalString }' for ${ lang } language.` );
			}

			translatedStrings[ id ] = translatedString || originalString;
		}

		return translatedStrings;
	}

	// Load translations from the PO files.
	_loadPoFile( language, pathToPoFile ) {
		if ( !fs.existsSync( pathToPoFile ) ) {
			return;
		}

		const poFileContent = fs.readFileSync( pathToPoFile, 'utf-8' );
		const parsedTranslationFile = createDictionaryFromPoFileContent( poFileContent );

		if ( !this._dictionary[ language ] ) {
			this._dictionary[ language ] = {};
		}

		const dictionary = this._dictionary[ language ];

		for ( const translationKey in parsedTranslationFile ) {
			dictionary[ translationKey ] = parsedTranslationFile[ translationKey ];
		}
	}

	// Translate all t() call found in source text to the target language.
	_getId( originalString ) {
		let id = this._translationIdsDictionary[ originalString ];

		if ( !id ) {
			id = this._idGenerator.getNextId();
			this._translationIdsDictionary[ originalString ] = id;
		}

		return id;
	}

	/**
	 * @protected
	 */
	_getPathToTranslationDirectory( pathToPackage ) {
		return path.join( pathToPackage, 'lang', 'translations' );
	}
};
