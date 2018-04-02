module.exports = function(source) {
    const templateRegex = /<template/gm;
    const callbackRegex = /connectedCallback\(\) {/

    const polyfill = `if(!('content' in document.createElement('template'))) {
        this.shadowRoot.querySelectorAll('template').forEach(template => {
            const content = template.childNodes;
            const fragment = document.createDocumentFragment();
    
            while (content[0]) {
                fragment.appendChild(content[0]);
            }
    
            template.content = fragment;
        });
    }`;

    const hasTemplate = templateRegex.exec(source);

    if(hasTemplate) {
        const result = callbackRegex.exec(source);

        source = source.replace(result[0], `${result[0]} ${polyfill}`);
    }

    return source;
};