export class MaterialSlider extends HTMLElement {

  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --thumb-color: #cccccc;
                    --thumb-color-light: #ffffff;
                    --track-color: #cccccc;
                    --thumb-size: 16px;
                    --track-height: 4px;
                    --margin: 5px;
                }
                :host([disabled]) input {
                    opacity: 0.5;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    background-color: transparent;
                    margin: 0;
                    width: 100%;
                    z-index: 1;
                    cursor: pointer;
                }
                input[type=range]:focus {
                    outline: none;
                    
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: var(--track-height);
                    cursor: pointer;
                    background: var(--track-color);
                    border-radius: 1.3px;
                }
    
                input[type=range]::-moz-range-track {
                    width: 100%;
                    height: var(--track-height);
                    cursor: pointer;
                    background: var(--track-color);
                    border-radius: 1.3px;
                }
                input[type=range]::-moz-focus-outer {
                    border: 0;
                }
                input[type=range]::-ms-track {
                    width: 100%;
                    height: var(--track-height);
                    cursor: pointer;
                    background: transparent;
                    border-color: transparent;
                    border-width: 16px 0;
                    color: transparent;
                }
    
                input[type=range]::-webkit-slider-thumb {
                    height: var(--thumb-size);
                    width: var(--thumb-size);
                    border-radius: 50%;
                    background: var(--thumb-color);
                    cursor: pointer;
                    -webkit-appearance: none;
                    margin-top: calc((var(--track-height) - var(--thumb-size) ) / 2);
                    box-shadow: 0 0 0 0 transparent;
                    transition: box-shadow 0.2s ease-in;
                }
                
                input[type=range]:hover::-webkit-slider-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) var(--thumb-color-light);
                }
                input[type=range]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) var(--thumb-color-light);
                }
                
    
                input[type=range]::-moz-range-thumb {
                    height: var(--thumb-size);
                    width: var(--thumb-size);
                    border: 0;
                    border-radius: 50%;
                    background: var(--thumb-color);
                    cursor: pointer;
                    margin-top: calc((var(--track-height) - var(--thumb-size) ) / 2);
                    box-shadow: 0 0 0 0 transparent;
                    transition: box-shadow 0.2s ease-in;
                }
                
                input[type=range]:hover::-moz-range-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) var(--thumb-color-light);
                }
                input[type=range]:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) var(--thumb-color-light);
                }
    
                input[type=range]::-ms-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: rgb(204, 204, 204);
                    cursor: pointer;
                    box-shadow: 0 0 0 0 rgba(204, 204, 204, 0.1);
                    transition: box-shadow 0.2s ease-in;
                }
                
                input[type=range]:hover::-ms-thumb {
                    box-shadow: 0 0 0 16px rgba(204, 204, 204, 0.1);
                }
                input[type=range]:focus::-ms-thumb {
                    box-shadow: 0 0 0 16px rgba(204, 204, 204, 0.1);
                }
                
                input[type=range]::-ms-fill-lower {
                    background: rgb(204, 204, 204);
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }
                input[type=range]::-ms-fill-upper {
                    background: rgb(204, 204, 204);
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }
      
                #container {
                    margin: var(--margin);
                    position: relative;
                    display: flex;
                }
                #output {
                    position: absolute;
                }
                #input-container {
                  display: flex;
                  cursor: pointer;
                  width: 100%;
                  height: var(--thumb-size);
                }
            </style>
            
            <div id="container">
                <div id="input-container">
                  <input type="range">
                </div>
                <output id="output"></output>
            </div>
        `;

    this.input = this.shadowRoot.querySelector('input[type=range]');
  }

  connectedCallback() {
    this.container = this.shadowRoot.querySelector('#container');
    this.host = this.input.getRootNode().host;
    this.min = this.hasAttribute('min') ? this.getAttribute('min') : 1;
    this.input.min = this.min;
    this.max = this.hasAttribute('max') ? this.getAttribute('max') : 100;
    this.input.max = this.max;
    this.step = this.hasAttribute('step') ? this.getAttribute('step') : 1;
    this.input.step = this.step;
    this.input.value = this.hasAttribute('value') ? this.getAttribute('value') : this.input.value;
    this.value = this.input.value;
    this.disabled = this.hasAttribute('disabled');

    this.input.addEventListener('input', this.handleInput.bind(this));

    const rgba = /rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d|\d\.\d+)\)/;
    const hostStyle = getComputedStyle(this.host);
    const thumbColor = hostStyle.getPropertyValue('--thumb-color').trim() || hostStyle.getPropertyValue('--thumb-color').trim();

    const matches = rgba.exec(thumbColor);
    const thumbColorLight =
      /^#([A-Fa-f0-9]{3}){1,2}$/.test(thumbColor) ? this.hexToRgbA(thumbColor) :
      /rgb\((.+)\)/.test(thumbColor) ? thumbColor.replace(/rgb\((.+)\)/, 'rgba($1, 0.1)') :
      rgba.test(thumbColor) ? `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, 0.1)` : null;

    if(thumbColorLight === null) {
      throw new Error(`invalid color specified for --thumb color: ${thumbColor}`);
    }

    this.host.style.setProperty('--thumb-color-light', thumbColorLight);
  }

  handleInput(e) {
    this.value = e.target.value;

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: e.target.value
      }
    }));
  }

  hexToRgbA(hex) {
    let c = [...hex.substring(1)];
    if(c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;

    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 0.1)`;
  }


  set value(value) {
    this.input.value = value;
    this.setAttribute('value', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set disabled(isDisabled) {
    this.input.disabled = isDisabled;

    isDisabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if(attr === 'value') {
      this.input.value = newVal;
    }

    if(attr === 'disabled') {
      this.input.disabled = this.hasAttribute('disabled');
    }
  }
}

if(!customElements.get('material-slider')) {
  customElements.define('material-slider', MaterialSlider);
}
