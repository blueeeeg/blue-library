import { createBrowserRouter } from "react-router-dom";
import BottomFixedContainerPage from "./pages/bottom-fixed-container-page";

export const router = createBrowserRouter([
  {
    path: "/bottom-fixed-container",
    element: <BottomFixedContainerPage />,
  },
]);
