export const template = `<h1>material-slidemenu</h1>
<p>
    The slidemenu slides down when clicked and reveals extra options.
</p>
<h3>Usage</h3>
<pre>
    &lt;material-slidemenu label="Options"&gt;
        &lt;a slot="item" href="#"&gt;Option 1&lt;/a&gt;
        &lt;a slot="item" href="#"&gt;Option 2&lt;/a&gt;
        &lt;a slot="item" href="#"&gt;Option 3&lt;/a&gt;
        &lt;a slot="item" href="#"&gt;Option 4&lt;/a&gt;
        &lt;a slot="item" href="#"&gt;Option 5&lt;/a&gt;
    &lt;/material-slidemenu&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>label</code>: String, label of the menu</li>
</ul>

<h3>Slots</h3>
<ul>
    <li><code>item</code>: menu item</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--label-height</code>: height of the label when the menu is closed, default: 40px</li>
    <li><code>--label-background</code>: background color of the menu label, default: #cccccc</li>
    <li><code>--menu-background</code>: background color of the menu itself, default: #efefef</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-slidemenu id="demo-slidemenu" label="Options">
        <a slot="item">Option 1</a>
        <a slot="item">Option 2</a>
        <a slot="item">Option 3</a>
        <a slot="item">Option 4</a>
        <a slot="item">Option 5</a>
    </material-slidemenu>
</section>

`;
