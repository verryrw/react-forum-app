import { IoIosArrowBack } from "react-icons/io";

// eslint-disable-next-line react/prop-types
export default function ButtonBack({ onBackHandler }) {
  return (
    <button
      className="flex items-center gap-2 bg-[#393e46] hover:bg-[#34373d] pe-2 rounded-md"
      onClick={onBackHandler}>
      <IoIosArrowBack />
      Kembali
    </button>
  );
}
