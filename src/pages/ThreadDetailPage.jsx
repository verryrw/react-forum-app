import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import Badge from "../components/Badge";
import ButtonBack from "../components/ButtonBack";
import { addThreadComment, getThread } from "../utils/network-api";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { convertDateToTimeago } from "../utils";
import CommentItem from "../components/CommentItem";

export default function ThreadDetailPage({ loggedInUser }) {
  const params = useParams();
  const threadId = params.threadId;
  const navigate = useNavigate();
  const [thread, setThread] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchThread() {
      const response = await getThread(threadId);
      if (response.error) {
        alert(response.message);
      } else {
        setThread(response.data.detailThread);
        setIsLoading(false);
      }
    }

    fetchThread();
  }, [params]);

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

  async function onAddCommentHandler(event) {
    event.preventDefault();
    const response = await addThreadComment(threadId, comment);
    if (response.error) {
      alert(response.message);
    } else {
      console.log("berhasil nambah comment");
    }
  }

  function onBackHandler() {
    navigate("/", { replace: true });
  }

  if (isLoading) {
    return <h1 className="mt-8 text-center">Loading...</h1>;
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">
        <ButtonBack onBackHandler={onBackHandler} />
      </h4>
      <section>
        <Badge variant="outline">#{thread.category}</Badge>
        <h1 className="mt-2 text-3xl font-semibold">{thread.title}</h1>
        <h2
          className="mt-2 text-md text-zinc-300"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />
      </section>
      <section>
        <div className="mt-2 flex flex-col md:flex-row gap-4 text-sm ">
          <div className="flex gap-2">
            <button
              className="flex items-center"
              onClick={onLikeHandler}>
              {isLike ? <BiSolidLike /> : <BiLike />}
              <span className="ms-1">{thread.upVotesBy.length}</span>
            </button>
            <button
              className="flex items-center"
              onClick={onDislikeHandler}>
              {isDislike ? <BiSolidDislike /> : <BiDislike />}
              <span className="ms-1">0</span>
            </button>
          </div>
          <span className="flex">
            Dibuat oleh{" "}
            <img
              src={thread.owner.avatar}
              className="mx-1 h-5 w-5 rounded-full"
            />
            <b>{thread.owner.name}</b>
          </span>
          <span>{convertDateToTimeago(new Date(thread.createdAt))}</span>
        </div>
      </section>
      <section>
        <h1 className="mt-4 font-bold text-lg">Beri komentar</h1>
        {!loggedInUser && (
          <p className="mt-1 text-zinc-300">
            <Link
              to="/login"
              className="underline text-blue-500">
              Login
            </Link>{" "}
            untuk memberi komentar
          </p>
        )}
        {loggedInUser && (
          <div>
            <div
              className="my-2 p-2 w-full rounded-md bg-[#393E46] min-h-32"
              contentEditable={true}
              onInput={(event) => {
                setComment(event.target.innerHTML);
              }}
            />
            <button
              type="submit"
              className="w-full bg-[#fd7014] p-2 rounded-md"
              onClick={onAddCommentHandler}>
              Kirim
            </button>
          </div>
        )}
      </section>
      <section className="mb-24">
        <h1 className="mt-4 mb-2 font-bold text-lg">
          Komentar ({thread.comments.length})
        </h1>
        {thread.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </section>
    </div>
  );
}

ThreadDetailPage.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};
