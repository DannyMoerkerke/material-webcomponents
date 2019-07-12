export const template = `<h1>material-dropdown</h1>
<p>
    A dropdown menu is a temporary piece of material that appears upon interaction with a button, action, pointer, or
    other
    control. It contains at least two menu items.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-dropdown&gt;
        &lt;i class="material-icons" slot="icon" tabindex="1"&gt;menu&lt;/i&gt;
        &lt;li slot="option" value="javascript"&gt;Javascript&lt;/li&gt;
        &lt;li slot="option" value="php"&gt;PHP&lt;/li&gt;
        &lt;li slot="option" value="java"&gt;Java&lt;/li&gt;
        &lt;li slot="option" value="scala"&gt;Scala&lt;/li&gt;
    &lt;/material-dropdown&gt;
</pre>

<h3>Methods</h3>
<ul>
    <li><code>setData(data: Array&lt;{}&gt;[, fields: {value: String, label: String}])</code>: sets data for the dropdown
        <ul>
            <li><code>data</code>: objects holding data for the dropdown, the value for the dropdown option 
            should be in the <code>value</code> property and the label for the option should be in the <code>label</code>
            property</li>
            <li><code>fields</code>: optional, when the value and label for the dropdown option are not in the <code>value</code> 
            and <code>label</code> properties of the data objects, this <code>fields</code> object specifies which properties to 
            use instead, e.g. <code>{value: 'id', label: 'name'}</code></li>
        </ul>
    </li>
</ul>

<h3>Events</h3>
<ul>
    <li><code>change</code>: fired when an option is selected
        <ul>
            <li>Event detail:
                <ul>
                    <li><code>value</code>: String, value of the selected option</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--menu-background</code>: menu background color, default: #ffffff</li>
    <li><code>--icon-width</code>: icon width, default: 24px</li>
    <li><code>--icon-height</code>: icon height, default: 24px</li>
    <li><code>--menu-width</code>: menu width, default: 24px</li>
    <li><code>--menu-height</code>: menu height, default: 24px</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-dropdown>
        <i class="material-icons" slot="icon" tabindex="1">menu</i>
        <li slot="option" value="javascript">Javascript</li>
        <li slot="option" value="php">PHP</li>
        <li slot="option" value="java">Java</li>
        <li slot="option" value="scala">Scala</li>
    </material-dropdown>
</section>`;
