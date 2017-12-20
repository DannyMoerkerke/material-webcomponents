export default class IconButton extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                button {
                    border: var(--button-border, none);
                    border-radius: var(--button-border-radius, none);
                    background: var(--button-background, transparent);
                    color: var(--icon-color, #000000);
                    padding: 0;
                    text-align: center;
                    line-height: 50%;
                    cursor: pointer;
                }
                ::slotted([slot="icon"]) {
                    margin: var(--icon-spacing, 5px);
                }
            </style>
            
            <button>
                <slot name="icon"></slot>
            </button>
        `;
    }

    connectedCallback() {

    }

    attributeChangedCallback(attr, oldVal, newVal) {

    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }
}

customElements.define('icon-button', IconButton);
