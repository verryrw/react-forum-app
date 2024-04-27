import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

import Badge from "../components/Badge";
import ThreadItem from "../components/ThreadItem";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";

export default function ThreadsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser,
    threads = [],
    users = [],
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    name: users.find((user) => user.id == thread.ownerId).name,
  }));

  function onAddHandler() {
    navigate("/threads/add");
  }

  return (
    <div className="p-4">
      <section>
        <h1>Kategori Populer</h1>
        <Badge variant="outline">#test</Badge>
      </section>
      <div className="my-4" />
      <section className="mb-24">
        <h1 className="mb-1 text-xl font-bold">Diskusi tersedia</h1>
        {threadList.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            loggedInUser={authUser}
          />
        ))}
      </section>
      {authUser && (
        <section>
          <button
            className="rounded-md absolute right-4 bottom-4 bg-orange-500 hover:bg-orange-600 p-2 text-3xl font-bold drop-shadow-lg"
            onClick={onAddHandler}>
            <IoMdAdd />
          </button>
        </section>
      )}
    </div>
  );
}
