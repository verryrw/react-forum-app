import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ButtonBack from '../components/ButtonBack';
import TextInput from '../components/TextInput';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';
import { Button } from '../stories/Button';

export default function ThreadAddPage() {
  const [title, titleChangeHandler] = useInput();
  const [category, categoryChangeHandler] = useInput();
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    const isAddSuccess = await dispatch(asyncAddThread({ title, category, body }));
    if (isAddSuccess) {
      navigate('/', { replace: true });
    }
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
          <Button
            variant='filled'
            label='Buat'
            type='submit'
          />
        </form>
        <div className='flex justify-center'>
          <Button
            variant='outlined'
            label='Batal'
            onClick={() => {
              navigate('/', { replace: true });
            }}
          />
        </div>
      </section>
    </div>
  );
}
