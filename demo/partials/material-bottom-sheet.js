export const template = `<h1>material-bottom-sheet</h1>
<p>
    Dialogs inform users about a specific task and may contain critical information, require decisions, or involve
    multiple tasks.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-bottom-sheet&gt;
        &lt;h1 slot="header">Dialog title&lt;/h1&gt;
        &lt;p slot="body"&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorem et, eum excepturi fugit iste maxime nisi, obcaecati officia omnis quas qui, quidem sequi. Accusamus deleniti earum quasi ratione unde!&lt;/p&gt;
        &lt;div slot="footer"&gt;
            &lt;button id="action"&gt;close&lt;/button&gt;
        &lt;/div&gt;
    &lt;/material-bottom-sheet&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>modal</code>: empty, when present the dialog will <b>not</b> close when the backdrop is clicked.</li>
</ul>

<h3>Methods</h3>
<ul>
    <li><code>open</code>: opens the dialog.</li>
    <li><code>close</code>: closes the dialog.</li>
</ul>

<h3>Slots</h3>
<ul>
    <li><code>header</code>: content of the header</li>
    <li><code>body</code>: content of the body</li>
    <li><code>footer</code>: content of the footer</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--dialog-width</code>: width of dialog, default: 20%</li>
    <li><code>--dialog-height</code>: height of dialog, default: auto</li>
    <li><code>--backdrop-color</code>: backdrop color, should be in <code>rgba</code> format to allow opacity, default:
        rgba(128,128,128,0.5)
    </li>
    <li><code>--header-background</code>: header background, default: #ffffff</li>
    <li><code>--body-background</code>: body background, default: #ffffff</li>
    <li><code>--footer-background</code>: footer background, default: #ffffff</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-bottom-sheet id="standard-dialog">
        <h1 slot="header">Dialog title</h1>
        <p slot="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorem et, eum excepturi
            fugit iste maxime nisi, obcaecati officia omnis quas qui, quidem sequi. Accusamus deleniti earum quasi
            ratione unde!</p>
        <div slot="footer">
            <material-button id="close-standard" label="Close"></material-button>
        </div>
    </material-bottom-sheet>

    <material-button id="open-standard" label="Open" raised></material-button>
</section>`;
