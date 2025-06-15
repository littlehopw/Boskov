import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/index';
import CadastroPage from './pages/cadastro/index';
import FilmesPage from './pages/filmes/index';
import AvaliacaoPage from './pages/avaliação/index';
import CriarFilmePage from './pages/filmes/criarFilme';
import CriarGeneroPage from './pages/genero/criarGenero';
import PerfilPage from './pages/perfil/index';
import AvaliacoesPage from './pages/avaliação/avaliações';
import { PrivateRoute } from './components/privateRoute';
import { MensagemErro } from './components/mensagemErro';

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

