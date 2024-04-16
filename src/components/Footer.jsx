import { PiChatsCircleDuotone } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function Footer({ loggedInUser, logoutHandler }) {
  return (
    <footer>
      <div className="flex justify-center w-full bg-zinc-900">
        <nav>
          <div className="flex flex-row gap-8">
            <NavLink to={"/"}>
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

            {!loggedInUser && (
              <NavLink to={"/login"}>
                <div className="flex flex-col items-center p-2 hover:bg-black">
                  <IoMdLogIn />
                  <p>Login</p>
                </div>
              </NavLink>
            )}

            {loggedInUser && (
              <button
                className="flex flex-col items-center p-2 hover:bg-black"
                onClick={logoutHandler}>
                <IoMdLogOut />
                <p>Logout</p>
              </button>
            )}
          </div>
        </nav>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};
