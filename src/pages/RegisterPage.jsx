import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RegisterInput from '../components/RegisterInput';
import { asyncRegister } from '../states/users/action';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onNavigateBack() {
    navigate(-1, { replace: true });
  }

  function onRegister({ name, email, password }) {
    dispatch(asyncRegister({ name, email, password }));
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Daftar</h1>
      <RegisterInput onRegister={onRegister} />
      <div className='flex justify-center'>
        <button
          type='button'
          aria-label='button-back'
          className='mt-3 underline text-[#fd7014] font-bold'
          onClick={onNavigateBack}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
