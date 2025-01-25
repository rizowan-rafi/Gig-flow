import React from 'react'
import PropTypes from 'prop-types'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
const Checkout = props => {
      const location = useLocation();
      const coins = location.state?.coins || 0;
    return (
        <div className='w-[90%]'>
            <h1 className='text-3xl font-bold text-[#ff5851] p-5'>Payment: { coins}$</h1>
            <p className='mb-3 font-semibold'>Pay using credit card</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm coin={coins}></CheckoutForm>
            </Elements>
        </div>
    );
}

Checkout.propTypes = {}

export default Checkout