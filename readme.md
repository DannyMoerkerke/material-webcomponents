# Material Web Components
Material Design implemented in Web Components (Custom Elements v1)
[https://dannymoerkerke.github.io/material-webcomponents/](https://dannymoerkerke.github.io/material-webcomponents/)

### Getting started
To install Material Web Components run:

```
npm install material-webcomponents
```

Then simply `import` the component you need in your script, for example:

```
import './node_modules/material-webcomponents/src/material-button.js';
```

Or include it with a script tag as an ES6 module:

```
<script src="node_modules/material-webcomponents/src/material-button.js" type="module"></script>
```

Add the HTML tag:

```
<material-button label="Confirm" raised></material-button>
```

...and you're in business!

### Documentation
Refer to [https://dannymoerkerke.github.io/material-webcomponents/](https://dannymoerkerke.github.io/material-webcomponents/)
 for documentation of each component or run `npm install` once and then
 `npm start` and view the demo on [http://localhost:8080/material-webcomponents](http://localhost:8080/material-webcomponents)

### Testing
Run `npm test` and view the results on [http://localhost:8080/](http://localhost:8080/)
or run `npm run test:headless` to run the tests on the command line.

This repo also contains the configuration file `wallaby.js` to run the
tests from your IDE using [Wallaby.js](https://wallabyjs.com/)

### Browser support
- Chrome 53+
- Firefox 63+
- Safari 10+ (*)
- iOS Safari 10+ (*)
- Chrome Android 71+
- Firefox Android 64+
- Edge 16+ (with polyfill)

\* *Safari on both MacOS and iOS has buggy support for certain CSS
selectors in Shadow DOM. This project contains a Webpack configuration
file which uses [custom-elements-css-loader](https://github.com/DannyMoerkerke/custom-elements-css-loader)
to fix this.*

### Polyfilling Edge 16+
Refer to `/lib/polyfill-loader.js` to see how the [webcomponentsjs polyfill](https://github.com/webcomponents/webcomponentsjs)
and the Webpack bundle are loaded. The Webpack bundle only parses the CSS
inside Shadow DOM (see note on Safari above)




