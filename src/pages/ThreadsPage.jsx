import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';

import ThreadItem from '../components/ThreadItem';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import BadgeButton from '../components/BadgeButton';

function ThreadsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {
    authUser,
    threads = [],
    users = [],
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = new Set();
  threads.forEach((thread) => categories.add(thread.category));

  const threadList = threads
    .filter((thread) => (selectedCategories.length > 0
      ? selectedCategories.includes(thread.category)
      : true))
    .map((thread) => ({
      ...thread,
      name: users.find((user) => user.id === thread.ownerId).name,
    }));

  return (
    <div className='p-4'>
      <section>
        <h1>Kategori Populer</h1>
        {Array.from(categories).map((category) => (selectedCategories.includes(category) ? (
          <BadgeButton
            variant='filled'
            key={category}
            onClickHandler={() => {
              setSelectedCategories((prevState) => prevState.filter((state) => state !== category));
            }}
          >
            {category}
          </BadgeButton>
        ) : (
          <BadgeButton
            variant='outline'
            key={category}
            onClickHandler={() => {
              setSelectedCategories((prevState) => [...prevState, category]);
            }}
          >
            {category}
          </BadgeButton>
        )))}
      </section>
      <div className='my-4' />
      <section className='mb-24'>
        <h1 className='mb-1 text-xl font-bold'>Diskusi tersedia</h1>
        {threadList.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            loggedInUser={authUser}
          />
        ))}
      </section>
      {authUser && (
        <section>
          <button
            type='button'
            aria-label='button-add'
            className='rounded-md absolute right-4 bottom-4 bg-orange-500 hover:bg-orange-600 p-2 text-3xl font-bold drop-shadow-lg'
            onClick={() => {
              navigate('/threads/add');
            }}
          >
            <IoMdAdd />
          </button>
        </section>
      )}
    </div>
  );
}

export default ThreadsPage;
