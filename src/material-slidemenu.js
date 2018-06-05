export default class MaterialSlidemenu extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --label-height: 40px;
                }
                nav {
                    height: var(--label-height);
                }
                nav label {
                    cursor: pointer;
                    z-index: 1;
                }
                #slidemenu-container {
                    position: relative;
                    height: 0;
                    overflow: hidden;
                    transition: height 450ms cubic-bezier(0.23, 1, 0.32, 1);
                }
                nav.open #slidemenu-container {
                    height: var(--open-height);
                    transition: height 450ms cubic-bezier(0.23, 1, 0.32, 1);
                }
                #menu-container {
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    z-index: -1;
                }
                nav label {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    padding: 5px;
                }
                ::slotted(a) {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    padding: 5px;
                    text-decoration: none;
                }
                ::slotted(a:hover) {
                    text-decoration: none;
                }
            </style>
            
            <nav>
                <label></label>
                <div id="slidemenu-container">
                    <div id="menu-container">
                        <slot name="item"></slot>
                    </div>
                </div>
            </nav>
        `;
    }

    connectedCallback() {
        this.nav = this.shadowRoot.querySelector('nav');
        this.container = this.shadowRoot.querySelector('#slidemenu-container');
        this.labelElement = this.shadowRoot.querySelector('label');
        this.items = this.shadowRoot.querySelector('slot[name=item]').assignedNodes();
        const height = this.nav.getBoundingClientRect().height;

        if(this.hasAttribute('label')) {
            this.labelElement.textContent = this.getAttribute('label');
        }

        this.nav.style.setProperty('--open-height', `${(this.items.length) * height}px`);
        this.nav.addEventListener('click', this.toggleMenu.bind(this));
        this.nav.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    }

    toggleMenu(e) {
        if(e.composedPath()[0] === this.labelElement) {
            this.container.style.zIndex = '-1';
            this.nav.classList.toggle('open');
        }
    }

    handleTransitionEnd() {
        if(this.nav.classList.contains('open')) {
            this.container.style.zIndex = '0';
        }
    }
}

customElements.define('material-slidemenu', MaterialSlidemenu);
