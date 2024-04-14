import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="bg-[#fd7014] text-white p-4">
        <h1>
          <Link to={"/"}>DICODING FORUM APP</Link>
        </h1>
      </div>
    </header>
  );
}
