import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FilmeCard } from './card';
import { useNavigate } from 'react-router-dom';
import '../style.css';

type Filme = {
  id: number;
  nome: string;
  diretor: string;
  produtora: string;
  duracao: number;
  classificacao: string;
  ano_lancamento: string;
  poster: string;
};

export const FilmesPage: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  const navigate = useNavigate();

  function handleLogout() {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.post('http://localhost:3000/user/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
        localStorage.removeItem('token'); // ainda remove o token
        navigate('/');
      });
  }

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get<Filme[]>('http://localhost:3000/filme');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    async function fetchUserRole() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Erro ao buscar o papel do usuário:', error);
        }
      }
    }

    fetchFilmes();
    fetchUserRole();
  }, []);

  function handleAvaliar(id: number) {
    navigate(`/avaliar/${id}`);
  }

  return (
    <div className="page">
      <aside className="menu">
        <h3>Menu</h3>
        <ul>
          <li onClick={() => userRole === 'admin' && navigate('/criar-filme')} className={userRole !== 'admin' ? 'disabled' : ''}>
            Criar Filme
          </li>
          <li onClick={() => userRole === 'admin' && navigate('/criar-genero')} className={userRole !== 'admin' ? 'disabled' : ''}>
            Criar Gênero
          </li>
          <li onClick={() => navigate('/perfil')}>Gerenciar Perfil</li>
          <li onClick={() => navigate('/avaliacoes')}>Avaliações</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <div className="cards-container">
        {filmes.map(filme => (
          <FilmeCard key={filme.id} filme={filme} onAvaliar={handleAvaliar} />
        ))}
      </div>
    </div>
  );
};

export default FilmesPage;
