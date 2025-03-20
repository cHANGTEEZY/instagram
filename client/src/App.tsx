import "./App.css";

import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import PageNotFound from "./components/Error404";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthenticateProvider } from "./context/AuthorizedContext";

const App: React.FC = () => {
  return (
    <AuthenticateProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthenticateProvider>
  );
};

export default App;
