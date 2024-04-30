import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-8'>Klasemen Pengguna Aktif</h1>
      <div className='leaderboards-table__header flex justify-between'>
        <h2>Pengguna</h2>
        <h2>Skor</h2>
      </div>
      <div className='leaderboards-table__content'>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            leaderboard={leaderboard}
          />
        ))}
      </div>
    </div>
  );
}
