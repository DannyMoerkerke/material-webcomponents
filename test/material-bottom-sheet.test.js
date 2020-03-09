import '../src/material-bottom-sheet.js';

describe('material-bottom-sheet', () => {
  let element;
  document.body.style.width = '375px';
  document.body.style.height = '812px';

  const body = `<div slot="body" style="height: 200px;"></div>`;

  beforeEach(() => {
    element = document.createElement('material-bottom-sheet');
    element.insertAdjacentHTML('afterbegin', body);

    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should slide up to the correct position', () => {
    const slideHeight = element.maxSlideHeight;
    element.open();

    assert.equal(element.sheet.style.getPropertyValue('--slide-height'), `${slideHeight}px`);
  });

  it('should close when the backdrop is clicked', () => {
    const spy = sinon.spy(element, 'close');

    const event = {
      composedPath() {
        return [element.backdrop];
      }
    };

    element.handleClick(event);

    assert.equal(element.close.called, true);

    spy.restore();
  });

  it('should close only when the fadeout animation on the backdrop has ended', () => {
    element.handleAnimationEnd({animationName: 'fadeout'});

    assert.equal(element.style.display, 'none');
    assert.equal(element.backdrop.classList.contains('close'), false);

    element.open();
    element.handleAnimationEnd({animationName: 'foo'});

    assert.notEqual(element.style.display, 'none');
  });
});
