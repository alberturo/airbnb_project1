import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/session";

const Layout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setLoading(true);
    });
  }, [dispatch]);
  return <>{loading && <Outlet />}</>;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>yupiiii</h1>,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
