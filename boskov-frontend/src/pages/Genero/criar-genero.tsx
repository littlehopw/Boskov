import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CriarGeneroPage: React.FC = () => {
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setErro('Você precisa estar logado como administrador.');
            return;
        }

        if (!descricao.trim()) {
            setErro('A descrição do gênero é obrigatória.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/genero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ descricao }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErro(data.error || 'Erro ao criar gênero.');
                return;
            }

            setSuccess('Gênero criado com sucesso!');
            setTimeout(() => navigate('/filmes'), 1500);
        } catch (err) {
            console.error(err);
            setErro('Erro ao criar gênero.');
        }
    };

    return (
        <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Criar Gênero</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="descricao">Descrição:</label>
                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Ação"
                    required
                />

                {erro && <p className="error">{erro}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Criar Gênero</button>
            </form>
            <button type="button" onClick={() => navigate(-1)} style={{ backgroundColor: '#555' }}>
                Cancelar
            </button>
        </div>
    );
};

export default CriarGeneroPage;
