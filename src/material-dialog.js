export default class MaterialDialog extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --header-background: #ffffff;
                    --body-background: #ffffff;
                    --footer-background: #ffffff;
                    --backdrop-color: rgba(128,128,128,0.5);
                    --dialog-width: 20%;
                    --dialog-height: auto;
                }
                
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--backdrop-color);
                    animation-name: fadein;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                    z-index: 9999;
                }
                #modal {
                    display: grid;
                    grid-template-rows: 1fr 3fr 1fr;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: var(--dialog-width);
                    height: var(--dialog-height);
                    background: #ffffff;
                    animation-name: slidedown;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                header {
                    background: var(--header-background);
                }
                main {
                    background: var(--body-background);
                }
                footer {
                    background: var(--footer-background);
                }
                ::slotted([slot]) {
                    margin: 10px;
                }
                ::slotted([slot]:empty) {
                    margin: 0px;
                }
                @keyframes fadein {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slidedown {
                    from {
                        transform: translate(-50%, -65%);
                    }
                    to {
                        transform: translate(-50%, -50%);
                    }
                }
                
                @keyframes fadeout {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                @keyframes slideup {
                    from {
                        transform: translate(-50%, -50%);
                    }
                    to {
                        transform: translate(-50%, -65%);
                    }
                }
                #backdrop.close {
                    animation-name: fadeout;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                #backdrop.close #modal {
                    animation-name: slideup;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                
            </style>
            
            <div id="backdrop">
                <div id="modal">
                    <header>
                        <slot name="header"></slot>
                    </header>
                    <main>
                        <slot name="body"></slot>
                    </main>
                    <footer>
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.style.display = 'none';
        this.backdrop = this.shadowRoot.querySelector('#backdrop');

        this.backdrop.addEventListener('click', this.handleClick.bind(this));

        this.backdrop.addEventListener('animationend', e => {
            if(e.animationName === 'fadeout') {
                this.style.display = 'none';
                this.backdrop.classList.remove('close');
            }
        });
    }

    handleClick(e) {
        if(!this.hasAttribute('modal') && e.composedPath()[0] === this.backdrop) {
            this.close();
        }
    }

    open() {
        this.style.display = 'block';
    }

    close() {
        this.backdrop.classList.add('close');
    }
}

customElements.define('material-dialog', MaterialDialog);
