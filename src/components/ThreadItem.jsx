import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";

import { convertDateToTimeago } from "../utils";
import Badge from "./Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncToggleThreadDislike,
  asyncToggleThreadLike,
} from "../states/threads/action";

export default function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);
  const isLikedByMe = thread.upVotesBy.find(
    (upVoteId) => upVoteId === authUser?.id
  );
  const isDislikedByMe = thread.downVotesBy.find(
    (downVoteId) => downVoteId === authUser?.id
  );

  function onLikeHandler() {
    dispatch(asyncToggleThreadLike(thread.id));
  }

  function onDislikeHandler() {
    dispatch(asyncToggleThreadDislike(thread.id));
  }

  return (
    <div className="p-2 border bg-[#393e46] rounded-md mb-2">
      <Badge variant="outline">#{thread.category}</Badge>
      <h4 className="font-bold mt-1">
        <Link
          to={`/threads/${thread.id}`}
          className="hover:underline">
          {thread.title}
        </Link>
      </h4>
      <div
        className="text-sm text-zinc-300 line-clamp-4"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />
      <div className="mt-2 flex flex-col md:flex-row gap-2 text-sm ">
        <div className="flex gap-2">
          <button
            className="flex items-center"
            onClick={onLikeHandler}>
            {isLikedByMe ? <BiSolidLike /> : <BiLike />}
            <span className="ms-1">{thread.upVotesBy.length}</span>
          </button>
          <button
            className="flex items-center"
            onClick={onDislikeHandler}>
            {isDislikedByMe ? <BiSolidDislike /> : <BiDislike />}
            <span className="ms-1">{thread.downVotesBy.length}</span>
          </button>
          <span className="flex items-center">
            <BsReply />
            <span className="ms-1">{thread.totalComments}</span>
          </span>
        </div>
        <span>{convertDateToTimeago(new Date(thread.createdAt))}</span>
        <span>
          Dibuat oleh <b>{thread.name}</b>
        </span>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.object.isRequired,
};
