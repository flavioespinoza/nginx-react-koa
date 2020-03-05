const log = require('ololog');

module.exports._error = ({ type, file, method, error }) => {
  const _err = new Error(error);
  const result = {
    type: type || 'error_type_not_provided',
    file: file || 'file_not_provided',
    method: method,
    message: _err.message,
  };
  log.lightYellow('Error', result);
  return result;
};
