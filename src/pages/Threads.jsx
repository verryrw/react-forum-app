import { useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import ForumItem from "../components/ForumItem";
import { IoMdAdd } from "react-icons/io";

export default function Threads() {
  const navigate = useNavigate();

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
      <section>
        <h1 className="mb-1 text-xl font-bold">Diskusi tersedia</h1>
        <ForumItem />
        <ForumItem />
        <ForumItem />
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
