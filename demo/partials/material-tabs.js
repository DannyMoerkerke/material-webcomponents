export const template = `<h1>material-tabs</h1>
<p>
    Tabs make it easy to explore and switch between different views.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-tabs&gt;
        &lt;div slot="tab" data-title="tab 1"&gt;
            First tab
        &lt;/div&gt;

        &lt;div slot="tab" data-title="tab 2"&gt;
            tab number 2
        &lt;/div&gt;

        &lt;div slot="tab" data-title="tab 3"&gt;
            a third one
        &lt;/div&gt;
    &lt;/material-tabs&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>slide</code>: empty, when present the content of the active tab will slide into view</li>
</ul>

<h3>Slots</h3>
<ul>
    <li><code>tab</code>: content of the tab, the attribute <code>data-title</code> contains the title of the tab</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--tabs-background</code>: tabs background, default: #999999</li>
    <li><code>--content-background</code>: background color of tab content, default: #cccccc</li>
    <li><code>--indicator-color</code>: active tab indicator color, default: #ffff00</li>
</ul>

<section class="demo">
    <h3>Demo</h3>

    <div class="demo-option">
        <em>standard</em>
        <material-tabs>
            <div slot="tab" data-title="tab 1">
                First tab
            </div>

            <div slot="tab" data-title="tab 2">
                tab number 2
            </div>

            <div slot="tab" data-title="tab 3">
                a third one
            </div>

            <div slot="tab" data-title="tab 4">
                and number 4
            </div>

            <div slot="tab" data-title="tab 5">
                and another one
            </div>

            <div slot="tab" data-title="tab 6">
                man, another one???
            </div>
        </material-tabs>
    </div>

    <div class="demo-option">
        <em>with sliding transition</em>
        <material-tabs slide>
            <div slot="tab" data-title="tab 1">
                First tab
            </div>

            <div slot="tab" data-title="tab 2">
                tab number 2
            </div>

            <div slot="tab" data-title="tab 3">
                a third one
            </div>

            <div slot="tab" data-title="tab 4">
                and number 4
            </div>

            <div slot="tab" data-title="tab 5">
                and another one
            </div>

            <div slot="tab" data-title="tab 6">
                man, another one???
            </div>
        </material-tabs>
    </div>
</section>
`;
