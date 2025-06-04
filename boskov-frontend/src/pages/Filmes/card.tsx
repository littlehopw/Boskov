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

export const FilmeCard: React.FC<FilmeCardProps> = ({ filme, onAvaliar }) => {
  return (
    <div style={{
      width: 320,
      backgroundColor: '#ffffff',
      color: '#1c1c1c',
      borderRadius: 12,
      boxShadow: '0 0 15px red',
      margin: 10,
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      overflow: 'hidden',
      textAlign: 'center',
      paddingBottom: 20,
    }}>
      <img 
        src={filme.poster} 
        alt={filme.nome} 
        style={{ width: '100%', height: 180, objectFit: 'cover' }} 
      />
      <div style={{ padding: '20px 30px 0 30px' }}>
        <h3 style={{ marginBottom: 15, color: '#d90429', fontSize: 22 }}>
          {filme.nome} ({new Date(filme.ano_lancamento).getFullYear()})
        </h3>
        <p style={{ margin: '6px 0' }}><strong>Diretor:</strong> {filme.diretor}</p>
        <p style={{ margin: '6px 0' }}><strong>Produtora:</strong> {filme.produtora}</p>
        <p style={{ margin: '6px 0' }}><strong>Duração:</strong> {filme.duracao} Horas</p>
        <p style={{ margin: '6px 0 20px 0' }}><strong>Classificação:</strong> {filme.classificacao}</p>
        <button
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#d90429',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => onAvaliar(filme.id)}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b40323')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#d90429')}
        >
          Avaliar
        </button>
      </div>
    </div>
  );
};

