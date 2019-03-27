import '../src/material-slidemenu.js';

describe('material-slidemenu', () => {
  let element;
  const items = [
    'javascript',
    'php',
    'scala',
    'python',
    'typescript'
  ];

  beforeEach(() => {
    element = document.createElement('material-slidemenu');
    const frag = document.createDocumentFragment();

    items.forEach(item => {
      const link = document.createElement('a');
      link.setAttribute('slot', 'item');
      link.href = `/${item}`;
      link.textContent = item;

      frag.appendChild(link);
    });

    element.setAttribute('label', 'Menu');
    element.appendChild(frag);

    document.body.appendChild(element);
  });

  it('should set the label', () => {
    expect(element.nav.textContent.trim()).to.eql('Menu');
  });

  it('should toggle the menu', () => {
    const event = {
      composedPath() {
        return [element.labelElement];
      }
    };

    element.toggleMenu(event);
    expect(element.nav.classList.contains('open')).to.eql(true);

    element.toggleMenu(event);
    expect(element.nav.classList.contains('open')).to.eql(false);
  });

  it('should set the menu to the correct height when opened', () => {
    const labelHeight = parseInt(getComputedStyle(element.nav).getPropertyValue('--label-height'), 10);
    const numItems = element.items.length;
    const expected = `${labelHeight * numItems}px`;
    const actual = element.nav.style.getPropertyValue('--open-height');

    expect(actual).to.eql(expected);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
