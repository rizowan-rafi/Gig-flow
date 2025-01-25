import React from 'react'
import PropTypes from 'prop-types'
import useAuth from './useAuth'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUser = props => {
    const {user,loading} = useAuth();
    // if(loading) return <p>loading...</p>
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // console.log(user);
    const { isPending, error, refetch, data } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user || loading) return null;
            try {
                const response = await axiosPublic.get(`/users/${user.email}`);
                return response.data;
                
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        },
        
    })
    // console.log(data);
    return [data, refetch,isPending,error];
}

useUser.propTypes = {}

export default useUser;