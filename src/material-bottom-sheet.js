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
          --slide-height: auto;
          --max-height: auto;
          --animation-duration: 0.2s;
          display: none;
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
          animation-duration: var(--animation-duration);
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          z-index: 9999;
          -webkit-overflow-scrolling: touch;
        }
        #sheet {
          display: flex;
          flex-direction: column;
          position: fixed;
          bottom: var(--slide-height);
          right: 0;
          width: var(--sheet-width);
          height: var(--sheet-height);
          max-height: var(--max-height);
          background: transparent;
          animation-name: slideup;
          animation-duration: 0.25s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
        }
        :host([left]) #sheet {
            left: 0;
        }
        :host([center]) #sheet {
            left: 50%;
            transform: translateX(-50%);
        }
        header {
          background: var(--header-background);
          align-items: center;
          padding: 0 10px;
          max-height: 50px;
          border-bottom: 1px solid #cccccc;
          border-radius: 4px 4px 0 0;
        }
        main {
          background: var(--body-background);
          padding: 0 10px;
          flex-grow: 1;
          overflow-y: scroll;
        }
        footer {
          background: var(--footer-background);
          align-items: center;
          padding: 0 10px;
          max-height: 50px;
          border-top: 1px solid #cccccc;
        }
        @supports (padding: max(0px)) {
          footer {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        ::slotted([slot]) {
          margin: 10px;
        }
        ::slotted([slot]:empty) {
          margin: 0px;
        }
        
        #backdrop.close {
          animation-duration: calc(var(--animation-duration) * 1.7);
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
        
        #backdrop.close #sheet {
          animation-name: slidedown;
          animation-duration: 0.2s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
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
            bottom: var(--sheet-height);
          }
          to {
            bottom: var(--slide-height);
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
            bottom: var(--slide-height);
          }
          to {
            bottom: var(--sheet-height);
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
    this.content = this.shadowRoot.querySelector('main');
    this.header = this.shadowRoot.querySelector('header');
  }

  connectedCallback() {
    setTimeout(() => {
      this.style.visibility = 'hidden';
      this.style.display = 'block';

      this.host = this.shadowRoot.getRootNode().host;

      const {height} = this.sheet.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const maxSheetHeight = height > screenHeight ? screenHeight : height;

      this.startSlideHeight = height >= screenHeight ? -screenHeight / 2 : height;

      this.host.style.setProperty('--sheet-height', `-${maxSheetHeight}px`);
      this.sheet.style.setProperty('--slide-height', `0px`);
      this.sheet.style.setProperty('--max-height', `${maxSheetHeight}px`);

      this.style.display = 'none';
      this.style.visibility = 'visible';


      this.backdrop.addEventListener('click', this.handleClick.bind(this));
      this.backdrop.addEventListener('animationend', this.handleAnimationEnd.bind(this));
      this.sheet.addEventListener('animationend', this.handleAnimationEnd.bind(this));

      this.sheet.addEventListener('touchmove', this.handleTouchMove.bind(this), {passive: false});

      this.sheet.addEventListener('touchstart', this.handleTouchStart.bind(this), {passive: false});
    }, 1000);
  }

  handleTouchStart(e) {
    this.sheet.style.animationName = 'none';

    this.startY = e.touches[0].clientY + this.content.scrollTop;
    this.prevY = this.startY;

    this.curY = parseFloat(this.sheet.style.getPropertyValue('--slide-height'));
  }

  handleTouchMove(e) {

    const currentY = e.touches[0].clientY;
    const direction = this.prevY < currentY ? 'down' : 'up';
    this.prevY = currentY;

    const diff = this.startY - currentY;
    const newSlideHeight = this.curY + diff;
    const slideHeight = newSlideHeight > 0 ? 0 :
      newSlideHeight > 0 ? 0 : newSlideHeight;

    if(this.content.scrollTop === 0) {
      if(newSlideHeight <= 0 || newSlideHeight === 0 && direction === 'down') {
        if(e.cancelable) {
          e.preventDefault();
        }
      }

      this.sheet.style.setProperty('--slide-height', `${slideHeight}px`);
    }
  }

  handleAnimationEnd(e) {
    if(e.animationName === 'slidedown') {
      this.backdrop.style.animationName = 'fadeout';
    }

    if(e.animationName === 'fadeout') {
      this.style.display = 'none';
      this.backdrop.classList.remove('close');

      this.sheet.style.animationName = 'slideup';
      this.backdrop.style.animationName = 'none';
    }
  }

  handleClick(e) {
    if(e.composedPath()[0] === this.backdrop) {
      this.close();
    }
  }

  open() {
    this.sheet.style.setProperty('--slide-height', `${this.startSlideHeight}px`);
    this.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.sheet.style.animationName = 'slidedown';
    this.backdrop.classList.add('close');
    document.body.style.overflow = '';
  }
}

if(!customElements.get('material-bottom-sheet')) {
  customElements.define('material-bottom-sheet', MaterialBottomSheet);
}
