export const template = `<h1>material-progress</h1>
<p>
    Progress and activity indicators are visual indications of an app loading content.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-progress value="25" max="100" circle="64"&gt;&lt;/material-progress&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>value</code>: Number, current value of the progress indicator</li>
    <li><code>max</code>: Number, maximum value of the progress indicator</li>
    <li><code>circle</code>: Number, will make the progress indicator appear as a circle, the value is the radius in
        pixels
    </li>
</ul>

<h3>Properties</h3>
<ul>
    <li><code>value</code>: Number, current value of the progress indicator</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--progress-bar-width</code>: width of progress bar, default: 100%</li>
    <li><code>--progress-bar-height</code>: height of the progress bar, default: 5px</li>
    <li><code>--progress-bar-color</code>: color of the progress indicator, default: #00bcd4</li>
    <li><code>--progress-background</code>: background color of the progress indicator, default: #eeeeee</li>
    <li><code>--progress-font-size</code>: font size of the progress bar when circular, default: 4px (when the
        <code>circle</code> attribute is set the font size is the value of this attribute divided by 3.5)</li>
</ul>

<section class="demo">
    <h3>Demo</h3>

    <div class="demo-option">
        <em>determinate</em>
        <material-progress value="68" max="100"></material-progress>
    </div>

    <div class="demo-option">
        <em>indeterminate (no <code>value</code> and <code>max</code>)</em>
        <material-progress></material-progress>
    </div>

    <div class="demo-option">
        <em>circular</em>
        <material-progress value="68" max="100" circle="64"></material-progress>
    </div>
</section>
`;
