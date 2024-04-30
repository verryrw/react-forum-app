import React from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { PiChatsCircleDuotone } from 'react-icons/pi';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { asyncUnsetAuthUser } from '../states/auth_user/action';

export default function Footer() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <footer>
      <div className='flex justify-center w-full bg-zinc-900'>
        <nav>
          <div className='flex flex-row gap-8'>
            <NavLink to='/'>
              <div className='flex flex-col items-center p-2 hover:bg-black'>
                <PiChatsCircleDuotone />
                <p>Threads</p>
              </div>
            </NavLink>

            <NavLink to='/leaderboards'>
              <div className='flex flex-col items-center p-2 hover:bg-black'>
                <MdOutlineLeaderboard />
                <p>Leaderboards</p>
              </div>
            </NavLink>

            {!authUser && (
              <NavLink to='/login'>
                <div className='flex flex-col items-center p-2 hover:bg-black'>
                  <IoMdLogIn />
                  <p>Login</p>
                </div>
              </NavLink>
            )}

            {authUser && (
              <button
                type='button'
                aria-label='button-logout'
                className='flex flex-col items-center p-2 hover:bg-black'
                onClick={logoutHandler}
              >
                <IoMdLogOut />
                <p>Logout</p>
              </button>
            )}
          </div>
        </nav>
      </div>
    </footer>
  );
}
