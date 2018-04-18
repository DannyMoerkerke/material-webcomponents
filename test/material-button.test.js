describe('material-button', () => {
    let element;

    beforeEach(function() {
        element = document.createElement('material-button');
        element.setAttribute('label', 'ok');

        document.body.appendChild(element);
    });

    it('should display the label', () => {
        expect(element.label.textContent).to.eql('ok');
    });

    it('should reflect the "disabled" attribute to the button', () => {
        element.disabled = true;

        expect(element.button.disabled).to.eql(true);
        expect(element.hasAttribute('disabled')).to.eql(true);

        element.disabled = false;

        expect(element.button.disabled).to.eql(false);
        expect(element.hasAttribute('disabled')).to.eql(false);
    });
});