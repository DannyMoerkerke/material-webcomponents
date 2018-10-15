import '../src/material-dialog.js';

describe('material-dialog', () => {
    let element;

    beforeEach(() => {
        element = document.createElement('material-dialog');

        document.body.appendChild(element);
    });

    it('should open the modal', () => {
        element.open();

        expect(element.style.display).to.eql('block');
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

    it('should hide the modal only when the fadeout animation on the backdrop has ended', () => {
        element.handleAnimationEnd({animationName: 'fadeout'});

        expect(element.style.display).to.eql('none');
        expect(element.backdrop.classList.contains('close')).to.eql(false);

        element.open();
        element.handleAnimationEnd({animationName: 'foo'});

        expect(element.style.display).to.not.eql('none');
    });

    afterEach(() => {
        document.body.removeChild(element);
    });
});
