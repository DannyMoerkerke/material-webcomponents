export class MaterialSwitch extends HTMLElement {

  static get observedAttributes() {
    return ['on', 'label'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --track-color: #bdbdbd;
                    --switch-color: #f5f5f5;
                }
                :host([on]) {
                    --track-color: var(--switch-color);
                }
                :host([on]) #button {
                    left: calc(100% - 20px);
                    background-color: var(--switch-color);
                }
                :host([on]) #track {
                    opacity: 0.5;
                }
                :host([disabled]) {
                    cursor: not-allowed;
                }
                :host([disabled]) #container {
                    cursor: not-allowed;
                }
                :host([disabled]) #track {
                    background-color: #bdbdbd;
                }
                :host([disabled]) #button {
                    background-color: #f5f5f5;
                }
                :host([label]) label {
                    display: inline-block;
                }
                :host([label-position=left]) #switch {
                    order: 2;
                }
                :host([label-position=left]) label {
                    margin-left: 0;
                    margin-right: 1em;
                }
                #container {
                    display: flex;
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                }
                label {
                    margin-left: 1em;
                    cursor: inherit;
                    display: none;
                }
                #switch {
                    width: 36px;
                    height: 14px;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                #track {
                    width: 36px;
                    height: 14px;
                    background-color: var(--track-color);
                    border-radius: 7px;
                    box-sizing: border-box;
                }
                #button {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
                    background-color: #f5f5f5;
                    transition: left 0.15s linear;
                }
                input {
                    display: none;
                }
            </style>
            
            <div id="container">
                <div id="switch">
                    <div id="track"></div>
                    <div id="button"></div>
                </div>
                <label></label>
            </div>
            <input type="checkbox">
        
        `;

    this.container = this.shadowRoot.querySelector('#container');
    this.input = this.shadowRoot.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this.container.addEventListener('click', this.handleClick.bind(this));
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.input.checked = this.hasAttribute('on');

    if(attr === 'label') {
      if(oldVal !== null) {
        this.label.removeChild(this.label.lastChild);
      }

      this.setLabel(newVal);
    }
  }

  handleClick() {
    if(!this.hasAttribute('disabled')) {
      this.toggle();
    }
  }

  setLabel(text) {
    const label = document.createTextNode(text);
    this.label.appendChild(label);
  }

  toggle() {
    this.hasAttribute('on') ? this.removeAttribute('on') : this.setAttribute('on', '');
    this.input.checked = this.hasAttribute('on');

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.input.checked
      },
      composed: true,
      bubbles: false
    }));
  }

  get value() {
    return this.hasAttribute('on');
  }
}

if(!customElements.get('material-switch')) {
  customElements.define('material-switch', MaterialSwitch);
}
