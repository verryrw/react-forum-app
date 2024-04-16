import { useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import PropTypes from "prop-types";
import { convertDateToTimeago } from "../utils";

export default function CommentItem({ comment }) {
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  function onLikeHandler() {
    setIsLike(!isLike);
    if (isDislike) {
      setIsDislike(false);
    }
  }

  function onDislikeHandler() {
    setIsDislike(!isDislike);
    if (isLike) {
      setIsLike(false);
    }
  }

  return (
    <div>
      <div className="comment-head flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className="h-8 w-8 rounded-full"
          />
          <h1 className="font-bold">{comment.owner.name}</h1>
        </div>
        <p>{convertDateToTimeago(new Date(comment.createdAt))}</p>
      </div>
      <div
        className="comment-body mt-2"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className="flex gap-2 mt-2">
        <button
          className="flex items-center"
          onClick={onLikeHandler}>
          {isLike ? <BiSolidLike /> : <BiLike />}
          <span className="ms-1">{comment.upVotesBy.length}</span>
        </button>
        <button
          className="flex items-center"
          onClick={onDislikeHandler}>
          {isDislike ? <BiSolidDislike /> : <BiDislike />}
          <span className="ms-1">0</span>
        </button>
      </div>
      <hr className="my-4 bg-gray-700" />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
