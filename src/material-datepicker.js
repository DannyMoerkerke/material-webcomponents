export default class MaterialDatepicker extends HTMLElement {

    static get observedAttributes() {
        return ['date'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    font-family: Verdana;
                    --first-day-position: 1;
                    --datepicker-color: blue;
                }
                #container {
                    display: grid;
                    grid-template-rows: repeat(10, 1fr);
                    grid-template-columns: repeat(7, 1fr);
                    width: 312px;
                    height: 470px;
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
                    font-size: 0.8em;
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
                    grid-column: 1 / 9;
                    padding: 16px;
                    color: #ffffff;
                    background-color: var(--datepicker-color);
                }
                #main-header p,
                #main-header h1 {
                    margin: 5px 0;
                }
                #main-header h1 {
                    font-size: 1.75em;
                    font-weight: normal;
                }
                #nav {
                    display: grid;
                    grid-template-rows: 1fr;
                    grid-template-columns: repeat(7, 1fr);
                    grid-row: 2 / 3;
                    grid-column: 1 / 9;
                }
                #sub-header {
                    display: grid;
                    grid-row: 3 / 4;
                    grid-column: 1 / 9;
                    grid-template-columns: repeat(7, 1fr);
                }
                #days-container {
                    display: grid;
                    grid-row: 4 / 10;
                    grid-column: 1 / 9;
                    grid-template-rows: repeat(6, 1fr);
                    grid-template-columns: repeat(7, 1fr);
                }
                .day {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-transform: uppercase;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                }
                .active {
                    background-color: var(--datepicker-color);
                    color: white;
                    border-radius: 50%;
                }
                #first-day {
                    grid-column-start: var(--first-day-position);
                }
                
            </style>
            
            <div id="container">
                <header id="main-header">
                    <p></p>
                    <h1></h1>
                </header>
                
                <section id="nav">
                    <div id="prev">&lt;</div>
                    <div id="next">&gt;</div>
                    <div id="current-month-container"></div>
                </section>
                
                <header id="sub-header">
                    <div class="day">s</div>
                    <div class="day">m</div>
                    <div class="day">t</div>
                    <div class="day">w</div>
                    <div class="day">t</div>
                    <div class="day">f</div>
                    <div class="day">s</div>
                </header>
                <section id="days-container">
                </section>
            </div>
        `;
        this.daysContainer = this.shadowRoot.querySelector('#days-container');
        this.host = this.daysContainer.getRootNode().host;
        this.currentMonthContainer = this.shadowRoot.querySelector('#current-month-container');
        this.prev = this.shadowRoot.querySelector('#prev');
        this.next = this.shadowRoot.querySelector('#next');
        this.mainHeader = this.shadowRoot.querySelector('#main-header');
        this.headerYear = this.mainHeader.querySelector('p');
        this.headerDate = this.mainHeader.querySelector('h1');
        this.days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.months = ['Januari','Februari','March','April','May','June','July','August','September','October','November','December'];
    }

    connectedCallback() {
        if(!this.hasAttribute('date')) {
            const date = new Date();
            this.displayMonth(date);
            this.pickDate(date);
        }

        this.prev.addEventListener('click', this.prevMonth.bind(this));
        this.next.addEventListener('click', this.nextMonth.bind(this));
        this.daysContainer.addEventListener('click', this.handleDayClick.bind(this));
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        const newDate = new Date(newVal);

        if(isNaN(Date.parse(newVal))) {
            throw new Error(`"${newVal}" is not a valid date`);
        }

        this.displayMonth(newDate);
        this.pickDate(newDate);
    }

    handleDayClick(e) {
        const target = e.composedPath()[0];

        if(target.classList.contains('day')) {
            const pickedDay = target.dataset.day;
            this.currentDate.setDate(pickedDay);
            this.pickDate(this.currentDate);
        }
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
    }

    nextMonth() {
        this.currentMonth++;

        if(this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
            this.currentDate.setFullYear(this.currentYear);
        }

        this.currentDate.setMonth(this.currentMonth);

        this.displayMonth(this.currentDate);
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
        this.currentMonthContainer.textContent = `${this.months[this.currentMonth]} ${this.currentYear}`;

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

    pickDate(date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const pickedDay = date.getDate();
        const dayNumber = date.getDay();

        this.headerYear.textContent = year;
        this.headerDate.textContent = `${this.days[dayNumber]}, ${this.months[month].substr(0, 3)} ${pickedDay}`;

        this.shadowRoot.querySelectorAll('.day').forEach(day => {
            if(parseInt(day.dataset.day) === pickedDay) {
                day.classList.add('active');
            }
            else {
                day.classList.remove('active');
            }
        });
    }
}

customElements.define('material-datepicker', MaterialDatepicker);
