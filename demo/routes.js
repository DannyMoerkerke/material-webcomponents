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
        templateUrl: 'demo/partials/material-dropdown.html'
    },
    {
        url: '/material-loader',
        template: `<material-loader></material-loader>`
    },
    {
        url: '/material-radiobutton',
        templateUrl: 'demo/partials/material-radiobutton.html'
    },
    {
        url: '/material-slider',
        templateUrl: 'demo/partials/material-slider.html'
    },
    {
        url: '/material-switch',
        templateUrl: 'demo/partials/material-switch.html'
    },
    {
        url: '/material-table',
        templateUrl: 'demo/partials/material-table.html',
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