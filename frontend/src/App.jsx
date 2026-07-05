// import { Routes, Route } from "react-router-dom";

// import CompanyValidatorLanding from "./pages/Landing.page";
// import LoginPage from "./pages/Login.page";
// import DashboardPage from "./pages/Dashboard.page";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<CompanyValidatorLanding />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/dashboard" element={<DashboardPage />} />
      
//     </Routes>
//   );
// }

// export default App;
import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;
