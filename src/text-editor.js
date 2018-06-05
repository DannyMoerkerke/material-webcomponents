export default class TextEditor extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                #toolbar {
                    background: rgb(238,238,238);
                    border: 1px solid #000000;
                    width: var(--toolbar-width, auto);
                    height: 50px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    position: absolute;
                }    
                
                button {
                    background: transparent;
                    border: none;
                    display: inline-block;
                }
                
                ::slotted(i),
                ::slotted(dropdown-menu) {
                    background: var(--button-color, #f6f6f6);
                    border: var(--button-border, 1px solid #999999);
                    cursor: pointer;
                    display: inline-block;
                    font-size: 26px;
                    margin-right: 2px;
                    padding: 7px;
                }
                
                
            </style>
            
            <div id="toolbar">
                <slot name="button"></slot>
            </div>
            
        `;
        this.buttons = {
            'bold': {
                type: 'button',
                name: 'bold',
                data: {
                    command: 'bold',
                    icon: 'format_bold',
                    selection: true,
                    css: {'fontWeight': 'bold'},
                    undo: {'fontWeight': 'normal'}
                }
            },
            'italic': {
                type: 'button',
                name: 'italic',
                data: {
                    command: 'italic',
                    icon: 'format_italic',
                    selection: true,
                    css: {'fontStyle': 'italic'},
                    undo: {'fontStyle': 'normal'}
                }
            },
            'underline': {
                type: 'button',
                name: 'underline',
                data: {
                    command: 'underline',
                    icon: 'format_underline',
                    selection: true,
                    css: {'textDecoration': 'underline'},
                    undo: {'textDecoration': 'none'}
                }
            },
            'align-left': {
                type: 'button',
                name: 'align-left',
                data: {
                    command: 'justifyLeft',
                    icon: 'format_align_left',
                    css: {'textAlign': 'left'}
                }
            },
            'align-right': {
                type: 'button',
                name: 'align-right',
                data: {
                    command: 'justifyRight',
                    icon: 'format_align_right',
                    css: {'textAlign': 'right'}
                }
            },
            'align-center': {
                type: 'button',
                name: 'align-center',
                data: {
                    command: 'justifyCenter',
                    icon: 'format_align_center',
                    css: {'textAlign': 'center'}
                }
            },
            'align-justify': {
                type: 'button',
                name: 'align-justify',
                data: {
                    command: 'justifyFull',
                    icon: 'format_align_justify',
                    css: {'textAlign': 'justify'}
                }
            },

            // 'strikeThrough': {
            //     type: 'button',
            //     name: 'strikeThrough',
            //     data: {
            //         selection: true,
            //         command: 'strikeThrough',
            //         css: {'textDecoration': 'line-through'},
            //         undo: {'textDecoration': 'none'}
            //     }
            // },
            'unorderedList': {
                type: 'button',
                name: 'unorderedList',
                data: {
                    command: 'insertUnorderedList',
                    icon: 'format_list_bulleted',
                    selection: true,
                }
            },
            'orderedList': {
                type: 'button',
                name: 'orderedList',
                data: {
                    command: 'insertOrderedList',
                    icon: 'format_list_numbered',
                    selection: true,
                }
            },
            'undo': {
                type: 'button',
                name: 'undo',
                data: {
                    command: 'undo'
                }
            },
            'redo': {
                type: 'button',
                name: 'redo',
                data: {
                    command: 'redo'
                }
            },
            'fontfamily': {
                type: 'widget',
                name: 'fontfamily',
                data: {
                    command: 'fontName',
                    selection: true
                }
            },
            // 'fontsize': {
            //     type: 'widget',
            //     name: 'fontsize',
            //     data: {
            //         command: 'fontSize'
            //     }
            // },
            // 'fontcolor': {
            //     type: 'widget',
            //     name: 'fontcolor',
            //     data: {
            //         command: 'foreColor'
            //     }
            // },
            // 'fontbackgroundcolor': {
            //     type: 'widget',
            //     name: 'fontbackgroundcolor',
            //     data: {
            //         selection: true,
            //         command: 'hiliteColor'
            //     }
            // }
        };
    }

    connectedCallback() {

        const contentSelector = this.getAttribute('content');
        this.content = this.getTarget(contentSelector);

        if(!this.content) {
            throw new Error(`'${contentSelector}' is not an editable node`);
        }
        else {
            this.content.style.outline = 'none';

            this.setupToolbar();
            this.setupEventHandlers();
        }

        document.execCommand('styleWithCss', false, false);
        document.execCommand('insertbronreturn', false, false);
    }

    attributeChangedCallback(attr, oldVal, newVal) {

    }

    getTarget(selector) {
        const selectors = selector.split(' ');
        const re = /^([a-z]+\-[a-z]+)+$/g;

        return selectors.reduce((ctx, selector) => selector.match(re) ? ctx.querySelector(selector).shadowRoot : ctx.querySelector(selector), document);
    }

    doCommand(target) {
        if(target.dataset && target.dataset.command) {
            const commandData = target.dataset.command.split(',');
            const command = commandData[0];
            let args = commandData.length > 1 ? commandData[1] : null;

            if(target.getAttribute('value')) {
                args = target.getAttribute('value');
            }
            document.execCommand(command, false, args);
        }
    };

    get html() {
        return this.content.innerHTML;
    }

    set html(html) {
        this.content.innerHTML = html;
    }

    setupToolbar() {
        this.toolbar = this.shadowRoot.querySelector('#toolbar');
        this.hideToolbar();

        const {top, left} = this.content.getBoundingClientRect();

        this.toolbar.style.left = `${left}px`;
        this.toolbar.style.top = `${top - this.toolbar.offsetHeight}px`;
    }

    showToolbar() {
        this.toolbar.style.visibility = 'visible';
    }

    hideToolbar() {
        this.toolbar.style.visibility = 'hidden';
    }

    setupEventHandlers() {
        this.content.addEventListener('click', e => {
            this.content.setAttribute('contenteditable', '');
            this.showToolbar();
            this.content.focus();
        });

        this.toolbar.addEventListener('click', ({path}) => {
            const eventPath = [...path];
            let el;

            while(el = eventPath.shift()) {
                if(el.dataset && 'command' in el.dataset) {
                    this.doCommand(el);
                    break;
                }
            }
        });

        this.toolbar.onmousedown = e => e.preventDefault();

        document.addEventListener('click', ({path}) => {
            if(!path.includes(this.toolbar) && !path.includes(this.content)) {
                this.content.removeAttribute('contenteditable');
                this.hideToolbar();
            }
        });
    }

}

customElements.define('text-editor', TextEditor);
