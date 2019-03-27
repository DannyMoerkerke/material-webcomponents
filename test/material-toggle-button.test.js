import '../src/material-toggle-button.js';

describe('material-toggle-button', () => {
  let element;
  const left = 'closed';
  const right = 'open';

  beforeEach(() => {
    element = document.createElement('material-toggle-button');
    element.setAttribute('left', left);
    element.setAttribute('right', right);

    // document.body.appendChild(element);
  });

  it('should set the correct text and value to the buttons', () => {
    document.body.appendChild(element);
    expect(element.leftButton.textContent).to.eql(left);
    expect(element.leftButton.value).to.eql(left);
    expect(element.rightButton.textContent).to.eql(right);
    expect(element.rightButton.value).to.eql(right);
  });

  it('should activate the left button with the "active" attribute', () => {
    // document.body.removeChild(element);

    element.setAttribute('active', 'left');

    document.body.appendChild(element);
    expect(element.leftButton.classList.contains('active')).to.eql(true);
    expect(element.rightButton.classList.contains('active')).to.eql(false);


  });

  it('should activate the right button with the "active" attribute', () => {
    // document.body.removeChild(element);

    element.setAttribute('active', 'right');

    document.body.appendChild(element);
    expect(element.leftButton.classList.contains('active')).to.eql(false);
    expect(element.rightButton.classList.contains('active')).to.eql(true);
  });

  it('should activate the correct button when clicked', () => {
    document.body.appendChild(element);

    const spy = sinon.spy(element, 'dispatchEvent');
    const button = element.rightButton;
    const expected = new CustomEvent('button-clicked', {
      detail: {button}
    });
    let event = {
      composedPath() {
        return [button];
      }
    };

    element.handleClick(event);

    expect(element.leftButton.classList.contains('active')).to.eql(false);
    expect(element.rightButton.classList.contains('active')).to.eql(true);
    expect(spy.args[0][0].detail).to.eql(expected.detail);
  });

  it('should NOT activate a button which is already active when clicked', () => {
    document.body.appendChild(element);

    expect(element.leftButton.classList.contains('active')).to.eql(true);

    const spy = sinon.spy(element, 'dispatchEvent');
    const button = element.leftButton;

    let event = {
      composedPath() {
        return [button];
      }
    };

    element.handleClick(event);

    expect(element.leftButton.classList.contains('active')).to.eql(true);
    expect(element.rightButton.classList.contains('active')).to.eql(false);
    expect(spy.called).to.eql(false);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
