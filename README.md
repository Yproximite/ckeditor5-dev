CKEditor 5 development tools packages
=====================================

[![Build Status](https://travis-ci.org/ckeditor/ckeditor5-dev.svg?branch=master)](https://travis-ci.org/ckeditor/ckeditor5-dev)
[![Coverage Status](https://coveralls.io/repos/github/ckeditor/ckeditor5-dev/badge.svg?branch=master)](https://coveralls.io/github/ckeditor/ckeditor5-dev?branch=master)

## Packages

This repository is a monorepo. It contains multiple npm packages.

| Package | Version | Dependencies |
|---------|---------|--------------|
| [`@yproximite/ckeditor5-dev-docs`](/packages/ckeditor5-dev-docs) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-dev-docs.svg)](https://www.npmjs.com/package/@yproximite/ckeditor5-dev-docs) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/ckeditor5-dev-docs)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-docs) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/ckeditor5-dev-docs)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-docs&type=dev) |
| [`@yproximite/ckeditor5-dev-env`](/packages/ckeditor5-dev-env) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-dev-env.svg)](https://www.npmjs.com/package/@yproximite/ckeditor5-dev-env) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/ckeditor5-dev-env)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-env) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/ckeditor5-dev-env)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-env&type=dev) |
| [`@yproximite/ckeditor5-dev-tests`](/packages/ckeditor5-dev-tests) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-dev-tests.svg)](https://www.npmjs.com/package/@yproximite/ckeditor5-dev-tests) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/ckeditor5-dev-tests)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-tests) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/ckeditor5-dev-tests)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-tests&type=dev) |
| [`@yproximite/ckeditor5-dev-utils`](/packages/ckeditor5-dev-utils) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-dev-utils.svg)](https://www.npmjs.com/package/@yproximite/ckeditor5-dev-utils) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/ckeditor5-dev-utils)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-utils) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/ckeditor5-dev-utils)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-utils&type=dev) |
| [`@yproximite/ckeditor5-dev-webpack-plugin`](/packages/ckeditor5-dev-webpack-plugin) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-dev-webpack-plugin.svg)](https://www.npmjs.com/package/@yproximite/ckeditor5-dev-webpack-plugin) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/ckeditor5-dev-webpack-plugin)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-webpack-plugin) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/ckeditor5-dev-webpack-plugin)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/ckeditor5-dev-webpack-plugin&type=dev) |
| [`@ckeditor/jsdoc-plugins`](/packages/jsdoc-plugins) | [![npm version](https://badge.fury.io/js/%40ckeditor%2Fjsdoc-plugins.svg)](https://www.npmjs.com/package/@ckeditor/jsdoc-plugins) | [![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-dev.svg?path=packages/jsdoc-plugins)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/jsdoc-plugins) [![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-dev/dev-status.svg?path=packages/jsdoc-plugins)](https://david-dm.org/ckeditor/ckeditor5-dev?path=packages/jsdoc-plugins&type=dev) |

## Cloning

1. Clone this repository.
2. Do `yarn install` inside (this package uses yarn workspaces).
3. You're ready to go!

## Testing

Tests:

```bash
yarn run test
```

Tests with the debug mode on:

```bash
DEBUG=true yarn run test
```

Test a single package:

```bash
./node_modules/.bin/mocha packages/ckeditor5-dev-env/tests/* --recursive
```

Code coverage:

```bash
yarn run coverage
```

## Releasing packages

### Changelog

1. Fetch all changes and switch to `master`!
2. Execute `npm run changelog`:
  * This task checks what changed in each package and bumps the version accordingly. If nothing changed at all, it won't create a new changelog entry. If changes were irrelevant (e.g. only depedencies) it will create an "internal changes" entry.
  * Scan the logs which are printed by the tool in search for errors (incorrect changelog entries). Incorrect entries (e.g. ones without the type) are being ignored. You may need to create entries for them manually. This is done directly in `CHANGELOG.md` (in the root directory). Make sure to verify the proposed version after you modify the changelog.
    * When unsure what has really changed in this version of a specific package, use `git diff <hash of previous release> packages/ckeditor5-dev-<name>/`.

### Publishing

After generating the changelog, you are able to release the package.

First, you need to bump the version:

```bash
npm run release:bump-version
```

You can also use the `--dry-run` option in order to see what this task does.

After bumping the version, you can publish the changes:

```bash
npm run release:publish
```

As in the previous task, the `--dry-run` option is also available.

Your job's done. You can go now to `ckeditor5`, remove `yarn.lock`, potentially update something in `package.json`, run `yarn install` and commit that as `"Internal: Updated dependencies."`.

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html). For full details about the license, please check the `LICENSE.md` file.
