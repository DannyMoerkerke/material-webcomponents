module.exports = {
    map: true,
    plugins: {
        'postcss-cssnext': {
            features: {
                autoprefixer: {
                    browsers: [
                        'last 2 IE versions', 'not IE < 11',
                        'last 2 Chrome versions', 'not Chrome < 61',
                        'last 2 Safari versions', 'not Safari < 10.1',
                        'last 2 iOS versions', 'not iOS < 10.3',
                        'last 2 ChromeAndroid versions', 'not ChromeAndroid < 61'
                    ],
                    grid: true
                }
            }
        }
    }
};
