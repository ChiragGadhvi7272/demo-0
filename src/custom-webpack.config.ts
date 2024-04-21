const Dotenv = require('dotenv-webpack');
import {EnvironmentPlugin} from 'webpack'

module.exports = {
    plugins: [
        // new EnvironmentPlugin(['ENV_NAME']),
        new Dotenv()
    ],
}