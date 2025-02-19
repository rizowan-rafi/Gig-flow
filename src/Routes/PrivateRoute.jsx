import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../provider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    if(loading) return (
        <div className="h-screen w-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg  text-success"></span>
        </div>
    );
    if (user) return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>;
}

PrivateRoute.propTypes = {}

export default PrivateRoute