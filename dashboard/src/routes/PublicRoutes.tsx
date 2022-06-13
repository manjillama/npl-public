import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages";
import NotFoundPage from "../components/commons/NotFound";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default PublicRoutes;
