import '../src/material-dialog.js';

describe('material-dialog', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-dialog');
  });

  it('should open the modal', () => {
    document.body.appendChild(element);

    element.open();

    expect(element.style.display).to.eql('block');
  });

  it('should close when the backdrop is clicked', () => {
    document.body.appendChild(element);

    const spy = sinon.spy(element, 'close');

    const event = {
      composedPath() {
        return [element.backdrop];
      }
    };

    element.handleClick(event);

    expect(element.close.called).to.eql(true);
  });

  it('should NOT close when the "modal" attribute is set and the backdrop is clicked', () => {
    document.body.appendChild(element);

    const spy = sinon.spy(element, 'close');

    const event = {
      composedPath() {
        return [element.backdrop];
      }
    };

    element.setAttribute('modal', '');
    element.handleClick(event);

    expect(element.close.called).to.eql(false);
  });

  it('should hide the modal only when the fadeout animation on the backdrop has ended', () => {
    document.body.appendChild(element);

    element.handleAnimationEnd({animationName: 'fadeout'});

    expect(element.style.display).to.eql('none');
    expect(element.backdrop.classList.contains('close')).to.eql(false);

    element.open();
    element.handleAnimationEnd({animationName: 'foo'});

    expect(element.style.display).to.not.eql('none');
  });

  it('should change the contents of the header through the "header" property', () => {
    element.insertAdjacentHTML('beforeend', '<h1 slot="header"></h1>');
    document.body.appendChild(element);

    element.header = 'Dialog header';

    expect(element.header.outerHTML).to.eql('<h1 slot="header">Dialog header</h1>');
  });

  it('should change the contents of the body through the "body" property', () => {
    element.insertAdjacentHTML('beforeend', '<p slot="body"></p>');
    document.body.appendChild(element);

    element.body = 'Dialog body';

    expect(element.body.outerHTML).to.eql('<p slot="body">Dialog body</p>');
  });

  it('should change the contents of the footer through the "footer" property', () => {
    element.insertAdjacentHTML('beforeend', '<p slot="footer"></p>');
    document.body.appendChild(element);

    element.footer = 'Dialog footer';

    expect(element.footer.outerHTML).to.eql('<p slot="footer">Dialog footer</p>');
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
