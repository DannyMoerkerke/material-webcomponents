export class MaterialDrawer extends HTMLElement {

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --drawer-color: #ffffff;
                    --backdrop-color: rgba(128,128,128,0.5);
                    --top-pos: 0;
                    --drawer-box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
                }
                #container {
                    --desktop-drawer-width: 250px;
                    --mobile-drawer-width: 80%;
                    padding: 10px;
                    box-sizing: border-box;
                    position: absolute;
                    top: var(--top-pos);
                    left: 0;
                    width: var(--drawer-width);
                    min-height: 100vh;
                    background-color: var(--drawer-color);
                    box-shadow: var(--drawer-box-shadow);
                    transform: translate(-100%, 0px);
                    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
                    z-index: 10;
                }
                #container.open {
                    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
                    transform: translate(0px, 0px);
                }
                #backdrop {
                    position: fixed;
                    display: none;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--backdrop-color);
                    animation-name: fadein;
                    animation-duration: 450ms;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                    z-index: 9;
                }
                #backdrop.close {
                    animation-name: fadeout;
                    animation-duration: .2s;
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
                @keyframes fadeout {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            </style>
            
            <div id="backdrop"></div>
            <div id="container">
                <slot name="content"></slot>
            </div>
        `;

    this.container = this.shadowRoot.querySelector('#container');
    this.backdrop = this.shadowRoot.querySelector('#backdrop');
  }

  connectedCallback() {
    this.backdrop.addEventListener('click', this.close.bind(this));

    const containerStyle = getComputedStyle(this.container);
    this.mobileDrawerWidth = containerStyle.getPropertyValue('--mobile-drawer-width');
    this.desktopDrawerWidth = containerStyle.getPropertyValue('--desktop-drawer-width');

    const isMobile = mq => {
      this.isMobile = mq.matches;

      this.container.style.setProperty('--drawer-width', (this.isMobile ? this.mobileDrawerWidth : this.desktopDrawerWidth));

      if(this.isMobile) {
        this.container.addEventListener('click', this.close.bind(this));
        this.backdrop.addEventListener('animationend', ({animationName}) => {
          if(animationName === 'fadeout') {
            this.backdrop.classList.remove('close');
            this.backdrop.style.display = 'none';
          }
        });
      }
    };

    const mq = window.matchMedia('(max-width: 500px)');
    mq.addListener(isMobile);
    isMobile(mq);
  }

  attributeChangedCallback(attr) {
    if(attr === 'open') {
      if(this.hasAttribute('open')) {
        this.container.classList.add('open');
      }
      else {
        this.container.classList.remove('open');
      }
    }
  }

  open() {
    this.container.classList.add('open');
    this.setAttribute('open', '');

    if(this.isMobile) {
      this.backdrop.style.display = 'block';
    }
  }

  close() {
    this.container.classList.remove('open');
    this.removeAttribute('open');

    if(this.isMobile) {
      this.backdrop.classList.add('close');
    }
  }

  toggle() {
    this.hasAttribute('open') ? this.close() : this.open();
  }
}

if(!customElements.get('material-drawer')) {
  customElements.define('material-drawer', MaterialDrawer);
}
