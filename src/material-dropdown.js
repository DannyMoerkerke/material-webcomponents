export default class MaterialDropdown extends HTMLElement {

    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        // language=HTML
        shadowRoot.innerHTML = `
            <style>
                :host {
                    width: var(--menu-width, 24px);
                    height: var(--menu-height, 23px);
                }
                #container {
                    position: relative;
                    display: inline-block;
                    width: var(--menu-width, 24px);
                    height: var(--menu-height, 24px);
                }
                @keyframes menu-open {
                    0% {
                        opacity: 0;
                        height: 0;
                    }        
                    80% {
                        opacity: 0.5;
                    }       
                    90% {
                        opacity: 0.7;
                    }
                    100% {
                        opacity: 1;
                        height: var(--menu-height);
                    } 
                }
                @keyframes fadein {
                    from {
                        opacity: 0;
                    }               
                    to {
                        opacity: 1;
                    } 
                }
                #dropdown-menu-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    min-width: var(--menu-width);
                    height: 0;
                    opacity: 0;
                    overflow: hidden;
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
                }
                #dropdown-menu {
                    background: var(--menu-background, #ffffff);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    opacity: inherit;
                }
                #dropdown-menu-container.open {
                    animation-name: menu-open;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                ::slotted(li) {
                    padding: 10px;
                    cursor: pointer;
                    list-style-type: none;
                    display: flex;
                    flex-direction: row;
                }
                ::slotted(li:hover) {
                    background: #cecece;
                }
                ::slotted([slot="icon"]) {
                    display: block;
                    cursor: pointer;
                    outline: none;
                    width:  var(--icon-width, 24px);
                    height: var(--icon-height, 24px);
                }
            </style>
            
            <div id="container">
                <slot name="icon"></slot>
                
                <div id="dropdown-menu-container">
                    <div id="dropdown-menu">
                        <slot name="option"></slot>
                    </div>
                </div>
            </div>
        `;

        this.open = this.hasAttribute('open');
        this.container = this.shadowRoot.querySelector('#container');
        this.menuContainer = this.shadowRoot.querySelector('#dropdown-menu-container');
        this.menu = this.shadowRoot.querySelector('#dropdown-menu');
    }

    connectedCallback() {
        this.icon = this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
        this.options = this.shadowRoot.querySelector('slot[name="option"]').assignedNodes();

        this.setupMenu();

        this.container.addEventListener('mousedown', this.handleClick.bind(this));
        this.icon.addEventListener('blur', this.closeMenu.bind(this));
    }

    attributeChangedCallback(attr) {
        if(attr === 'open') {
            if(this.hasAttribute('open')) {
                this.menuContainer.classList.add('open');
            }
            else {
                this.menuContainer.classList.remove('open');
            }
        }
    }

    setupMenu() {
        const {width, height} = this.shadowRoot.querySelector('#dropdown-menu').getBoundingClientRect();
        this.menuContainer.style.setProperty('--menu-height', `${height}px`);
        this.menuContainer.style.setProperty('--menu-width', `${width}px`);
    }

    openMenu() {
        this.setAttribute('open', '');
        this.menuContainer.classList.add('open');
    }

    closeMenu() {
        this.removeAttribute('open');
        this.open = false;
        this.menuContainer.classList.remove('open');
    }

    handleClick(e) {
        const nodes = e.composedPath();
        const option = nodes.find(node => node.tagName && node.tagName.toLowerCase() === 'option');
        const icon = nodes.find(node => node === this.icon);

        if(option) {
            this.notifyChange(option.value);
            this.closeMenu();
        }
        else if(icon) {
            this.open = !this.open;

            if(this.open) {
                this.openMenu();
            }
            else {
                this.closeMenu();
            }
        }

    }

    notifyChange(value) {
        this.setAttribute('value', value);
        this.dispatchEvent(new CustomEvent('dropdown-menu-value-changed', {
            detail: {
                value
            }
        }));
    }
}

customElements.define('material-dropdown', MaterialDropdown);
