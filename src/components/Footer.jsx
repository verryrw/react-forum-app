import { PiChatsCircleDuotone } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center w-full bg-zinc-900">
        <nav>
          <div className="flex flex-row gap-8">
            <NavLink to={""}>
              <div className="flex flex-col items-center p-2 hover:bg-black">
                <PiChatsCircleDuotone />
                <p>Threads</p>
              </div>
            </NavLink>
            <NavLink to={"/leaderboards"}>
              <div className="flex flex-col items-center p-2 hover:bg-black">
                <MdOutlineLeaderboard />
                <p>Leaderboards</p>
              </div>
            </NavLink>
            <NavLink to={"/login"}>
              <div className="flex flex-col items-center p-2 hover:bg-black">
                <IoMdLogIn />
                <p>Login</p>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </footer>
  );
}
