export class MaterialButton extends HTMLElement {

  static get observedAttributes() {
    return ['label'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --button-color: transparent;
                    --button-color-hover: #e2e2e2;
                    --font-color: #000000;
                    --font-size: 1em;
                    --icon-size: 24px;
                    --button-padding: 0 8px 0 8px;
                    --button-padding-circle: 8px;
                    --border-radius: 2px;
                    display: block;
                    width: fit-content;
                }
                :host([raised]) {
                  --button-color: #e2e2e2;
                }
                button {
                    border: none;
                    border-radius: var(--border-radius);
                    min-height: 36px;
                    padding: var(--button-padding);
                    font-size: var(--font-size);
                    color: var(--font-color);
                    background-color: var(--button-color);
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
                    background-color: var(--button-color-hover);
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
                :host([circle]) button {
                    border-radius: 50%;
                    --button-padding: var(--button-padding-circle);
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
                    font-size: var(--icon-size) !important;
                }
                ::slotted([slot="right-icon"]) {
                    float: right;
                    font-size: var(--icon-size) !important;
                }
                ::slotted([slot="file-input"]) {
                  position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;
                  opacity: 0;
                  z-index: 9;
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
                <slot name="file-input"></slot>
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
    this.hasAttribute('label') ? this.label.textContent = this.getAttribute('label') : this.label.style.display = 'none';

    this.button.addEventListener('click', () => {
      this.button.classList.add('active');
    });

    this.ripple.addEventListener('animationend', () => {
      this.button.classList.remove('active');
    });
  }

  attributeChangedCallback(attr) {
    if(attr === 'label') {
      this.hasAttribute('label') ? this.label.textContent = this.getAttribute('label') : this.label.style.display = 'none';
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

if(!customElements.get('material-button')) {
  customElements.define('material-button', MaterialButton);
}
