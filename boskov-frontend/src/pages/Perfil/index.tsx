import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string;
}

const PerfilPage: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const response = await axios.get('http://localhost:3000/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsuario(response.data);
            } catch (err) {
                console.error(err);
                setErro('Erro ao carregar perfil.');
            }
        }

        carregarPerfil();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (usuario) {
            setUsuario({ ...usuario, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setMensagem('');

        try {
            await axios.put(`http://localhost:3000/user/${usuario?.id}`, usuario, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMensagem('Perfil atualizado com sucesso!');
        } catch (err) {
            console.error(err);
            setErro('Erro ao atualizar perfil.');
        }
    };

    if (!usuario) return <p>Carregando perfil...</p>;

    return (
        <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Gerenciar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    value={usuario.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="senha"
                    value={usuario.senha}
                    onChange={handleChange}
                    placeholder="Senha"
                    required
                />
                <input
                    type="date"
                    name="data_nascimento"
                    value={usuario.data_nascimento}
                    onChange={handleChange}
                    required
                />

                {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
                {erro && <p className="error">{erro}</p>}

                <button type="submit">Salvar</button>
                <button type="button" onClick={() => navigate(-1)} style={{ backgroundColor: '#555' }}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default PerfilPage;
