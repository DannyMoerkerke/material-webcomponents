(function() {
    var bundle = 'Proxy' in window ? 'dist/bundle.js' : 'dist/bundle.legacy.js';
    var polyfill = 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js';
    var shadyCSS = 'lib/scoping-shim.min.js';
    var templatePolyfill = 'node_modules/@webcomponents/template/template.js';

    if(!('customElements' in window)) {

        var loadjs = function(file, cb) {
            var script = document.createElement('script');
            script.src = file;
            script.onload = cb;
            document.querySelector('head').appendChild(script);
        };

        // if(!('Proxy' in window)) {
        //     console.log('loading template polyfill');
        //     loadjs(templatePolyfill, function() {
        //         console.log('loading polyfill');
        //         loadjs(polyfill, function() {
        //             if(window.WebComponents) {
        //                 window.addEventListener('WebComponentsReady', function() {
        //                     console.log('WebComponentsReady, loading', bundle);
        //                     loadjs(bundle);
        //                 });
        //             }
        //         });
        //     });
        // }
        // else {
            console.log('loading polyfill');
            // loadjs(templatePolyfill, function() {
                    loadjs(polyfill, function() {
                        if(window.WebComponents) {
                            window.addEventListener('WebComponentsReady', function() {
                                console.log('WebComponentsReady, loading', bundle);
                                loadjs(bundle);
                            });
                        }
                    });
            // });
        // }
    }
    else {
        console.log('no polyfill');
    }
})();