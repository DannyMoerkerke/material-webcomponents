import '../src/material-table.js';
import '../src/material-checkbox.js';

describe('material-table', () => {

  let element;
  let data;

  const sortData = (col, order) => {
    data.sort((a, b) => {
      const colA = typeof a[col] === 'string' ? a[col].toLowerCase() : a[col];
      const colB = typeof b[col] === 'string' ? b[col].toLowerCase() : b[col];

      return colA < colB ? order :
        colA > colB ? -order : 0;
    });
  };

  beforeEach(() => {
    element = document.createElement('material-table');
    document.body.appendChild(element);

    data = [
      {
        id: 1,
        language: 'Javascript',
        scope: 'Frontend'
      },
      {
        id: 2,
        language: 'PHP',
        scope: 'Backend'
      },
      {
        id: 3,
        language: 'Scala',
        scope: 'Backend'
      },
      {
        id: 4,
        language: 'CSS',
        scope: 'Frontend'
      }
    ];
  });

  it('should set sortable columns and sort order via attributes', () => {
    document.body.removeChild(element);

    element.setAttribute('sortable', 'language scope');
    element.setAttribute('sort', 'language asc');

    document.body.appendChild(element);

    expect(element.sortable).to.eql(['language', 'scope']);
    expect(element.sort).to.eql(['language', -1]);
  });

  it('should call the render method with the data when it is set', () => {
    const spy = sinon.spy(element, 'render');
    element.data = data;

    expect(spy.args[0][0]).to.eql(data);
  });

  it('should set the object keys as columns', () => {
    const cols = Object.keys(data[0]);
    element.data = data;

    expect(element.cols).to.eql(cols);
  });

  it('should sort the data by the "language" column', () => {
    element.sortable = 'language';
    element.sort = ['language', -1];
    element.data = data;

    sortData('language', -1);

    expect(element._data).to.eql(data);
  });

  it('should NOT sort the data by the "language" column when it is not set as sortable', () => {
    element.sort = ['language', -1];
    element.data = data;

    expect(element._data).to.eql(data);
  });

  it('should render the data', () => {
    element.data = data;

    let rows = element.shadowRoot.querySelector('tbody').querySelectorAll('tr');

    expect(rows.length).to.eql(data.length);

    data.forEach((dataRow, index) => {
      expect(rows[index].querySelectorAll('td')[2].textContent).to.eql(dataRow.language);
    });
  });

  it('should paginate the data', () => {
    element.perPage = 2;
    element.data = data;

    let rows = element.shadowRoot.querySelector('tbody').querySelectorAll('tr');

    expect(rows.length).to.eql(2);
    expect(rows[0].querySelectorAll('td')[2].textContent).to.eql(data[0].language);
    expect(rows[1].querySelectorAll('td')[2].textContent).to.eql(data[1].language);

    element.curPage = 2;
    element.data = data;

    rows = element.shadowRoot.querySelector('tbody').querySelectorAll('tr');

    expect(rows[0].querySelectorAll('td')[2].textContent).to.eql(data[2].language);
    expect(rows[1].querySelectorAll('td')[2].textContent).to.eql(data[3].language);
  });

  it('should display the correct range when a pagination button is clicked', () => {
    element.perPage = 2;
    element.data = data;

    const button = document.createElement('button');
    button.dataset.page = 2;

    const event = {
      composedPath: () => [button]
    };

    element.handleClick(event);

    expect(element.start).to.eql(2);
    expect(element.end).to.eql(4);
  });

  it('should check all row checkboxes by clicking the "check-all" checkbox', (done) => {
    element.data = data;

    let rows = element.shadowRoot.querySelector('tbody').querySelectorAll('tr');
    const checkAll = document.createElement('material-checkbox');
    checkAll.className = 'select-all';
    checkAll.checked = true;

    const event = {
      composedPath: () => [checkAll]
    };

    element.handleClick(event);

    setTimeout(() => {
      const allChecked = [...rows].every(row => row.querySelector('material-checkbox').checked);

      expect(allChecked).to.eql(true);
      done();
    });
  });

  it('should toggle the class "selected" of a row when its checkbox is clicked', done => {
    element.data = data;

    const row = element.shadowRoot.querySelector('tbody').querySelectorAll('tr')[0];

    const checkBox = row.querySelector('material-checkbox');

    const event = {
      composedPath: () => [checkBox]
    };

    element.handleClick(event);

    setTimeout(() => {
      expect(row.classList.contains('selected')).to.eql(true);
      element.handleClick(event);

      setTimeout(() => {
        expect(row.classList.contains('selected')).to.eql(false);
        done();
      });
    });
  });

  it('should sort the data by the heading when it is clicked', () => {
    element.data = data;

    const heading = document.createElement('th');
    heading.classList.add('sortable');
    heading.dataset.col = 'language';

    const spy = sinon.spy(element, 'sortData');

    const event = {
      composedPath: () => [heading]
    };

    element.handleClick(event);

    expect(spy.args[0]).to.eql(['language', -1]);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
