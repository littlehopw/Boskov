import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import CadastroPage from './pages/Cadastro/index';
import FilmesPage from './pages/Filmes/index';
import AvaliacaoPage from './pages/Avaliação/index';
import CriarFilmePage from './pages/Filmes/criar-filme';
import CriarGeneroPage from './pages/Genero/criar-genero';
import PerfilPage from './pages/Perfil/index';
import AvaliacoesPage from './pages/Avaliação/avaliações';
import { PrivateRoute } from './components/private-route';
import { MensagemErro } from './components/mensagem-erro';

function App() {
  return (
    
    <Router>
      <MensagemErro />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas protegidas */}
        <Route path="/filmes" element={
          <PrivateRoute>
            <FilmesPage />
          </PrivateRoute>
        }
        />
        <Route
          path="/avaliar/:idFilme"
          element={
            <PrivateRoute>
              <AvaliacaoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-filme"
          element={
            <PrivateRoute>
              <CriarFilmePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-genero"
          element={
            <PrivateRoute>
              <CriarGeneroPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PerfilPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes"
          element={
            <PrivateRoute>
              <AvaliacoesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

