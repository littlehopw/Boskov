import React, { useEffect, useState } from 'react';
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


const AvaliacoesPage: React.FC = () => {
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
                const idUsuario = payload.id || payload.userId || payload.sub;

                const minhasAvaliacoes = response.data.filter((a: Avaliacao) => a.id_usuario === idUsuario && a.status !== false);
                setAvaliacoes(minhasAvaliacoes);
            } catch (err) {
                console.error('Erro ao carregar avaliações', err);
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
            console.error('Erro ao atualizar avaliação', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/avaliacao/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAvaliacoes(avaliacoes.filter(a => a.id !== id));
        } catch (err) {
            console.error('Erro ao excluir avaliação', err);
        }
    };

    return (
        <div className="app-container">
            <div className="cards-container">
                <h2 style={{ width: '100%' }}>Minhas Avaliações</h2>
                {mensagem && <p style={{ color: 'green', width: '100%' }}>{mensagem}</p>}
                {avaliacoes.map((a, index) => (
                    <div key={a.id} className="avaliacao-card" style={{ minWidth: '300px' }}>
                        <h3>{a.filme.nome}</h3>
                        <label>Nota:</label>
                        <select
                            value={a.nota}
                            onChange={(e) => handleChange(index, 'nota', Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <label htmlFor="comentario">Comentário:</label>
                        <textarea
                            value={a.comentario}
                            onChange={(e) => handleChange(index, 'comentario', e.target.value)}
                            rows={3}
                        />
                        <div className='botoes'>
                            <button onClick={() => handleUpdate(a)}>Salvar</button>
                            <button onClick={() => handleDelete(a.id)} style={{ backgroundColor: '#a00' }}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
                <button style={{ marginTop: '30px' }} onClick={() => navigate('/filmes')}>Cancelar</button>
            </div>
        </div>
    );
};

export default AvaliacoesPage;
