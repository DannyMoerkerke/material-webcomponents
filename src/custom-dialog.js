export default class CustomDialog extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        this.style.display = 'none';

        shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--backdrop-color, rgba(128,128,128,0.5));
                    animation-name: fadein;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                #modal {
                    display: grid;
                    grid-template-rows: 1fr 3fr 1fr;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20%;
                    background: #ffffff;
                    padding: 15px;
                    animation-name: slidedown;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
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
                    <slot name="header"></slot>
                    <slot name="body"></slot>
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.style.display = 'none';
        this.backdrop = this.shadowRoot.querySelector('#backdrop');

        this.shadowRoot.querySelector('slot[name="footer"]').addEventListener('click', () => {
            this.close();
        });

        this.backdrop.addEventListener('click', () => {
            if(!this.hasAttribute('modal')) {
                this.close();
            }
        })
    }

    open() {
        this.style.display = 'block';
    }

    close() {

        this.backdrop.addEventListener('animationend', e => {
            if(e.animationName === 'fadeout') {
                this.style.display = 'none';
                this.backdrop.classList.remove('close');
            }
        });

        this.backdrop.classList.add('close');
    }

    attributeChangedCallback(attr, oldVal, newVal) {

    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }
}

customElements.define('custom-dialog', CustomDialog);
