import * as React from 'react';
import axios from 'axios';
import './style.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [senha, setSenha] = React.useState<string>('');
  const [erro, setErro] = React.useState<string>('');

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
      // window.location.href = '/filmes';
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
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2> 
          <input
          type="email"
          placeholder="seunome@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <p className="error">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;