export class MaterialTextfield extends HTMLElement {

  static get observedAttributes() {
    return ['value', 'name', 'label', 'readonly', 'minLength', 'maxLength', 'pattern'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --active-color: #337ab7;
                    --font-color: #000000;
                    --error-color: #ff0000;
                    --margin: 2.25rem 0 2.25rem 0;
                }
                :host([invalid]) {
                    --active-color: var(--error-color);
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
                    margin:  var(--margin);
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
                input:valid,
                input:invalid[required] {
                    color: var(--font-color);
                }
                
                input:invalid {
                    color: var(--error-color);
                    box-shadow: none;
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
                input:valid + label,
                input.invalid + label {
                    font-size: 0.8rem;
                    color: gray;
                    top: -1rem;
                    left: 0;
                }
                
                input.invalid + label {
                    color: var(--error-color)
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
                    position: absolute;
                    font-size: 0.9rem;
                    line-height: 1rem;
                    color: var(--error-color);
                    padding-top: 8px;
                }
                :host([invalid]) .error {
                    display: block;
                }
            </style>
            
            <div id="container">
                <input type="text" required>
                <label></label>
                <span id="bar"></span>
                <div class="error"></div>
            </div>
        `;

    this.input = this.shadowRoot.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');
    this.error = this.shadowRoot.querySelector('.error');

    this.pristine = true;
    this.errorMap = {
      valueMissing: 'required',
      typeMismatch: 'type',
      pattern: 'pattern',
      tooShort: 'short',
      tooLong: 'long'
    };

    this.allowedTypes = ['text', 'number', 'email', 'password', 'tel', 'url'];
  }

  connectedCallback() {
    if(this.hasAttribute('value')) {
      this.input.value = this.getAttribute('value');
    }

    if(this.hasAttribute('name')) {
      this.input.name = this.getAttribute('name');
    }

    if(this.hasAttribute('pattern')) {
      this.input.pattern = this.getAttribute('pattern');
    }

    if(this.hasAttribute('maxLength')) {
      this.input.maxLength = this.getAttribute('maxLength');
    }

    if(this.hasAttribute('minLength')) {
      this.input.minLength = this.getAttribute('minLength');
    }

    if(this.hasAttribute('type') && this.allowedTypes.includes(this.getAttribute('type'))) {
      this.input.type = this.getAttribute('type');
    }

    if(this.hasAttribute('readonly')) {
      this.input.addEventListener('keydown', e => e.preventDefault());
      this.input.addEventListener('focus', e => {
        e.preventDefault();
        this.input.blur();
      });
    }
    else {
      this.input.addEventListener('keyup', this.handleKeyUp.bind(this));
      this.input.addEventListener('blur', this.handleBlur.bind(this));
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

  handleKeyUp() {
    this.pristine = false;
    if(this.input.validity.valid) {
      this.removeAttribute('invalid');
      this.input.classList.remove('invalid');
    }
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this.input.value
      }
    }));
  }

  handleBlur() {
    for(const error in this.input.validity) {
      if(!this.pristine && this.input.validity[error] && this.hasAttribute(`error-${this.errorMap[error]}`)) {
        this.error.textContent = this.getAttribute(`error-${this.errorMap[error]}`);
        this.setAttribute('invalid', '');
        this.input.classList.add('invalid');
      }
    }
  }

  isValid() {
    return this.input.validity.valid;
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }
}

if(!customElements.get('material-textfield')) {
  customElements.define('material-textfield', MaterialTextfield);
}
