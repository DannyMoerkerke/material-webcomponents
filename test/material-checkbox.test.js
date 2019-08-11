import '../src/material-checkbox.js';

describe('material-checkbox', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-checkbox');

    document.body.appendChild(element);
  });

  it('should toggle the "checked" attribute when clicked', () => {
    const spy = sinon.spy(element, 'dispatchEvent');

    const event = {
      stopPropagation() {

      }
    };

    element.input.checked = true;
    element.handleClick(event);

    expect(element.hasAttribute('checked')).to.eql(true);
    expect(spy.args[0][0].detail.checked).to.eql(true);

    spy.resetHistory();

    element.input.checked = false;
    element.handleClick(event);

    expect(element.hasAttribute('checked')).to.eql(false);
    expect(spy.args[0][0].detail.checked).to.eql(false);
  });

  it('should set the "name" and "value" attribute on the input', () => {
    const value = 'foo';
    const name = 'bar';

    element.setAttribute('value', value);
    element.setAttribute('name', name);

    expect(element.input.value).to.eql(value);
    expect(element.input.name).to.eql(name);
  });

  it('should set the "checked" attribute on the input', () => {
    element.setAttribute('checked', '');

    expect(element.input.checked).to.eql(true);
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

  it('should return the value only when the checkbox is checked', () => {
    const value = 'foo';
    element.setAttribute('value', value);

    expect(element.value).to.eql(undefined);

    element.checked = true;
    expect(element.value).to.eql(value);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
