export default class MaterialCheckbox extends HTMLElement {

    static get observedAttributes() {
        return ['label', 'checked', 'value', 'name'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --unchecked-color: #999999;
                    --checked-color: #337ab7;
                    --label-color: #333333;
                }
                :host([invalid]) {
                    --unchecked-color: #ff0000;
                    --checked-color: #ff0000;
                    --label-color: #ff0000;
                }
                #container {
                    margin-top: 3rem;
                    margin-bottom: 1rem;
                }
                label {
                    position: relative;
                    cursor: pointer;
                    padding-left: 2rem;
                    text-align: left;
                    color: var(--label-color);
                    display: block;
                }
                
                input {
                    width: auto;
                    opacity: 0.00000001;
                    position: absolute;
                    left: 0;
                }
                
                .checkmark {
                    color: var(--unchecked-color);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 1rem;
                    height: 1rem;
                    z-index: 0;
                    border: 0.125rem solid currentColor;
                    border-radius: 0.0625rem;
                    transition: border-color 0.28s ease;
                }
                .checkmark::before, #container .checkmark::after {
                    position: absolute;
                    height: 0;
                    width: 0.2rem;
                    background-color: var(--checked-color);
                    display: block;
                    transform-origin: left top;
                    border-radius: 0.25rem;
                    content: '';
                    transition: opacity 0.28s ease, height 0s linear 0.28s;
                    opacity: 0;
                }
                 .checkmark::before {
                    top: 0.65rem;
                    left: 0.38rem;
                    transform: rotate(-135deg);
                    box-shadow: 0 0 0 0.0625rem #fff;
                }
                .checkmark::after {
                    top: 0.3rem;
                    left: 0;
                    transform: rotate(-45deg);
                }
                #container input:checked ~ .checkmark::after {
                    height: 0.5rem;
                }
                #container input:checked ~ .checkmark::before {
                    height: 1.2rem;
                    transition-delay: 0.28s;
                }
                
                label:hover .checkmark {
                    color: var(--checked-color);
                }
                input:checked ~ .checkmark {
                    color: var(--checked-color);
                }
                #container input:checked ~ .checkmark::after, #container input:checked ~ .checkmark::before {
                    opacity: 1;
                    transition: height 0.28s ease;
                }
            </style>
            
            <div id="container">
                <label>
                    <input type="checkbox"><i class="checkmark"></i>
                </label>
            </div>
        `;

        this.input = this.shadowRoot.querySelector('input');
        this.label = this.shadowRoot.querySelector('label');
    }

    connectedCallback() {
        this.input.addEventListener('click', () => {
            if(this.input.checked) {
                this.setAttribute('checked', '');
            }
            else {
                this.removeAttribute('checked');
            }
        });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'value' || attr === 'name') {
            this.input[attr] = newVal;
        }

        if(attr === 'label') {
            if(oldVal !== null) {
                this.label.removeChild(this.label.lastChild);
            }

            this.setLabel(newVal);
        }

        if(attr === 'checked') {
            this.input.checked = this.hasAttribute('checked');
        }
    }

    setLabel(text) {
        const label = document.createTextNode(text);
        this.label.appendChild(label);
    }
}

customElements.define('material-checkbox', MaterialCheckbox);
