export class MaterialCard extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-background: #ffffff;
                    --header-background: #ffffff;
                    --body-background: #ffffff;
                    --footer-background: #ffffff;
                    --card-width: auto;
                    --card-height: auto;
                    display: block;
                }
               
                #container {
                    display: grid;
                    grid-template-rows: minmax(min-content, 72px) 1fr minmax(min-content, 72px);
                    width: var(--card-width);
                    height: var(--card-height);
                    background: var(--card-background);
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,.24),0 -2px 0 #eeeeee;
                    border-radius: 3px;
                    overflow: hidden;
                }
                header {
                    background: var(--header-background);
                    display: flex;
                    flex-direction: column;
                    /*align-items: center;*/
                    padding: 16px;
                }
                main {
                    background: var(--body-background);
                    padding: 16px;
                }
                footer {
                    background: var(--footer-background);
                    display: flex;
                    align-items: center;
                    padding: 16px;
                }
                ::slotted([slot="header"]) {
                    margin: 0 0 8px 0;
                }
                ::slotted([slot="subheader"]) {
                    margin: 0px;
                }
                ::slotted([slot]:empty) {
                    margin: 0px;
                }
            </style>
            
            <div id="container">
                <header>
                    <slot name="header"></slot>
                    <slot name="subheader"></slot>
                </header>
                <main>
                    <slot name="media"></slot>
                    <slot name="body"></slot>
                </main>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        `;

  }
}

if(!customElements.get('material-card')) {
  customElements.define('material-card', MaterialCard);
}
