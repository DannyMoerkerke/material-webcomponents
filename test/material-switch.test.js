import '../src/material-switch.js';

describe('material-switch', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-switch');

    document.body.appendChild(element);
  });

  it('should call the toggle method when clicked and not disabled', () => {
    const spy = sinon.spy(element, 'toggle');

    element.handleClick();

    expect(spy.called).to.eql(true);
  });

  it('should NOT call the "toggle" method when clicked and disabled', () => {
    const spy = sinon.spy(element, 'toggle');

    element.setAttribute('disabled', '');
    element.handleClick();

    expect(spy.called).to.eql(false);
  });

  it('should set the label with the "label" attribute', () => {
    const spy = sinon.spy(element.label, 'removeChild');
    const oldLabel = 'old label';
    const newLabel = 'new label';
    const oldNode = document.createTextNode(oldLabel);

    element.setAttribute('label', oldLabel);
    expect(element.label.textContent.trim()).to.eql(oldLabel);

    element.setAttribute('label', newLabel);
    expect(spy.args[0][0]).to.eql(oldNode);
    expect(element.label.textContent.trim()).to.eql(newLabel);
  });

  it('should toggle the "on" attribute when the "toggle" method is called', () => {
    element.toggle();
    expect(element.hasAttribute('on')).to.eql(true);

    element.toggle();
    expect(element.hasAttribute('on')).to.eql(false);
  });

  it('should dispatch an event when the switch is toggled', () => {
    const spy = sinon.spy(element, 'dispatchEvent');

    element.toggle();

    expect(spy.called).to.eql(true);
  });

  it('should reflect to the "value" property whether the element has the "on" attribute', () => {
    element.setAttribute('on', '');
    expect(element.value).to.eql(true);

    element.removeAttribute('on');
    expect(element.value).to.eql(false);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
