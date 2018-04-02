describe('material-dropdown', () => {
    let element;
    const options = ['Javascript', 'PHP'];

    beforeEach(function() {
        element = document.createElement('material-dropdown');

        const icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.setAttribute('slot', 'icon');
        icon.textContent = 'menu';
        element.appendChild(icon);

        options.forEach(opt => {
            const option = document.createElement('option');
            option.setAttribute('slot', 'option');
            option.textContent = opt;

            element.appendChild(option);
        });

        document.body.appendChild(element);
    });

    it('should be closed by default', () => {
        expect(element.open).to.eql(false);
    });

    it('should open and close when the "open" property is toggled', () => {
        expect(element.hasAttribute('open')).to.eql(false);
        element.setAttribute('open', '');

        expect(element.hasAttribute('open')).to.eql(true);

        element.removeAttribute('open');
        expect(element.hasAttribute('open')).to.eql(false);
    });

    it('should set the correct attribute and class when the "openMenu" method is called', () => {
        expect(element.hasAttribute('open')).to.eql(false);
        expect(element.menuContainer.classList.contains('open')).to.eql(false);

        element.openMenu();

        expect(element.hasAttribute('open')).to.eql(true);
        expect(element.menuContainer.classList.contains('open')).to.eql(true);
    });

    it('should remove the correct attribute and class when the "closeMenu" method is called', () => {
        element.openMenu();
        element.closeMenu();

        expect(element.hasAttribute('open')).to.eql(false);
        expect(element.menuContainer.classList.contains('open')).to.eql(false);
    });

    it('should open and close the menu when the icon is clicked', () => {
        const spy1 = sinon.spy(element, 'openMenu');
        const spy2 = sinon.spy(element, 'closeMenu');

        const event = {
            composedPath() {
                return [element.icon];
            }
        };

        element.handleClick(event);

        expect(element.open).to.eql(true);
        expect(spy1.called).to.eql(true);
        expect(spy2.called).to.eql(false);

        // spy1.restore();
        element.handleClick(event);

        expect(element.open).to.eql(false);
        expect(spy1.called).to.eql(true);
        expect(spy2.called).to.eql(true);
    });

    it('should call the notifyChange and closeMenu methods when an option is clicked', () => {
        const spy1 = sinon.spy(element, 'notifyChange');
        const spy2 = sinon.spy(element, 'closeMenu');
        const option = document.createElement('option');
        const value = 'chosen value';
        option.setAttribute('value', value);

        const event = {
            composedPath() {
                return [option];
            }
        };

        element.handleClick(event);

        expect(spy1.args[0][0]).to.eql(value);
        expect(spy2.called).to.eql(true);
    });

    it('should set the "value" attribute and dispatch an event when notifyChange is called', () => {
        const spy = sinon.spy(element, 'dispatchEvent');
        const value = 'chosen value';
        const expected = new CustomEvent('dropdown-menu-value-changed', {
                detail: {
                    value
                }
            });

        element.notifyChange(value);

        expect(element.getAttribute('value')).to.eql(value);
        expect(spy.args[0][0].detail).to.eql(expected.detail);
    });
});