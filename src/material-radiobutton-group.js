export default class MaterialRadiobuttonGroup extends HTMLElement {

    static get observedAttributes() {
        return ['name'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <div>
                <slot name="radio"></slot>
            </div>
        `;

        this.target = {
            value: null
        };

        this.buttons = this.shadowRoot.querySelector('slot[name="radio"]').assignedNodes();
        this.buttons.forEach(button => {
            if(button.hasAttribute('checked')) {
                this.target = button;
            }
            button.addEventListener('change', this.handleChange.bind(this));
        });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'name') {
            this.buttons.forEach(button => button.setAttribute('name', newVal));
        }
    }

    handleChange(e) {
        this.target = e.composedPath()[0];
        this.buttons.forEach(button => button.checked = button === this.target);
    }

    get value() {
        return this.target.value;
    }
}

customElements.define('material-radiobutton-group', MaterialRadiobuttonGroup);
