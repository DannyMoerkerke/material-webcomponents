import '../src/material-drawer.js';

describe('material-drawer', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-drawer');

    document.body.appendChild(element);
  });

  it('should open and close when the "open" property is toggled', () => {
    element.setAttribute('open', '');

    expect(element.container.classList.contains('open')).to.eql(true);

    element.removeAttribute('open');
    expect(element.container.classList.contains('open')).to.eql(false);
  });

  it('should set the correct attribute and class when the "open" method is called', () => {
    element.open();

    expect(element.hasAttribute('open')).to.eql(true);
    expect(element.container.classList.contains('open')).to.eql(true);
  });

  it('should remove the correct attribute and class when the "close" method is called', () => {
    element.close();

    expect(element.hasAttribute('open')).to.eql(false);
    expect(element.container.classList.contains('open')).to.eql(false);
  });

  it('should call the correct method when the "toggle" method is called based on whether the drawer is open or not', () => {
    const spy1 = sinon.spy(element, 'open');
    const spy2 = sinon.spy(element, 'close');

    element.setAttribute('open', '');
    element.toggle();

    expect(element.open.called).to.eql(false);
    expect(element.close.called).to.eql(true);

    spy2.resetHistory();

    element.toggle();

    expect(element.open.called).to.eql(true);
    expect(element.close.called).to.eql(false);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
