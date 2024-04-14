import { Link } from "react-router-dom";
import Badge from "./Badge";
// eslint-disable-next-line no-unused-vars
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { useState } from "react";
import { convertDateToTimeago } from "../utils";

export default function ForumItem() {
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
    <div className="p-2 border bg-[#393e46] rounded-md mb-2">
      <Badge variant="outline">#test</Badge>
      <h4 className="font-bold">
        <Link
          to={"/threads/thread-123"}
          className="hover:underline">
          Title
        </Link>
      </h4>
      <p className="text-sm text-zinc-300">Description</p>
      <div className="mt-2 flex flex-col md:flex-row gap-2 text-sm ">
        <div className="flex gap-2">
          <button
            className="flex items-center"
            onClick={onLikeHandler}>
            {isLike ? <BiSolidLike /> : <BiLike />}
            <span className="ms-1">0</span>
          </button>
          <button
            className="flex items-center"
            onClick={onDislikeHandler}>
            {isDislike ? <BiSolidDislike /> : <BiDislike />}
            <span className="ms-1">0</span>
          </button>
          <button className="flex items-center">
            <BsReply />
            <span className="ms-1">0</span>
          </button>
        </div>
        <span>{convertDateToTimeago(Date.now() - 60 * 1000000)}</span>
        <span>
          Dibuat oleh <b>Dimas Saputra</b>
        </span>
      </div>
    </div>
  );
}
