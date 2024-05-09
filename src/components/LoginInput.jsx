import React from 'react';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import TextInput from './TextInput';
import { Button } from '../stories/Button';

function LoginInput({ onLogin }) {
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  function onSubmitHandler(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <form>
      <TextInput
        placeholder='Email'
        type='email'
        value={email}
        onChangeHandler={emailChangeHandler}
      />
      <TextInput
        placeholder='Password'
        type='password'
        value={password}
        onChangeHandler={passwordChangeHandler}
      />
      <Button
        primary
        label='Login'
        onClick={onSubmitHandler}
      />
    </form>
  );
}

export default LoginInput;

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
