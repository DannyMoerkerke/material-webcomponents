export default class MaterialAppBar extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                .material-icons {
                    font-family: 'Material Icons';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;  /* Preferred icon size */
                    display: inline-block;
                    line-height: 1;
                    text-transform: none;
                    letter-spacing: normal;
                    word-wrap: normal;
                    white-space: nowrap;
                    direction: ltr;

                    /* Support for all WebKit browsers. */
                    -webkit-font-smoothing: antialiased;
                    /* Support for Safari and Chrome. */
                    text-rendering: optimizeLegibility;

                    /* Support for Firefox. */
                    -moz-osx-font-smoothing: grayscale;

                    /* Support for IE. */
                    font-feature-settings: 'liga';
                }
                #container {
                    display: grid;
                    grid-template-columns: var(--spacing-left, 15px) 1fr 1fr 1fr var(--spacing-right, 15px);
                    height: 100%;
                    padding-top: var(--spacing-top, 15px);
                    padding-bottom: var(--spacing-bottom, 15px);
                    box-sizing: border-box;
                    background: var(--app-bar-background, #999999);
                    color: var(--app-bar-font-color, #000000);
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
                }
                
                #label {
                    font-size: 24px;
                    display: inline-block;
                    padding: 0 0 0 12px;
                    grid-column: 2 / 3;
                }
                
                ::slotted([slot="left-content"]),
                ::slotted([slot="right-content"]) {
                    cursor: pointer;
                    color: inherit;
                    display: block;
                    padding-top: 1px;
                    padding-bottom: 1px;
                    font-size: 32px !important;
                }
                ::slotted([slot="left-content"]) {
                    margin-right: var(--left-content-spacing, 10px);
                }
                ::slotted([slot="right-content"]) {
                    margin-left: var(--right-content-spacing, 10px);
                }
                .left-content {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
                .left-content,
                .menu-icon {
                    grid-column: 2 / 3;
                }
                .middle-content {
                    grid-column: 3 / 4;
                }
                .right-content {
                    grid-column: 4 / 5;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    position: static;
                }
                .dropdown-menu {
                    display: none;
                    flex-direction: column;
                    grid-column: 1 / 6;
                    width: 100%;
                    position: absolute;
                    top: var(--menu-top);
                    background: var(--app-bar-background, #999999);
                    z-index: 999;
                }
                .dropdown-menu ::slotted([slot="left-content"]),
                .dropdown-menu ::slotted([slot="right-content"]) {
                    margin: 10px;
                }
            </style>
            
            <template id="large">
                <div class="left-content">
                    <slot name="left-content"></slot>
                    <span id="label"></span>
                </div>
                
                <div class="middle-content">
                </div>
                <div class="right-content">
                    <slot name="right-content"></slot>
                </div>
            </template>
            
            <template id="small">
                <i class="material-icons menu-icon">menu</i>
                <div class="dropdown-menu">
                    <slot name="left-content"></slot>
                    <slot name="right-content"></slot>
                </div>
            </template>
            
            <div id="container"></div>
        `;
    }

    connectedCallback() {

        const mq = window.matchMedia('(min-width: 600px)');
        mq.addListener(this.handleResize.bind(this));
        this.handleResize(mq);
    }

    handleResize(mq) {
        this.container = this.shadowRoot.querySelector('#container');
        this.menuOpen = false;

        if(mq.matches) {
            const largeContent = this.shadowRoot.querySelector('#large').content.cloneNode(true);
            this.container.innerHTML = '';
            this.container.appendChild(largeContent);

            setTimeout(() => {
                this.label = this.shadowRoot.querySelector('#label');
                if(this.hasAttribute('label')) {
                    this.label.textContent = this.getAttribute('label');
                }
            });

            this.setupEventHandlers();
        }
        else {
            const smallContent = this.shadowRoot.querySelector('#small').content.cloneNode(true);
            this.container.innerHTML = '';
            this.container.appendChild(smallContent);
            this.setupEventHandlers();

            setTimeout(() => {
                this.dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');

                const {height} = this.container.getBoundingClientRect();
                this.dropdownMenu.style.setProperty('--menu-top', `${height}px`);

                this.shadowRoot.querySelector('.menu-icon').onclick = this.handleMenuClick.bind(this);
            });
        }
    }

    handleMenuClick() {
        this.menuOpen = !this.menuOpen;
        this.dropdownMenu.style.display = this.menuOpen ? 'flex' : 'none';
    }

    handleIconClick({target}) {
            this.dispatchEvent(new CustomEvent('app-bar-clicked', {
            detail: {target}
        }));
    }

    setupEventHandlers() {
        this.shadowRoot.querySelectorAll('[name$="content"]').forEach(icon => {
            icon.addEventListener('click', this.handleIconClick.bind(this));
        });
    }
}

customElements.define('material-app-bar', MaterialAppBar);
