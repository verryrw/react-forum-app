import { Link } from "react-router-dom";

import TextInput from "../components/TextInput";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/auth_user/action";

export default function LoginPage() {
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();
  const dispatch = useDispatch();

  function onSubmitHandler(event) {
    event.preventDefault();
    dispatch(asyncSetAuthUser(email, password));
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmitHandler}>
        <TextInput
          placeholder="Email"
          type="email"
          value={email}
          onChangeHandler={emailChangeHandler}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChangeHandler={passwordChangeHandler}
        />
        <button
          type="submit"
          className="w-full border border-[#fd7014] p-2 mt-2 rounded-md">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Belum punya akun?{" "}
        <Link
          to={"/register"}
          className="text-[#fd7014] font-bold underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
