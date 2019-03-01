import router from '../src/router.js';
import {template as index} from './partials/index.js';

const outlet = document.querySelector('#content');

router(outlet, [
  {
    url: '/material-webcomponents/',
    template: index
  },
  {
    url: '/material-webcomponents/material-app-bar',
    templateUrl: '../demo/partials/material-app-bar.html'
  },
  {
    url: '/material-button',
    templateUrl: '../demo/partials/material-button.html'
  },
  {
    url: '/material-checkbox',
    templateUrl: '../demo/partials/material-checkbox.html'
  },
  {
    url: '/material-datepicker',
    templateUrl: '../demo/partials/material-datepicker.html',
    controller() {
      const picker = document.querySelector('material-datepicker');
      const field = document.querySelector('material-textfield');
      const dialog = document.querySelector('material-dialog');
      const locale = 'en-EN';

      field.addEventListener('focus', dialog.open.bind(dialog));

      picker.addEventListener('change', e => {
        field.value = e.detail.formattedDate;
        dialog.close();
      });

      picker.addEventListener('close', dialog.close.bind(dialog));

      const formattedDate = new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date());

      picker.date = formattedDate;
      field.value = formattedDate;
    }
  },
  {
    url: '/material-dialog',
    templateUrl: '../demo/partials/material-dialog.html',
    controller() {
      const standardDialog = document.querySelector('#standard-dialog');
      const modalDialog = document.querySelector('#modal-dialog');

      document.querySelector('#open-standard').addEventListener('click', standardDialog.open.bind(standardDialog));
      document.querySelector('#close-standard').addEventListener('click', standardDialog.close.bind(standardDialog));
      document.querySelector('#open-modal').addEventListener('click', modalDialog.open.bind(modalDialog));
      document.querySelector('#close-modal').addEventListener('click', modalDialog.close.bind(modalDialog));
    }
  },
  {
    url: '/material-dropdown',
    templateUrl: '../demo/partials/material-dropdown.html'
  },
  {
    url: '/material-progress',
    templateUrl: '../demo/partials/material-progress.html'
  },
  {
    url: '/material-drawer',
    templateUrl: '../demo/partials/material-drawer.html',
    controller() {
      const button = document.querySelector('#material-drawer-toggle');
      const drawer = document.querySelector('#demo-material-drawer');

      button.addEventListener('click', drawer.toggle.bind(drawer));
    }
  },
  {
    url: '/material-radiobutton',
    templateUrl: '../demo/partials/material-radiobutton.html'
  },
  {
    url: '/material-slider',
    templateUrl: '../demo/partials/material-slider.html'
  },
  {
    url: '/material-switch',
    templateUrl: '../demo/partials/material-switch.html'
  },
  {
    url: '/material-table',
    templateUrl: '../demo/partials/material-table.html',
    controller() {
      customElements.whenDefined('material-table')
      .then(() => {
        const tables = document.querySelectorAll('material-table');
        tables[0].data = [
          {
            id: 1,
            language: 'Javascript',
            scope: 'Frontend'
          },
          {
            id: 2,
            language: 'PHP',
            scope: 'Backend'
          },
          {
            id: 3,
            language: 'Scala',
            scope: 'Backend'
          },
          {
            id: 4,
            language: 'CSS',
            scope: 'Frontend'
          }
        ];
        tables[1].data = [
          {
            id: 1,
            language: 'Javascript',
            scope: 'Frontend'
          },
          {
            id: 2,
            language: 'PHP',
            scope: 'Backend'
          },
          {
            id: 3,
            language: 'Scala',
            scope: 'Backend'
          },
          {
            id: 4,
            language: 'CSS',
            scope: 'Frontend'
          },
          {
            id: 5,
            language: 'Javascript',
            scope: 'Frontend'
          },
          {
            id: 6,
            language: 'PHP',
            scope: 'Backend'
          },
          {
            id: 7,
            language: 'Scala',
            scope: 'Backend'
          },
          {
            id: 8,
            language: 'CSS',
            scope: 'Frontend'
          },
          {
            id: 9,
            language: 'Javascript',
            scope: 'Frontend'
          },
          {
            id: 10,
            language: 'PHP',
            scope: 'Backend'
          },
          {
            id: 11,
            language: 'Scala',
            scope: 'Backend'
          },
          {
            id: 12,
            language: 'CSS',
            scope: 'Frontend'
          },
          {
            id: 13,
            language: 'Javascript',
            scope: 'Frontend'
          },
          {
            id: 14,
            language: 'PHP',
            scope: 'Backend'
          },
          {
            id: 15,
            language: 'Scala',
            scope: 'Backend'
          },
          {
            id: 16,
            language: 'CSS',
            scope: 'Frontend'
          }
        ];
      });
    }
  },
  {
    url: '/material-tabs',
    templateUrl: '../demo/partials/material-tabs.html'
  },
  {
    url: '/material-textfield',
    templateUrl: '../demo/partials/material-textfield.html'
  },
  {
    url: '/material-slidemenu',
    templateUrl: '../demo/partials/material-slidemenu.html'
  }
]);
