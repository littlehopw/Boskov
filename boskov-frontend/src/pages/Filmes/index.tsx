import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FilmeCard } from './card';

type Filme = {
    id: number;
    nome: string;
    diretor: string;
    produtora: string;
    duracao: number;
    classificacao: string;
    ano_lancamento: string;
    poster: string;
};

export const FilmesPage: React.FC = () => {
    const [filmes, setFilmes] = useState<Filme[]>([]);

    useEffect(() => {
        async function fetchFilmes() {
            const response = await axios.get<Filme[]>('http://localhost:3000/filme');
            setFilmes(response.data);
        }
        fetchFilmes();
    }, []);

    function handleAvaliar(id: number) {
        alert(`Você clicou para avaliar o filme com id ${id}`);
    }

    return (
        <div className="app-container">
            <div className="cards-container">
                {filmes.map(filme => (
                    <FilmeCard key={filme.id} filme={filme} onAvaliar={handleAvaliar} />
                ))}
            </div>
        </div>
    );
};

export default FilmesPage;
