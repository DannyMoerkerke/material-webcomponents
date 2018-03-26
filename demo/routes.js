import routes from '../src/router.js';

const outlet = document.querySelector('#content');

routes(outlet, [
    {
        url: '/material-app-bar',
        templateUrl: 'demo/partials/material-app-bar.html'
    },
    {
        url: '/material-button',
        templateUrl: 'demo/partials/material-button.html'
    },
    {
        url: '/material-checkbox',
        templateUrl: 'demo/partials/material-checkbox.html'
    },
    {
        url: '/material-datepicker',
        templateUrl: 'demo/partials/material-datepicker.html',
        controller() {
            const picker = document.querySelector('material-datepicker');
            const field = document.querySelector('material-textfield');
            const dialog = document.querySelector('material-dialog');
            const locale = 'en-EN';

            field.addEventListener('focus', () => {
                dialog.open();
            });

            picker.addEventListener('change', e => {
                field.value = e.detail.formattedDate;
                dialog.close();
            });

            picker.addEventListener('close', e => {
                dialog.close();
            });

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
        templateUrl: 'demo/partials/material-dialog.html',
        controller() {
            document.querySelector('#open').onclick = () => {
                document.querySelector('material-dialog').open();
            };

            document.querySelector('#action').onclick = () => {
                document.querySelector('material-dialog').close();
            };
        }
    },
    {
        url: '/material-dropdown',
        template: `
            <material-dropdown>
                <i class="material-icons" slot="icon" tabindex="1">menu</i>
                <li slot="option"><i class="material-icons">add</i>Javascript</li>
                <li slot="option">PHP</li>
                <li slot="option">Java</li>
                <li slot="option">Scala</li>
            </material-dropdown>
        `
    },
    {
        url: '/material-loader',
        template: `<material-loader></material-loader>`
    },
    {
        url: '/material-radiobutton',
        template: `
            <material-radiobutton label="javascript" name="language" id="test"></material-radiobutton>

            <material-radiobutton-group name="language">
                <material-radiobutton slot="radio" label="Javascript" value="javascript"></material-radiobutton>
                <material-radiobutton slot="radio" label="Typescript" value="typescript"></material-radiobutton>
                <material-radiobutton slot="radio" label="PHP" value="php" checked></material-radiobutton>
            </material-radiobutton-group>
        `
    },
    {
        url: '/material-slider',
        template: `<material-slider value="25" max="200" step="20"></material-slider>`
    },
    {
        url: '/material-switch',
        template: `<material-switch label="switch label"></material-switch>`
    },
    {
        url: '/material-table',
        template: `<material-table sortable="language scope"></material-table>`,
        controller() {
            customElements.whenDefined('material-table')
            .then(() => {
                const table = document.querySelector('material-table');

                table.data = [
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
            });
        }
    },
    {
        url: '/material-tabs',
        template: `
            <material-tabs>
                <div slot="tab" data-title="tab 1">
                    First tab
                </div>

                <div slot="tab" data-title="tab 2">
                    tab number 2
                </div>

                <div slot="tab" data-title="tab 3">
                    a third one
                </div>

                <div slot="tab" data-title="tab 4">
                    and number 4
                </div>

                <div slot="tab" data-title="tab 5">
                    and another one
                </div>

                <div slot="tab" data-title="tab 6">
                    man, another one???
                </div>
            </material-tabs>
        `
    },
    {
        url: '/material-textfield',
        template: `<material-textfield label="Voornaam"></material-textfield>`
    },
    {
        url: '/material-toggle-button',
        template: `<material-toggle-button left="Running" right="Complete" active="right"></material-toggle-button>`
    },
    {
        url: '/material-slidemenu',
        template: `
            <material-slidemenu label="Components">
                <a slot="item" href="/material-app-bar">material-app-bar</a>
                <a slot="item" href="/material-checkbox">material-checkbox</a>
                <a slot="item" href="/material-datepicker">material-datepicker</a>
                <a slot="item" href="/material-dialog">material-dialog</a>
                <a slot="item" href="/material-dropdown">material-dropdown</a>
                <a slot="item" href="/material-loader">material-loader</a>
                <a slot="item" href="/material-radiobutton">material-radiobutton</a>
                <a slot="item" href="/material-slider">material-slider</a>
                <a slot="item" href="/material-switch">material-switch</a>
                <a slot="item" href="/material-table">material-table</a>
                <a slot="item" href="/material-tabs">material-tabs</a>
                <a slot="item" href="/material-textfield">material-textfield</a>
                <a slot="item" href="/material-toggle-button">material-toggle-button</a>
                <a slot="item" href="/material-slidemenu">material-slidemenu</a>
            </material-slidemenu>
        `
    }
]);