Changelog
=========

All changes in the package are documented in the main repository. See: https://github.com/ckeditor/ckeditor5-dev/blob/master/CHANGELOG.md.

Changes for the past releases are available below.

## [11.0.13](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@11.0.11...@yproximite/ckeditor5-dev-docs@11.0.13) (2020-02-26)

Internal changes only (updated dependencies, documentation, etc.).


## [11.0.11](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@11.0.10...@yproximite/ckeditor5-dev-docs@11.0.11) (2020-01-27)

### Bug fixes

* Switched to a fork of JSDoc with version 3.4.3 patched to be compatible with NodeJS 12. Also, bumped chalk library to fix thrown error. Closes [#525](https://github.com/ckeditor/ckeditor5-dev/issues/525). ([a7599ba](https://github.com/ckeditor/ckeditor5-dev/commit/a7599ba))


## [11.0.10](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@11.0.1...@yproximite/ckeditor5-dev-docs@11.0.10) (2020-01-09)

Internal changes only (updated dependencies, documentation, etc.).


## [11.0.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@11.0.0...@yproximite/ckeditor5-dev-docs@11.0.1) (2019-02-28)

Internal changes only (updated dependencies, documentation, etc.).


## [11.0.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@10.0.4...@yproximite/ckeditor5-dev-docs@11.0.0) (2019-02-19)

### BREAKING CHANGES

* Upgraded minimal versions of Node to `8.0.0` and npm to `5.7.1`. See: [ckeditor/ckeditor5#1507](https://github.com/ckeditor/ckeditor5/issues/1507). ([612ea3c](https://github.com/ckeditor/ckeditor5-cloud-services/commit/612ea3c))


## [10.0.4](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@10.0.1...@yproximite/ckeditor5-dev-docs@10.0.4) (2019-02-12)

Internal changes only (updated dependencies, documentation, etc.).


## [10.0.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@10.0.0...@yproximite/ckeditor5-dev-docs@10.0.1) (2018-09-24)

Internal changes only (updated dependencies, documentation, etc.).


## [10.0.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@9.0.7...@yproximite/ckeditor5-dev-docs@10.0.0) (2018-08-23)

Updated required Node.js version to `>=6.9.0`.


## [9.0.7](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@9.0.0...@yproximite/ckeditor5-dev-docs@9.0.7) (2018-07-17)

Internal changes only (updated dependencies, documentation, etc.).


## [9.0.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@8.0.14...@yproximite/ckeditor5-dev-docs@9.0.0) (2018-04-25)

### Other changes

* Changed the license to GPL2+ only. See [ckeditor/ckeditor5#991](https://github.com/ckeditor/ckeditor5/issues/991). ([e392d7d](https://github.com/ckeditor/ckeditor5-dev/commit/e392d7d))

### BREAKING CHANGES

* The license under which CKEditor 5 is released has been changed from a triple GPL, LGPL and MPL license to GPL2+ only. See [ckeditor/ckeditor5#991](https://github.com/ckeditor/ckeditor5/issues/991) for more information.


## [8.0.14](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@8.0.13...@yproximite/ckeditor5-dev-docs@8.0.14) (2018-03-27)

Internal changes only (updated dependencies, documentation, etc.).


## [8.0.13](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@8.0.8...@yproximite/ckeditor5-dev-docs@8.0.13) (2018-03-22)

Internal changes only (updated dependencies, documentation, etc.).


## [8.0.8](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@8.0.0...@yproximite/ckeditor5-dev-docs@8.0.8) (2018-01-22)

### Other changes

* Removed script for publishing nightly builds of the docs. See https://github.com/ckeditor/ckeditor5/issues/769. ([fa847e0](https://github.com/ckeditor/ckeditor5-dev/commit/fa847e0))


## [8.0.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.5.0...@yproximite/ckeditor5-dev-docs@8.0.0) (2017-11-13)

### Other changes

* Removed gulp dependency across the whole project. Closes [#296](https://github.com/ckeditor/ckeditor5-dev/issues/296). ([723bee5](https://github.com/ckeditor/ckeditor5-dev/commit/723bee5))

  Now all packages use only npm scripts. Depending on usage you might either create a `"script"` entry in `pacakge.json` to invoke bin executables or require the library into a script.

  * Package `ckeditor5-dev-env` exposes new `translations` binary.
  * Package `ckeditor5-dev-tests` exposes new `test:manual` binary.
  * Removed `gulp-jsdoc3` from `ckeditor5-dev-docs`. Now `jsdoc` is invoked directly.
  * Removed `options` param from logger methods. Logger no longer uses `gutil.log` method.

### BREAKING CHANGES

* Gulp tasks were removed. New npm scripts were introduced.


## [7.5.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.4.1...@yproximite/ckeditor5-dev-docs@7.5.0) (2017-10-10)

### Features

* Provided support for `@observable` tag. Closes [#285](https://github.com/ckeditor/ckeditor5-dev/issues/285). ([fed57af](https://github.com/ckeditor/ckeditor5-dev/commit/fed57af))


## [7.4.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.4.0...@yproximite/ckeditor5-dev-docs@7.4.1) (2017-10-01)

Internal changes only (updated dependencies, documentation, etc.).

## [7.4.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.3.4...@yproximite/ckeditor5-dev-docs@7.4.0) (2017-09-20)

### Features

* Provided `[@error](https://github.com/error)` tag detection in JSDoc. Closes [#280](https://github.com/ckeditor/ckeditor5-dev/issues/280). ([b7a0cf5](https://github.com/ckeditor/ckeditor5-dev/commit/b7a0cf5))


## [7.3.4](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.3.0...@yproximite/ckeditor5-dev-docs@7.3.4) (2017-09-05)

### Other changes

* Build nightly docs in production mode (minified). ([6315c74](https://github.com/ckeditor/ckeditor5-dev/commit/6315c74))


## [7.3.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.2.2...@yproximite/ckeditor5-dev-docs@7.3.0) (2017-08-18)

### Features

* All events will be automatically extended with `EventInfo` parameter. Closes [#257](https://github.com/ckeditor/ckeditor5-dev/issues/257). ([3968bd0](https://github.com/ckeditor/ckeditor5-dev/commit/3968bd0))


## [7.2.2](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.2.1...@yproximite/ckeditor5-dev-docs@7.2.2) (2017-07-12)

### Bug fixes

* Nightly docs should be available in latest/ and <version>/ directories on ckeditor.com. Closes [#242](https://github.com/ckeditor/ckeditor5-dev/issues/242). ([ff487ee](https://github.com/ckeditor/ckeditor5-dev/commit/ff487ee))


## [7.2.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.2.0...@yproximite/ckeditor5-dev-docs@7.2.1) (2017-07-11)

### Bug fixes

* Use a fork of gulp-jsdoc3 so we can harcode JSDoc version (to one with which our plugins work). See [#240](https://github.com/ckeditor/ckeditor5-dev/issues/240). ([2a494eb](https://github.com/ckeditor/ckeditor5-dev/commit/2a494eb))


## [7.2.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.1.1...@yproximite/ckeditor5-dev-docs@7.2.0) (2017-06-20)

### Features

* Static and mixed method, properties and events will be inherited too. Closes [#226](https://github.com/ckeditor/ckeditor5-dev/issues/226). ([a160840](https://github.com/ckeditor/ckeditor5-dev/commit/a160840))


## [7.1.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.1.0...@yproximite/ckeditor5-dev-docs@7.1.1) (2017-06-15)

### Other changes

* The publish-nightly script should check if it's triggered by a cron job (the check was temporarily disabled). ([3dece10](https://github.com/ckeditor/ckeditor5-dev/commit/3dece10))


## [7.1.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@7.0.0...@yproximite/ckeditor5-dev-docs@7.1.0) (2017-06-14)

### Features

* Added a bin script for publishing nightly builds of CKEditor 5 documentation. Closes [#230](https://github.com/ckeditor/ckeditor5-dev/issues/230). ([0d15864](https://github.com/ckeditor/ckeditor5-dev/commit/0d15864))


## [7.0.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.4.0...@yproximite/ckeditor5-dev-docs@7.0.0) (2017-05-29)

### Other changes

* Changed the option name from `validationOnly` to `validateOnly` to match CLI style. Closes [#223](https://github.com/ckeditor/ckeditor5-dev/issues/223). ([cbd8c3d](https://github.com/ckeditor/ckeditor5-dev/commit/cbd8c3d))

### BREAKING CHANGES

* The `validationOnly` option is now called `validateOnly`.


## [6.4.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.3.0...@yproximite/ckeditor5-dev-docs@6.4.0) (2017-05-29)

### Features

* Allow breaking the process if API docs validation fails. Closes [#221](https://github.com/ckeditor/ckeditor5-dev/issues/221). ([e2f0dec](https://github.com/ckeditor/ckeditor5-dev/commit/e2f0dec))


## [6.3.0](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.2.3...@yproximite/ckeditor5-dev-docs@6.3.0) (2017-05-18)

### Features

* Introduced JSDoc plugin enabling inheritance of static members. Closes [#201](https://github.com/ckeditor/ckeditor5-dev/issues/201). ([08c0a21](https://github.com/ckeditor/ckeditor5-dev/commit/08c0a21))


## [6.2.3](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.2.2...@yproximite/ckeditor5-dev-docs@6.2.3) (2017-05-18)

### Bug fixes

* Use more reliable way to resolve module paths. Closes [#206](https://github.com/ckeditor/ckeditor5-dev/issues/206). ([41e6a95](https://github.com/ckeditor/ckeditor5-dev/commit/41e6a95))


## [6.2.2](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.2.1...@yproximite/ckeditor5-dev-docs@6.2.2)

Internal changes only (updated dependencies, documentation, etc.).


## [6.2.1](https://github.com/ckeditor/ckeditor5-dev/compare/@yproximite/ckeditor5-dev-docs@6.2.0...@yproximite/ckeditor5-dev-docs@6.2.1) (2017-04-27)

Internal changes only (updated dependencies, documentation, etc.).


## 6.2.0

The big bang.
