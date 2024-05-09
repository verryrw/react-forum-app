import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RegisterInput from '../components/RegisterInput';
import { asyncRegister } from '../states/users/action';
import { Button } from '../stories/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onNavigateBack() {
    navigate(-1, { replace: true });
  }

  async function onRegister({ name, email, password }) {
    const res = await dispatch(asyncRegister({ name, email, password }));
    if (res) {
      navigate('/');
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Daftar</h1>
      <RegisterInput onRegister={onRegister} />
      <div className='flex justify-center'>
        <Button
          variant='outlined'
          label='Kembali'
          onClick={onNavigateBack}
        />
      </div>
    </div>
  );
}
