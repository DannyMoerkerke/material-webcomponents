const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const prefixer = postcss([autoprefixer({
    browsers: [
        'last 2 IE versions', 'not IE < 11',
        'last 2 Chrome versions', 'not Chrome < 61',
        'last 2 Safari versions', 'not Safari < 10.1',
        'last 2 iOS versions', 'not iOS < 10.3',
        'last 2 ChromeAndroid versions', 'not ChromeAndroid < 61'
    ],
    grid: true
})]);

module.exports = function(source) {
    const styleRegex = /<style>([\s\S]*?)<\/style>/gm;
    let styleResult = styleRegex.exec(source);

    if(styleResult) {

        const tagNameRegex = /customElements\.define\('(.+?)'/gm;
        const tagName = tagNameRegex.exec(source);

        const ruleRegex = /^(?!\s*(from|to))([\sa-zA-Z0-9\-_*()\[\]#.:,]*?){([\s\S]*?)}$/gm;
        const ruleStartRegex = /(\s+)([\s\S]*){/;
        const notHostOrSlottedRegex = /^(?!(:host|::slotted))[\s\S]*$/;
        const slottedRegex = /::slotted\((.+?)\)/gm;
        const hostRegex = /:host(\((.+?)\)(.+?)|\s){/gm;

        const callback = this.async();

        let style = styleResult[1];

        let ruleResult = ruleRegex.exec(style);

        if(ruleResult) {
            // ruleResult
            let ruleStartResult = ruleStartRegex.exec(ruleResult[0]);

            if(ruleStartResult) {
                // ruleStartResult
                let notHostResult = notHostOrSlottedRegex.exec(ruleStartResult[2]);

                if(notHostResult) {
                    // notHostResult
                    const selectors = ruleStartResult[2].split(',');
                    // selectors
                    const replacement = selectors.map(selector => `${tagName[1]} ${selector.trim()}`).join(', ');
                    style = style.replace(ruleResult[0].trim(), `${replacement} {${ruleResult[3]}}`);
                }
            }

            while(ruleRegex.lastIndex) {
                ruleResult = ruleRegex.exec(style);
                // ruleResult
                if(ruleResult) {
                    let ruleStartResult = ruleStartRegex.exec(ruleResult[0]);
                    // ruleStartResult
                    if(ruleStartResult) {
                        let notHostResult = notHostOrSlottedRegex.exec(ruleStartResult[2]);
                        if(notHostResult) {
                            // notHostResult
                            const selectors = ruleStartResult[2].split(',');
                            // selectors
                            const replacement = selectors.map(selector => `${tagName[1]} ${selector.trim()}`).join(', ');
                            // replacement
                            style = style.replace(ruleResult[0].trim(), `${replacement} {${ruleResult[3]}}`);
                        }
                    }
                }
            }
        }

        let slottedResult = slottedRegex.exec(style);

        if(slottedResult) {
            style = style.replace(slottedResult[0], `${tagName[1]} ${slottedResult[1]}`);

            while(slottedRegex.lastIndex) {
                slottedResult = slottedRegex.exec(style);
                if(slottedResult) {
                    style = style.replace(slottedResult[0], `${tagName[1]} ${slottedResult[1]}`);
                }
            }
        }

        let hostResult = hostRegex.exec(style);

        if(hostResult) {
            if(hostResult[2] === undefined) {
                hostResult[2] = '';
            }
            if(hostResult[3] === undefined) {
                hostResult[3] = '';
            }
            style = style.replace(hostResult[0], `${tagName[1]}${hostResult[2]} ${hostResult[3]}{`);

            while(hostRegex.lastIndex) {
                hostResult = hostRegex.exec(style);
                if(hostResult) {
                    style = style.replace(hostResult[0], `${tagName[1]}${hostResult[2]} ${hostResult[3]}{`);
                }
            }
        }

        prefixer.process(style)
        .then(result => {
            source = source.replace(styleResult[1], result);

            callback(null, source);
        })
        .catch(err => callback(err));
    }
    else {
        return source;
    }
};
