import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CadastroPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', data_nascimento: '', role: 'user' });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Cadastro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <input
            className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            required
          />
          <input
            className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="date"
            value={form.data_nascimento}
            onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
            required
          />
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-2 px-4 rounded-md transition"
            type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
