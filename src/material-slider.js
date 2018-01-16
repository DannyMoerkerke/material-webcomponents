export default class MaterialSlider extends HTMLElement {

    static get observedAttributes() {
        return ['value'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --cur-value: 50%;
                    --correction-factor: 2;
                    --thumb-color-light: #ffffff;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    margin: 0;
                    width: 100%;
                    z-index: 1;
                }
                input[type=range]:focus {
                    outline: none;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: var(--track-height, 4px);
                    cursor: pointer;
                    animate: 0.2s;
                    background: var(--track-color, #cccccc);
                    border-radius: 1.3px;
                }
    
                input[type=range]::-moz-range-track {
                    width: 100%;
                    height: var(--track-height, 4px);
                    cursor: pointer;
                    animate: 0.2s;
                    background: var(--track-color, #cccccc);
                    border-radius: 1.3px;
                }
                input[type=range]::-ms-track {
                    width: 100%;
                    height: var(--track-height, 4px);
                    cursor: pointer;
                    animate: 0.2s;
                    background: transparent;
                    border-color: transparent;
                    border-width: 16px 0;
                    color: transparent;
                }
    
                input[type=range]::-webkit-slider-thumb {
                    height: var(--thumb-size, 16px);
                    width: var(--thumb-size, 16px);
                    border-radius: 50%;
                    background: var(--thumb-color, #ffffff);
                    cursor: pointer;
                    -webkit-appearance: none;
                    margin-top: calc((var(--track-height, 4px) - var(--thumb-size) ) / 2);
                    box-shadow: 0 0 0 0 transparent;
                    transition: box-shadow 0.2s ease-in;
                }
                
                input[type=range]:hover::-webkit-slider-thumb {
                    box-shadow: 0 0 0 var(--thumb-size)  rgba(0, 188, 212, 0.1);
                }
                input[type=range]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 var(--thumb-size)  rgba(0, 188, 212, 0.1);
                }
                
    
                input[type=range]::-moz-range-thumb {
                    height: var(--thumb-size, 16px);
                    width: var(--thumb-size, 16px);
                    border-radius: 50%;
                    background: var(--thumb-color, #ffffff);
                    cursor: pointer;
                    margin-top: calc((var(--track-height, 4px) - var(--thumb-size) ) / 2);
                    box-shadow: 0 0 0 0 transparent;
                    transition: box-shadow 0.2s ease-in;
                }
                
                input[type=range]:hover::-moz-range-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) rgba(0, 188, 212, 0.1);
                }
                input[type=range]:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 var(--thumb-size) rgba(0, 188, 212, 0.1);
                }
    
                input[type=range]::-ms-thumb {
                    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
                    border: 1px solid #000000;
                    height: var(--thumb-size, 16px);
                    width: var(--thumb-size, 16px);
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                }
                input[type=range]::-ms-fill-lower {
                    background: #2a6495;
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }
                input[type=range]::-ms-fill-upper {
                    background: var(--track-color, #cccccc);
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }
      
                #container {
                    margin: 20px;
                    width: 400px;
                    position: relative;
                    display: flex;
                }
                #output {
                    position: absolute;
                }
            </style>
            
            <div id="container">
                <input type="range">
                <output id="output"></output>
            </div>
        `;

        this.input = this.shadowRoot.querySelector('input[type=range]');
        this.host = this.input.getRootNode().host;
        this.max = this.hasAttribute('max') ? this.getAttribute('max') : 100;
        this.input.max = this.max;
        this.step = this.hasAttribute('step') ? this.getAttribute('step') : 1;
        this.input.step = this.step;
        this.input.value = this.hasAttribute('value') ? this.getAttribute('value') : this.input.value;
        this.value = this.input.value;
    }

    connectedCallback() {
        this.input.addEventListener('input', e => {
            this.value = e.target.value;
        });

        const thumbColor = getComputedStyle(this.host).getPropertyValue('--thumb-color').trim();
        let thumbColorLight;

        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(thumbColor)) {
            thumbColorLight = this.hexToRgbA(thumbColor);
        }
        else if(/rgb\((.+)\)/.test(thumbColor)) {
            thumbColorLight = thumbColor.replace(/rgb\((.+)\)/, 'rgba($1, 0.1)');
        }
        else if(/rgba\((\d{1,3},\s?)(\d{1,3},\s?)(\d{1,3},\s?)(\d|\d\.\d+)\)/.test(thumbColor)) {
            const matches = /rgba\((\d{1,3},\s?)(\d{1,3},\s?)(\d{1,3},\s?)(\d|\d\.\d+)\)/.exec(thumbColor);
            thumbColorLight = `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, 0.1)`;
        }
        else {
            throw new Error(`invalid color specified for --thumb color: ${thumbColor}`);
        }

        this.host.style.setProperty('--thumb-color-light', thumbColorLight);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        // this.updateSlider(newVal);
    }

    hexToRgbA(hex) {
        let c = [...hex.substring(1)];
        if(c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = `0x${c.join('')}`;

        return `rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')}, 0.1)`;
    }


    set value(value) {
        this.setAttribute('value', value);
    }

    get value() {
        return this.getAttribute('value');
    }
}

customElements.define('material-slider', MaterialSlider);
