export const template = `<h1>material-checkbox</h1>
<p>
    Checkboxes allow the user to select multiple options from a set.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-checkbox label="Subscribe"&gt;&lt;/material-checkbox&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>label</code>: String, label on the right side of the checkbox</li>
    <li><code>value</code>: String, value of the radiobutton</li>
    <li><code>checked</code>: empty, setting this attribute will check the checkbox</li>
</ul>

<h3>Properties</h3>
<ul>
    <li><code>value</code>: String, value of the checkbox</li>
    <li><code>checked</code>: Boolean, checks the checkbox when set to <code>true</code>, unchecks the button when set 
    to <code>false</code></li>
</ul>

<h3>Events</h3>
<ul>
    <li><code>change</code>: fired when the checkbox is clicked
        <ul>
            <li>Event detail:
                <ul>
                    <li><code>checked</code>: Bool, <code>true</code> when checked, <code>false</code> when unchecked</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<em>* Note that a <code>click</code> event handler can also be attached to check the <code>checked</code> property of the checkbox, 
but when doing so, the code inside the event handler which checks this property must be wrapped inside a <code>setTimeout</code> since 
there is a small delay before the property is set. Therefore it is preferred to use the <code>change</code> event.</em>

<h3>Styling</h3>
<ul>
    <li><code>--unchecked-color</code>: color of checkbox when not checked, default: #999999</li>
    <li><code>--checked-color</code>: color of checkbox when checked, default: #337ab7</li>
    <li><code>--label-color</code>: color of label, default: #333333</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-checkbox label="Subscribe" value="subscribe"></material-checkbox>
</section>
`;
