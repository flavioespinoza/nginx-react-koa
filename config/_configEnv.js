require('dotenv').config();

const _ = require('lodash');
const log = require('ololog');
const path = require('path');
const reqYml = require('require-yml');
const writeJson = require('write-json');
const flatten = require('flat');
const unflatten = require('flat').unflatten;
const _docker = require('yargs').argv;
const _error = require('../server/_helpers/_error');

const _configEnv = async (configPath) => {
  try {
    
    log.lightCyan('_configEnv.js configPath', configPath);
    
    const ymlFile = path.isAbsolute(configPath) ? configPath : path.resolve(__dirname, configPath);
    log.lightYellow('_configEnv.js ymlFile path', ymlFile);

    const get_local = reqYml(ymlFile);
    const config_local = get_local['va_demo'];

    let config_flat = {
      ...flatten(config_local),
    };

    let _keys = _.keys(config_flat);

    async function _each(arr, callback) {
      for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
      }
    }

    async function _resolve(env_var) {
      return new Promise(async (resolve) => {
        let result;
        try {
          result = eval(env_var);
          if (!result) {
            resolve(undefined);
          } else {
            resolve(result);
          }
        } catch (err) {
          if (!env_var) {
            resolve(undefined);
          } else {
            result = eval('`' + env_var + '`');
            resolve(result);
          }
        }
      });
    }

    async function _eval() {
      let result = {};
      await _each(_keys, async (key) => {
        result[key] = await _resolve(config_flat[key]);
      });
      return result;
    }

    const _config_env_flat = await _eval();
    const _config_env = unflatten(_config_env_flat);
    log.lightBlue('./config/local.json', JSON.stringify(_config_env, null, 2));
    await writeJson(__dirname + '/local.json', _config_env);
    return _config_env;
  } catch (err) {
    log.lightYellow('_configEnv.js ERROR: ', err.message);
  }
};

(async function() {
  try {
    if (_docker.config) {
      let _config_file_path = _docker.config;
      await _configEnv(_config_file_path);
    } else {
      await _configEnv('./va_demo_config.yml');
    }
  } catch (err) {
    _error({
      type: 'config_create_error',
      file: '_configEnv.js',
      method: '_configEnv(_docker.config)',
      error: err,
    });
  }
})();
