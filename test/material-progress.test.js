import '../src/material-progress.js';

describe('material-progress', () => {
  let element;
  const template = document.createElement('template');
  const size = 64;
  const progress = '50';

  it('should appear as a linear progress bar', () => {
    template.innerHTML = '<material-progress></material-progress>';
    element = template.content.firstChild;
    document.body.appendChild(element);
    expect(element.container.querySelector('progress')).not.to.eql(null);
  });

  it('should appear as a circular progress element', () => {
    template.innerHTML = `<material-progress circle="${size}"></material-progress>`;
    element = template.content.firstChild;
    document.body.appendChild(element);
    expect(element.container.querySelector('progress')).to.eql(null);
    expect(element.container.querySelector('circle')).not.to.eql(null);
  });

  it('should set progress and update the "value" attribute when the "value" property is set', () => {
    template.innerHTML = '<material-progress></material-progress>';
    element = template.content.firstChild;
    document.body.appendChild(element);

    const spy = sinon.spy(element, 'setProgressValue');

    element.value = 50;

    expect(element.getAttribute('value')).to.eql('50');
    expect(spy.calledWith(50)).to.eql(true);
  });

  it('should set the "max" attribute on the progress bar', () => {
    template.innerHTML = '<material-progress></material-progress>';
    element = template.content.firstChild;
    element.setAttribute('max', 100);
    document.body.appendChild(element);


    expect(element.progress.getAttribute('max')).to.eql('100');
  });

  it('should return the "value" attribute when the "value" property is accessed', () => {
    template.innerHTML = `<material-progress value="${progress}"></material-progress>`;
    element = template.content.firstChild;
    document.body.appendChild(element);

    expect(element.value).to.eql(progress);
  });

  it('should set the "--dash-offset" CSS variable when progress is updated on a circular progress element', () => {
    const radius = size / 2;
    const circumference = 2 * Math.PI * (radius - 2);
    const dashOffset = (circumference * (1 - (progress / 100))).toPrecision(6);

    template.innerHTML = `<material-progress max="100" circle="${size}"></material-progress>`;
    element = template.content.firstChild;
    document.body.appendChild(element);


    element.setProgressValue(progress);

    expect(element.circle.style.getPropertyValue('--dash-offset')).to.eql(dashOffset);
  });

  it('should set the "value" attribute of the progress bar and the "--progress-value" CSS variable when progress is updated on a linear progress element', () => {
    template.innerHTML = `<material-progress max="100"></material-progress>`;
    element = template.content.firstChild;
    document.body.appendChild(element);

    element.setProgressValue(progress);

    expect(element.progress.getAttribute('value')).to.eql(progress);
    expect(element.progressValue.style.getPropertyValue('--progress-value')).to.eql(`${progress}%`);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
