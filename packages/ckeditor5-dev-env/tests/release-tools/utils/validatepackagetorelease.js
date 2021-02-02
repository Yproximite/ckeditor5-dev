/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );
const mockery = require( 'mockery' );

describe( 'dev-env/release-tools/utils', () => {
	describe( 'validatePackageToRelease()', () => {
		let validatePackageToRelease, sandbox, stubs;

		beforeEach( () => {
			sandbox = sinon.createSandbox();

			stubs = {
				devUtils: {
					tools: {
						shExec: sandbox.stub()
					}
				}
			};

			mockery.enable( {
				useCleanCache: true,
				warnOnReplace: false,
				warnOnUnregistered: false
			} );

			mockery.registerMock( '@yproximite/ckeditor5-dev-utils', stubs.devUtils );

			validatePackageToRelease = require( '../../../lib/release-tools/utils/validatepackagetorelease' );
		} );

		afterEach( () => {
			sandbox.restore();
			mockery.disable();
		} );

		it( 'returns an empty array if validation passes', () => {
			stubs.devUtils.tools.shExec.returns( '## master...origin/master' );

			const errors = validatePackageToRelease( { changes: 'Some changes.', version: '1.0.0' } );

			expect( errors ).to.be.an( 'Array' );
			expect( errors.length ).to.equal( 0 );
		} );

		it( 'returns an array with errors if changes are invalid', () => {
			stubs.devUtils.tools.shExec.returns( '## master...origin/master' );

			const errors = validatePackageToRelease( { changes: null, version: '1.0.0' } );

			expect( errors.length ).to.equal( 1 );
			expect( errors[ 0 ] ).to.equal( 'Cannot find changelog entries for version "1.0.0".' );
		} );

		it( 'returns an array with errors if passed version is invalid', () => {
			stubs.devUtils.tools.shExec.returns( '## master...origin/master' );

			const errors = validatePackageToRelease( { changes: 'Some changes.', version: null } );

			expect( errors.length ).to.equal( 1 );
			expect( errors[ 0 ] ).to.equal( 'Passed an invalid version ("null").' );
		} );

		it( 'returns an array with errors if current branch is not "master"', () => {
			stubs.devUtils.tools.shExec.returns( '## develop...origin/develop' );

			const errors = validatePackageToRelease( { changes: 'Some changes.', version: '1.0.0' } );

			expect( errors.length ).to.equal( 1 );
			expect( errors[ 0 ] ).to.equal( 'Not on master branch.' );
		} );

		it( 'returns an array with errors if master is behind with origin', () => {
			stubs.devUtils.tools.shExec.returns( '## master...origin/master [behind 2]' );

			const errors = validatePackageToRelease( { changes: 'Some changes.', version: '1.0.0' } );

			expect( errors.length ).to.equal( 1 );
			expect( errors[ 0 ] ).to.equal( 'The branch is behind with the remote.' );
		} );

		it( 'allows skipping the branch check', () => {
			stubs.devUtils.tools.shExec.returns( '## develop...origin/develop' );

			const errors = validatePackageToRelease( { changes: 'Some changes.', version: '1.0.0', ignoreBranchCheck: true } );

			expect( errors.length ).to.equal( 0 );
		} );

		it( 'uses non-master branch for releasing if specified', () => {
			stubs.devUtils.tools.shExec.returns( '## release...origin/release' );

			const errors = validatePackageToRelease( { branch: 'release', changes: 'Some changes.', version: '1.0.0' } );

			expect( errors ).to.be.an( 'Array' );
			expect( errors.length ).to.equal( 0 );
		} );

		it( 'allows skipping the branch check (even if specified)', () => {
			stubs.devUtils.tools.shExec.returns( '## develop...origin/develop' );

			const errors = validatePackageToRelease( {
				branch: 'release',
				changes: 'Some changes.',
				version: '1.0.0',
				ignoreBranchCheck: true
			} );

			expect( errors.length ).to.equal( 0 );
		} );
	} );
} );
