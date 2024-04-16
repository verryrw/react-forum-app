import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { convertDateToTimeago } from "../utils";
import Badge from "./Badge";
import {
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from "../utils/network-api";

export default function ThreadItem({ thread, userId }) {
  const isLikedByMe = thread.upVotesBy.find((upVoteId) => upVoteId === userId);
  const isDislikedByMe = thread.downVotesBy.find(
    (downVoteId) => downVoteId === userId
  );
  const [isLike, setIsLike] = useState(isLikedByMe);
  const [isDislike, setIsDislike] = useState(isDislikedByMe);
  const [totalLike, setTotalLike] = useState(thread.upVotesBy.length);
  const [totalDislike, setTotalDislike] = useState(thread.downVotesBy.length);

  function resetLikeAndDislike() {
    setIsLike(false);
    setIsDislike(false);
    setTotalLike(thread.upVotesBy.length);
    setTotalDislike(thread.downVotesBy.length);
  }

  async function onNeutralizeHandler() {
    resetLikeAndDislike();

    const response = await neutralizeVoteThread(thread.id);
    if (response.error) {
      alert("gagal neutralize: " + response.message);
    } else {
      console.log("berhasil neutralize");
    }
  }

  async function onLikeHandler() {
    resetLikeAndDislike();
    setIsLike(true);
    setTotalLike(thread.upVotesBy.length + 1);

    const response = await upVoteThread(thread.id);
    if (response.error) {
      alert("gagal like: " + response.message);
      setIsLike(false);
      setTotalLike(thread.upVotesBy.length);
    } else {
      console.log("berhasil like");
    }
  }

  async function onDislikeHandler() {
    resetLikeAndDislike();
    setIsDislike(true);
    setTotalDislike(thread.downVotesBy.length + 1);

    const response = await downVoteThread(thread.id);
    if (response.error) {
      alert("gagal dislike: " + response.message);
      setIsDislike(false);
      setTotalDislike(thread.downVoteThreads.length);
    } else {
      console.log("berhasil dislike");
    }
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
            onClick={isLike ? onNeutralizeHandler : onLikeHandler}>
            {isLike ? <BiSolidLike /> : <BiLike />}
            <span className="ms-1">{totalLike}</span>
          </button>
          <button
            className="flex items-center"
            onClick={isDislike ? onNeutralizeHandler : onDislikeHandler}>
            {isDislike ? <BiSolidDislike /> : <BiDislike />}
            <span className="ms-1">{totalDislike}</span>
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
  userId: PropTypes.string.isRequired,
};
