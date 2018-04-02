export default class MaterialTextfield extends HTMLElement {

    static get observedAttributes() {
        return ['value', 'name', 'label', 'readonly'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --active-color: #337ab7;
                    --font-color: #ffffff;
                }
                :host([invalid]) {
                    --active-color: #ff0000;
                }
                :host([invalid]) #bar,
                :host([invalid]) #bar::before{
                    left: 0;
                    width: 100%;
                }
                :host([invalid]) .error {
                    display: block;
                }
               
                #container {
                    width: 100%;
                    position: relative;
                    display: block;
                    background: transparent;
                    margin-top: 2.25rem;
                    margin-bottom: 2.25rem;
                }
                input {
                    width: 100%;
                    height: 1.9rem;
                    padding: 0.125rem 0.125rem 0.0625rem;
                    font-size: 1rem;
                    border: none;
                    border-bottom: 1px solid #999999;
                    outline: none;
                    box-sizing: border-box;
                    display: block;
                    color: var(--font-color);
                    background: none;
                    
                    line-height: 1.9;
                    color: transparent;
                    transition: all 0.28s ease;
                }
                #bar {
                    display: block;
                    position: relative;
                    bottom: 0;
                    border-bottom: 0.0625rem solid #999999;
                    width: 0;
                    left: 50%;
                    transition: left 0.25s ease-out, width 0.25s ease-out;
                }
                #bar::before {
                    content: '';
                    height: 0.125rem;
                    width: 0;
                    left: 50%;
                    bottom: -0.0625rem;
                    position: absolute;
                    background: var(--active-color);
                    -webkit-transition: left 0.28s ease, width 0.28s ease;
                    transition: left 0.28s ease, width 0.28s ease;
                    z-index: 2;
                }
                
                input:focus,
                input:valid {
                    color: var(--font-color);
                }
                
                input:focus ~ #bar {
                    left: 0;
                    width: 100%;
                }
                label {
                    position: absolute;
                    top: 0.25rem;
                    left: 2px;
                    z-index: 1;
                    font-size: 1rem;
                    color: #b3b3b3;
                    pointer-events: none;
                    padding-left: 0.125rem;
                    font-weight: normal;
                    transition: all 0.28s ease;
                    
                }
                input:focus + label,
                input:valid + label {
                    font-size: 0.8rem;
                    color: gray;
                    top: -1rem;
                    left: 0;
                }
                
                input:focus + label {
                    color: var(--active-color);
                }
                
                input:focus ~ #bar::before {
                    width: 100%;
                    left: 0;
                }
                .error {
                    display: none;
                    font-size: 0.9rem;
                    line-height: 1rem;
                    color: #ff0000;
                    padding-top: 8px;
                }
            </style>
            
            <div id="container">
                <input type="text" required>
                <label></label>
                <span id="bar"></span>
                <div class="error">This field is required</div>
            </div>
        `;

        this.input = this.shadowRoot.querySelector('input');
        this.label = this.shadowRoot.querySelector('label');

    }

    connectedCallback() {
        if(this.hasAttribute('value')) {
            this.input.value = this.getAttribute('value');
        }

        if(this.hasAttribute('readonly')) {
            this.input.addEventListener('keydown', e => e.preventDefault());
        }
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'value' || attr === 'name') {
            this.input[attr] = newVal;
        }

        if(attr === 'label') {
            this.label.textContent = newVal;
        }
    }

    get value() {
        return this.input.value;
    }

    set value(value) {
        this.input.value = value;
    }
}

customElements.define('material-textfield', MaterialTextfield);
