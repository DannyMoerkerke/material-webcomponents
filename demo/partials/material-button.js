export const template = `<h1>material-button</h1>
<p>
    Material buttons trigger an ink reaction on press. They may display text, imagery, or both. Flat buttons and raised
    buttons are the most commonly used types.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-button label="Confirm"&gt;
        &lt;i class="material-icons" slot="left-icon"&gt;add&lt;/i&gt;
        &lt;i class="material-icons" slot="right-icon"&gt;close&lt;/i&gt;
    &lt;/material-button&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>label</code>: String, label</li>
    <li><code>raised</code>: empty, adds shadow and background color to button to make it appear raised</li>
    <li><code>disabled</code>: empty, disables the button</li>
</ul>

<h3>Properties</h3>
<ul>
    <li><code>disabled</code>: Boolean, disables the button when set to <code>true</code>, enables the button when set 
    to <code>false</code></li>
</ul>


<h3>Slots</h3>
<ul>
    <li><code>left-icon</code>: icon appearing on the left side</li>
    <li><code>right-icon</code>: icon appearing on the right side</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--button-color</code>: background color, default: #e2e2e2</li>
    <li><code>--font-color</code>: font color, default: #000000</li>
</ul>


<section class="demo">
    <h3>Demo</h3>

    <div class="demo-option">
        <em>Standard</em>
        <material-button label="Confirm"></material-button>
    </div>

    <div class="demo-option">
        <em>Raised</em>
        <material-button label="Confirm" raised></material-button>
    </div>

    <div class="demo-option">
        <em>Disabled</em>
        <material-button label="Confirm" raised disabled></material-button>
    </div>

    <div class="demo-option">
        <em>Color</em>
        <material-button id="blue-button" label="Confirm" raised></material-button>
    </div>

    <div class="demo-option">
        <em>left icon</em>
        <material-button label="Add" raised>
            <i class="material-icons" slot="left-icon">add</i>
        </material-button>
    </div>

    <div class="demo-option">
        <em>right icon</em>
        <material-button label="Close" raised>
            <i class="material-icons" slot="right-icon">close</i>
        </material-button>
    </div>

    <div class="demo-option">
        <em>icon, no label</em>
        <material-button raised>
            <i class="material-icons" slot="left-icon">add</i>
        </material-button>
    </div>
</section>`;
