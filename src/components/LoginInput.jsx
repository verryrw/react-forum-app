import React from 'react';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import TextInput from './TextInput';

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
      <button
        type='submit'
        className='w-full border border-[#fd7014] p-2 mt-2 rounded-md'
        onClick={onSubmitHandler}
      >
        Login
      </button>
    </form>
  );
}

export default LoginInput;

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
