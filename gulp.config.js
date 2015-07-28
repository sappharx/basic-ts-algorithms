module.exports = function () {
    var lib  = './lib/',
        main = 'index.js',
        root = './';

    var config = {
        /**
         * File paths
         */
        root: root,

        /**
         * NPM locations (possibly bower in the future)
         */
        packages: [
            './package.json'
        ],

        /**
         * Typescript
         */
        typescript: {
            files:   [
                lib + '**/*.ts',
                '!' + '**/*.spec.ts'
            ],
            options: {
                noImplicitAny: true,
                out:           main
            }
        }

        /**
         * Output
         */
        //main: main
    };

    return config;
};