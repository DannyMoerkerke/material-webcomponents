describe('material-textfield', () => {
    let element;

    beforeEach(function() {
        element = document.createElement('material-textfield');
        element.setAttribute('value', 'value 1');

        document.body.appendChild(element);
    });

    it('should reflect the "value" attribute to the value of the input', () => {
        expect(element.input.value).to.eql('value 1');
    });

    it('should reflect the "value" property to the value of the input', () => {
        element.value = 'value prop';
        expect(element.input.value).to.eql('value prop');

        element.input.value = 'input value';
        expect(element.value).to.eql('input value');
    });

    it('should reflect the attributes "value", "name" to the input when changed', () => {
        element.setAttribute('value', 'value 2');
        expect(element.input.value).to.eql('value 2');

        element.setAttribute('name', 'foo');
        expect(element.input.name).to.eql('foo');
    });

    it('should reflect the "label" attribute to the textContent of the label', () => {
        element.setAttribute('label', 'a label');
        expect(element.label.textContent).to.eql('a label');
    });
});