module.exports = () => {
    return {
        files: [
            {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false, load: true},
            {pattern: 'node_modules/chai/chai.js', instrument: false, load: true},
            'src/material-table.js',
            'src/material-tabs.js',
            'src/material-dropdown.js',
            'src/material-checkbox.js',
            'src/material-radiobutton.js',
            'src/material-dialog.js',
            {pattern: 'src/*.js', load: false}
        ],
        tests: ['test/*.test.js'],

        env: {
            kind: 'chrome'
        },

        testFramework: 'mocha',

        debug: true,

        setup() {
            window.expect = chai.expect;
        }
    };
};