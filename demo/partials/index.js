export const template = `<div class="intro">

  <h1>Material Design Web Components</h1>

  <p>
    Material design implemented in native, cross-browser web components, no framework needed.
  </p>

  <div class="cards-row">
    <div class="card">
      <header>
        <h3>
          Standards based
        </h3>
      </header>
      <section class="body">
        <img src="/material-webcomponents/demo/assets/webcomponents.svg" style="width: 79px;">
        <p>
          All components consist of semantic HTML, scoped CSS and standard JavaScript.
        </p>
        <p>
          No proprietary non-standard syntax so no build step is needed.
        </p>
      </section>
    </div>

    <div class="card">
      <header>
        <h3>
          Cross-browser
        </h3>
      </header>
      <section class="body">
        <img src="/material-webcomponents/demo/assets/browsers.png">
        <p>
          Material Web Components run out of the box in all modern browsers
        </p>
        <p>
          A polyfill is provided for outdated browsers.
        </p>
      </section>
    </div>

    <div class="card">
      <header>
        <h3>
          Truly scoped CSS
        </h3>
      </header>
      <section class="body">
        <div class="scoped-css">
          <p>[CSS]</p>
        </div>
        <p>
          Material Web Components come with truly scoped CSS out of the box.
        </p>
        <p>
          All CSS is contained inside each component and only applies to the component itself. No CSS-in-JS or other
          non-standard solution needed.
        </p>
      </section>
    </div>
  </div>
</div>

<div class="getting-started">
  <h2>Getting started</h2>
  <p>
    To install Material Web Components run:
  </p>
  <pre>
    npm install @dannymoerkerke/material-webcomponents
  </pre>
  <p>
    Then simply <code>import</code> the component you need in your script:
  </p>
  <pre>
    import './node_modules/material-webcomponents/src/material-button.js';
  </pre>
  <p>
    Or include it with a script tag as an ES6 module:
  </p>
  <pre>
    &lt;script src="node_modules/material-webcomponents/src/material-button.js" type="module"&gt;&lt;/script&gt;
  </pre>
  <p>
    Add the HTML tag:
  </p>
  <pre>
    &lt;material-button label="Confirm" raised&gt;&lt;/material-button&gt;
  </pre>
  <p>
    ...and you're in business!
  </p>
  <p>
    Refer to the menu to see documentation for each component.
  </p>
</div>
`;
