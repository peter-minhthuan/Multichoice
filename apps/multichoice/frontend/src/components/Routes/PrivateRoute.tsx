import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../../utils/check_logged';

interface IPrivateRoute {
  Component: React.FunctionComponent<any>;
  rest?: any;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ Component, ...rest }) => {
  const loggedIn = isLogin();
  return loggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
