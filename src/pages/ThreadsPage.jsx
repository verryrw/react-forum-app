import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import PropTypes from "prop-types";

import Badge from "../components/Badge";
import ThreadItem from "../components/ThreadItem";
import { useEffect, useState } from "react";
import { getThreads, getUsers } from "../utils/network-api";

export default function ThreadsPage({ loggedInUser }) {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchThreadsAndUsers() {
      const fetchedThreads = await getThreads();
      const fetchedUsers = await getUsers();

      if (fetchedThreads.error) {
        alert(fetchedThreads.message);
        return;
      }

      const threadsData = fetchedThreads.data.threads;
      const usersData = fetchedUsers.data.users;
      setThreads(
        threadsData.map((thread) => ({
          ...thread,
          name: usersData.find((user) => user.id == thread.ownerId).name,
        }))
      );
      setIsLoading(false);
    }

    fetchThreadsAndUsers();
  }, []);

  function onAddHandler() {
    navigate("/threads/add");
  }

  if (isLoading) {
    return <h1 className="mt-8 text-center">Loading...</h1>;
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
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            loggedInUser={loggedInUser}
          />
        ))}
      </section>
      {loggedInUser && (
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

ThreadsPage.propTypes = {
  loggedInUser: PropTypes.object,
};
