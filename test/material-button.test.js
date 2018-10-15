describe('material-button', function() {
    let element;

    this.timeout(4000);

    beforeEach(done => {
        element = document.createElement('material-button');
        element.setAttribute('label', 'ok');

        document.body.appendChild(element);

        customElements.whenDefined('material-button')
        .then(() => done());
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
