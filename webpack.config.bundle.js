const fs = require('fs');
const path = require('path');
const common = require('./webpack.config.common');

// const files = fs.readdirSync('src');
//
// common.entry = files.reduce((acc, file) => {
//     try {
//         if(fs.lstatSync(path.join(__dirname, 'src', file)).isFile()) {
//             console.log(path.join('src', file));
//             console.log(file.substr(0, file.lastIndexOf('.')));
//
//             acc[file.substr(0, file.lastIndexOf('.'))] = `./${path.join('src', file)}`;
//         }
//     }
//     catch(e) {
//         console.log(e);
//     }
//     return acc;
// }, {});

common.entry = {
    bundle: './src/bundle.js'
};

module.exports = common;