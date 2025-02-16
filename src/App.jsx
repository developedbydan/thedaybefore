import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
