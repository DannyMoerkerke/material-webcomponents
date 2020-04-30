
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.7] - 2020-04-30
### Added
- material-app-bar now also reports which `slot` a clicked icon was assigned to in the `detail` 
property of the `app-bar-clicked` event

## [1.2.6] - 2020-03-19
### Added
- added `circle` attribute to material-button to make circular button

### Fixed
- added `-webkit-overflow-scrolling: touch` to material-bottom-sheet to ensure smooth scrolling
on iOS devices

## [1.2.5] - 2020-03-10
### Added
- added material-bottom-sheet
- added material-loader

### Fixed
- github icon now shows on mobile
- fixed issue where file input in material-button was not clickable
- added width: fit-content to material-button.js to remove invisible clickable area
- removed width from material-checkbox.js to keep correct width of label
- setting value on material-slider.js now updates the position of the knob

## [1.2.3] - 2020-01-07
### Added
- added css variables --button-color-hover, --button-padding and --border-radius to material-button
- added slot for hidden file input field to material-button
- added css variables --error-color and --margin to material-textfield

## [1.2.2] - 2019-08-11
### Added
- added change event to material-checkbox
### Fixed
- fixed reference to this.options in material-dropdown when it is not dynamically populated

## [1.2.1] - 2019-07-14
### Fixed
- added MutationObserver to material-dropdown to setup menu when data is added dynamically through setData() method

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
