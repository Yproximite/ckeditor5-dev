/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const path = require( 'path' );
const {	TranslationService } = require( '@ckeditor/ckeditor5-dev-utils' ).translations;
const utils = require( './utils' );

/**
 * Replaces all function call parameters with translated strings for the t function.
 *
 * @param {Object} compiler Webpack compiler.
 * @param {String} language Language code, e.g en_US.
 */
module.exports = function replaceTCalls( compiler, language ) {
	const translationService = new TranslationService( language );

	compiler.options.translateSource = source => translationService.translateSource( source );

	// Adds ckeditor5-core translations before translate-source-loader starts translating.
	compiler.plugin( 'after-resolvers', () => {
		compiler.resolvers.normal.resolve(
			process.cwd(),
			process.cwd(),
			'@ckeditor/ckeditor5-core/src/editor/editor.js',
			( err, result ) => {
				const pathToCoreTranslationPackage = result.match( utils.CKEditor5CoreRegExp )[ 0 ];

				translationService.loadPackage( pathToCoreTranslationPackage );
			}
		);
	} );

	compiler.plugin( 'normal-module-factory', nmf => {
		nmf.plugin( 'after-resolve', ( resolveOptions, done ) => {
			maybeLoadPackage( resolveOptions );
			maybeAddLoader( resolveOptions );

			done( null, resolveOptions );
		} );
	} );

	// Adds package to the translations if the resource comes from ckeditor5-* package.
	function maybeLoadPackage( resolveOptions ) {
		const packageNameRegExp = utils.CKEditor5PackageNameRegExp;
		const match = resolveOptions.resource.match( packageNameRegExp );

		if ( match ) {
			const index = resolveOptions.resource.search( packageNameRegExp ) + match[ 0 ].length;
			const pathToPackage = resolveOptions.resource.slice( 0, index );

			translationService.loadPackage( pathToPackage );
		}
	}

	// Injects loader when the file comes from ckeditor5-* packages.
	function maybeAddLoader( resolveOptions ) {
		if ( resolveOptions.resource.match( utils.CKEditor5PackageSrcFileRegExp ) ) {
			resolveOptions.loaders.unshift( path.join( __dirname, 'translatesourceloader.js' ) );
		}
	}
};
