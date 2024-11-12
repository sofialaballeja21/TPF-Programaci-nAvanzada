import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Character from './pages/Character';
import Header from './template/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-customBlueExtraLight">
        <Header />
        <div className="container mx-auto px-4 mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Character />} /> {/* Ruta dinámica */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



