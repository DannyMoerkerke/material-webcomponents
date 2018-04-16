module.exports = function(source) {
    const tagNameRegex = /customElements\.define\('(.+?)'/gm;
    let tagName = tagNameRegex.exec(source);

    const styleRegex = /<style>([\s\S]*?)<\/style>/gm;
    const ruleRegex = /^(?!\s*(from|to))([\sa-zA-Z0-9\-_*()\[\]#.:,]*?){([\s\S]*?)}$/gm;
    const ruleStartRegex = /(\s+)([\s\S]*){/;
    const notHostOrSlottedRegex = /^(?!(:host|::slotted))[\s\S]*$/;
    const slottedRegex = /::slotted\((.+?)\)/gm;
    const hostRegex = /:host(\((.+?)\)(.+?)|\s){/gm;

    let styleResult = styleRegex.exec(source);

    if(styleResult) {
        let style = styleResult[1];

        let ruleResult = ruleRegex.exec(style);

        if(ruleResult) {
            let ruleStartResult = ruleStartRegex.exec(ruleResult[0]);

            if(ruleStartResult) {
                let notHostResult = notHostOrSlottedRegex.exec(ruleStartResult[2]);

                if(notHostResult) {
                    const selectors = ruleStartResult[2].split(',');
                    const replacement = selectors.map(selector => `${tagName[1]} ${selector.trim()}`).join(', ');
                    style = style.replace(`${notHostResult[0]}{`, `${replacement}{`);
                }
            }

            while(ruleRegex.lastIndex) {
                ruleResult = ruleRegex.exec(style);
                if(ruleResult) {

                    let ruleStartResult = ruleStartRegex.exec(ruleResult[0]);

                    if(ruleStartResult) {
                        let notHostResult = notHostOrSlottedRegex.exec(ruleStartResult[2]);
                        if(notHostResult) {
                            // notHostResult
                            const selectors = ruleStartResult[2].split(',');
                            // selectors
                            const replacement = selectors.map(selector => `${tagName[1]} ${selector.trim()}`).join(', ');
                            style = style.replace(`${notHostResult[0]}{`, `${replacement}{`);
                        }
                    }
                }
            }

            source = source.replace(styleResult[1], style);
        }

        let slottedResult = slottedRegex.exec(source);

        if(slottedResult) {
            source = source.replace(slottedResult[0], `${tagName[1]} ${slottedResult[1]}`);

            while(slottedRegex.lastIndex) {
                slottedResult = slottedRegex.exec(source);
                if(slottedResult) {
                    source = source.replace(slottedResult[0], `${tagName[1]} ${slottedResult[1]}`);
                }
            }
        }

        let hostResult = hostRegex.exec(source);

        if(hostResult) {
            if(hostResult[2] === undefined) {
                hostResult[2] = '';
            }
            if(hostResult[3] === undefined) {
                hostResult[3] = '';
            }
            source = source.replace(hostResult[0], `${tagName[1]}${hostResult[2]} ${hostResult[3]}{`);

            while(hostRegex.lastIndex) {
                hostResult = hostRegex.exec(source);
                if(hostResult) {
                    source = source.replace(hostResult[0], `${tagName[1]}${hostResult[2]} ${hostResult[3]}{`);
                }
            }
        }
    }

    return source;
};
