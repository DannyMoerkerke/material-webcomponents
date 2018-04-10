export default class CustomElement extends HTMLElement {
    constructor() {
        super();

        this.state = {};

        this.data = new Proxy(this, {
            set(target, prop, value) {
                console.log('proxy', prop, value);
                target[prop] = value;

                target.updateBindings(prop, value);

                return true;
            }
        });
    }

    updateBindings(prop, value = '') {
        const bound = this.shadowRoot.querySelectorAll(`[data-bind="${prop}"]`);

        if(value === null) {
            value = '';
        }

        if(bound.length) {
            bound.forEach(node => node.textContent = value.toString());
        }
    }

    setState(newState) {
        Object.keys(newState).forEach(key => this.state[key] = newState[key]);
        this.render();
    }

    set store(store) {
        this.setState(store.getState());
    }

    dispatch(action) {
        document.dispatchEvent(new CustomEvent('action', {
            detail: {
                action
            }
        }));
    }

    html(templateObject, ...substs) {
        const raw = templateObject.raw;

        let result = substs.reduce((acc, subst, i) => `${acc}${raw[i]}${subst}`, '');

        result += raw[raw.length-1];

        return result;
    };

    show() {
        this.style.display = '';
        this.removeAttribute('hidden');
    }

    hide() {
        this.style.display = 'none';
        this.setAttribute('hidden', '');
    }


}
