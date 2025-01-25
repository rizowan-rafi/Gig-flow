import React from 'react'
import PropTypes from 'prop-types'
import './banner.css'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
const Ad = props => {
    const navigate = useNavigate()
    const [data] = useUser();
    const handleAd = () => {
        if(!data)
            navigate('/register', { replace: true })
        else
            navigate(`/dashboard/${data?.role}/home`)
  
    }
  return (
      <div className="lg:w-[65%] w-[90%] banner mx-auto flex flex-col lg:flex-row rounded-xl items-center justify-between shadow-xl p-12 py-16">
          <div className="lg:w-[70%]">
              <h2 className="text-2xl font-bold">
                  Start Earning Instantly with Simple Tasks!
              </h2>
              <p className="font-semibold text-gray-500 mt-2 w-[90%]">
                  Join thousands of users who are earning real money by
                  completing easy tasks from the comfort of their homes. No
                  experience needed—just your skills and a few minutes to get
                  started!
              </p>
          </div>
          <div className='mt-5 lg:mt-0'>
              <button onClick={handleAd} className="  border-1 text-[#ff5851] border-[#ff5851]  btn btn-outline btn-lg hover:border-[#ff5851] hover:bg-[#ff5851] font-bold  hover:text-white">
                  Get Started Today
              </button>
          </div>
      </div>
  );
}

Ad.propTypes = {}

export default Ad