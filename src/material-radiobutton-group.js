export class MaterialRadiobuttonGroup extends HTMLElement {

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
  }

  connectedCallback() {
    this.buttons = this.shadowRoot.querySelector('slot[name="radio"]').assignedNodes();

    this.buttons.forEach(button => {
      if(button.hasAttribute('checked')) {
        this.target = button;
      }
      if(this.hasAttribute('name')) {
        this.buttons.forEach(button => button.setAttribute('name', this.getAttribute('name')));
      }
      button.addEventListener('change', this.handleChange.bind(this));
    });
  }

  handleChange(e) {
    this.target = e.composedPath()[0];
    this.buttons.forEach(button => button.checked = button === this.target);
  }

  get value() {
    return this.target.value;
  }
}

if(!customElements.get('material-radiobutton-group')) {
  customElements.define('material-radiobutton-group', MaterialRadiobuttonGroup);
}
