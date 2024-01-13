import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const PublicRoute = ({ auth, component: Component }) => {

    return auth?.id ? <Navigate to="/dashboard" replace /> : <Component />;
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(PublicRoute);