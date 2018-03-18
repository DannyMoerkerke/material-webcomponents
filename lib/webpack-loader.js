module.exports = function(source) {
    const tagNameRegex = /customElements\.define\('(.+?)'/gm;
    const slottedRegex = /::slotted\((.+?)\)/gm;

    let result = tagNameRegex.exec(source);

    if(result) {
        source = source.replace(':host', result[1]);
    }

    result = slottedRegex.exec(source);

    if(result) {
        source = source.replace(result[0], result[1]);

        while(slottedRegex.lastIndex) {
            result = slottedRegex.exec(source);
            if(result) {
                source = source.replace(result[0], result[1]);
            }
        }
    }

    return source;
};