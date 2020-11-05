export class MaterialProgress extends HTMLElement {

  static get observedAttributes() {
    return ['value', 'max', 'circle'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --progress-bar-width: 100%;
                    --progress-bar-height: 5px;
                    --progress-bar-color: #00bcd4;
                    --progress-background: #eeeeee;
                    --progress-font-size: 4px;
                }
                progress  {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    width: var(--progress-bar-width);
                    height: var(--progress-bar-height);
                    border: none;
                    color: var(--progress-bar-color); 
                }
                
                progress::-webkit-progress-bar {
                    background-color: var(--progress-background);
                    border-radius: 2px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
                }
                progress[value]::-webkit-progress-value {
                    background-color: var(--progress-bar-color);
                }
                
                progress:not([value]) {
                    position: relative;
                }
                progress:not([value]) + .after {
                    position: absolute;
                    top: 13px;
                    left: 0%;
                    background-color: var(--progress-bar-color);
                    border-radius: 2px;
                    display: block;
                    width: calc(var(--progress-bar-height) * 4);
                    height: var(--progress-bar-height);
                    animation-name: slide;
                    animation-duration: 1s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-in-out;
                    animation-direction: alternate;
                    animation-iteration-count: infinite;
                }
                
                @keyframes slide {
                    from {
                        left: 0%;
                    }
                    to {
                        left: calc(100% - calc(var(--progress-bar-height) * 4));
                    }
                }
                
                progress[value]::-moz-progress-bar {
                    background-color: var(--progress-bar-color);
                }
                
                #container {
                  width: var(--progress-bar-width);
                }
                
                #progress-container {
                    width: 100%;
                    position: relative;
                    display: inline-block;
                    height: 5px;
                    overflow: visible;
                }
                progress[value] #progress-container {
                    margin-top: 20px;
                }
                #progress-container #progress-value {
                    width: var(--progress-value, 0%);
                    height: 20px;
                    position: absolute;
                    top: -7px;
                }
                #progress-value {
                    display: none;
                }
                :host([value]) #progress-value {
                    display: block;
                }
                :host([no-percentage]) #progress-value {
                  display: none;
                }
                #progress-value::after {
                    position: absolute;
                    content: attr(data-value) "%";
                    color: var(--progress-bar-color);
                }
                #circle {
                    box-sizing: border-box;
                    stroke: var(--progress-bar-color);
                    stroke-width: 3px;
                    transform-origin: 50%;
                    stroke-dashoffset: var(--dash-offset);
                    stroke-dasharray: var(--circle-circumference);
                    transform: rotate(-90deg);
                }
                #circle-container {
                    position: relative;
                }
                #circle-container #progress-value {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                #circle-container  #progress-value::after {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: var(--progress-font-size);
                }
            </style>
            
            <template id="regular">
                <div id="progress-container">
                    <div id="progress-value"></div>
                    <progress></progress>
                    <div class="after"></div>
                </div>
            </template>
            
            <template id="circular">
                <div id="circle-container">
                    <div id="progress-value"></div>
                    <svg>
                        <circle id="circle" fill="none"></circle>
                    </svg>
                </div>
            </template>
            
            <div id="container"></div>
        `;

    this.container = this.shadowRoot.querySelector('#container');
    this.regular = this.shadowRoot.querySelector('#regular').content.cloneNode(true);
    this.circular = this.shadowRoot.querySelector('#circular').content.cloneNode(true);
  }

  connectedCallback() {
    if(this.hasAttribute('circle')) {
      this.container.appendChild(this.circular);
      this.circle = this.shadowRoot.querySelector('#circle');
      this.circleSize = parseInt(this.getAttribute('circle'), 10);
      this.radius = this.circleSize / 2;
      this.circle.setAttribute('cx', this.radius);
      this.circle.setAttribute('cy', this.radius);
      this.circle.setAttribute('r', this.radius - 2);
      this.circumference = 2 * Math.PI * (this.radius - 2);
      this.circleContainer = this.shadowRoot.querySelector('#circle-container');
      this.circleContainer.style.width = `${this.circleSize}px`;
      this.circleContainer.style.height = `${this.circleSize}px`;

      this.svg = this.shadowRoot.querySelector('svg');
      this.svg.setAttribute('width', this.circleSize);
      this.svg.setAttribute('height', this.circleSize);
      this.svg.setAttribute('viewBox', `0 0 ${this.circleSize} ${this.circleSize}`);

      this.circle.style.setProperty('--circle-circumference', this.circumference);
    }
    else {
      this.container.appendChild(this.regular);
      this.progress = this.shadowRoot.querySelector('progress');
    }
    this.progressValue = this.shadowRoot.querySelector('#progress-value');

    if(this.hasAttribute('circle')) {
      const factor = 3.5;
      this.progressValue.style.setProperty('--progress-font-size', `${this.circleSize / factor}px`);
    }

    if(this.hasAttribute('value')) {
      this.setProgressValue(this.getAttribute('value'));
    }
    if(this.hasAttribute('max') && !this.hasAttribute('circle')) {
      this.progress.setAttribute('max', this.getAttribute('max'));
    }
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
    this.setProgressValue(value);
  }

  setProgressValue(value) {
    const progress = parseInt(value / parseInt(this.getAttribute('max'), 10) * 100, 10);

    if(this.hasAttribute('circle')) {
      this.circle.style.setProperty('--dash-offset', this.circumference * (1 - (progress / 100)));
    }
    else {
      this.progress.setAttribute('value', value);
      this.progressValue.style.setProperty('--progress-value', `${progress}%`);
    }
    this.progressValue.dataset.value = progress;
  }
}

if(!customElements.get('material-progress')) {
  customElements.define('material-progress', MaterialProgress);
}
