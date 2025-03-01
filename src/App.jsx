import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";

import Article from "./pages/Article";
import Category from "./pages/Category";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </Router>
  );
};

export default App;
