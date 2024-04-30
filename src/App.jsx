import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import ThreadsPage from './pages/ThreadsPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import ThreadAddPage from './pages/ThreadAddPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncSetIsPreload } from './states/is_preload/action';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const { isPreload = false, authUser } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncSetIsPreload());
  }, [dispatch]);

  if (isPreload) return null;

  return (
    <div className='min-h-screen max-w-4xl mx-auto flex flex-col bg-[#222831]'>
      <Header />
      <Loading />
      <div className='flex-1 relative'>
        <main>
          <Routes>
            <Route
              path='/'
              element={<ThreadsPage />}
            />
            <Route
              path='/threads/:threadId'
              element={<ThreadDetailPage />}
            />
            <Route
              path='/threads/add'
              element={<ThreadAddPage />}
            />
            <Route
              path='/leaderboards'
              element={<LeaderboardsPage />}
            />
            {!authUser && (
              <>
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
                <Route
                  path='/register'
                  element={<RegisterPage />}
                />
              </>
            )}

            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
