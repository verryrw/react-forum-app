import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-api";

export default function Register() {
  const navigate = useNavigate();
  const [name, nameChangeHandler] = useInput();
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();

  function onNavigateBack() {
    navigate(-1, { replace: true });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await register({ name, email, password });
    if (response.success) {
      console.log(response);
    } else {
      alert(response.message);
    }
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
          className="w-full border border-[#fd7014] p-2 rounded-md">
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
