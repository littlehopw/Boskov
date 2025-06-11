import { createContext, useContext, useState } from 'react';

interface ErrorContextType {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError deve ser usado dentro de ErrorProvider');
  }
  return context;
};
