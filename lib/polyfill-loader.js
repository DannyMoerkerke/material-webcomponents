(function() {
    const bundle = 'dist/bundle.js';
    const init = 'lib/init.js';
    const polyfill = 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js';

    if(!('customElements' in window)) {

        const loadjs = function(file, cb) {
            const script = document.createElement('script');
            script.src = file;
            script.onload = cb;
            document.querySelector('head').appendChild(script);
        };

        console.log('loading polyfill');

        loadjs(polyfill, function() {
            if(window.WebComponents) {
                window.addEventListener('WebComponentsReady', function() {
                    console.log('WebComponentsReady, loading', bundle);
                    loadjs(bundle, function() {
                      loadjs(init);
                    });
                });
            }
        });
    }
    else {
        console.log('no polyfill');
    }
})();
