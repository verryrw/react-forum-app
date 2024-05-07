import React from 'react';

import TextInput from './TextInput';
import useInput from '../hooks/useInput';

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
      <button
        type='submit'
        className='w-full border border-[#fd7014] p-2 mt-2 rounded-md'
        onClick={onSubmitHandler}
      >
        Daftar
      </button>
    </form>
  );
}

export default RegisterInput;
