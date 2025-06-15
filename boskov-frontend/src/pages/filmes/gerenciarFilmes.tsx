import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function parseJwt(token: string) {
    try {
        const base64Payload = token.split('.')[1];
        return JSON.parse(atob(base64Payload));
    } catch (e) {
        return null;
    }
}

interface Filme {
    id: number;
    nome: string;
    diretor: string;
    duracao: number;
    classificacao: string;
    poster: string;
    id_genero: number;
    ano_lancamento: string;
    produtora: string;
}

interface Genero {
    id: number;
    descricao: string;
}

const GerenciarFilmesPage: React.FC = () => {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [generos, setGeneros] = useState<Genero[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userPayload = token ? parseJwt(token) : null;

    useEffect(() => {
        if (userPayload?.role !== 'admin') {
            navigate('/filmes');
            return;
        }

        async function fetchFilmes() {
            try {
                const response = await axios.get<Filme[]>("http://localhost:3000/filme");

                setFilmes(response.data);
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar os filmes.");
            }
        }

        fetchFilmes();
    }, [navigate]);

    useEffect(() => {
        async function fetchFilmesGeneros() {
            try {
                const responseFilmes = await axios.get<Filme[]>("http://localhost:3000/filme");

                const responseGeneros = await axios.get<Genero[]>("http://localhost:3000/genero");

                setFilmes(responseFilmes.data);
                setGeneros(responseGeneros.data);
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar os filmes.");
            }
        }

        fetchFilmesGeneros();
    }, []);

    const handleChange = (index: number, field: keyof Filme, value: any) => {
        setFilmes((prev) =>
            prev.map((f, i) =>
                i === index ? { ...f, [field]: value } : f
            )
        );
    };

    const handleSave = async (id: number, index: number) => {
        try {
            const filme = filmes[index]

            const filmeParaSalvar = {
                nome: filme.nome,
                diretor: filme.diretor,
                duracao: Number(filme.duracao),
                classificacao: filme.classificacao,
                poster: filme.poster,
                id_genero: Number(filme.id_genero),
                ano_lancamento: new Date(filme.ano_lancamento).toISOString(),
                produtora: filme.produtora,
            }

            await axios.put(
                `http://localhost:3000/filme/${id}`,
                filmeParaSalvar,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            setMensagem("Filme atualizado com sucesso!");
            setTimeout(() => setMensagem(""), 2000);
        } catch (error) {
            console.error(error);
            setErro("Erro ao atualizar o filme.");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/filme/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFilmes((prev) => prev.filter((f) => f.id !== id));

            setMensagem("Filme removido com sucesso!");
            setTimeout(() => setMensagem(""), 2000);
        } catch (error) {
            console.error(error);
            setErro("Erro ao excluir o filme.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-md shadow-md max-w-4xl w-full">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                    Gerenciar Filmes
                </h2>
                {mensagem && <p className="text-green-500 mt-4">{mensagem}</p>}
                {erro && <p className="text-red-500 mt-4">{erro}</p>}
                <div className="flex gap-4 flex-wrap">
                    {filmes.map((f, index) => (
                        <div key={f.id} className="bg-gray-700 p-4 rounded-md shadow-md w-80">
                            <h3 className="text-red-500 font-semibold mb-2">
                                {f.nome}
                            </h3>
                            <label className="text-gray-300">
                                Nome do Filme:
                                <input
                                    className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                    value={f.nome}
                                    onChange={(e) =>
                                        handleChange(index, "nome", e.target.value)
                                    }
                                />
                            </label>
                            <label className="text-gray-300">
                                Diretor:
                                <input
                                    className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                    value={f.diretor}
                                    onChange={(e) =>
                                        handleChange(index, "diretor", e.target.value)
                                    }
                                />
                            </label>
                            <label className="text-gray-300">
                                Duração:
                                <input
                                    className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                    type="number"
                                    value={f.duracao}
                                    onChange={(e) =>
                                        handleChange(index, "duracao", Number(e.target.value))
                                    }
                                />
                            </label>
                            <label className="text-gray-300">
                                Classificação:
                                <input
                                    className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                    value={f.classificacao}
                                    onChange={(e) =>
                                        handleChange(index, "classificacao", e.target.value)
                                    }
                                />
                            </label>
                            <label className="text-gray-300">
                                Poster (URL):
                                <input
                                    className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                    value={f.poster}
                                    onChange={(e) =>
                                        handleChange(index, "poster", e.target.value)
                                    }
                                />
                            </label>
                            <label className="text-gray-300">
                                Gênero</label>
                            <select
                                className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                value={f.id_genero}
                                onChange={(e) =>
                                    handleChange(index, "id_genero", Number(e.target.value))
                                }
                            >
                                <option value="">Selecione um gênero</option>
                                {generos.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.descricao}
                                    </option>
                                ))}
                            </select>
                            <label className="text-gray-300">
                                Data de Lançamento</label>
                            <input
                                className="bg-gray-600 p-2 rounded-md mt-1 w-full text-gray-50"
                                type="date"
                                value={f.ano_lancamento.slice(0, 10)}
                                onChange={(e) =>
                                    handleChange(index, "ano_lancamento", e.target.value)
                                }
                            />
                            <button
                                onClick={() => handleSave(f.id, index)}
                                className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-1 px-3 rounded-md mt-4 mr-2">
                                Salvar
                            </button>
                            <button
                                onClick={() => handleDelete(f.id)}
                                className="bg-red-500 hover:bg-red-600 text-gray-50 font-semibold py-1 px-3 rounded-md mt-4">
                                Excluir
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/filmes')}
                    className="bg-gray-500 hover:bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-md mt-6 mr-2">
                    Voltar para Filmes
                </button>
                <button
                    onClick={() => navigate('/criar-filme')}
                    className="bg-blue-500 hover:bg-blue-600 text-gray-50 font-semibold py-2 px-4 rounded-md mt-6">
                    Criar novo Filme
                </button>
            </div>
        </div>
    );
}

export default GerenciarFilmesPage;