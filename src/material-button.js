export default class MaterialButton extends HTMLElement {

    static get observedAttributes() {
        return ['label'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --button-color: #e2e2e2;
                    --font-color: #000000;
                    display: block;
                }
                button {
                    border: none;
                    border-radius: 2px;
                    min-height: 36px;
                    padding-left: 8px;
                    padding-right: 8px;
                    font-size: 1em;
                    color: var(--font-color);
                    background-color: transparent;
                    cursor: pointer;
                    outline: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                :host([label]) button {
                    min-width: 88px;
                }
                button:hover {
                    transition: background-color 0.3s ease-out;
                    background-color: var(--button-color);
                }
                :host([disabled]) button {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                :host([disabled]) button:hover {
                    background-color: transparent;
                }
                :host([disabled]) button .ripple {
                    display: none;
                }
                button.active .ripple {
                    animation-name: ripple;
                    animation-duration: 0.4s;
                    animation-timing-function: ease-out;
                    background-color: #808080;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                #label {
                    display: inline-block;
                    position: relative;
                    margin-right: 8px;
                    margin-left: 8px;
                }
                :host([raised]) button {
                    background-color: var(--button-color);
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
                }
                :host([raised]) button[disabled]:hover {
                    background-color: var(--button-color);
                }
                ::slotted([slot="left-icon"]) {
                    float: left;
                }
                ::slotted([slot="right-icon"]) {
                    float: right;
                }
                
                @keyframes ripple {
                    from {
                        width: 0;
                        height: 0;
                        opacity: 0.8;
                    }
                    to {
                        width: 100px;
                        height: 100px;
                        opacity: 0.1;
                    }                
                }
            </style>
            
            <button type="button">
                <div class="ripple"></div>
                <slot name="left-icon"></slot>
                <span id="label"></span>
                <slot name="right-icon"></slot>
            </button>
        `;

        this.button = this.shadowRoot.querySelector('button');
        this.label = this.shadowRoot.querySelector('#label');
        this.ripple = this.shadowRoot.querySelector('.ripple');
    }

    connectedCallback() {
        if(this.hasAttribute('label')) {
            this.label.textContent = this.getAttribute('label');
        }
        else {
            this.label.style.display = 'none';
        }

        this.button.addEventListener('click', () => {
            this.button.classList.add('active');
        });

        this.ripple.addEventListener('animationend', () => {
            this.button.classList.remove('active');
        });
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(isDisabled) {
        this.button.disabled = isDisabled;

        if(isDisabled) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
}

customElements.define('material-button', MaterialButton);
