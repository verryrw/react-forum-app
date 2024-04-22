import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import TextInput from "../components/TextInput";
import useInput from "../hooks/useInput";
import { getUserLogged, login } from "../utils/network-api";
import { putAccessToken } from "../utils/local-api";

export default function LoginPage({ onLogin }) {
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  async function onSubmitHandler(event) {
    event.preventDefault();

    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const user = await getUserLogged();
      onLogin(user);
    } catch (err) {
      alert(err.message);
    }
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

LoginPage.propTypes = {
  onLogin: PropTypes.func,
};
