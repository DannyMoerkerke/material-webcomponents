import '../src/material-tabs.js';

describe('material-tabs', () => {
  let element;
  const numTabs = 5;

  beforeEach(() => {
    element = document.createElement('material-tabs');

    for(let i = 1; i <= numTabs; i++) {
      const div = document.createElement('div');
      div.setAttribute('slot', 'tab');
      div.dataset.title = `tab ${i}`;
      div.textContent = `This is the content for tab ${i}`;

      element.appendChild(div);
    }

    document.body.appendChild(element);
  });

  it('should add tabs with the correct title', () => {
    expect(element.tabs.length).to.eql(numTabs);
  });

  it('should set the first tab as active', () => {
    expect(element.tabs[0].classList.contains('active')).to.eql(true);
  });

  it('should add class="slide" to the content container when the attribute "slide" is present', () => {
    document.body.removeChild(element);
    element.setAttribute('slide', '');
    document.body.appendChild(element);

    expect(element.contentContainer.classList.contains('slide')).to.eql(true);
  });

  it('should show the correct content when a tab is clicked', () => {
    expect(element.tabs.length).to.eql(numTabs);

    const width = element.tabContent.offsetWidth;

    element.tabs.forEach((tab, index) => {
      const event = {
        composedPath: () => [tab]
      };

      element.handleClick(event);

      expect(tab.classList.contains('active')).to.eql(true);
      expect(element.contentContainer.style.marginLeft).to.eql(`${0 - width * index}px`);
    });

  });

  it('should move the indicator to the correct position when a tab is clicked', () => {
    element.tabs.forEach((tab) => {
      const {left} = tab.getBoundingClientRect();

      const event = {
        composedPath: () => [tab]
      };

      element.handleClick(event);

      const actual = parseInt(element.indicator.style.getPropertyValue('--indicator-left'));
      const expected = parseInt(left - element.tabContainerLeft + element.tabContainer.scrollLeft);

      expect(actual).to.eql(expected);
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
