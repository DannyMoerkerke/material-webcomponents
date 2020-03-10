import router from '../src/router.js';
import {template as index} from './partials/index.js';
import {template as appBar} from './partials/material-app-bar.js';
import {template as button} from './partials/material-button.js';
import {template as card} from './partials/material-card.js';
import {template as checkBox} from './partials/material-checkbox.js';
import {template as datePicker} from './partials/material-datepicker.js';
import {template as dialog} from './partials/material-dialog.js';
import {template as bottomSheet} from './partials/material-bottom-sheet.js';
import {template as dropDown} from './partials/material-dropdown.js';
import {template as progress} from './partials/material-progress.js';
import {template as drawer} from './partials/material-drawer.js';
import {template as radio} from './partials/material-radiobutton.js';
import {template as slider} from './partials/material-slider.js';
import {template as materialSwitch} from './partials/material-switch.js';
import {template as table} from './partials/material-table.js';
import {template as tabs} from './partials/material-tabs.js';
import {template as text} from './partials/material-textfield.js';
import {template as slideMenu} from './partials/material-slidemenu.js';
import {template as loader} from './partials/material-loader.js';

const outlet = document.querySelector('#content');

router(outlet, [
  {
    url: '/material-webcomponents',
    template: index
  },
  {
    url: '/material-webcomponents/',
    template: index
  },
  {
    url: '/material-webcomponents/material-app-bar',
    template: appBar
  },
  {
    url: '/material-webcomponents/material-button',
    template: button
  },
  {
    url: '/material-webcomponents/material-card',
    template: card
  },
  {
    url: '/material-webcomponents/material-checkbox',
    template: checkBox
  },
  {
    url: '/material-webcomponents/material-datepicker',
    template: datePicker,
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
    url: '/material-webcomponents/material-dialog',
    template: dialog,
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
    url: '/material-webcomponents/material-bottom-sheet',
    template: bottomSheet,
    controller() {
      const standardDialog = document.querySelector('#standard-dialog');

      document.querySelector('#open-standard').addEventListener('click', standardDialog.open.bind(standardDialog));
      document.querySelector('#close-standard').addEventListener('click', standardDialog.close.bind(standardDialog));
    }
  },
  {
    url: '/material-webcomponents/material-dropdown',
    template: dropDown
  },
  {
    url: '/material-webcomponents/material-drawer',
    template: drawer,
    controller() {
      const button = document.querySelector('#material-drawer-toggle');
      const drawer = document.querySelector('#demo-material-drawer');

      button.addEventListener('click', drawer.toggle.bind(drawer));
    }
  },
  {
    url: '/material-webcomponents/material-loader',
    template: loader
  },
  {
    url: '/material-webcomponents/material-progress',
    template: progress
  },
  {
    url: '/material-webcomponents/material-radiobutton',
    template: radio
  },
  {
    url: '/material-webcomponents/material-slider',
    template: slider
  },
  {
    url: '/material-webcomponents/material-switch',
    template: materialSwitch
  },
  {
    url: '/material-webcomponents/material-table',
    template: table,
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
    url: '/material-webcomponents/material-tabs',
    template: tabs
  },
  {
    url: '/material-webcomponents/material-textfield',
    template: text
  },
  {
    url: '/material-webcomponents/material-slidemenu',
    template: slideMenu
  }
]);
