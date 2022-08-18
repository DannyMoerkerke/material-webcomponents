import '../src/material-dropdown.js';

describe('material-dropdown', () => {
  let element;
  const options = ['javascript', 'php'];

  beforeEach(() => {
    element = document.createElement('material-dropdown');

    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.setAttribute('slot', 'icon');
    icon.textContent = 'menu';
    element.appendChild(icon);

    options.forEach(opt => {
      const option = document.createElement('li');
      option.setAttribute('slot', 'option');
      option.setAttribute('value', opt);
      option.textContent = opt;

      element.appendChild(option);
    });

    document.body.appendChild(element);
  });

  it('should be closed by default', () => {
    expect(element.open).to.eql(false);
  });

  it('should open and close when the "open" property is toggled', () => {
    expect(element.hasAttribute('open')).to.eql(false);
    element.setAttribute('open', '');

    expect(element.hasAttribute('open')).to.eql(true);

    element.removeAttribute('open');
    expect(element.hasAttribute('open')).to.eql(false);
  });

  it('should set the correct attribute when the "openMenu" method is called', () => {
    expect(element.hasAttribute('open')).to.eql(false);
    expect(element.menuContainer.classList.contains('open')).to.eql(false);

    element.openMenu();

    expect(element.hasAttribute('open')).to.eql(true);
  });

  it('should call "setupMenu" when "menuInitialized" is false', () => {
    const spy1 = sinon.spy(element, 'setupMenu');

    element.menuInitialized = true;
    element.openMenu();

    expect(spy1.called).to.eql(false);

    element.menuInitialized = false;
    element.openMenu();

    expect(spy1.called).to.eql(true);
  })

  it('should remove the correct attribute and class when the "closeMenu" method is called', done => {
    element.openMenu();
    element.closeMenu();

    setTimeout(() => {
      expect(element.hasAttribute('open')).to.eql(false);
      expect(element.menuContainer.classList.contains('open')).to.eql(false);

      done();
    }, 100);
  });

  it('should open and close the menu when the icon is clicked', () => {
    const spy1 = sinon.spy(element, 'openMenu');
    const spy2 = sinon.spy(element, 'closeMenu');

    const event = {
      composedPath() {
        return [element.icon];
      }
    };

    element.handleClick(event);

    expect(element.open).to.eql(true);
    expect(spy1.called).to.eql(true);
    expect(spy2.called).to.eql(false);

    element.handleClick(event);

    expect(element.open).to.eql(false);
    expect(spy1.called).to.eql(true);
    expect(spy2.called).to.eql(true);
  });

  it('should open the menu on the left of the icon if it should otherwise go off the screen', (done) => {
    document.body.removeChild(element);
    element.style.marginLeft = '3000px';
    document.body.appendChild(element);

    element.setupMenu();

    setTimeout(() => {
      expect(element.menuContainer.style.right).to.eql('0px');
      done();
    });
  });

  it('should call the notifyChange and closeMenu methods when an option is clicked', (done) => {
    const spy1 = sinon.spy(element, 'notifyChange');
    const spy2 = sinon.spy(element, 'closeMenu');

    const value = element.options[0].getAttribute('value');

    const event = {
      composedPath() {
        return [element.options[0]];
      }
    };

    element.handleClick(event);

    expect(spy1.args[0][0]).to.eql(value);
    setTimeout(() => {
      expect(spy2.called).to.eql(true);
      done();
    }, 100)
  });

  it('should set the "value" attribute and dispatch an event when notifyChange is called', () => {
    const spy = sinon.spy(element, 'dispatchEvent');
    const value = 'chosen value';
    const expected = new CustomEvent('dropdown-menu-value-changed', {
      detail: {
        value
      }
    });

    element.notifyChange(value);

    expect(element.getAttribute('value')).to.eql(value);
    expect(spy.args[0][0].detail).to.eql(expected.detail);
  });

  it('should set the correct data through the setData() method with "fields" parameter', () => {
    const data = [
      {
        uri: 'uri1',
        name: 'name1'
      },
      {
        uri: 'uri2',
        name: 'name2'
      }
    ];

    const fields = {
      value: 'uri',
      label: 'name'
    };

    element.setData(data, fields);

    expect(element.menu.innerHTML).to.eql('<li value="uri1">name1</li><li value="uri2">name2</li>');
  });

  it('should set the correct data through the setData() method with "fields" parameter', () => {
    const data = [
      {
        value: 'uri1',
        label: 'name1'
      },
      {
        value: 'uri2',
        label: 'name2'
      }
    ];

    element.setData(data);

    expect(element.menu.innerHTML).to.eql('<li value="uri1">name1</li><li value="uri2">name2</li>');
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
