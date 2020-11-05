export class MaterialLoader extends HTMLElement {

  static get observedAttributes() {
    return ['size'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          --loader-color: #008000;
          --line-width: 3px;
        }
        svg {
          animation: 2s linear infinite svg-animation;
          width: 50px;
        }
        
        circle {
          animation: 1.4s ease-in-out infinite both circle-animation;
          display: block;
          fill: transparent;
          stroke: var(--loader-color);
          stroke-linecap: round;
          stroke-dasharray: 283;
          stroke-dashoffset: 280;
          stroke-width: var(--line-width);
          transform-origin: 50% 50%;
        }
        
        @keyframes svg-animation {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg)
          }
        }
        
        @keyframes circle-animation {
          0%,
          25% {
            stroke-dashoffset: 280;
            transform: rotate(0);
          }
          
          50%,
          75% {
            stroke-dashoffset: 75;
            transform: rotate(45deg);
          }
          
          100% {
            stroke-dashoffset: 280;
            transform: rotate(360deg);
          }
        }
      </style>
      
      <div id="loader">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45"/>
          </svg>
      </div>
    `;

    this.svg = this.shadowRoot.querySelector('svg');
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if(attr === 'size') {
      this.svg.style.width = `${parseInt(newVal, 10)}px`;
    }
  }
}

if(!customElements.get('material-loader')) {
  customElements.define('material-loader', MaterialLoader);
}
