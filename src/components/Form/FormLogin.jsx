import * as React from 'react';
import _ from 'lodash';
import log from 'ololog';
import Button from '@material-ui/core/Button';

// Hook - Custom
import useFormInput from 'hooks/useFormInput';

const FormLogin = ({ ...props }) => {
  const { ...prop } = props;
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // handle button click of login form
  const handleLogin = () => {
    // @todo : Set error handler on empty or invalid email    
    const node_env = process.env.NODE_ENV;
    log.yellow(`line ${24}: handleLogin -> node_env`, node_env);
    
    if (process.env.NODE_ENV === 'localdevelopment') {
      prop._handleLogin({
        openid_provider: 'okta',
        username: 'test.email',
        password:'test.pw',
      });
    } else {
      prop._handleLogin({ openid_provider: 'okta', username: username.value, password: password.value });
    }
  };

  return (
    <div>
      <h4 className={'m4'}>{_.toUpper(prop.openid_provider)}</h4>
      <div>
        Email
        <input type="text" {...username} autoComplete="new-username" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          Error
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      )}
      <br />
      <Button color={'success'} onClick={handleLogin} disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </Button>
      <br />
    </div>
  );
};

export default FormLogin;
