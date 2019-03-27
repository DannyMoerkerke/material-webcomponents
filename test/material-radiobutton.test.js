import '../src/material-radiobutton.js';

describe('material-radiobutton', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-radiobutton');
    document.body.appendChild(element);
  });

  it('should set the "checked" attribute and dispatch a change event when clicked', () => {
    const spy = sinon.spy(element, 'dispatchEvent');
    const name = 'foo';
    const value = 'bar';
    const expected = new CustomEvent('change', {
      detail: {
        name,
        value
      },
      composed: true,
      bubbles: false
    });

    element.input.name = name;
    element.input.value = value;
    element.handleClick();

    expect(element.hasAttribute('checked')).to.eql(true);
    expect(spy.args[0][0].detail).to.eql(expected.detail);
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

  it('should return the value only when the radiobutton is checked', () => {
    const value = 'foo';
    element.setAttribute('value', value);

    expect(element.value).to.eql(undefined);

    element.input.checked = true;

    expect(element.value).to.eql(value);
  });

  it('should reflect the "checked" property to the corresponding attribute', () => {
    element.checked = true;

    expect(element.hasAttribute('checked')).to.eql(true);

    element.checked = false;

    expect(element.hasAttribute('checked')).to.eql(false);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
