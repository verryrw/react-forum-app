import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextInput from "../components/TextInput";
import useInput from "../hooks/useInput";
import { asyncRegister } from "../states/users/action";
export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, nameChangeHandler] = useInput();
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  function onNavigateBack() {
    navigate(-1, { replace: true });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    dispatch(asyncRegister({ name, email, password }));
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar</h1>
      <form onSubmit={onSubmitHandler}>
        <TextInput
          placeholder="Nama"
          value={name}
          onChangeHandler={nameChangeHandler}
        />
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
          Daftar
        </button>
      </form>
      <div className="flex justify-center">
        <button
          className="mt-3 underline text-[#fd7014] font-bold"
          onClick={onNavigateBack}>
          Kembali
        </button>
      </div>
    </div>
  );
}
