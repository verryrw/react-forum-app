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

export default function ThreadItem({ thread, loggedInUser }) {
  const isLikedByMe = thread.upVotesBy.find(
    (upVoteId) => upVoteId === loggedInUser.id
  );
  const isDislikedByMe = thread.downVotesBy.find(
    (downVoteId) => downVoteId === loggedInUser.id
  );
  const [isLike, setIsLike] = useState(isLikedByMe);
  const [isDislike, setIsDislike] = useState(isDislikedByMe);
  const [upVotesBy, setUpVotesBy] = useState(thread.upVotesBy);
  const [downVotesBy, setDownVotesBy] = useState(thread.downVotesBy);

  function pushIfNotExists(array, item) {
    const newArray = array;
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
    return newArray;
  }

  function resetLikeAndDislike() {
    setIsLike(false);
    setIsDislike(false);
    setUpVotesBy(
      thread.upVotesBy.filter((upVoteId) => upVoteId !== loggedInUser.id)
    );
    setDownVotesBy(
      thread.downVotesBy.filter((downVoteId) => downVoteId !== loggedInUser.id)
    );
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
    setUpVotesBy(pushIfNotExists(thread.upVotesBy, loggedInUser.id));

    const response = await upVoteThread(thread.id);
    if (response.error) {
      alert("gagal like: " + response.message);
      setIsLike(false);
      setUpVotesBy(thread.upVotesBy.length);
    } else {
      console.log("berhasil like");
    }
  }

  async function onDislikeHandler() {
    resetLikeAndDislike();
    setIsDislike(true);
    setDownVotesBy(pushIfNotExists(thread.downVotesBy, loggedInUser.id));

    const response = await downVoteThread(thread.id);
    if (response.error) {
      alert("gagal dislike: " + response.message);
      setIsDislike(false);
      setDownVotesBy(thread.downVoteThreads);
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
            <span className="ms-1">{upVotesBy.length}</span>
          </button>
          <button
            className="flex items-center"
            onClick={isDislike ? onNeutralizeHandler : onDislikeHandler}>
            {isDislike ? <BiSolidDislike /> : <BiDislike />}
            <span className="ms-1">{downVotesBy.length}</span>
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
  loggedInUser: PropTypes.object.isRequired,
};
