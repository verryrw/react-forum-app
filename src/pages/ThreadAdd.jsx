import { useNavigate } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import TextInput from "../components/TextInput";
import useInput from "../hooks/useInput";

export default function ThreadAdd() {
  const navigate = useNavigate();
  const [title, titleChangeHandler] = useInput();
  const [category, categoryChangeHandler] = useInput();

  function onBackHandler() {
    navigate("/", { replace: true });
  }

  return (
    <div className="p-4">
      <ButtonBack onBackHandler={onBackHandler} />
      <div className="my-4" />
      <section>
        <h1 className="font-semibold text-xl mb-4">Buat Diskusi Baru</h1>
        <form>
          <TextInput
            placeholder="Judul"
            value={title}
            onChangeHandler={titleChangeHandler}
          />
          <TextInput
            placeholder="Kategori"
            value={category}
            onChangeHandler={categoryChangeHandler}
          />
          <div
            className="mb-2 p-2 w-full rounded-md bg-[#393E46] min-h-32"
            contentEditable={true}
            data-placeholder={"Description"}
          />
          <button
            type="submit"
            className="w-full border border-[#fd7014] p-2 rounded-md">
            Buat
          </button>
        </form>
        <div className="flex justify-center">
          <button
            className="mt-3 underline text-[#fd7014] font-bold"
            onClick={onBackHandler}>
            Batal
          </button>
        </div>
      </section>
    </div>
  );
}
