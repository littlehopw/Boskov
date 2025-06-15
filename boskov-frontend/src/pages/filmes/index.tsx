import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FilmeCard } from './card';
import { useNavigate } from 'react-router-dom';

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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout!', error);
        localStorage.removeItem('token');
        navigate('/');
      });
  }

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get<Filme[]>('http://localhost:3000/filme');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes!', error);
      }
    }

    async function fetchUserRole() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Erro ao buscar o papel!', error);
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
    <div className="flex min-h-screen bg-gray-900">
      <aside className="bg-gray-800 text-gray-100 p-6 w-64">
        <h3 className="text-2xl font-semibold mb-4">Menu</h3>
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => userRole === 'admin' && navigate('/gerenciar-filmes')}
            className={`cursor-pointer p-2 rounded-md ${userRole === 'admin'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-900 text-gray-500 cursor-not-allowed'
              }`}
          >
            Gerenciar Filmes
          </li>
          <li
            onClick={() => userRole === 'admin' && navigate('/criar-genero')}
            className={`cursor-pointer p-2 rounded-md ${userRole === 'admin'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-900 text-gray-500 cursor-not-allowed'
              }`}
          >
            Gerenciar Gêneros
          </li>
          <li
            onClick={() => navigate('/usuarios')}
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer">
            Gerenciar Usuários
          </li>
          <li
            onClick={() => navigate('/perfil')}
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer">
            Gerenciar Perfil
          </li>
          <li
            onClick={() => navigate('/avaliacoes')}
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer">
            Gerenciar Avaliações
          </li>
          <li
            onClick={handleLogout}
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer">
            Logout
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold text-red-500 mb-6">
          Filmes
        </h2>
        <div className="flex gap-6 flex-wrap">
          {filmes.map((filme) => (
            <FilmeCard key={filme.id} filme={filme} onAvaliar={handleAvaliar} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FilmesPage;