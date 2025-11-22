import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login, { action as loginAction } from "./pages/Login.jsx";
import RootLayout from "./pages/Root.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";

function tokenLoader() {
  return localStorage.getItem("token");
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Login />, action: loginAction },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "posts/create",
        element: <CreatePostPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
