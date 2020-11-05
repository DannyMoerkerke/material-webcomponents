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
                    
                    display: block;
                    box-sizing: border-box;
                }
                :host([invalid]) {
                    --unchecked-color: #ff0000;
                    --checked-color: #ff0000;
                    --label-color: #ff0000;
                }
                :host([checked]) .ripple {
                    animation-name: ripple;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-out;
                }
                @keyframes ripple {
                    from {
                        box-shadow: 0 0 0 0px rgba(204, 204, 204, 0.8);
                    }
                    to {
                        box-shadow: 0 0 0 16px rgba(204, 204, 204, 0.1);
                    }                
                }
                .ripple {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: box-shadow 0.5s ease;
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
                    margin-right: 2rem;
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
                .checkmark::before, 
                #checkbox-container .checkmark::after {
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
                #checkbox-container input:checked ~ .checkmark::after {
                    height: 0.5rem;
                }
                #checkbox-container input:checked ~ .checkmark::before {
                    height: 1.2rem;
                    transition-delay: 0.28s;
                }
                
                label:hover .checkmark {
                    color: var(--checked-color);
                }
                input:checked ~ .checkmark {
                    color: var(--checked-color);
                }
                #checkbox-container input:checked ~ .checkmark::after, 
                #checkbox-container input:checked ~ .checkmark::before {
                    opacity: 1;
                    transition: height 0.28s ease;
                }
            </style>
            
            <div id="checkbox-container">
                <label>
                    <input type="checkbox">
                    <i class="checkmark"></i>
                    <div class="ripple"></div>
                </label>
            </div>
        `;

    this.input = this.shadowRoot.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this.input.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    e.stopPropagation();

    this.input.checked ? this.setAttribute('checked', '') : this.removeAttribute('checked');

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.hasAttribute('checked')
      }
    }));
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

  get value() {
    return this.input.checked ? this.getAttribute('value') : undefined;
  }

  get checked() {
    return this.input.checked;
  }

  set checked(isChecked) {
    this.input.checked = isChecked;
  }
}

if(!customElements.get('material-checkbox')) {
  customElements.define('material-checkbox', MaterialCheckbox);
}
