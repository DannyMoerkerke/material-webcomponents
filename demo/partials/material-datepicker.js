export const template = `<h1>material-datepicker</h1>
<p>
    A dialog datepicker is used to select a single date. Clicking the date and year in the header will toggle between
    the month view and years view.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-datepicker date="01-01-2010"&gt;&lt;/material-datepicker&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>date</code>: String, an <a href="http://tools.ietf.org/html/rfc2822#section-3.3"
                                         target="_blank">RFC2822</a>
        or (a variant of) ISO 8601 date (default: current date)
    </li>
    <li><code>locale</code>: String, a BCP 47 language tag (default: en-EN)</li>
</ul>

<h3>Properties</h3>
<ul>
    <li><code>date</code>: String, an <a href="http://tools.ietf.org/html/rfc2822#section-3.3"
                                         target="_blank">RFC2822</a>
        or (a variant of) ISO 8601 date (default: current date)
    </li>
</ul>

<h3>Events</h3>
<ul>
    <li><code>close</code>: fired when the "cancel" button is clicked</li>
    <li><code>change</code>: fired when the "ok" button is clicked
        <ul>
            <li>Event detail:
                <ul>
                    <li><code>date</code>: Date, currently selected date</li>
                    <li><code>formattedDate</code>: String, currently selected date, formatted according to
                        <code>locale</code></li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--datepicker-color</code>: color of datepicker header, selected day and year, default: #0000ff</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <p>
        The input below will show a dialog datepicker when clicked.
    </p>
    <material-dialog id="datepicker-dialog">
        <material-datepicker slot="body"></material-datepicker>
    </material-dialog>

    <material-textfield label="Date" readonly></material-textfield>
</section>`;
