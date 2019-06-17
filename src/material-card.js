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
                    display: block;
                }
               
                #container {
                    display: grid;
                    grid-template-rows: 1fr 3fr 1fr;
                    width: var(--card-width);
                    height: var(--card-height);
                    background: var(--card-background);
                    box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12);
                    border-radius: 3px;
                    overflow: hidden;
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
            </style>
            
            <div id="container">
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
        `;

  }

  connectedCallback() {

  }
}

customElements.define('material-card', MaterialCard);
