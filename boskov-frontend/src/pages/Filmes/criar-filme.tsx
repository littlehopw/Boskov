import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FilmeForm {
  nome: string;
  diretor: string;
  ano_lancamento: string;
  id_genero: number;
  duracao: number;
  produtora: string;
  classificacao: string;
  poster: string;
}

interface Genero {
  id: number;
  descricao: string;
}

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

const CriarFilmePage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FilmeForm>({
    nome: '',
    diretor: '',
    ano_lancamento: '',
    id_genero: 0,
    duracao: 0,
    produtora: '',
    classificacao: '',
    poster: '',
  });
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const userPayload = token ? parseJwt(token) : null;
  const userRole = userPayload?.role;

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/filmes');
    }

    fetch('http://localhost:3000/genero')
      .then(res => res.json())
      .then(data => setGeneros(data))
      .catch(() => setError('Erro ao carregar os gêneros.'));
  }, [navigate, userRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/filme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          id_genero: Number(form.id_genero),
          duracao: Number(form.duracao),
          ano_lancamento: new Date(form.ano_lancamento).toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao criar filme.');
        return;
      }

      setSuccess('Filme criado com sucesso!');
      setTimeout(() => navigate('/filmes'), 1500);
    } catch (err) {
      console.error(err);
      setError('Erro ao criar o filme.');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Criar Filme</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input type="text" name="diretor" placeholder="Diretor" value={form.diretor} onChange={handleChange} required />
        <input type="date" name="ano_lancamento" value={form.ano_lancamento} onChange={handleChange} required />

        <select name="id_genero" value={form.id_genero} onChange={handleChange} required>
          <option value={0}>Selecione um gênero</option>
          {generos.map(g => (
            <option key={g.id} value={g.id}>{g.descricao}</option>
          ))}
        </select>

        <input type="number" name="duracao" placeholder="Duração (minutos)" value={form.duracao} onChange={handleChange} required />
        <input type="text" name="produtora" placeholder="Produtora" value={form.produtora} onChange={handleChange} required />
        <input type="text" name="classificacao" placeholder="Classificação" value={form.classificacao} onChange={handleChange} required />
        <input type="text" name="poster" placeholder="URL do Poster" value={form.poster} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Criar Filme</button>
      </form>
    </div>
  );
};

export default CriarFilmePage;
