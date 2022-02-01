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
        
        button:hover {
          transition: background-color 0.3s ease-out;
          background-color: var(--button-color-hover);
        }
        
        #label {
          display: inline-block;
          position: relative;
          margin-right: 8px;
          margin-left: 8px;
        }
        
        :host([label]) button {
          min-width: 88px;
        }
        
        :host([raised]) {
          --button-color: #e2e2e2;
        }
        
        :host([raised]) button {
          background-color: var(--button-color);
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
        }
        
        :host([disabled]) {
          cursor: not-allowed;
        }
        
        :host([disabled]) button {
          opacity: 0.5;
          pointer-events: none;
        }
        
        :host([active]) .ripple {
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
        
        :host([circle]) button {
          border-radius: 50%;
          --button-padding: var(--button-padding-circle);
        }
        
        ::slotted([slot="left-icon"]) {
            float: left;
            font-size: var(--icon-size) !important;
        }
        
        ::slotted([slot="toggle-icon"]) {
            float: left;
            font-size: var(--icon-size) !important;
        }
        
        slot[name="toggle-icon"] {
            display: none;
        }
        
        :host([toggled]) slot[name="left-icon"] {
          display: none;
        }
        
        :host([toggled]) slot[name="toggle-icon"] {
          display: block;
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
        <slot name="toggle-icon"></slot>
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

    const iconSlot = this.shadowRoot.querySelector('slot[name="left-icon"]');
    const toggleIconSlot = this.shadowRoot.querySelector('slot[name="toggle-icon"]');

    this.hasToggleIcon = iconSlot.assignedNodes().length && toggleIconSlot.assignedNodes().length;
    this.toggled = false;

    this.button.addEventListener('click', () => {
      this.active = true;
      this.toggled = !this.toggled;
    });

    this.ripple.addEventListener('animationend', () => {
      this.active = false;
    });
  }

  attributeChangedCallback(attr) {
    if(attr === 'label') {
      this.hasAttribute('label') ? this.label.textContent = this.getAttribute('label') : this.label.style.display = 'none';
    }
  }

  get toggled() {
    return this.hasAttribute('toggled');
  }

  set toggled(isToggled) {
    if(this.hasToggleIcon) {
      if(isToggled) {
        this.setAttribute('toggled', '');
      }
      else {
        this.removeAttribute('toggled');
      }
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

  get active() {
    return this.hasAttribute('active');
  }

  set active(isActive) {
    if(isActive) {
      this.setAttribute('active', '');
    }
    else {
      this.removeAttribute('active');
    }
  }
}

if(!customElements.get('material-button')) {
  customElements.define('material-button', MaterialButton);
}
