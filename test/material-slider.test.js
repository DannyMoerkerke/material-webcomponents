describe('material-slider', () => {
    let element;
    const hex = '#b8b8b8';
    const rgba1 = 'rgba(184,184,184, 0.1)';
    const rgba2 = 'rgba(128, 128, 128, 1.0)';
    const rgba3 = 'rgba(128, 128, 128, 0.1)';
    const rgb = 'rgb(128, 128, 128)';

    beforeEach(function() {
        element = document.createElement('material-slider');
    });

    it('should dispatch an event when the value of the slider changes', () => {
        const spy = sinon.spy(element, 'dispatchEvent');
        const event = {
            target: {
                value: 25
            }
        };
        const expected = new CustomEvent('change', {
            detail: {
                value: event.target.value
            }
        });

        element.handleInput(event);

        expect(spy.calledWith(expected)).to.eql(true);
    });

    it('should reflect the "value" property to the attribute', () => {
        element.value = 25;

        expect(element.getAttribute('value')).to.eql('25');
    });

    it('should set the correct color of the box-shadow, from hex', () => {
        element.style.setProperty('--thumb-color', hex);
        document.body.appendChild(element);

        expect(element.style.getPropertyValue('--thumb-color-light')).to.eql(rgba1);
    });

    it('should set the correct color of the box-shadow, from rgba', () => {
        element.style.setProperty('--thumb-color', rgba2);
        document.body.appendChild(element);

        expect(element.style.getPropertyValue('--thumb-color-light')).to.eql(rgba3);
    });

    it('should set the correct color of the box-shadow, from rgb', () => {
        element.style.setProperty('--thumb-color', rgb);
        document.body.appendChild(element);

        expect(element.style.getPropertyValue('--thumb-color-light')).to.eql(rgba3);
    });
});