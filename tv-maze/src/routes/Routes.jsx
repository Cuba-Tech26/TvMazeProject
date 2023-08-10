import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import TvDetails from "../pages/TvDetails";
import Search from "../pages/Search"

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "tvshows/:id",
          element: <TvDetails />,
        },
        {
          path: "search",
          element: <search/>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
