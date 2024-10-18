import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Navigate } from "react-router-dom";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user?.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  console.log("-->", currUser);
  if (currUser) return <Navigate to="/" replace={true} />;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userInfo = {
  //     credential,
  //     password,
  //   };
  //   return dispatch(login(userInfo)).catch(async (res) => {
  //     const data = await res.json();
  //     if (data?.errors) setErrors(data.errors);
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
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
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginFormPage;

// import { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// function LoginFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   if (sessionUser) return <Navigate to="/" replace={true} />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password })).catch(
//       async (res) => {
//         const data = await res.json();
//         if (data?.errors) setErrors(data.errors);
//       }
//     );
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.credential && <p>{errors.credential}</p>}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormPage;
