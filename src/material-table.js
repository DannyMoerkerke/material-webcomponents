export class MaterialTable extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this._data = [];
    this.sort = [];
    this.sortable = [];
    this.curPage = 1;

    this.css = `
            <style>
                :host {
                    --row-hover-color: #eeeeee;
                    --row-selected-color: #f5f5f5;
                    --checkbox-unchecked-color: #999999;
                    --checkbox-checked-color: #337ab7;
                }
                material-checkbox {
                    --unchecked-color: var(--checkbox-unchecked-color);
                    --checked-color: var(--checkbox-checked-color);
                }
                table {
                    border-spacing: 0;
                    border-radius: 3px;
                    box-shadow: 0 0 1px 1px #cccccc;
                }
                tr {
                    height: 48px;
                }
                tr.selected {
                    background-color: var(--row-selected-color);
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
                    top: 22px;
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
                    background-color: var(--row-hover-color);
                }
                tfoot tr {
                    height: 56px;
                }
                tfoot td div {
                    display: flex;
                }
                .page,
                .prev,
                .next,
                .divider {
                    border: none;
                    border-radius: 2px;
                    min-width: 40px;
                    min-height: 36px;
                    padding-left: 8px;
                    padding-right: 8px;
                    font-size: 1em;
                    color: #000000;
                    background-color: transparent;
                    cursor: pointer;
                    outline: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .page:hover,
                .prev:hover,
                .next:hover, 
                .page[disabled] {
                    transition: background-color 0.3s ease-out;
                    background-color: #e2e2e2;
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
      this.perPage = parseInt(this.getAttribute('per-page'), 10);
      this.curPage = 1;
    }

    this.start = 0;
    this.maxVisiblePages = 5;
    this.selectAll = customElements.get('material-checkbox')
      ? `<material-checkbox class="select-all"></material-checkbox>`
      : `<input type="checkbox" class="select-all">`;

    this.checkBox = customElements.get('material-checkbox')
      ? `<material-checkbox></material-checkbox>`
      : `<input type="checkbox">`;

    this.checkBoxSelector = customElements.get('material-checkbox')
      ? `material-checkbox`
      : `input`;
  }

  handleClick(e) {
    const tbody = this.table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    const findByTagname = tagName => node => node.tagName && node.tagName.toLowerCase() === tagName;
    const getCheckBox = findByTagname(this.checkBoxSelector);
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
            const box = row.querySelector(this.checkBoxSelector);

            if(checkbox.checked) {
              row.classList.add('selected');
            }
            else {
              row.classList.remove('selected');
            }

            box.checked = checkbox.checked;
          });
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
    else if(heading && heading.classList.contains('sortable')) {

      const col = heading.dataset.col;
      const order = heading.classList.contains('asc') ? 1 : -1;

      this.sortData(col, order);
      this.render(this._data);
    }
    else if(button) {
      this.curPage = parseInt(button.dataset.page, 10);
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
                        <th>${this.selectAll}</th>
                         ${this.cols.map(col => `${this.getHeading(col)}`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.slice(this.start, this.end).map(row => `${this.getTableRow(row)}`).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="${this.data.length}">
                            ${this.hasPagination ? this.getPagination(this.curPage) : ``}
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;

    this.setupEventlisteners();
  }

  getPagination(currentPage) {
    const prevPage = currentPage - 1 < 1 ? 1 : currentPage - 1;
    const nextPage = this.numPages < currentPage + 1 ? this.numPages : currentPage + 1;
    const nextPageButton = `<button type="button" class="next" data-page="${nextPage}" ${nextPage === currentPage ? `disabled` : ``}>&gt;</button>`;
    const start = currentPage <= this.maxVisiblePages ? 1 :
      this.numPages - currentPage < this.maxVisiblePages ? (currentPage - this.maxVisiblePages) + 1 :
      currentPage;

    const end = this.numPages <= this.maxVisiblePages ? this.numPages :
      this.maxVisiblePages < currentPage ? Math.min(currentPage, this.numPages) :
      this.maxVisiblePages;

    let pages = `<button type="button" class="prev" data-page="${prevPage}" ${prevPage === currentPage ? `disabled` : ``}>&lt;</button>`;

    if(end === this.numPages) {
      pages = `${pages}<button type="button" class="page" data-page="1" ${currentPage === 1 ? `disabled` : ``}>1</button>`;
    }
    for(let i = start; i <= end; i++) {
      pages = `${pages}<button type="button" class="page" data-page="${i}" ${i === currentPage ? `disabled` : ``}>${i}</button>`;
    }

    if(end < this.numPages) {
      pages = `${pages}<button type="button" class="page" data-page="${this.numPages}" ${this.numPages === currentPage ? `disabled` : ``}>${this.numPages}</button>`;
    }

    return `<div>${pages}${nextPageButton}</div>`;
  }

  getHeading(col) {
    const classes = [];

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
              <td>${this.checkBox}</td>
              ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
          </tr>`;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    if(this.perPage) {
      this.hasPagination = this.perPage < this.data.length;
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

        return colA < colB ? order :
          colA > colB ? -order : 0;
      });

      this.sort = [col, order];
    }
  }
}

if(!customElements.get('material-table')) {
  customElements.define('material-table', MaterialTable);
}
