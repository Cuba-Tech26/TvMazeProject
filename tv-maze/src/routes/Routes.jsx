import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import TvDetails from "../pages/TvDetails";
import Search from "../pages/Search";
import Tvshows from "../pages/Tvshows";
import Error from "../components/Error";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
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
          element: <Search />,
        },
        {
          path: "/tvshows",
          element: <Tvshows />,
        },
        // {
        //   path: "*",
        //   element: <Error />,
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
