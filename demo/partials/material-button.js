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
    <li><code>circle</code>: empty, makes button circular, should be used with only an icon</li>
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
    <li><code>toggle-icon</code>: icon appearing on the left side when <code>toggled=true</code>,
     will hide <code>left-icon</code> when <code>toggled=true</code></li>
    <li><code>right-icon</code>: icon appearing on the right side</li>
    <li><code>file-input</code>: file input field which will be hidden to make it appear as a button</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--button-color</code>: background color, default: transparent, when <code>raised</code> default: #e2e2e2</li>
    <li><code>--button-color-hover</code>: background color on hover, default: #e2e2e2</li>
    <li><code>--font-color</code>: font color, default: #000000</li>
    <li><code>--font-size</code>: font size, default: 1em</li>
    <li><code>--icon-size</code>: icon size, default: 24px</li>
    <li><code>--button-padding</code>: padding of button, default: 0px 8px 0px 8px</li>
    <li><code>--button-padding-circle</code>: padding of circular button (when attribute <code>circle</code> is added), default: 8px</li>
    <li><code>--border-radius</code>: button border radius, default: 2px</li>
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
    
    <div class="demo-option">
        <em>toggle icon</em>
        <material-button raised>
            <i class="material-icons" slot="left-icon">videocam</i>
            <i class="material-icons" slot="toggle-icon">videocam_off</i>
        </material-button>
    </div>

</section>`;
