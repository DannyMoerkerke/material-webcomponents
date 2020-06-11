import '../src/material-app-bar.js';

describe('material-app-bar', () => {
  let element;
  const label = 'app bar';

  beforeEach(() => {
    element = document.createElement('material-app-bar');

    let icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.setAttribute('slot', 'left-content');
    icon.textContent = 'menu';
    element.appendChild(icon);

    icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.setAttribute('slot', 'right-content');
    icon.textContent = 'close';
    element.appendChild(icon);
    element.setAttribute('label', label);

    document.body.appendChild(element);
  });

  it('should display the label', () => {
    expect(element.label.textContent).to.eql(label);
  });

  it('should dispatch an event when an icon is clicked', () => {
    const spy = sinon.spy(element, 'dispatchEvent');

    const slot = element.shadowRoot.querySelector('[name="left-content"]');
    const target = slot.assignedNodes()[0];

    element.handleIconClick({
      target,
      composedPath() {
        return [target];
      }
    });

    expect(spy.args[0][0].detail.target).to.eql(target);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
