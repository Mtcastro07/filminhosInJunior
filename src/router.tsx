import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndividualPage from "./pages/IndividualPage";
import LikesPage from "./pages/LikesPage";
import ReviewsPage from "./pages/ReviewsPage";
import WatchedPage from "./pages/WatchedPage";
import UserPage from "./pages/UserPage";
import Login from "./pages/LoginPage";
import Cadastro from "./pages/CadastroPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Individual",
    element: <IndividualPage />,
  },
  {
    path: "/Likes",
    element: <LikesPage />,
  },
  {
    path: "/Reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/Watched",
    element: <WatchedPage />,
  },
  {
    path: "/User",
    element: <UserPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Cadastro",
    element: <Cadastro />,
  },
]);

export default router;
