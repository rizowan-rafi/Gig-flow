import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../provider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    if(loading) return <p>loading...</p>
    if (user) return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>;
}

PrivateRoute.propTypes = {}

export default PrivateRoute