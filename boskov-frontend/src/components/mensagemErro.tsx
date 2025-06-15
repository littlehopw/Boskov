import { useEffect } from 'react';
import { useError } from '../context/errorContext';

export const MensagemErro = () => {
  const { errorMessage, setErrorMessage } = useError();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]);

  if (!errorMessage) return null;

  return (
    <div style={{
      backgroundColor: '#f44336',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1000,
    }}>
      {errorMessage}
    </div>
  );
};
