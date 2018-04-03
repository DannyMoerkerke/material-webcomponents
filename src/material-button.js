export default class MaterialButton extends HTMLElement {

    static get observedAttributes() {
        return ['label', 'disabled'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --button-color: #e2e2e2;
                    --font-color: #000000;
                }
                button {
                    border: none;
                    border-radius: 2px;
                    min-width: 88px;
                    min-height: 36px;
                    padding-left: 8px;
                    padding-right: 8px;
                    font-size: 1em;
                    color: var(--font-color);
                    cursor: pointer;
                    outline: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                button:hover {
                    transition: background-color 0.3s ease-out;
                    background-color: var(--button-color);
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
    }

    connectedCallback() {
        this.button.addEventListener('click', () => {
            this.button.classList.add('active');
        });

        this.button.addEventListener('animationend', () => {
            this.button.classList.remove('active');
        });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'label') {
            if(this.hasAttribute('label')) {
                this.label.textContent = this.getAttribute('label');
            }
            else {
                this.label.style.display = 'none';
            }
        }

        if(attr === 'disabled') {
            this.button.disabled = this.hasAttribute('disabled');
        }
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
