export default class AppBar extends HTMLElement {

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
                    background: var(--app-bar-background, #999999);
                    color: var(--app-bar-font-color, #000000);
                }
                
                ::slotted([slot="left-content"]),
                ::slotted([slot="right-content"]) {
                    cursor: pointer;
                    color: inherit;
                    display: block;
                }
                ::slotted([slot="left-content"]) {
                    margin-right: var(--left-content-spacing, 10px);
                }
                ::slotted([slot="right-content"]) {
                    margin-left: var(--right-content-spacing, 10px);
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
                </div>
                <div class="middle-content">
                    <slot name="title"></slot>
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
        const container = this.shadowRoot.querySelector('#container');
        let menuOpen = false;

        const resize = mq => {
            if(mq.matches) {
                const largeContent = this.shadowRoot.querySelector('#large').content.cloneNode(true);
                container.innerHTML = '';
                container.appendChild(largeContent);
                this.setupEventHandlers();
            }
            else {
                const smallContent = this.shadowRoot.querySelector('#small').content.cloneNode(true);
                container.innerHTML = '';
                container.appendChild(smallContent);
                this.setupEventHandlers();

                setTimeout(() => {
                    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');

                    const {height} = container.getBoundingClientRect();
                    dropdownMenu.style.setProperty('--menu-top', `${height}px`);

                    this.shadowRoot.querySelector('.menu-icon').onclick = () => {
                        menuOpen = !menuOpen;
                        dropdownMenu.style.display = menuOpen ? 'flex' : 'none';
                    };
                });
            }
        };

        const mq = window.matchMedia('(min-width: 600px)');
        mq.addListener(resize);
        resize(mq);


    }

    setupEventHandlers() {
        this.shadowRoot.querySelectorAll('[name$="content"]').forEach(icon => {
            icon.addEventListener('click', ({target}) => {
                this.dispatchEvent(new CustomEvent('app-bar-clicked', {
                    detail: {target}
                }));
            });
        });
    }
}

customElements.define('app-bar', AppBar);
