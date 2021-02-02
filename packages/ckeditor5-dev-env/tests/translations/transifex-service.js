/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const chai = require( 'chai' );
const sinon = require( 'sinon' );
const expect = chai.expect;
const mockery = require( 'mockery' );

describe( 'transifex-service', () => {
	let sandbox, transifexService, stubs;

	beforeEach( () => {
		sandbox = sinon.createSandbox();

		mockery.enable( {
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		} );

		stubs = {
			logger: {
				info: sandbox.stub(),
				warning: sandbox.stub(),
				error: sandbox.stub()
			},

			request: {
				get: sandbox.stub(),
				post: sandbox.stub(),
				put: sandbox.stub()
			}
		};

		mockery.registerMock( '@yproximite/ckeditor5-dev-utils', {
			logger: () => stubs.logger,
			translations: {
				retryAsyncFunction: x => x()
			}
		} );

		mockery.registerMock( 'request', stubs.request );

		transifexService = require( '../../lib/translations/transifex-service' );
	} );

	afterEach( () => {
		sandbox.restore();
		mockery.disable();
	} );

	describe( 'getResources()', () => {
		it( 'should return resources', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 200 }, '{"body": ""}' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getResources( {
				token: 'token'
			} ).then( () => {
				sinon.assert.calledWith(
					spy,
					'https://www.transifex.com/api/2/project/ckeditor5/resources/',
					{
						auth: {
							username: 'api',
							password: 'token'
						}
					}
				);
			} );
		} );

		it( 'should throw an error if the statusCode is above 300', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 500 }, '{"body": ""}' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getResources( { token: 'token' } )
				.then(
					() => {
						throw new Error( 'Promise should not be resolved.' );
					},
					err => {
						expect( err.message ).to.equal( 'Status code: 500 for \'getResources\' method.' );
					}
				);
		} );

		it( 'should throw an error if some other error occurs', () => {
			const error = new Error();
			const spy = sandbox.spy( ( url, data, cb ) => cb( error, { statusCode: 200 }, '{"body": ""}' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getResources( { token: 'token' } )
				.then(
					() => {
						throw new Error( 'Promise should not be resolved.' );
					},
					err => {
						expect( err ).to.equal( error );
					}
				);
		} );

		it( 'should throw an error if some error occurs during parsing the body', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 200 }, 'Invalid JSON' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getResources( { token: 'token' } )
				.then(
					() => {
						throw new Error( 'Promise should not be resolved.' );
					},
					err => {
						expect( err.message ).to.equal(
							'Error handled while parsing body of the \'getResources\' response: Invalid JSON'
						);
					} );
		} );
	} );

	describe( 'postResource()', () => {
		it( 'should upload resource on the Transifex', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 201 }, '{"body": ""}' ) );
			stubs.request.post.callsFake( spy );

			return transifexService.postResource( {
				token: 'token',
				name: 'name',
				slug: 'slug',
				content: 'content'
			} ).then( () => {
				sinon.assert.calledWith(
					spy,
					'https://www.transifex.com/api/2/project/ckeditor5/resources/',
					{
						auth: {
							username: 'api',
							password: 'token'
						},
						formData: {
							slug: 'slug',
							name: 'name',
							content: 'content',
							'i18n_type': 'PO'
						}
					}
				);
			} );
		} );
	} );

	describe( 'putResourceContent()', () => {
		it( 'should update resource on the Transifex', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 200 }, '{"body": ""}' ) );
			stubs.request.put.callsFake( spy );

			return transifexService.putResourceContent( {
				token: 'token',
				slug: 'slug',
				content: 'content'
			} ).then( () => {
				sinon.assert.calledWith(
					spy,
					'https://www.transifex.com/api/2/project/ckeditor5/resource/slug/content/',
					{
						auth: {
							username: 'api',
							password: 'token'
						},
						formData: {
							content: 'content',
							'i18n_type': 'PO'
						}
					}
				);
			} );
		} );
	} );

	describe( 'getResourceDetails()', () => {
		it( 'should get resource details from the Transifex', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 200 }, '{"body": ""}' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getResourceDetails( {
				token: 'token',
				slug: 'slug'
			} ).then( () => {
				sinon.assert.calledWith(
					spy,
					'https://www.transifex.com/api/2/project/ckeditor5/resource/slug/?details',
					{
						auth: {
							username: 'api',
							password: 'token'
						}
					}
				);
			} );
		} );
	} );

	describe( 'getTranslation()', () => {
		it( 'should get translations for the target language of the resource from the Transifex', () => {
			const spy = sandbox.spy( ( url, data, cb ) => cb( null, { statusCode: 200 }, '{"body": ""}' ) );
			stubs.request.get.callsFake( spy );

			return transifexService.getTranslation( {
				token: 'token',
				slug: 'slug',
				lang: 'lang'
			} ).then( () => {
				sinon.assert.calledWith(
					spy,
					'https://www.transifex.com/api/2/project/ckeditor5/resource/slug/translation/lang/',
					{
						auth: {
							username: 'api',
							password: 'token'
						}
					}
				);
			} );
		} );
	} );
} );
