import "./App.css";
import PaginaAdmin from "./pages/admin/PaginaAdmin";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/*" element={<PaginaAdmin/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

