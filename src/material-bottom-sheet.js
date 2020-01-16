export class MaterialBottomSheet extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --header-background: #ffffff;
                    --body-background: #ffffff;
                    --footer-background: #ffffff;
                    --backdrop-color: rgba(128,128,128,0.5);
                    --sheet-width: 100%;
                    --sheet-height: auto;
                    --animation-duration: 0.25s;
                    display: block;
                }
                
                @media (min-width: 768px) {
                  :host {
                    --sheet-width: 70%;
                  }
                }
                
                @media (min-width: 1024px) {
                  :host {
                    --sheet-width: 40%;
                  }
                }
                
                @media (min-width: 1200px) {
                  :host {
                    --sheet-width: 30%;
                  }
                }
                
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--backdrop-color);
                    animation-name: fadein;
                    animation-duration: var(--animation-duration);
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                    z-index: 9999;
                }
                #sheet {
                    display: grid;
                    grid-template-rows: 1fr 3fr 1fr;
                    position: fixed;
                    bottom: calc(0px - var(--sheet-height));
                    left: 0%;
                    width: var(--sheet-width);
                    height: var(--sheet-height);
                    background: transparent;
                    animation-name: slideup;
                    animation-duration: var(--animation-duration);
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                header {
                    background: var(--header-background);
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                }
                main {
                    background: var(--body-background);
                    padding: 0 10px;
                }
                footer {
                    background: var(--footer-background);
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                }
                ::slotted([slot]) {
                    margin: 10px;
                }
                ::slotted([slot]:empty) {
                    margin: 0px;
                }
                
                #backdrop.close {
                    animation-name: fadeout;
                    animation-duration: var(--animation-duration);
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                
                #backdrop.close #sheet {
                    animation-name: slidedown;
                    animation-duration: var(--animation-duration);
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                
                @keyframes fadein {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slideup {
                    from {
                        bottom: calc(0px - var(--sheet-height));
                    }
                    to {
                        bottom: 0;
                    }
                }
                
                @keyframes fadeout {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                @keyframes slidedown {
                    from {
                        bottom: 0;
                    }
                    to {
                        bottom: calc(0px - var(--sheet-height));
                    }
                }
            </style>
            
            <div id="backdrop">
                <div id="sheet">
                    <header>
                        <slot name="header"></slot>
                    </header>
                    <main>
                        <slot name="body"></slot>
                    </main>
                    <footer>
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        `;

    this.backdrop = this.shadowRoot.querySelector('#backdrop');
    this.sheet = this.shadowRoot.querySelector('#sheet');
  }

  connectedCallback() {
    this.style.visibility = 'hidden';
    this.host = this.shadowRoot.getRootNode().host;

    const {height} = this.sheet.getBoundingClientRect();

    this.host.style.setProperty('--sheet-height', `${height}px`);

    this.style.display = 'none';
    this.style.visibility = 'visible';


    this.backdrop.addEventListener('click', this.handleClick.bind(this));
    this.backdrop.addEventListener('animationend', this.handleAnimationEnd.bind(this));
  }

  handleAnimationEnd(e) {
    if(e.animationName === 'fadeout') {
      this.style.display = 'none';
      this.backdrop.classList.remove('close');
    }
  }

  handleClick(e) {
    if(e.composedPath()[0] === this.backdrop) {
      this.close();
    }
  }

  open() {
    this.style.display = 'block';
  }

  close() {
    this.backdrop.classList.add('close');
  }
}

customElements.define('material-bottom-sheet', MaterialBottomSheet);
