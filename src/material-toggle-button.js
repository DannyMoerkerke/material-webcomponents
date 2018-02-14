export default class MaterialToggleButton extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                .container {
                    display: inline-block;
                }
                button {
                    background: var(--inactive-color, #cccccc);
                    border-color: var(--inactive-color, #cccccc);
                    font-size: var(--button-font-size, 1em);
                    outline: none;
                    cursor: pointer;
                }
                
                .left {
                    border-radius: 4px 0 0 4px;
                    margin-right: -2px;
                    padding: 1px 16px 6px 16px;
                    border-right: none;
                    
                }
                .right {
                    border-radius: 0 4px 4px 0;
                    margin-left: -2px;
                    padding: 1px 16px 6px 16px;
                    border-left: none;
                }
                
                @keyframes activate {
                    from {
                        background: var(--inactive-color, #cccccc);
                        border-color: var(--inactive-color, #cccccc);
                        color: var(--font-inactive-color, #999999);
                    }
                    to {
                        background: var(--active-color, #999999);
                        border-color: var(--active-color, #cccccc);
                        color: var(--font-active-color, #cccccc);
                    }
                }
                
                .active {
                    animation-name: activate;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                }
                
            </style>
            
            <div class="container">
                <button type="button" class="left"></button>
                <button type="button" class="right"></button>
            </div>
        `;
    }

    connectedCallback() {
        this.container = this.shadowRoot.querySelector('.container');
        this.leftButton = this.shadowRoot.querySelector('.left');
        this.rightButton = this.shadowRoot.querySelector('.right');

        if(this.hasAttribute('left')) {
            this.leftButton.textContent = this.getAttribute('left');
            this.leftButton.value = this.getAttribute('left');
        }

        if(this.hasAttribute('right')) {
            this.rightButton.textContent = this.getAttribute('right');
            this.rightButton.value = this.getAttribute('right');
        }

        if(this.hasAttribute('active') && this.getAttribute('active') === 'right') {
            this.rightButton.classList.add('active');
        }
        else {
            this.leftButton.classList.add('active');
        }

        this.container.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e) {
        const button = e.composedPath()[0];

        if(!button.classList.contains('active')) {
            this.dispatchEvent(new CustomEvent('button-clicked', {
                detail: {button}
            }));

            this.leftButton.classList.toggle('active');
            this.rightButton.classList.toggle('active');
        }
    }
}

customElements.define('material-toggle-button', MaterialToggleButton);
