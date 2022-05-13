// eslint-disable-next-line @typescript-eslint/no-var-requires
const getEnv = require('./scripts/get-env');
const { isEnvDevelopment, isEnvProduction, isEnvTest } = getEnv();

module.exports = function getBabelConfig(api, target) {
    if (api) {
        // Cache the returned value forever and don't call this function again.
        api.cache(true);
    }

    return {
        presets: [
            isEnvTest && [
                '@babel/preset-env',
                {
                    targets: {
                        browsers: ['last 1 version'],
                        node: 'current'
                    }
                }
            ],
            (isEnvDevelopment || isEnvProduction) && [
                '@babel/preset-env',
                {
                    targets: { browsers: ['last 1 version'] },
                    corejs: { version: '3.18' },
                    useBuiltIns: 'entry',
                    modules: false,
                    include: ['transform-classes']
                }
            ],
            [
                '@babel/preset-react',
                {
                    development: isEnvDevelopment || isEnvTest,
                    useBuiltIns: true
                }
            ],
            '@babel/preset-typescript'
        ].filter(Boolean),

        plugins: [
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-transform-destructuring',
            '@babel/plugin-syntax-dynamic-import',
            [
                '@babel/plugin-proposal-object-rest-spread',
                { useBuiltIns: true }
            ],
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: true,
                    regenerator: true,
                    version: '7.17.7',
                    useESModules: target === 'esm'
                }
            ],
            [
                'babel-plugin-styled-components',
                {
                    displayName: !isEnvProduction,
                    pure: true
                }
            ],
            !isEnvTest && [
                '@babel/plugin-transform-regenerator',
                {
                    async: false
                }
            ],
            isEnvTest && 'babel-plugin-transform-dynamic-import',
            isEnvTest && 'babel-plugin-require-context-hook'
        ].filter(Boolean)
    };
};
