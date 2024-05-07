import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/auth_user/action';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    const res = await dispatch(asyncSetAuthUser(email, password));
    if (res) {
      navigate('/');
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Login</h1>
      <LoginInput onLogin={onLogin} />
      <p className='mt-4 text-center'>
        Belum punya akun?
        {' '}
        <Link
          to='/register'
          className='text-[#fd7014] font-bold underline'
        >
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
