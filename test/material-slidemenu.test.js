describe('material-slidemenu', () => {
    let element;
    const items = [
        'javascript',
        'php',
        'scala',
        'python',
        'typescript'
    ];

    beforeEach(() => {
        element = document.createElement('material-slidemenu');
        const frag = document.createDocumentFragment();

        items.forEach(item => {
            const link = document.createElement('a');
            link.setAttribute('slot', 'item');
            link.href = `/${item}`;
            link.textContent = item;

            frag.appendChild(link);
        });

        element.setAttribute('label', 'Menu');
        element.appendChild(frag);

        document.body.appendChild(element);
    });

    it('should set the label', () => {
        expect(element.nav.textContent.trim()).to.eql('Menu');
    });

    it('should toggle the menu', () => {
        const event = {
            composedPath() {
                return [element.labelElement];
            }
        };

        element.toggleMenu(event);
        expect(element.nav.classList.contains('open')).to.eql(true);

        element.toggleMenu(event);
        expect(element.nav.classList.contains('open')).to.eql(false);
    });

    it('should set the menu to the correct height when opened', () => {
        const labelHeight =  parseInt(getComputedStyle(element.nav).getPropertyValue('--label-height'), 10);
        const numItems = element.items.length;
        const expected = `${labelHeight * numItems}px`
        const actual = element.nav.style.getPropertyValue('--open-height');

        expect(actual).to.eql(expected)
    });

    it('should set the z-index of the container to "0" when the menu is opened', () => {
        element.nav.classList.add('open');

        element.handleTransitionEnd();

        expect(element.container.style.zIndex).to.eql('0');
    });

    it('should set the z-index of the container to "0" when the menu is opened', () => {
        element.nav.classList.add('open');

        element.handleTransitionEnd();

        expect(element.container.style.zIndex).to.eql('0');
    });

    it('should NOT set the z-index of the container to "0" when the menu is closed', () => {
        element.container.style.zIndex = '-1';
        element.handleTransitionEnd();

        expect(element.container.style.zIndex).to.eql('-1');
    });

    afterEach(() => {
        document.body.removeChild(element);
    });
});
