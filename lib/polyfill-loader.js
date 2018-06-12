(function() {
    var bundle = 'Proxy' in window ? 'dist/bundle.js' : 'dist/bundle.legacy.js';
    var polyfill = 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js';

    if(!('customElements' in window)) {

        var loadjs = function(file, cb) {
            var script = document.createElement('script');
            script.src = file;
            script.onload = cb;
            document.querySelector('head').appendChild(script);
        };

        console.log('loading polyfill');

        loadjs(polyfill, function() {
            if(window.WebComponents) {
                window.addEventListener('WebComponentsReady', function() {
                    console.log('WebComponentsReady, loading', bundle);
                    loadjs(bundle);
                });
            }
        });
    }
    else {
        console.log('no polyfill');
    }
})();