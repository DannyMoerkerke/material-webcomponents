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
                    --cur-value: 50%;
                    --correction-factor: 2;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    margin: 18px 0;
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
                }
    
                input[type=range]::-moz-range-thumb {
                    height: var(--thumb-size, 16px);
                    width: var(--thumb-size, 16px);
                    border-radius: 50%;
                    background: var(--thumb-color, #ffffff);
                    cursor: pointer;
                    margin-top: calc((var(--track-height, 4px) - var(--thumb-size) ) / 2);
                }
    
                input[type=range]::after {
                    display: block;
                    position: absolute;
                    content: ' ';
                    top: 50%;
                    left: calc(var(--cur-value) - calc(var(--thumb-size) / var(--correction-factor)));
                    height: var(--thumb-size, 16px);
                    width: var(--thumb-size, 16px);
                    transform: scale(2) translateY(-50%);
                    transform-origin: 50% 0%;
                    opacity: 0.2;
                    border-radius: 50%;
                    background-color: transparent;
                    z-index: -1;
                    transition: background-color 0.2s ease-in;
                }
                input[type=range]:hover::after,
                input[type=range]:focus::after {
                    background-color: var(--thumb-color, #ffffff);
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
        this.input.value = this.hasAttribute('value') ? this.getAttribute('value') : this.input.value;;
        this.value = this.input.value;
    }

    connectedCallback() {
        this.updateSlider(this.value);

        this.input.addEventListener('input', e => {
            this.value = e.target.value;
            this.updateSlider(this.value);
        });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this.updateSlider(newVal);
    }

    updateSlider(value) {
        const percentage = (value / this.max) * 100;
        const correctionFactor = this.max / value;

        this.host.style.setProperty('--cur-value', `${percentage}%`);
        this.host.style.setProperty('--correction-factor', `${correctionFactor}`);
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    get value() {
        return this.getAttribute('value');
    }
}

customElements.define('material-slider', MaterialSlider);
