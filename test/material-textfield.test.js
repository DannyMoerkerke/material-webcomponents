import '../src/material-textfield.js';

describe('material-textfield', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-textfield');
    element.setAttribute('value', 'value 1');

    document.body.appendChild(element);
  });

  it('should set the "type" attribute to the input when it is an allowed value', () => {
    document.body.removeChild(element);
    element.setAttribute('type', 'email');
    document.body.appendChild(element);

    expect(element.input.type).to.eql('email');

  });

  it('should set the "type" attribute to the input when it is an allowed value', () => {
    document.body.removeChild(element);
    element.setAttribute('type', 'email');
    document.body.appendChild(element);

    expect(element.input.type).to.eql('email');

  });

  it('should keep the type of the input as "text" when the "type" attribute is not an allowed value', () => {
    document.body.removeChild(element);
    element.setAttribute('type', 'color');
    document.body.appendChild(element);

    expect(element.input.type).to.eql('text');

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

  it('should dispatch an event when the input changes', () => {
    const spy = sinon.spy(element, 'dispatchEvent');
    const expected = new CustomEvent('change', {
      detail: {
        value: 'foo'
      }
    });
    element.input.value = 'foo';
    element.handleKeyUp();

    expect(spy.calledWith(expected)).to.eql(true);
    expect(element.input.classList.contains('invalid')).to.eql(false);
  });

  it('should display the correct error message', () => {
    const errorMessage = 'this field is required';

    element.setAttribute('error-required', errorMessage);

    element.input.value = 'foo';
    element.handleKeyUp();
    element.input.value = '';
    element.handleBlur();

    expect(element.error.textContent).to.eql(errorMessage);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
