export default class CustomElement extends HTMLElement {
    constructor() {
        super();

        this.state = {};
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
