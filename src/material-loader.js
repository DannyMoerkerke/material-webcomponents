export default class MaterialLoader extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                #spinner {
                    box-sizing: border-box;
                    stroke: var(--spinner-color, #008000);
                    stroke-width: 3px;
                    transform-origin: 50%;
                    animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
                }
                
                @keyframes rotate {
                    from {
                        transform: rotate(0); 
                    }
                    to {
                        transform: rotate(450deg);
                    }
                }
                
                @keyframes line {
                    0% {
                        stroke-dasharray: 2, 85.964;
                        transform: rotate(0);
                    }
                    50% {
                        stroke-dasharray: 65.973, 21.9911;
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dasharray: 2, 85.964;
                        stroke-dashoffset: -65.973;
                        transform: rotate(90deg);
                    }
                }
            </style>
            
            <div id="loader">
                <svg viewBox="0 0 32 32" width="32" height="32">
                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                </svg>
            </div>
        `;
    }
}

customElements.define('material-loader', MaterialLoader);
