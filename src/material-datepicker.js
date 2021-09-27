export class MaterialDatepicker extends HTMLElement {

  static get observedAttributes() {
    return ['date', 'locale'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --datepicker-color: #0000ff;
                    --first-day-position: 1;
                    display: block;
                }
                #datepicker-container {
                    display: grid;
                    grid-template-rows: 100px 1fr 1fr 40px;
                    grid-template-columns: 1fr;
                    width: 312px;
                    height: 444px;
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
                    font-size: 0.8em;
                }
                
                #month-view-container {
                    display: grid;
                    grid-template-rows: 50px 50px 1fr;
                    grid-template-columns: 1fr;
                    grid-row: 2 / 3;
                    grid-column: 1 / 2;
                    background: #ffffff;
                }
                #prev,
                #next,
                #current-month-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                #prev {
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                }
                #next {
                    grid-row: 1 / 2;
                    grid-column: 7 / 8;
                }
                #current-month-container {
                    grid-row: 1 / 2;
                    grid-column: 2 / 7;
                }
                #main-header {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                    padding: 16px;
                    color: #ffffff;
                    background-color: var(--datepicker-color);
                    box-sizing: border-box;
                }
                #main-header p,
                #main-header h1 {
                    margin: 5px 0;
                    opacity: 0.7;
                    cursor: pointer;
                }
                #main-header h1 {
                    font-size: 1.75em;
                    font-weight: normal;
                }
                #main-header.month-view h1,
                #main-header.years-view p {
                    opacity: 1;
                }
                #nav {
                    display: grid;
                    grid-template-rows: 1fr;
                    grid-template-columns: repeat(7, 1fr);
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                }
                #sub-header {
                    display: grid;
                    grid-row: 2 / 3;
                    grid-column: 1 / 2;
                    grid-template-columns: repeat(7, 1fr);
                }
                #days-container {
                    display: grid;
                    grid-row: 3 / 4;
                    grid-column: 1 / 2;
                    grid-template-rows: repeat(6, 1fr);
                    grid-template-columns: repeat(7, 1fr);
                    background: #ffffff;
                }
                #years-view-container {
                    grid-row: 2 / 3;
                    grid-column: 1 / 2;
                    overflow-y: auto;
                    height: 304px;
                    background: #ffffff;
                }
                .year {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    width: 100%;
                    height: 40px;
                }
                .year.current {
                    font-size: 1.8em;
                    color: var(--datepicker-color);
                }
                .day {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-transform: uppercase;
                    cursor: pointer;
                    width: 34px;
                    height: 34px;
                    margin: 0 auto;
                }
                .day.active {
                    background-color: var(--datepicker-color);
                    color: #ffffff;
                    border-radius: 50%;
                }
                #first-day {
                    grid-column-start: var(--first-day-position);
                }
                #buttons-container {
                    grid-column: 1 / 2;
                    grid-row: 4 / 5;
                    display: flex;
                    justify-content: flex-end;
                    background: #ffffff;
                }
                button {
                    border: none;
                    background-color: transparent;
                    font-size: 1em;
                    text-transform: uppercase;
                    padding-left: 1.2em;
                    padding-right: 1.2em;
                    margin-right: 8px;
                    height: 85%;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #cccccc;
                    transition: background-color 0.4s ease-out;
                }
                button:focus {
                    outline: none;
                }
                
                @media (max-width: 750px) and (orientation: landscape) {
                    #datepicker-container {
                        grid-template-columns: 150px 1fr;
                        grid-template-rows: 1fr 40px;
                        width: 444px;
                        height: 344px;
                    }               
                    #main-header {
                        grid-row: 1 / 3;
                        justify-content: flex-start;
                    }
                    #month-view-container,
                    #years-view-container {
                        grid-row: 1 / 2;
                        grid-column: 2 / 3;
                    }    
                    #buttons-container {
                        grid-column: 2 / 3;
                        grid-row: 2 / 3; 
                    }
                }
                
            </style>
            
            <template id="month-view">
                <section id="month-view-container">
                    <section id="nav">
                        <div id="prev">&lt;</div>
                        <div id="next">&gt;</div>
                        <div id="current-month-container"></div>
                    </section>
                    
                    <header id="sub-header"></header>
                    
                    <section id="days-container"></section>
                </section>
            </template>
            
            <template id="years-view">
                <section id="years-view-container"></section>
            </template>
            
            <div id="datepicker-container">
                <header id="main-header">
                    <p></p>
                    <h1></h1>
                </header>
                
                <section id="buttons-container">
                    <button type="button" id="cancel">Cancel</button>
                    <button type="button" id="ok">Ok</button>
                </section>
            </div>
        `;

    this.container = this.shadowRoot.querySelector('#datepicker-container');
    this.buttonsContainer = this.shadowRoot.querySelector('#buttons-container');
    this.mainHeader = this.shadowRoot.querySelector('#main-header');

    this.headerYear = this.mainHeader.querySelector('p');
    this.headerDate = this.mainHeader.querySelector('h1');
    this.cancelButton = this.shadowRoot.querySelector('#cancel');
    this.okButton = this.shadowRoot.querySelector('#ok');

    this.okButton.addEventListener('click', this.handleOkClick.bind(this));
    this.cancelButton.addEventListener('click', this.handleCancelClick.bind(this));
    this.headerYear.addEventListener('click', this.showYearsView.bind(this));
    this.headerDate.addEventListener('click', this.showCurrentMonth.bind(this));

    this.locale = 'en-EN';
  }

  connectedCallback() {
    this.days = this.getShortDays();
    this.daysFragment = document.createDocumentFragment();

    this.days.forEach(dayObj => {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = dayObj.narrow;
      this.daysFragment.appendChild(day);
    });

    if(!this.currentDate) {
      this.currentDate = new Date();
    }

    this.showMonthView();
    this.displayMonth(this.currentDate);
    this.pickDate(this.currentDate);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if(attr === 'date') {
      const newDate = new Date(newVal);

      if(isNaN(Date.parse(newVal))) {
        throw new Error(`"${newVal}" is not a valid date`);
      }

      this.currentDate = newDate;
    }

    if(attr === 'locale') {
      this.locale = newVal;
    }
  }

  set date(date) {
    this.currentDate = date instanceof Date ? date : new Date(date);
    
    this.showMonthView();
    this.displayMonth(this.currentDate);
    this.pickDate(this.currentDate);
  }

  showCurrentMonth() {
    this.showMonthView();
    this.displayMonth(this.currentDate);

    if(new Date().getMonth() === this.currentMonth) {
      this.pickDate(this.currentDate);
    }
  }

  showMonthView() {
    if(this.shadowRoot.querySelector('#month-view-container')) {
      return;
    }
    this.monthView = this.shadowRoot.querySelector('#month-view').content.cloneNode(true);

    if(this.shadowRoot.querySelector('#years-view-container')) {
      this.container.removeChild(this.yearsViewContainer);
    }
    this.container.insertBefore(this.monthView, this.buttonsContainer);

    this.subHeader = this.shadowRoot.querySelector('#sub-header');
    this.subHeader.appendChild(this.daysFragment);

    this.monthViewContainer = this.monthView = this.shadowRoot.querySelector('#month-view-container');
    this.daysContainer = this.shadowRoot.querySelector('#days-container');
    this.host = this.daysContainer.getRootNode().host;
    this.currentMonthContainer = this.shadowRoot.querySelector('#current-month-container');
    this.prev = this.shadowRoot.querySelector('#prev');
    this.next = this.shadowRoot.querySelector('#next');
    this.mainHeader.classList.add('month-view');
    this.mainHeader.classList.remove('years-view');

    this.prev.addEventListener('click', this.prevMonth.bind(this));
    this.next.addEventListener('click', this.nextMonth.bind(this));
    this.daysContainer.addEventListener('click', this.handleDayClick.bind(this));
  }

  showYearsView() {
    if(this.shadowRoot.querySelector('#years-view-container')) {
      return;
    }
    this.yearsView = this.shadowRoot.querySelector('#years-view').content.cloneNode(true);

    if(this.shadowRoot.querySelector('#month-view-container')) {
      this.container.removeChild(this.monthViewContainer);
    }
    this.container.insertBefore(this.yearsView, this.buttonsContainer);

    const range = 50;
    const startYear = this.currentYear - range;
    const endYear = this.currentYear + range;

    this.yearsViewContainer = this.shadowRoot.querySelector('#years-view-container');

    for(let y = startYear; y <= endYear; y++) {
      const year = document.createElement('div');
      year.dataset.year = y;
      year.textContent = y;
      year.classList.add('year');

      if(y === this.currentYear) {
        year.classList.add('current');
      }

      this.yearsViewContainer.appendChild(year);
    }

    const currentYear = this.shadowRoot.querySelector('.current');
    const offset = currentYear.offsetTop;

    this.yearsViewContainer.scrollTop = offset - this.yearsViewContainer.offsetTop - (this.yearsViewContainer.offsetHeight / 2) + (currentYear.offsetHeight / 2);

    this.mainHeader.classList.add('years-view');
    this.mainHeader.classList.remove('month-view');

    this.yearsViewContainer.addEventListener('click', this.handleYearClick.bind(this));
  }

  handleDayClick(e) {
    const target = e.composedPath()[0];

    if(target.classList.contains('day')) {
      const pickedDay = target.dataset.day;
      this.currentDate.setDate(pickedDay);
      this.pickDate(this.currentDate);
    }
  }

  handleYearClick(e) {
    const target = e.composedPath()[0];

    if(target.classList.contains('year')) {
      const pickedYear = target.dataset.year;
      this.currentDate.setFullYear(pickedYear);
      this.showMonthView();
      this.displayMonth(this.currentDate);
      this.pickDate(this.currentDate);
    }
  }

  handleCancelClick() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  handleOkClick() {
    const formattedDate = this.formatDate(this.currentDate);

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        date: this.currentDate,
        formattedDate
      }
    }));
  }

  formatDate(date) {
    return new Intl.DateTimeFormat(this.locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  prevMonth() {
    this.currentMonth--;

    if(this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
      this.currentDate.setFullYear(this.currentYear);
    }

    this.currentDate.setMonth(this.currentMonth);

    this.displayMonth(this.currentDate);

    if(new Date().getMonth() === this.currentMonth) {
      this.pickDate(this.currentDate);
    }
  }

  nextMonth() {
    this.currentMonth++;
    const endMonth = 11;

    if(this.currentMonth > endMonth) {
      this.currentMonth = 0;
      this.currentYear++;
      this.currentDate.setFullYear(this.currentYear);
    }

    this.currentDate.setMonth(this.currentMonth);

    this.displayMonth(this.currentDate);

    if(new Date().getMonth() === this.currentMonth) {
      this.pickDate(this.currentDate);
    }
  }

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  displayMonth(date) {
    this.currentDate = date;
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDay = this.getDaysInMonth(this.currentYear, this.currentMonth);

    this.host.style.setProperty('--first-day-position', (firstDay + 1));
    this.currentMonthContainer.textContent = `${this.getMonthName(this.currentDate)} ${this.currentYear}`;

    this.daysContainer.innerHTML = '';

    for(let d = 1; d <= lastDay; d++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.dataset.day = d;
      day.textContent = d;

      if(d === 1) {
        day.id = 'first-day';
      }

      this.daysContainer.appendChild(day);
    }
  }

  getMonthName(date) {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'short'
    }).format(date);
  }

  getShortDays() {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay());

    const days = [];
    const start = date.getDate();
    const endDay = 6;

    for(let i = 0; i <= endDay; i++) {
      date.setDate(start + i);

      const narrow = new Intl.DateTimeFormat(this.locale, {weekday: 'narrow'}).format(date);
      const short = new Intl.DateTimeFormat(this.locale, {weekday: 'short'}).format(date);

      days.push({short, narrow});
    }

    return days;
  }

  pickDate(date) {
    const year = date.getFullYear();
    const pickedDay = date.getDate();

    this.headerYear.textContent = year;
    this.headerDate.textContent = this.getLocalDate(date);

    this.shadowRoot.querySelectorAll('.day').forEach(day => {
      if(parseInt(day.dataset.day, 10) === pickedDay) {
        day.classList.add('active');
      }
      else {
        day.classList.remove('active');
      }
    });
  }

  getLocalDate(date) {
    return new Intl.DateTimeFormat(this.locale, {
      day: 'numeric',
      weekday: 'short',
      month: 'short'
    }).format(date);
  }
}

if(!customElements.get('material-datepicker')) {
  customElements.define('material-datepicker', MaterialDatepicker);
}
