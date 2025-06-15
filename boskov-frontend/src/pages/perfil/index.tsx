import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string;
    role: string;
    status?: boolean;
}

const PerfilPage: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const response = await axios.get('http://localhost:3000/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = response.data;
                const dataNascimento = new Date(userData.data_nascimento)
                    .toISOString()
                    .slice(0, 10);

                setUsuario({ 
                    ...userData, 
                    senha: '',
                    data_nascimento: dataNascimento 
                });
            } catch (err) {
                console.error(err);
                setErro('Erro ao carregar perfil.');
            }
        }

        carregarPerfil();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (usuario) {
            setUsuario({ ...usuario, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setMensagem('');
        try {
            await axios.put(`http://localhost:3000/user/${usuario?.id}`, {
                nome: usuario?.nome,
                email: usuario?.email,
                senha: usuario?.senha,
                data_nascimento: usuario?.data_nascimento,
                role: usuario?.role,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMensagem('Dados atualizados com sucesso!');
            setTimeout(() => navigate('/filmes'), 1500);
        } catch (err: any) {
            console.error(err);
            setErro(err.response?.data?.error || 'Erro ao atualizar perfil.');
        }
    };

    if (!usuario) return <p>Carregando perfil...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">Gerenciar Perfil</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="text"
                        name="nome"
                        value={usuario.nome}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="relative">
                        <input
                            className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                            type={mostrarSenha ? "text" : "password"}
                            name="senha"
                            value={usuario.senha}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={mostrarSenha ? faEyeSlash : faEye}
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-100 cursor-pointer"
                        />
                    </div>
                    <input
                        className="p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="date"
                        name="data_nascimento"
                        value={usuario.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                    {mensagem && <p className="text-green-500 mt-2">{mensagem}</p>}
                    {erro && <p className="text-red-500 mt-2">{erro}</p>}
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-2 px-4 rounded-md transition">
                        Salvar
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

export default PerfilPage;


