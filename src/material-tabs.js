export class MaterialTabs extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --tabs-background: #999999;
                    --indicator-color: #ffff00;
                    --content-background: #cccccc;
                    --content-width: 0;
                    --content-container-width: 0;
                    display: block;
                    height: 96px;
                }
                #container {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 48px 1fr;
                    height: 96px;
                }
            
                #tab-container {
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                    display: flex;
                    position: relative;
                    background: var(--tabs-background);
                    overflow: auto;
                    max-width: 100vw;
                }
                #tab-content {
                    grid-row: 2 / 3;
                    grid-column: 1 / 2;
                    background: var(--content-background);
                    width: var(--content-width);
                    overflow: hidden;
                }
                #content-container {
                    width: var(--content-container-width);
                    overflow-y: hidden;
                }
                .slide {
                    transition: margin-left .4s cubic-bezier(0, 0.92, 0.32, 0.98);
                }
                ::slotted([slot="tab"]) {
                    padding: 20px;
                    float: left;
                    width: var(--content-width);
                    box-sizing: border-box;
                }
                
                .tab {
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    justify-content: center;
                    min-width: 160px;
                    max-width: 264px;
                    height: 48px;
                    padding-left: 24px;
                    padding-right: 24px;
                    flex-grow: 1;
                    text-transform: uppercase;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }
                #active-indicator {
                    position: absolute;
                    left: var(--indicator-left, 0);
                    bottom: 0;
                    width: var(--indicator-width);
                    border-bottom: 2px solid var(--indicator-color);
                    transition: left .4s cubic-bezier(0, 0.92, 0.32, 0.98);
                }
            </style>
            
            <div id="container">
                <div id="tab-container">
                    <div id="active-indicator"></div>
                </div>
                <div id="tab-content">
                    <div id="content-container">
                        <slot name="tab"></slot>
                    </div>
                </div>
            </div>
        `;
  }

  connectedCallback() {
    this.curIndex = 0;
    this.container = this.shadowRoot.querySelector('#container');
    this.tabContainer = this.shadowRoot.querySelector('#tab-container');
    this.contentContainer = this.shadowRoot.querySelector('#content-container');
    this.tabContent = this.shadowRoot.querySelector('#tab-content');
    this.host = this.tabContainer.getRootNode().host;
    const {left} = this.tabContainer.getBoundingClientRect();
    this.tabContainerLeft = left;
    this.indicator = this.shadowRoot.querySelector('#active-indicator');
    this.contentDivs = this.shadowRoot.querySelector('slot[name="tab"]').assignedNodes();

    this.contentDivs.forEach((contentDiv, index) => {
      const tab = document.createElement('div');
      tab.classList.add('tab');
      tab.dataset.index = index;
      tab.textContent = contentDiv.dataset.title;

      this.tabContainer.insertBefore(tab, this.indicator);
    });

    this.tabs = [...this.shadowRoot.querySelectorAll('.tab')];
    this.tabs[0].classList.add('active');

    const {width} = this.tabs[0].getBoundingClientRect();

    this.indicator.style.setProperty('--indicator-width', `${width}px`);
    this.host.style.setProperty('--content-width', `${this.tabContainer.offsetWidth}px`);
    this.host.style.setProperty('--content-container-width', `${this.tabContainer.offsetWidth * this.tabs.length}px`);

    if(this.hasAttribute('slide')) {
      this.contentContainer.classList.add('slide');
    }

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.tabContainer.addEventListener('click', this.handleClick.bind(this));

    window.addEventListener('resize', () => {
      const {width} = this.shadowRoot.querySelector('.tab').getBoundingClientRect();
      const {left} = this.shadowRoot.querySelector('.active').getBoundingClientRect();

      this.contentContainer.style.marginLeft = `-${this.tabContent.offsetWidth * this.curIndex}px`;
      this.host.style.setProperty('--content-width', `${this.tabContainer.offsetWidth}px`);
      this.host.style.setProperty('--content-container-width', `${this.tabContainer.offsetWidth * this.tabs.length}px`);
      this.indicator.style.setProperty('--indicator-width', `${width}px`);
      this.indicator.style.setProperty('--indicator-left', `${left - this.tabContainerLeft + this.tabContainer.scrollLeft}px`);
    });
  }

  handleClick(e) {
    const tab = e.composedPath().find(el => el.classList.contains('tab'));
    const {left} = tab.getBoundingClientRect();

    this.indicator.style.setProperty('--indicator-left', `${left - this.tabContainerLeft + this.tabContainer.scrollLeft}px`);

    this.tabs.forEach((t, index) => {
      if(t === tab) {
        t.classList.add('active');
        this.contentContainer.style.marginLeft = `${0 - this.tabContent.offsetWidth * index}px`;
        this.curIndex = index;
      }
      else {
        t.classList.remove('active');
      }

    });
  }
}

if(!customElements.get('material-tabs')) {
  customElements.define('material-tabs', MaterialTabs);
}
