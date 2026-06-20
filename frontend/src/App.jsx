import { Routes, Route } from "react-router-dom";

import CompanyValidatorLanding from "./pages/Landing.page";
import LoginPage from "./pages/Login.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyValidatorLanding />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

