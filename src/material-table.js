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
        this.curPage = 1;

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
                thead tr {
                    height: 64px;
                }
                thead tr:first-child {
                    border-radius: 3px;
                }
                thead tr:first-child th {
                    border: none;
                }
                thead th.sortable {
                    position: relative;
                    cursor: pointer;
                }
                thead th.sortable:not(:first-child):hover:before {
                    content: '\\2195';
                    position: absolute;
                    top: 19px;
                    left: -12px;
                }
                
                thead th.sortable.asc:not(:first-child):before {
                    content: '\\2193';
                    position: absolute;
                    top: 22px;
                    left: -12px;
                }
                
                thead th.sortable.desc:not(:first-child):before {
                    content: '\\2191';
                    position: absolute;
                    top: 22px;
                    left: -12px;
                }
                
                thead th,
                tbody td {
                    text-align: left;
                    font-weight: normal;
                    padding-right: 56px;
                }
                thead th:first-child,
                tbody td:first-child,
                tfoot td:first-child {
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
                tfoot tr {
                    height: 56px;
                }
                tfoot td div {
                    display: flex;
                }
                button {
                    cursor: pointer;
                }
            </style>
        `;

    }

    connectedCallback() {
        if(this.hasAttribute('sortable')) {
            this.sortable = this.getAttribute('sortable').split(' ');
        }

        if(this.hasAttribute('sort')) {
            const tmp = this.getAttribute('sort').split(' ');

            if(['asc', 'desc'].includes(tmp[1])) {
                const sort = tmp[1] === 'asc' ? -1 : 1;
                this.sort = [tmp[0], sort];
            }
        }

        if(this.hasAttribute('per-page')) {
            this.perPage = parseInt(this.getAttribute('per-page'));
            this.curPage = 1;
        }

        this.start = 0;
    }

    handleClick(e) {
        const tbody = this.table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        const findByTagname = tagName => node => node.tagName && node.tagName.toLowerCase() === tagName;
        const getCheckBox = findByTagname('material-checkbox');
        const getHeading = findByTagname('th');
        const getButton = findByTagname('button');

        const nodes = e.composedPath();
        const checkbox = nodes.find(getCheckBox);
        const heading = nodes.find(getHeading);
        const button = nodes.find(getButton);

        if(checkbox) {
            setTimeout(() => {
                if(checkbox.classList.contains('select-all')) {
                    rows.forEach(row => {
                        const box = row.querySelector('material-checkbox');

                        if(checkbox.checked) {
                            row.classList.add('selected');
                        }
                        else {
                            row.classList.remove('selected');
                        }

                        box.checked = checkbox.checked;
                    })
                }
                else {
                    let target = checkbox;

                    while(target.parentNode) {
                        if(target.tagName.toLowerCase() === 'tr') {
                            target.classList.toggle('selected');

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

                this.sortData(col, order);
                this.render(this._data);
            }
        }
        else if(button) {
            this.curPage = parseInt(button.dataset.page);
            this.start = (this.curPage - 1) * this.perPage;
            this.end = this.start + this.perPage;

            this.render(this._data);
        }
    }

    setupEventlisteners() {
        this.table = this.shadowRoot.querySelector('table');
        this.table.addEventListener('click', this.handleClick.bind(this));
    }

    render(data) {
        this.cols = Object.keys(data[0]);

        this.shadowRoot.innerHTML = `
           ${this.css}
            <table>
                <thead>
                    <tr>
                        <th><material-checkbox class="select-all"></material-checkbox></th>
                         ${this.cols.map(col => `${this.getHeading(col)}`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.slice(this.start, this.end).map(row => `${this.getTableRow(row)}`).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        ${this.getPagination(this.curPage)}
                    </tr>
                </tfoot>
            </table>
        `;

        this.setupEventlisteners();
    }

    getPagination(currentPage) {
        let pages = ``;

        for(let i = 1; i <= this.numPages; i++) {
            pages = `${pages}<button type="button" class="page" data-page="${i}" ${i === currentPage ? `disabled` : ``}>${i}</button>`;
        }

        return `
            <td colspan="${this.data.length}">
                <div>${pages}</div>
            </td>
        `;
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

        return `<th ${classes.length ? `class="${classes.join(' ')}"` : ``} data-col="${col}">${col}</th>`;
    }

    getTableRow(row) {
        return `<tr>
                    <td><material-checkbox></material-checkbox></td>
                    ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
                </tr>`;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
        if(this.perPage) {
            this.numPages = data.length / this.perPage;
            this.start = (this.curPage - 1) * this.perPage;
            this.end = this.start + this.perPage;
        }
        else {
            this.end = this.data.length;
        }

        if(this.sort.length) {
            this.sortData(...this.sort);
        }
        this.render(this._data);
    }

    sortData(col, order) {
        if(this.sortable.includes(col)) {
            this._data.sort((a, b) => {
                const colA = typeof a[col] === 'string' ? a[col].toLowerCase() : a[col];
                const colB = typeof b[col] === 'string' ? b[col].toLowerCase() : b[col];

                return colA < colB
                    ? order
                    : colA > colB
                    ? -order
                    : 0;
            });

            this.sort = [col, order];
        }
    }
}

customElements.define('material-table', MaterialTable);
