const appBar = document.querySelector('#mobile-app-bar');
const drawer = document.querySelector('#main-menu');

customElements.whenDefined('material-drawer')
.then(() => {
  const isDesktop = mq => {
    if(mq.matches) {
      drawer.open();
    }
    else {
      if(drawer.hasAttribute('open')) {
        drawer.close();
      }
    }
  };

  const mq = window.matchMedia('(min-width: 800px)');
  mq.addListener(isDesktop);
  isDesktop(mq);

  appBar.addEventListener('app-bar-click', e => {
    const {slot} = e.detail;

    if(slot === 'left-content') {
      drawer.toggle();
    }
  });
});
