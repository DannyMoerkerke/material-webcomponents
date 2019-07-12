
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2019-07-12
### Changed
- added css variables to material-button for font size and icon size
- added setData() method to material-dropdown to dynamically add data
- added missing events to documentation

## [1.1.5] - 2019-06-18
### Added
- added material-card component

## [1.1.4] - 2019-03-27
### Added
- added initialization for demo to separate file for correct loading in polyfilled browsers
- added license
- added eslint config
- added pre-push hook

### Changed
- added "files" key to package.json for npm
- renamed to scoped package

### Fixed
- fixed webpack config and removed redundant code
- fixes issues reported by eslint

## [1.1.3] - 2019-03-26
### Added
- added isValid method to material-textfield

## [1.1.2] - 2019-03-07
### Changed
- local demo now runs on http://localhost:8080/material-webcomponents to
align with Github pages
- changed html partials to js template strings

### Added
- added 404.html for Github pages which fixes reload of SPA

### Fixed
- responsive fixes for material-dialog
- removed height from material-drawer container
- removed unwanted highlighting of container inside material-switch on iOS
- fixed failing tests

## [1.1.1] - 2019-02-28
### Added
- readme

## [1.1.0] - 2019-02-28
### Changed
- Moved assets to /demo/assets
- renamed webpack config

### Added
- demo index page
- box-shadow to material-app-bar
- --drawer-box-shadow css variable to material-drawer
- repo and homepage to package.json
- changelog
