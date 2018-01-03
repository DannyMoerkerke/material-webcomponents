
export default class DataRepeater extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.html = this.innerHTML;
    }

    set data(data) {
        const pattern = /\${(.+?)}/g;

        this.shadowRoot.innerHTML = data.reduce((acc, item) => {
            let match;
            let html = this.html;
            while((match = pattern.exec(html))) {
                html = `${html.replace(match[0], item[match[1]])}`;
            }

            return `${acc}${html}`;
        }, '');
    }
}

customElements.define('data-repeater', DataRepeater);

