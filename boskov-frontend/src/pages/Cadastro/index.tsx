import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css"; // certifique-se de que o style.css está na raiz de src

export default function CadastroPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
    role: 'user'
  });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      await axios.post('http://localhost:3000/user', form);
      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error(error);
      setErro('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.data_nascimento}
          onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
        {erro && <p className="error">{erro}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
