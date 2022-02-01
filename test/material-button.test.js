import '../src/material-button.js';

describe('material-button', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('material-button');
    element.setAttribute('label', 'ok');

    document.body.appendChild(element);
  });

  it('should display the label', () => {
    expect(element.label.textContent).to.eql('ok');
  });

  it('should reflect the "disabled" attribute to the button', () => {
    element.disabled = true;

    expect(element.button.disabled).to.eql(true);
    expect(element.hasAttribute('disabled')).to.eql(true);

    element.disabled = false;

    expect(element.button.disabled).to.eql(false);
    expect(element.hasAttribute('disabled')).to.eql(false);
  });

  it('should not reflect the "toggled" attribute when an icon and toggle icon are not present', () => {
    element.toggled = true;

    expect(element.hasAttribute('toggled')).to.eql(false);
  });

  it('should only reflect the "toggled" attribute to the button when both an icon and a toggle icon are present', () => {
    document.body.removeChild(element);

    element.insertAdjacentHTML(`beforeend`, `<i class="material-icons" slot="left-icon">videocam</i>
            <i class="material-icons" slot="toggle-icon">videocam_off</i>`)

    document.body.appendChild(element);

    element.toggled = true;

    expect(element.hasAttribute('toggled')).to.eql(true);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
