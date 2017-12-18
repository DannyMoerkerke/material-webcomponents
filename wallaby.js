module.exports = function () {
    return {
        files: [
            {pattern: 'node_modules/webcomponentsjs/lite.js', instrument: false, load: true},
            {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false, load: true},
            {pattern: 'node_modules/chai/chai.js', instrument: false, load: true},

            // Component and its files (files with load: false because they will be loaded by the component)
            'src/message-sender.js',
            'src/message-viewer.js',
            'src/file-chunker.js',
            'src/webrtc-chat-client.js',
            {pattern: 'src/*.js', load: false}
        ],
        tests: ['test/*.test.js'],

        env: {
            kind: 'chrome'
        },

        testFramework: 'mocha',

        debug: true,

        // delaying running tests until web components are ready
        setup(wallaby) {
            if(!window.CustomElements || !window.CustomElements.readyTime) {
                wallaby.delayStart();
                window.addEventListener('WebComponentsReady', function () {
                    window.expect = chai.expect;
                    console.log('starting');
                    wallaby.start();
                });
            }
        }
    };
};