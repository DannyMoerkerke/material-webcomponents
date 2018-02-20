describe('material-datepicker', () => {
    let element;
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let currentDay = currentDate.getDay();
    let pickedDay = currentDate.getDate();

    beforeEach(function() {
        element = document.createElement('material-datepicker');

        document.body.appendChild(element);
    });

    xit('should display the current month and year', () => {
        expect(element.currentMonthContainer.textContent).to.eql(`${element.months[currentMonth]} ${currentYear}`);
        expect(element.headerYear.textContent).to.eql(currentYear.toString());
        expect(element.headerDate.textContent).to.eql(`${element.days[currentDay]}, ${element.months[currentMonth].substr(0, 3)} ${pickedDay}`);
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

        expect(spy1.args[0][0]).to.eql(newDate);
        expect(spy2.args[0][0]).to.eql(newDate);
    });

    it('should display the previous month', () => {
        const date = new Date(currentDate.toString());
        const prevMonth = currentMonth - 1;
        const spy = sinon.spy(element, 'displayMonth');

        element.prevMonth();
        date.setMonth(prevMonth);

        expect(element.currentMonth).to.eql(prevMonth);
        expect(spy.args[0][0].toString()).to.equal(date.toString());
    });

    it('should go to the previous year when going from the first month of the year to the previous month', () => {
        const dateString = '01-01-2010';

        element.date =  dateString;
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
        // expect(spy.args[0][0].toString()).to.equal(date.toString());
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

        spy.reset();

        element.prevMonth();
        expect(spy.called).to.eql(true);

        spy.reset();

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

        expect(spy.args[0][0]).to.eql(newDate);
    });

    it('should hide the month view and show the years view', () => {
        element.showYearsView();

        expect(element.container.querySelector('#years-view-container')).to.not.eql(null);
        expect(element.container.querySelector('#month-view-container')).to.eql(null);

        expect(element.mainHeader.classList.contains('years-view')).to.eql(true);
        expect(element.mainHeader.classList.contains('month-view')).to.eql(false);
    });
});