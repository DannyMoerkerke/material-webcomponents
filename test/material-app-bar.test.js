describe('material-app-bar', () => {
    let element;

    beforeEach(function() {
        element = document.createElement('material-app-bar');

        let icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.setAttribute('slot', 'left-content');
        icon.textContent = 'menu';
        element.appendChild(icon);

        icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.setAttribute('slot', 'right-content');
        icon.textContent = 'close';
        element.appendChild(icon);

        document.body.appendChild(element);
    });

    it('should display the correct content when resized', () => {
        element.handleResize({matches: true});
        expect(element.container.innerHTML).to.eql(element.shadowRoot.querySelector('#large').innerHTML);

        element.handleResize({matches: false});
        expect(element.container.innerHTML).to.eql(element.shadowRoot.querySelector('#small').innerHTML);
    });

    it('should toggle the dropdown menu when resized to small size', (done) => {
        element.handleResize({matches: false});

        setTimeout(() => {
            expect(element.menuOpen).to.eql(false);
            expect(element.dropdownMenu.style.display).to.eql('');

            element.handleMenuClick();
            expect(element.menuOpen).to.eql(true);
            expect(element.dropdownMenu.style.display).to.not.eql('');

            done();
        })
    });

    it('should dispatch an event when an icon is clicked', () => {
        const spy = sinon.spy(element, 'dispatchEvent');
        const left = element.shadowRoot.querySelector('[name="left-content"]');
        element.handleIconClick({target: left});

        expect(spy.args[0][0].detail.target).to.eql(left)
    });
});