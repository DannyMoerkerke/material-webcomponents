import CustomElement from './custom-element.js';
import {increment, decrement} from './actions/index.js'

export default class TestElement extends CustomElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    render() {
        this.shadowRoot.innerHTML = this.html`
            
            <p>${this.state.counter}</p>
            <button id="increment">increment</button>
            <button id="decrement">decrement</button>
        `;

        this.shadowRoot.querySelector('#increment').addEventListener('click', () => {
            this.dispatch(increment(1));
        });

        this.shadowRoot.querySelector('#decrement').addEventListener('click', () => {
            this.dispatch(decrement(1));
        });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attr, oldVal, newVal) {

    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }
}

customElements.define('test-element', TestElement);
