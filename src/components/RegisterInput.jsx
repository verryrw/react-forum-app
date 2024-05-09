import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';
import useInput from '../hooks/useInput';
import { Button } from '../stories/Button';

function RegisterInput({ onRegister }) {
  const [name, nameChangeHandler] = useInput();
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  async function onSubmitHandler(event) {
    event.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <form>
      <TextInput
        placeholder='Nama'
        type='text'
        value={name}
        onChangeHandler={nameChangeHandler}
      />
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
        type='submit'
        label='Daftar'
        onClick={onSubmitHandler}
      />
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
