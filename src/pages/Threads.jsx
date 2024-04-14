import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import Badge from "../components/Badge";
import ThreadItem from "../components/ThreadItem";
import { useEffect, useState } from "react";
import { getThreads, getUsers } from "../utils/network-api";

export default function Threads() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchThreadsAndUsers() {
      const fetchedThreads = await getThreads();
      const fetchedUsers = await getUsers();
      const threadsData = fetchedThreads.data.threads;
      const usersData = fetchedUsers.data.users;
      setThreads(
        threadsData.map((thread) => ({
          ...thread,
          name: usersData.find((user) => user.id == thread.ownerId).name,
        }))
      );
      setUsers(usersData);
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
      <section>
        <h1 className="mb-1 text-xl font-bold">Diskusi tersedia</h1>
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
          />
        ))}
      </section>
      <section>
        <button
          className="rounded-md absolute right-4 bottom-4 bg-orange-500 hover:bg-orange-600 p-2 text-3xl font-bold drop-shadow-lg"
          onClick={onAddHandler}>
          <IoMdAdd />
        </button>
      </section>
    </div>
  );
}
