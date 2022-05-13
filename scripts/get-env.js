/**
 * Get environment type
 *
 * This is similar to how `env` works in Babel:
 * https://babeljs.io/docs/usage/babelrc/#env-option
 * We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
 * https://github.com/babel/babel/issues/4539
 * https://github.com/facebook/create-react-app/issues/720
 * It’s also nice that we can enforce `NODE_ENV` being specified.
 *
 * @return {Object} dev/test/prod environment information
 */

function getEnv() {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV;
    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';
    const isEnvTest = env === 'test';

    if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
        throw new Error(
            'The babel preset of requires that you specify `NODE_ENV` or ' +
                '`BABEL_ENV` environment variables. Valid values are "development", ' +
                `"test", and "production". Instead, received: ${JSON.stringify(
                    env
                )}.`
        );
    }

    return {
        isEnvDevelopment,
        isEnvTest,
        isEnvProduction
    };
}

module.exports = getEnv;
