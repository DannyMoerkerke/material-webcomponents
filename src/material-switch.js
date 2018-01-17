export default class MaterialSwitch extends HTMLElement {

    static get observedAttributes() {
        return ['on'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    --track-color: #bdbdbd;
                    --switch-color: #f5f5f5;
                }
                :host([on]) {
                    --track-color: #337ab7;
                    --switch-color: #337ab7;
                }
                :host([on]) #switch {
                    left: calc(100% - 20px);
                }
                :host([on]) #track {
                    opacity: 0.5;
                }
                
                #container {
                    width: 36px;
                    height: 14px;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                #track {
                    width: 36px;
                    height: 14px;
                    background-color: var(--track-color);
                    border-radius: 7px;
                    box-sizing: border-box;
                }
                #switch {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
                    background-color: var(--switch-color);
                    transition: left 0.2s linear;
                }
                input {
                    display: none;
                }
            </style>
            
            <div id="container">
                <div id="track"></div>
                <div id="switch"></div>
            </div>
            <input type="checkbox">
        
        `;

        this.container = this.shadowRoot.querySelector('#container');
        this.input = this.shadowRoot.querySelector('input');
    }

    connectedCallback() {
        this.container.addEventListener('click', this.toggle.bind(this));
    }

    attributeChangedCallback() {
        this.input.checked = this.hasAttribute('on');
    }

    toggle() {
        if(this.hasAttribute('on')) {
            this.removeAttribute('on');
        }
        else {
            this.setAttribute('on', '');
        }

        this.input.checked = this.hasAttribute('on');
    }
}

customElements.define('material-switch', MaterialSwitch);
