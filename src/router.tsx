import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "pages/Home";
import Search from "pages/Search";
import ProductDetails from "pages/ProductDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/items",
    element: <Search />,
  },
  {
    path: "/items/:id",
    element: <ProductDetails />,
  },
]);

export default Router;