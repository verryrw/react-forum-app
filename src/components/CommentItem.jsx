import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import PropTypes from 'prop-types';

import convertDateToTimeago from '../utils';
import {
  asyncToggleThreadDetailCommentDislike,
  asyncToggleThreadDetailCommentLike,
} from '../states/thread_detail/action';

export default function CommentItem({ comment, threadId }) {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const isLikedByMe =
    authUser === null ? '' : comment.upVotesBy.find((upVoteId) => upVoteId === authUser.id);
  const isDislikedByMe =
    authUser === null ? '' : comment.downVotesBy.find((downVoteId) => downVoteId === authUser.id);

  function onCommentLikeHandler() {
    dispatch(asyncToggleThreadDetailCommentLike(threadId, comment.id));
  }

  function onCommentDislikeHandler() {
    dispatch(asyncToggleThreadDetailCommentDislike(threadId, comment.id));
  }

  return (
    <div>
      <div className='comment-head flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className='h-8 w-8 rounded-full'
          />
          <h1 className='font-bold'>{comment.owner.name}</h1>
        </div>
        <p>{convertDateToTimeago(new Date(comment.createdAt))}</p>
      </div>
      <div
        className='comment-body mt-2'
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className='flex gap-2 mt-2'>
        <button
          type='button'
          aria-label='button-like'
          className='flex items-center'
          onClick={onCommentLikeHandler}
        >
          {isLikedByMe ? <BiSolidLike /> : <BiLike />}
          <span className='ms-1'>{comment.upVotesBy.length}</span>
        </button>
        <button
          type='button'
          aria-label='button-like'
          className='flex items-center'
          onClick={onCommentDislikeHandler}
        >
          {isDislikedByMe ? <BiSolidDislike /> : <BiDislike />}
          <span className='ms-1'>{comment.downVotesBy.length}</span>
        </button>
      </div>
      <hr className='my-4 bg-gray-700' />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired,
};
