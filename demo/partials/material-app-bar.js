export const template = `<h1>material-app-bar</h1>
<p>
    The app bar, formerly known as the action bar in Android, is a special kind of toolbar that’s used for branding,
    navigation, search, and actions.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-app-bar label="Title"&gt;
        &lt;i class="material-icons" slot="left-content"&gt;add&lt;/i&gt;
        &lt;i class="material-icons" slot="right-content"&gt;close&lt;/i&gt;
    &lt;/material-app-bar&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>label</code>: String, title of the toolbar</li>
</ul>

<h3>Events</h3>
<ul>
    <li><code>app-bar-click</code>: fired when an icon is clicked
        <ul>
            <li>Event detail:
                <ul>
                    <li><code>target</code>: HTMLElement, the clicked icon</li>
                    <li><code>slot</code>: String, the slot the icon was assigned to (either "left-content" or "right-content")</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<h3>Slots</h3>
<ul>
    <li><code>left-content</code>: element appearing on the left side, usually an icon</li>
    <li><code>right-content</code>: element appearing on the right side, usually an icon</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--app-bar-background</code>: background color, default: #999999</li>
    <li><code>--app-bar-font-color</code>:font color, default: #000000</li>
    <li><code>--app-bar-font-size</code>: font size, default: 24px</li>
    <li><code>--app-bar-padding</code>: padding, default: 15px</li>
</ul>


<section class="demo">
    <h3>Demo</h3>
    <material-app-bar label="Title">
        <i class="material-icons" slot="left-content">menu</i>

        <i class="material-icons" slot="right-content">add</i>
        <material-dropdown slot="right-content">
            <i class="material-icons" slot="icon" tabindex="1">more_vert</i>
            <li slot="option">Javascript</li>
            <li slot="option">PHP</li>
            <li slot="option">Java</li>
            <li slot="option">Scala</li>
        </material-dropdown>
    </material-app-bar>
</section>
`;
