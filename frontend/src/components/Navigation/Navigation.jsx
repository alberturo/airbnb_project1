// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import ProfileButton from "./ProfileButton";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user?.user);
//   const dispatch = useDispatch();
//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//   };
//   const sessionLinks = sessionUser ? (
//     <>
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     </>
//   ) : (
//     <>
//       <li>
//         <NavLink to="/login">Log In</NavLink>
//       </li>
//       <li>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <>
//       <NavLink to="/">Home</NavLink>
//       <ul>{isLoaded && sessionLinks}</ul>
//     </>
//   );
// }

// export default Navigation;

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user?.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
