export const template = `<h1>material-card</h1>
<p>
    Cards contain content and actions about a single subject.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-card&gt;
        &lt;h1 slot="header">Dialog title&lt;/h1&gt;
        &lt;p slot="subheader"&gt;Subheader&lt;/p&gt;
        &lt;img src="/demo/assets/webcomponents.svg" slot="media"&gt;
        &lt;p slot="body"&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorem et, eum excepturi fugit iste maxime nisi, obcaecati officia omnis quas qui, quidem sequi. Accusamus deleniti earum quasi ratione unde!&lt;/p&gt;
        &lt;div slot="footer"&gt;
            
        &lt;/div&gt;
    &lt;/material-card&gt;
</pre>

<h3>Slots</h3>
<ul>
    <li><code>header</code>: content of the header</li>
    <li><code>subheader</code>: content of the subheader</li>
    <li><code>media</code>: media like an image or video that appears below the header</li>
    <li><code>body</code>: content of the body</li>
    <li><code>footer</code>: content of the footer</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--card-width</code>: width of card, default: auto</li>
    <li><code>--card-height</code>: height of card, default: auto</li>
    <li><code>--card-background</code>: card background, default: #ffffff</li>
    <li><code>--header-background</code>: header background, default: #ffffff</li>
    <li><code>--body-background</code>: body background, default: #ffffff</li>
    <li><code>--footer-background</code>: footer background, default: #ffffff</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-card id="standard-card">
        <h1 slot="header">Card title</h1>
        <p slot="subheader">Subheader</p>
        <img src="/demo/assets/webcomponents.svg" slot="media">
        <p slot="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorem et, eum excepturi
            fugit iste maxime nisi, obcaecati officia omnis quas qui, quidem sequi. Accusamus deleniti earum quasi
            ratione unde!</p>
        <div slot="footer">
            <p>Footer</p>
        </div>
    </material-card>
</section>`;
