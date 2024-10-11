import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import { Navigate } from "react-router-dom";

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if (currUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      firstName,
      lastName,
      password,
    };
    const res = dispatch(signUp(user));
    if (res.errors) setErrors(res.errors);
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpFormPage;