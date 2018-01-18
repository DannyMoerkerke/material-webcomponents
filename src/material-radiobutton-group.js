export default class MaterialRadiobuttonGroup extends HTMLElement {

    static get observedAttributes() {
        return ['name'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = this.innerHTML;

        this.target = {
            value: null
        };
        this.buttons = this.shadowRoot.querySelectorAll('material-radiobutton');

        this.buttons.forEach(button => {
            if(button.hasAttribute('checked')) {
                this.target = button;
            }
        });
    }

    connectedCallback() {
        this.buttons[0].getRootNode().host.addEventListener('change', e => {
            this.target = e.composedPath()[0];

            this.buttons.forEach(button => button.checked = button === this.target);
        });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'name') {
            this.buttons.forEach(button => button.setAttribute('name', newVal));
        }
    }

    get value() {
        return this.target.value;
    }
}

customElements.define('material-radiobutton-group', MaterialRadiobuttonGroup);
