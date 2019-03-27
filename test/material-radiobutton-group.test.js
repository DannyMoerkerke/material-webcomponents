import '../src/material-radiobutton-group.js';
import '../src/material-radiobutton.js';

describe('material-radiobutton-group', () => {
  let element;

  let data = [
    {
      label: 'Javascript',
      value: 'javascript'
    },
    {
      label: 'Typescript',
      value: 'typescript'
    },
    {
      label: 'Scala',
      value: 'scala'
    }
  ];

  beforeEach(() => {
    element = document.createElement('material-radiobutton-group');

    data.forEach(item => {
      const radio = document.createElement('material-radiobutton');
      radio.setAttribute('slot', 'radio');
      radio.setAttribute('label', item.label);
      radio.setAttribute('value', item.value);
      element.appendChild(radio);
    });

    document.body.appendChild(element);
  });

  it('should only set a single radiobutton as checked', () => {
    let event = {
      composedPath() {
        return [element.buttons[0]];
      }
    };

    element.handleChange(event);
    expect(element.buttons[0].hasAttribute('checked')).to.eql(true);

    event = {
      composedPath() {
        return [element.buttons[1]];
      }
    };

    element.handleChange(event);

    expect(element.buttons[1].hasAttribute('checked')).to.eql(true);
    expect(element.buttons[0].hasAttribute('checked')).to.eql(false);
  });

  it('should set the "name" attribute on the material-radiobutton-group to all material-radiobuttons ', () => {
    document.body.removeChild(element);

    const name = 'foo';
    element.setAttribute('name', name);

    document.body.appendChild(element);

    element.buttons.forEach(button => {
      expect(button.getAttribute('name')).to.eql(name);
    });
  });

  it('should set the radiobutton which is checked as its target in the connectedCallback', () => {
    document.body.removeChild(element);

    data.forEach(item => {
      const radio = document.createElement('material-radiobutton');
      radio.setAttribute('slot', 'radio');
      radio.setAttribute('label', item.label);
      radio.setAttribute('value', item.value);
      element.appendChild(radio);
    });

    element.buttons[1].setAttribute('checked', '');

    document.body.appendChild(element);

    expect(element.target).to.eql(element.buttons[1]);
    expect(element.value).to.eql(element.target.value);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
