import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../layouts/web/index";
import ProductList from "../pages/ProductList";
import Detail from "../pages/Detail";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/product/:productId",
        element: <Detail />,
      },
    ],
  },
]);

export default routes;
