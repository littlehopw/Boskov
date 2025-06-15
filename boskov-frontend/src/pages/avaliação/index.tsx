import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

const AvaliacaoPage = () => {
  const { idFilme } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userPayload = token ? parseJwt(token) : null;
  const idUsuario = userPayload?.id || userPayload?.userId || userPayload?.sub;

  const [form, setForm] = useState({ nota: 0, comentario: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!idUsuario) {
      setError('Usuário não autenticado. Vá fazer login para avaliar.');
      return;
    }

    if (!form.nota || form.nota < 1 || form.nota > 5) {
      setError('Informe uma nota de 1 a 5.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/avaliacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          id_usuario: idUsuario,
          id_filme: Number(idFilme),
          nota: Number(form.nota),
          comentario: form.comentario,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao enviar avaliação.');
        return;
      }

      setSuccess('Avaliação enviada com sucesso!');
      setTimeout(() => navigate('/filmes'), 1500);
    } catch (err) {
      setError('Erro ao enviar avaliação.');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Avaliar Filme
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-300">
            Nota:
            <select
              name="nota"
              id="nota"
              value={form.nota}
              onChange={handleChange}
              className="bg-gray-700 text-gray-50 p-2 rounded-md mt-1 w-full">
              <option value="">Selecione uma nota</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <label className="text-gray-300">
            Comentário:
            <textarea
              id="comentario"
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              rows={4}
              placeholder="Deixe um comentário"
              className="bg-gray-700 p-2 rounded-md mt-1 w-full text-gray-50"
            ></textarea>
          </label>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-md">
            Enviar Avaliação
          </button>

          <button
            type="button"
            onClick={() => navigate('/filmes')}
            className="bg-gray-500 hover:bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-md">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AvaliacaoPage;

