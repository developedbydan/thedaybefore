import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";

import Article from "./pages/Article";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;
