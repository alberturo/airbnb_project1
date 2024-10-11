import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (currUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      credential,
      password,
    };
    return dispatch(login(userInfo)).catch(async (res) => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Provide your email or username</label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginFormPage;
