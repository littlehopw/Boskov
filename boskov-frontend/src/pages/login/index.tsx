import * as React from 'react';
import axios from 'axios';
import '../../index.css';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState('');
  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        senha,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      alert('Login realizado com sucesso!');
      window.location.href = '/filmes';
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else {
        setErro('Credenciais inválidas. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="seunome@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="p-2 rounded border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {erro && <p className="text-red-500 font-semibold mt-2">{erro}</p>}

          <button
            type="submit"
            className="bg-red-500 text-gray-50 font-semibold py-2 rounded hover:bg-red-600 transition-colors"
          >
            Entrar
          </button>
        </form>

        <button
          onClick={() => (window.location.href = '/cadastro')}
          className="bg-gray-500 text-gray-50 font-semibold py-2 rounded mt-4 hover:bg-gray-600 transition-colors w-full"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
