import './material-checkbox.js';

export default class MaterialTable extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

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

        shadowRoot.innerHTML = `
            <style>
                
            </style>
        `;
    }

    connectedCallback() {
        
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        
    }

    set data(data) {
        this.render(data);
    }
    
    render(data) {
        const cols = Object.keys(data[0]);

        this.shadowRoot.innerHTML = `
           ${this.css}
            <table>
                <thead>
                    <tr>
                        <th><material-checkbox class="select-all"></material-checkbox></th>
                         ${cols.reduce((acc, col) => `${acc}<th>${col}</th>`, ``)}
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

    setupEventlisteners() {
        const table = this.shadowRoot.querySelector('table');
        const tbody = table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        table.addEventListener('click', e => {
            const nodes = e.composedPath();
            const checkbox = nodes.find(node => node.tagName && node.tagName.toLowerCase() === 'material-checkbox');

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
        })
    }

    getTableRow(row) {
        return `<tr><td><material-checkbox></material-checkbox></td>${Object.values(row).reduce((acc, val) => `${acc}<td>${val}</td>`, ``)}</tr>`;
    }
}

customElements.define('material-table', MaterialTable);
