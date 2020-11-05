export class MaterialAppBar extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --app-bar-background: #999999;
                    --app-bar-font-color: #000000;
                    --app-bar-font-size: 24px;
                    --app-bar-padding: 15px;
                    --app-bar-box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
                    z-index: 999;
                    display: block;
                }
             
                #container {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    height: 100%;
                    padding: var(--app-bar-padding);
                    box-sizing: border-box;
                    background: var(--app-bar-background);
                    color: var(--app-bar-font-color);
                    /*box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;*/
                    box-shadow: var(--app-bar-box-shadow);
                }
                
                #label {
                    font-size: var(--app-bar-font-size);
                    display: inline-block;
                    padding: 0 0 0 12px;
                    grid-column: 2 / 3;
                }
                
                ::slotted([slot="left-content"]),
                ::slotted([slot="right-content"]) {
                    cursor: pointer;
                    color: inherit;
                    display: block;
                    padding-top: 1px;
                    padding-bottom: 1px;
                    font-size: var(--app-bar-font-size) !important; 
                }
                ::slotted([slot="left-content"]) {
                    margin-right: 10px;
                }
                ::slotted([slot="right-content"]) {
                    margin-left: 10px;
                }
                .left-content {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
                .left-content {
                    grid-column: 1 / 2;
                }
                .right-content {
                    grid-column: 3 / 4;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    position: static;
                }
            </style>
            
            <div id="container">
                <div class="left-content">
                    <slot name="left-content"></slot>
                    <span id="label"></span>
                </div>
                
                <div class="right-content">
                    <slot name="right-content"></slot>
                </div>
            </div>
        `;
  }

  connectedCallback() {
    this.container = this.shadowRoot.querySelector('#container');
    this.label = this.shadowRoot.querySelector('#label');
    if(this.hasAttribute('label')) {
      this.label.textContent = this.getAttribute('label');
    }

    this.setupEventHandlers();
  }

  handleIconClick(e) {
    const target = e.composedPath().find(el => el.assignedSlot);
    const slot = target ? target.assignedSlot.name : null;

    this.dispatchEvent(new CustomEvent('app-bar-click', {
      detail: {target, slot}
    }));
  }

  setupEventHandlers() {
    this.shadowRoot.querySelectorAll('[name$="content"]').forEach(icon => {
      icon.addEventListener('click', this.handleIconClick.bind(this));
    });
  }
}

if(!customElements.get('material-app-bar')) {
  customElements.define('material-app-bar', MaterialAppBar);
}
