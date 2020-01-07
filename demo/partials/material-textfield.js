export const template = `<h1>material-textfield</h1>
<p>
    Text fields allow users to input, edit, and select text.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-textfield type="text"
                        label="Name"
                        error-required="This field is required"&gt;&lt;/material-textfield&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>label</code>: String, label of the field, will serve as placeholder when the field is empty</li>
    <li><code>name</code>: String, name of the field</li>
    <li><code>value</code>: String, value of the field</li>
    <li><code>type</code>: String, type of the field, allowed values are 'text', 'number', 'email', 'password', 'tel'
        and 'url'
    </li>
    <li><code>readonly</code>: empty, makes the field read-only</li>
    <li><code>pattern</code>: Regex, pattern the content of the field must satisfy</li>
    <li><code>minlength</code>: Number, minimal length of the field value</li>
    <li><code>maxlength</code>: Number, maximal length of the field value</li>
    <li><code>error-required</code>: String, error message to display when required field is empty</li>
    <li><code>error-type</code>: String, error message to display when the field value does not match the 'type'
        attribute, applies when
        the 'type' attribute is 'number', 'email' or 'url'
    </li>
    <li><code>error-short</code>: String, error message to display when the the content length of the field is smaller
        than then 'minlength' attribute
    </li>
    <li><code>error-long</code>: String, error message to display when the the content length of the field is greater
        than then 'maxlength' attribute.
        In some browsers the content will prevented to be longer than the 'maxlength' attribute so the error will never
        show
    </li>
</ul>

<h3>Properties</h3>
<ul>
    <li><code>value</code>: String, value of the field</li>
</ul>

<h3>Events</h3>
<ul>
    <li><code>change</code>: fired when the value of the textfield is changed
        <ul>
            <li>Event detail:
                <ul>
                    <li><code>value</code>: String, value of the textfield</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--active-color</code>: color of the bottom bar and label when the field has focus, default: #337ab7</li>
    <li><code>--font-color</code>: font color, default: #000000</li>
    <li><code>--error-color</code>: font color of error message, default: #ff0000</li>
    <li><code>--margin</code>: margin of textfield, default: 2.25rem 0 2.25rem 0</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-textfield type="text"
                        label="Name"
                        error-required="This field is required"></material-textfield>
</section>`;
