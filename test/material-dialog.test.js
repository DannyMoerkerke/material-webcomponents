describe('material-dialog', () => {
    let element;

    beforeEach(function() {
        element = document.createElement('material-dialog');

        document.body.appendChild(element);
    });

    it('should close when the backdrop is clicked', () => {
        const spy = sinon.spy(element, 'close');

        const event = {
            composedPath() {
                return [element.backdrop]
            }
        };

        element.handleClick(event);

        expect(element.close.called).to.eql(true);
    });

    it('should NOT close when the "modal" attribute is set and the backdrop is clicked', () => {
        const spy = sinon.spy(element, 'close');

        const event = {
            composedPath() {
                return [element.backdrop]
            }
        };

        element.setAttribute('modal', '');
        element.handleClick(event);

        expect(element.close.called).to.eql(false);
    });
});