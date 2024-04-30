import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ButtonBack from '../components/ButtonBack';
import TextInput from '../components/TextInput';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

export default function ThreadAddPage() {
  const navigate = useNavigate();
  const [title, titleChangeHandler] = useInput();
  const [category, categoryChangeHandler] = useInput();
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  async function onSubmitHandler(event) {
    event.preventDefault();
    dispatch(asyncAddThread({ title, category, body }));
  }

  return (
    <div className='p-4'>
      <ButtonBack
        onBackHandler={() => {
          navigate('/', { replace: true });
        }}
      />
      <div className='my-4' />
      <section>
        <h1 className='font-semibold text-xl mb-4'>Buat Diskusi Baru</h1>
        <form onSubmit={onSubmitHandler}>
          <TextInput
            placeholder='Judul'
            type='text'
            value={title}
            onChangeHandler={titleChangeHandler}
          />
          <TextInput
            type='text'
            placeholder='Kategori'
            value={category}
            onChangeHandler={categoryChangeHandler}
          />
          <div
            className='mb-2 p-2 w-full rounded-md bg-[#393E46] min-h-32'
            contentEditable
            data-placeholder='Deskripsi'
            onInput={(event) => {
              setBody(event.target.innerHTML);
            }}
          />
          <button
            type='submit'
            className='w-full bg-[#fd7014] p-2 rounded-md'
          >
            Buat
          </button>
        </form>
        <div className='flex justify-center'>
          <button
            type='button'
            aria-label='button-back'
            className='mt-3 underline text-[#fd7014] font-bold'
            onClick={() => {
              navigate('/', { replace: true });
            }}
          >
            Batal
          </button>
        </div>
      </section>
    </div>
  );
}
