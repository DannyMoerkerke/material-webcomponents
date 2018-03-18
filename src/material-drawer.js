export default class MaterialDrawer extends HTMLElement {

    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --drawer-color: #ffffff;
                }
                #container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 250px;
                    height: 100%;
                    background-color: var(--drawer-color);
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
                    transform: translate(-250px, 0px);
                    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
                }
                #container.open {
                    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
                    transform: translate(0px, 0px);
                }
            </style>
            
            <div id="container">
                <slot name="content"></slot>
            </div>
        `;

        this.container = this.shadowRoot.querySelector('#container');
    }

    connectedCallback() {
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'open') {
            if(this.hasAttribute('open')) {
                this.container.classList.add('open');
            }
            else {
                this.container.classList.remove('open');
            }
        }
    }
    
    open() {
        this.container.classList.add('open');
        this.setAttribute('open', '');
    }

    close() {
        this.container.classList.remove('open');
        this.removeAttribute('open');
    }

    toggle() {
        if(this.hasAttribute('open')) {
            this.close();
        }
        else {
            this.open();
        }
    }
}

customElements.define('material-drawer', MaterialDrawer);
