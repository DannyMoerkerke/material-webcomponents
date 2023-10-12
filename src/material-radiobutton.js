export class MaterialRadiobutton extends HTMLElement {

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
                #radiobutton-container {
                    margin-bottom: 1rem;
                }
                input {
                    width: auto;
                    opacity: 0.00000001;
                    position: absolute;
                    left: 1px;
                    top: 1px;
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
                .checkmark {
                    position: absolute;
                    top: -0.25rem;
                    left: -0.25rem;
                    cursor: pointer;
                    display: block;
                    font-size: 1rem;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    color:var(--unchecked-color);
                }
                .checkmark::before, #radiobutton-container .checkmark::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    margin: 0.25rem;
                    width: 1rem;
                    height: 1rem;
                    transition: transform 0.28s ease;
                    border-radius: 50%;
                    border: 0.125rem solid currentColor;
                }
                .checkmark::after {
                    transform: scale(0);
                    background-color: var(--checked-color);
                    border-color: var(--checked-color);
                }
                label:hover .checkmark {
                    color: var(--checked-color);
                }
                input:checked {
                    border-radius: 50%;
                }
                input:checked ~ .checkmark::after {
                    transform: scale(0.5);
                }
                input:checked ~ .checkmark::before {
                    color: var(--checked-color);
                }
                
            </style>
            
            <div id="radiobutton-container">
                <label>
                    <input type="radio">
                    <div class="ripple"></div>
                    <i class="checkmark"></i>
                </label>
            </div>
        `;

    this.input = this.shadowRoot.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this.input.addEventListener('click', this.handleClick.bind(this));
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if(attr === 'value' || attr === 'name') {
      this.input[attr] = newVal;
    }

    if(attr === 'value') {
      this.input.setAttribute('value', newVal);
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

  handleClick() {
    this.setAttribute('checked', '');

    const {name, value} = this.input;

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        name,
        value
      },
      composed: true,
      bubbles: true
    }));
  }

  get value() {
    return this.input.checked ? this.getAttribute('value') : undefined;
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(isChecked) {
    if(isChecked) {
      this.setAttribute('checked', '');
    }
    else {
      this.removeAttribute('checked');
    }
  }

  setLabel(text) {
    const label = document.createTextNode(text);
    this.label.appendChild(label);
  }
}

if(!customElements.get('material-radiobutton')) {
  customElements.define('material-radiobutton', MaterialRadiobutton);
}
