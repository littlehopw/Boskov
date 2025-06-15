import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Avaliacao {
    id: number;
    id_usuario: number;
    id_filme: number;
    nota: number;
    comentario: string;
    status: boolean;
    filme: {
        nome: string;
    };
}

const AvaliacoesPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        const response = await axios.get('http://localhost:3000/avaliacao', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const payload = JSON.parse(atob(token!.split('.')[1]));
        const idUsuario = payload?.id;

        const minhasAvaliacoes = response.data.filter((a: Avaliacao) => a.id_usuario === idUsuario && a.status !== false);
        setAvaliacoes(minhasAvaliacoes);
      } catch (err) {
        console.error('Erro ao carregar avaliações!', err);
      }
    }

    fetchAvaliacoes();
  }, [token]);

  const handleChange = (index: number, field: keyof Avaliacao, value: any) => {
    const novas = [...avaliacoes];
    novas[index] = { ...novas[index], [field]: value };
    setAvaliacoes(novas);
  };

  const handleUpdate = async (avaliacao: Avaliacao) => {
    try {
      await axios.put(`http://localhost:3000/avaliacao/${avaliacao.id}`, {
        id_usuario: JSON.parse(atob(token!.split('.')[1])).id,
        id_filme: avaliacao.id_filme,
        nota: avaliacao.nota,
        comentario: avaliacao.comentario,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Avaliação atualizada!');
      setTimeout(() => setMensagem(''), 2000);
    } catch (err) {
      console.error('Erro ao atualizar avaliação!', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/avaliacao/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvaliacoes(avaliacoes.filter(a => a.id !== id));
    } catch (err) {
      console.error('Erro ao excluir avaliação!', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-md shadow-md max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Minhas Avaliações
        </h2>

        {mensagem && <p className="text-green-500 mt-4">{mensagem}</p>}

        <div className="flex gap-4 flex-wrap">
          {avaliacoes.map((a, index) => (
            <div key={a.id} className="bg-gray-700 p-4 rounded-md shadow-md w-80">
              <h3 className="text-red-500 font-semibold mb-2">
                {a.filme?.nome}
              </h3>

              <label className="text-gray-300">
                Nota:
                <select
                    value={a.nota}
                    onChange={(e) => handleChange(index, 'nota', Number(e.target.value))}
                    className="bg-gray-600 p-2 rounded-md mt-1 w-full">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
              </label>

              <label className="text-gray-300">
                Comentário:
                <textarea
                    value={a.comentario}
                    onChange={(e) => handleChange(index, 'comentario', e.target.value)}
                    rows={3}
                    className="bg-gray-600 p-2 rounded-md mt-1 w-full">
                </textarea>
              </label>

              <div className="flex gap-2 mt-4">
                <button
                    onClick={() => handleUpdate(a)}
                    className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-1 px-3 rounded-md">
                    Salvar
                </button>

                <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-gray-50 font-semibold py-1 px-3 rounded-md">
                    Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/filmes')}
          className="bg-gray-500 hover:bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-md mt-6">
          Voltar para Filmes
        </button>
      </div>
    </div>
  );
}

export default AvaliacoesPage;

