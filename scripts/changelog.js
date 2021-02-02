#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

require( '../packages/ckeditor5-dev-env' )
	.generateChangelogForMonoRepository( {
		cwd: process.cwd(),
		packages: 'packages',
		transformScope: name => {
			if ( name === 'jsdoc' ) {
				return 'https://www.npmjs.com/package/@ckeditor/jsdoc-plugins';
			}

			return 'https://www.npmjs.com/package/@yproximite/ckeditor5-dev-' + name;
		}
	} );
