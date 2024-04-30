import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderboardItem({ leaderboard }) {
  return (
    <div className='flex justify-between mt-4 items-center'>
      <div className='flex gap-4 items-center'>
        <img
          src={leaderboard.user.avatar}
          alt=''
          width='50'
          height='50'
          className='object-cover rounded-full'
        />
        <h2>{leaderboard.user.name}</h2>
      </div>
      <h1>{leaderboard.score}</h1>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.object.isRequired,
};
