import React from 'react';

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

type FilmeCardProps = {
  filme: Filme;
  onAvaliar: (id: number) => void;
};

export const FilmeCard: React.FC<FilmeCardProps> = ({
  filme,
  onAvaliar,
}) => {
  return (
    <div className="bg-gray-800 rounded-md shadow-md p-4 w-72">
      <img src={filme.poster} alt={filme.nome} className="rounded-md w-full h-48 object-cover" />

      <h3 className="text-red-500 font-semibold mt-4 mb-2">
        {filme.nome} (
        {new Date(filme.ano_lancamento).getFullYear()}
        )
      </h3>

      <p className="text-gray-300">
        <strong>Diretor:</strong> {filme.diretor}
      </p>
      <p className="text-gray-300">
        <strong>Produtora:</strong> {filme.produtora}
      </p>
      <p className="text-gray-300">
        <strong>Duração:</strong> {filme.duracao} Horas
      </p>
      <p className="text-gray-300">
        <strong>Classificação:</strong> {filme.classificacao}
      </p>

      <button
        onClick={() => onAvaliar(filme.id)}
        className="bg-red-500 hover:bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-md mt-4 w-full transition">
        Avaliar
      </button>
    </div>
  );
};