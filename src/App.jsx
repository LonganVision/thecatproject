import { Routes, Route, Link, useParams } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Gallery from "./pages/Gallery/Gallery";
import Breeds from "./pages/Breeds/Breeds";
import BreedDetail from "./pages/BreedDetail/BreedDetail";

function App() {
  return (
    <div className="app-container">
      <header className="site-header">
        <NavBar />
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/breeds/:breed_id" element={<BreedDetail />} />

          {/* 默认首页 */}
          <Route path="/" element={<h2>👋 欢迎来到主页</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
