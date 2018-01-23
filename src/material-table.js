import './material-checkbox.js';

export default class MaterialTable extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        this._data = [];
        this.sort = [];
        this.sortable = [];

        this.css = `
            <style>
                table {
                    border-spacing: 0;
                    border-radius: 3px;
                    box-shadow: 0 0 1px 1px #CCCCCC;
                }
                tr {
                    height: 48px;
                }
                tr.selected {
                    background-color: #f5f5f5;
                }
                th, td {
                    border-top: 1px solid #cccccc;
                }
                td:last-of-type,
                th:last-of-type {
                    padding-right: 24px;
                }
                thead {
                    height: 64px;
                }
                thead tr:first-child {
                    border-radius: 3px;
                }
                thead tr:first-child th {
                    border: none;
                }
                thead th {
                    position: relative;
                }
                thead th:not(:first-child):hover:before {
                    content: '\\2195';
                    position: absolute;
                    top: 11px;
                    left: -12px;
                }
                
                thead th.asc:not(:first-child):hover:before {
                    content: '\\2193';
                    top: 14px;
                }
                
                thead th.desc:not(:first-child):hover:before {
                    content: '\\2191';
                    top: 14px;
                }
                
                thead th,
                tbody td {
                    text-align: left;
                    font-weight: normal;
                    padding-right: 56px;
                }
                thead th:first-child,
                tbody td:first-child {
                    padding-left: 24px;
                    padding-right: 24px;
                }
                thead th:nth-child(2),
                thead th:last-child,
                tbody td:nth-child(2),
                tbody td:last-child {
                    padding-left: 0;
                    padding-right: 24px;
                }
                tbody tr:not(.selected):hover {
                    background-color: #eeeeee;
                }
                tfoot {
                    height: 56px;
                }
            </style>
        `;
    }

    connectedCallback() {
        if(this.hasAttribute('sortable')) {
            this.sortable = this.getAttribute('sortable').split(' ');
        }
        if(this.hasAttribute('sort')) {
            this.sort = this.getAttribute('sort').split(' ');
        }

    }

    attributeChangedCallback(attr, oldVal, newVal) {
    }

    set data(data) {
        this._data = data;

        if(this.sort.length) {
            this.sortData(...this.sort);
        }
        this.render(this._data);
    }

    get data() {
        return this._data;
    }
    
    render(data) {
        const cols = Object.keys(data[0]);

        this.shadowRoot.innerHTML = `
           ${this.css}
            <table>
                <thead>
                    <tr>
                        <th><material-checkbox class="select-all"></material-checkbox></th>
                         ${cols.reduce((acc, col) => `${acc}${this.getHeading(col)}`, ``)}
                    </tr>
                </thead>
                <tbody>
                    ${data.reduce((acc, row) => `${acc}${this.getTableRow(row)}`, ``)}
                </tbody>
                <tfoot>
                
                </tfoot>
            </table>
        `;

        this.setupEventlisteners();
    }

    getHeading(col) {
        let classes = [];

        if(this.sortable.includes(col)) {
            classes.push('sortable');
        }
        if(this.sort.includes(col)) {
            const sortClass = this.sort[1] === -1 ? 'asc' : 'desc';
            classes.push(sortClass);
        }

        const className = classes.join(' ');

        return `<th class="${className}" data-col="${col}">${col}</th>`;
    }

    setupEventlisteners() {
        const table = this.shadowRoot.querySelector('table');
        const tbody = table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        const findByTagname = tagName => node => node.tagName && node.tagName.toLowerCase() === tagName;
        const getCheckBox = findByTagname('material-checkbox');
        const getHeading = findByTagname('th');

        table.addEventListener('click', e => {
            const nodes = e.composedPath();
            const checkbox = nodes.find(getCheckBox);
            const heading = nodes.find(getHeading);

            if(checkbox) {
                setTimeout(() => {
                    if(checkbox.classList.contains('select-all')) {
                        rows.forEach(row => {
                            const box = row.querySelector('material-checkbox');

                            if(checkbox.checked) {
                                row.classList.add('selected');
                                box.checked = true;
                            }
                            else {
                                row.classList.remove('selected');
                                box.checked = false;
                            }
                        })
                    }
                    else {
                        let target = checkbox;

                        while(target.parentNode) {
                            if(target.tagName.toLowerCase() === 'tr') {
                                if(checkbox.checked) {
                                    target.classList.add('selected');
                                }
                                else {
                                    target.classList.remove('selected');
                                }

                                break;
                            }
                            target = target.parentNode;
                        }
                    }
                });
            }
            else if(heading) {
                if(heading.classList.contains('sortable')) {
                    const col = heading.dataset.col;
                    const order = heading.classList.contains('asc') ? 1 : -1;

                    // this.sort = [col, order];
                    this.sortData(col, order);
                    this.render(this._data);
                }
            }
        })
    }

    sortData(col, order) {
        this._data.sort((a, b) => {
            const colA = typeof a[col] === 'string' ? a[col].toLowerCase() : a[col];
            const colB = typeof b[col] === 'string' ? b[col].toLowerCase() : b[col];

            if(colA < colB) {
                return order;
            }
            if(colA > colB) {
                return -order;
            }

            return 0;
        });

        // this.data = this._data;

        this.sort = [col, order];
    }

    getTableRow(row) {
        return `<tr><td><material-checkbox></material-checkbox></td>${Object.values(row).reduce((acc, val) => `${acc}<td>${val}</td>`, ``)}</tr>`;
    }
}

customElements.define('material-table', MaterialTable);
