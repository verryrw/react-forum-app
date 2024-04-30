import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Badge from "../components/Badge";
import ButtonBack from "../components/ButtonBack";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { convertDateToTimeago } from "../utils";
import CommentItem from "../components/CommentItem";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddThreadDetailComment,
  asyncReceiveThreadDetail,
  asyncToggleThreadDetailDislike,
  asyncToggleThreadDetailLike,
  clearThreadDetailActionCreator,
} from "../states/thread_detail/action";

export default function ThreadDetailPage() {
  const params = useParams();
  const threadId = params.threadId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, threadDetail } = useSelector((states) => states);
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    dispatch(clearThreadDetailActionCreator());
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  function onBackHandler() {
    navigate("/", { replace: true });
  }

  function onThreadLikeHandler() {
    dispatch(asyncToggleThreadDetailLike(threadId));
  }

  function onThreadDislikeHandler() {
    dispatch(asyncToggleThreadDetailDislike(threadId));
  }

  function onCommentAddHandler() {
    dispatch(asyncAddThreadDetailComment(threadId, commentBody));
  }

  function isLikedByMe() {
    return threadDetail.upVotesBy.includes(authUser?.id);
  }

  function isDislikedByMe() {
    return threadDetail.downVotesBy.includes(authUser?.id);
  }

  if (threadDetail === null) {
    return null;
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">
        <ButtonBack onBackHandler={onBackHandler} />
      </h4>
      <section>
        <Badge variant="outline">#{threadDetail.category}</Badge>
        <h1 className="mt-2 text-3xl font-semibold">{threadDetail.title}</h1>
        <h2
          className="mt-2 text-md text-zinc-300"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
      </section>
      <section>
        <div className="mt-2 flex flex-col md:flex-row gap-4 text-sm ">
          <div className="flex gap-2">
            <button
              className="flex items-center"
              onClick={onThreadLikeHandler}>
              {isLikedByMe() ? <BiSolidLike /> : <BiLike />}
              <span className="ms-1">{threadDetail.upVotesBy.length}</span>
            </button>
            <button
              className="flex items-center"
              onClick={onThreadDislikeHandler}>
              {isDislikedByMe() ? <BiSolidDislike /> : <BiDislike />}
              <span className="ms-1">{threadDetail.downVotesBy.length}</span>
            </button>
          </div>
          <span className="flex">
            Dibuat oleh{" "}
            <img
              src={threadDetail.owner.avatar}
              className="mx-1 h-5 w-5 rounded-full"
            />
            <b>{threadDetail.owner.name}</b>
          </span>
          <span>{convertDateToTimeago(new Date(threadDetail.createdAt))}</span>
        </div>
      </section>
      <section>
        <h1 className="mt-4 font-bold text-lg">Beri komentar</h1>
        {!authUser && (
          <p className="mt-1 text-zinc-300">
            <Link
              to="/login"
              className="underline text-blue-500">
              Login
            </Link>{" "}
            untuk memberi komentar
          </p>
        )}
        {authUser && (
          <div>
            <div
              className="my-2 p-2 w-full rounded-md bg-[#393E46] min-h-32"
              contentEditable={true}
              onInput={(event) => {
                setCommentBody(event.target.innerHTML);
              }}
            />
            <button
              type="submit"
              className="w-full bg-[#fd7014] p-2 rounded-md"
              onClick={onCommentAddHandler}>
              Kirim
            </button>
          </div>
        )}
      </section>
      <section className="mb-24">
        <h1 className="mt-4 mb-2 font-bold text-lg">
          Komentar ({threadDetail.comments.length})
        </h1>
        {threadDetail.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            loggedInUser={authUser}
            threadId={threadDetail.id}
          />
        ))}
      </section>
    </div>
  );
}
