import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import CadastroPage from './pages/Cadastro/index';
import FilmesPage from './pages/Filmes/index';
import AvaliacaoPage from './pages/Avaliação/index';
import CriarFilmePage from './pages/Filmes/criar-filme';
import CriarGeneroPage from './pages/Genero/criar-genero';
import PerfilPage from './pages/Perfil/index';
import AvaliacoesPage from './pages/Avaliação/avaliações';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/filmes" element={<FilmesPage />} />
        <Route path="/avaliar/:idFilme" element={<AvaliacaoPage />} />
        <Route path="/criar-filme" element={<CriarFilmePage />} />
        <Route path="/criar-genero" element={<CriarGeneroPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/avaliacoes" element={<AvaliacoesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

