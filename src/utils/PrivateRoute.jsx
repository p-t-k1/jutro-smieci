import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import verifyToken from './verifyToken';

const PrivateRoute = ({children, ...rest}) => {
    const auth = verifyToken();

    return (
      <Route {...rest}>
        {!auth ? <Redirect to="/login" /> : children}
      </Route>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
