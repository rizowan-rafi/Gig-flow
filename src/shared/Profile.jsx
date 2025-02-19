import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'

const Profile = props => {
    const [user1, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`)
        .then(response => {
            setUser(response.data)
            setLoading(false)
        })
    }, [axiosSecure]);
    if (loading) {
        return <div className="h-screen w-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg  text-success"></span>
        </div>;
        
    }
    // console.log(user1)
  return (
      <div className="p-5 space-y-3 ">
          <h2 className="text-5xl font-bold text-primary mb-10">
              Profile Page
          </h2>
          <div className='space-y-10'>
              
          <div className="text-center flex justify-center items-center">
              <img
                  src={user1.image}
                  className="w-96 h-96 rounded-full"
                  alt=""
              />
          </div>
          <div className='text-center font-semibold dark:text-background text-text'>
              <h3 className='text-2xl'>Name : {user1.name}</h3>
              <h3 className='text-2xl'>Email : {user1.email}</h3>
              <h3 className='text-2xl'>Role : {user1.role}</h3>
              <h3 className='text-2xl'>Remaining Coin : {user1.coin}</h3>
          </div>
          </div>
      </div>
  );
}

Profile.propTypes = {}

export default Profile