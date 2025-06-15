import { Navigate } from 'react-router-dom';
import { useError } from '../context/errorContext';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('token');
  const { setErrorMessage } = useError();

  if (!token) {
    setErrorMessage('Você precisa estar logado para acessar esta página.');
    return <Navigate to="/" replace />;
  }

  return children;
}
