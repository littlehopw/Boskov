import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import CadastroPage from './pages/Cadastro/index';
import FilmesPage from './pages/Filmes/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/filmes" element={<FilmesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

