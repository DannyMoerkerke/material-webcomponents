import '../src/material-datepicker.js';

describe('material-datepicker', () => {
  let element;
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let currentDay = currentDate.getDay();
  let pickedDay = currentDate.getDate();
  const locale = 'en-EN';

  beforeEach(() => {
    element = document.createElement('material-datepicker');

    document.body.appendChild(element);
  });

  it('should display the current month and year', () => {
    const month = new Intl.DateTimeFormat(locale, {
      month: 'short'
    }).format(currentDate);

    const localDate = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      weekday: 'short',
      month: 'short'
    }).format(currentDate);

    expect(element.currentMonthContainer.textContent).to.eql(`${month} ${currentYear}`);
    expect(element.headerYear.textContent).to.eql(currentYear.toString());
    expect(element.headerDate.textContent).to.eql(`${localDate}`);
  });

  it('should display the correct number of days', () => {
    const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    expect(element.daysContainer.querySelectorAll('.day').length).to.eql(numDays);
  });

  it('should display the new month and date when the "date" property is changed', () => {
    const dateString = '01-27-2010';
    const newDate = new Date(dateString);

    const spy1 = sinon.spy(element, 'displayMonth');
    const spy2 = sinon.spy(element, 'pickDate');

    element.date = dateString;

    expect(spy1.calledWith(newDate)).to.eql(true);
    expect(spy2.calledWith(newDate)).to.eql(true);
  });

  it('should display the previous month', () => {
    const date = new Date(currentDate.toString());
    const prevMonth = currentMonth - 1;
    const spy = sinon.spy(element, 'displayMonth');

    element.prevMonth();
    date.setMonth(prevMonth);

    expect(element.currentMonth).to.eql(prevMonth);
    expect(spy.args[0][0].getMonth()).to.equal(date.getMonth());
  });

  it('should go to the previous year when going from the first month of the year to the previous month', () => {
    const dateString = '01-01-2010';

    element.date = dateString;
    element.prevMonth();

    expect(element.currentMonth).to.eql(11);
    expect(element.currentYear).to.eql(2009);
  });

  it('should display the next month', () => {
    const date = new Date(currentDate.toString());
    const nextMonth = currentMonth + 1;
    const spy = sinon.spy(element, 'displayMonth');

    element.nextMonth();
    date.setMonth(nextMonth);

    expect(element.currentMonth).to.eql(nextMonth);
    expect(spy.args[0][0].getMonth()).to.equal(date.getMonth());
  });

  it('should go to the next year when going from the last month of the year to the next month', () => {
    const dateString = '12-01-2010';

    element.date = dateString;
    element.nextMonth();

    expect(element.currentMonth).to.eql(0);
    expect(element.currentYear).to.eql(2011);
  });

  it('should call "pickDate" to indicate the current day when navigating to the current month', () => {
    const spy = sinon.spy(element, 'pickDate');

    element.nextMonth();
    expect(spy.called).to.eql(false);

    spy.resetHistory();

    element.prevMonth();
    expect(spy.called).to.eql(true);

    spy.restore();

    element.prevMonth();
    element.nextMonth();
    expect(spy.called).to.eql(true);
  });

  it('should pick a clicked date', () => {
    const dateString = '01-01-2010';
    const newDate = new Date('01-27-2010');
    const spy = sinon.spy(element, 'pickDate');
    const day = document.createElement('div');
    day.className = 'day';
    day.dataset.day = '27';

    const event = {
      composedPath() {
        return [day];
      }
    };

    element.setAttribute('date', dateString);
    element.handleDayClick(event);

    expect(spy.calledWith(newDate)).to.eql(true);
  });

  it('should pick a clicked year', () => {
    const year = 2020;
    const div = document.createElement('div');
    div.className = 'year';
    div.dataset.year = year;

    const event = {
      composedPath() {
        return [div];
      }
    };

    const spy1 = sinon.spy(element, 'showMonthView');
    const spy2 = sinon.spy(element, 'displayMonth');
    const spy3 = sinon.spy(element, 'pickDate');

    element.handleYearClick(event);

    expect(element.currentDate.getFullYear()).to.eql(year);
    expect(spy1.called).to.eql(true);
    expect(spy2.calledWith(element.currentDate)).to.eql(true);
    expect(spy3.calledWith(element.currentDate)).to.eql(true);
  });

  it('should dispatch an event containing the picked date', () => {
    const formattedDate = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(currentDate);

    const expected = new CustomEvent('change', {
      detail: {
        date: currentDate,
        formattedDate
      }
    });

    const spy1 = sinon.spy(element, 'dispatchEvent');

    element.handleOkClick();

    expect(spy1.calledWith(expected)).to.eql(true);
  });

  it('should dispatch an event when the datepicker is closed', () => {
    const spy1 = sinon.spy(element, 'dispatchEvent');
    const expected = new CustomEvent('close');

    element.handleCancelClick();

    expect(spy1.calledWith(expected)).to.eql(true);
  });


  it('should hide the month view and show the years view', () => {
    element.showYearsView();

    expect(element.container.querySelector('#years-view-container')).to.not.eql(null);
    expect(element.container.querySelector('#month-view-container')).to.eql(null);

    expect(element.mainHeader.classList.contains('years-view')).to.eql(true);
    expect(element.mainHeader.classList.contains('month-view')).to.eql(false);
  });

  it('should return a correctly formatted date', () => {
    const expected = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(currentDate);

    const actual = element.formatDate(currentDate);

    expect(actual).to.eql(expected);
  });

  it('should only pick the current date when the current month is displayed', () => {
    const spy1 = sinon.spy(element, 'showMonthView');
    const spy2 = sinon.spy(element, 'displayMonth');
    const spy3 = sinon.spy(element, 'pickDate');

    const dateString = '01-27-2010';

    element.showCurrentMonth();

    expect(spy1.called).to.eql(true);
    expect(spy2.called).to.eql(true);
    expect(spy3.called).to.eql(true);
  });

  it('should not pick the current date when the current month is not displayed', () => {
    const dateString = '01-27-2010';
    element.date = dateString;

    const spy1 = sinon.spy(element, 'showMonthView');
    const spy2 = sinon.spy(element, 'displayMonth');
    const spy3 = sinon.spy(element, 'pickDate');

    element.showCurrentMonth();

    expect(spy1.called).to.eql(true);
    expect(spy2.called).to.eql(true);
    expect(spy3.called).to.eql(false);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
