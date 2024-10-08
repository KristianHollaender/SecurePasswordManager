import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { TokenAtom } from '../atoms/TokenAtom.tsx';

const AuthGuard: React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  const [token] = useAtom(TokenAtom);
  const localStorageToken = localStorage.getItem('token');

  if (token === localStorageToken) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default AuthGuard;