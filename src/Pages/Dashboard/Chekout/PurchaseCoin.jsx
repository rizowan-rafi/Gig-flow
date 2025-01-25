import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PurchaseCoin = (props) => {
    return (
        <div className="lg:grid grid-cols-3 gap-4 space-y-3 lg:space-y-0 p-5">
              
                <div className="card bg-primary text-primary-content ">
                    <div className="card-body text-white rounded-xl bg-[#ff5851]">
                        <h2 className="card-title">Basic Plan</h2>
                        <p>1$ = 10 coin</p>
                        <div className="card-actions justify-end">
                            <Link
                                to={"/dashboard/Buyer/Payment"}
                                state={{ coins: 1 }}
                            >
                                <button className="btn">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content ">
                    <div className="card-body text-white rounded-xl bg-[#ff5851]">
                        <h2 className="card-title">Standard Plan</h2>
                        <p>10 dollar = 100 coins</p>
                        <div className="card-actions justify-end">
                            <Link
                                to={"/dashboard/Buyer/Payment"}
                                state={{ coins: 10 }}
                            >
                                <button className="btn">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content ">
                    <div className="card-body text-white rounded-xl bg-[#ff5851]">
                        <h2 className="card-title">Premium Plan</h2>
                        <p>20$ = 200 coins</p>
                        <div className="card-actions justify-end">
                            <Link
                                to={"/dashboard/Buyer/Payment"}
                                state={{ coins: 20 }}
                            >
                                <button className="btn">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content ">
                    <div className="card-body text-white rounded-xl bg-[#ff5851]">
                        <h2 className="card-title">Elite Plan</h2>
                        <p>35$ = 350 coins</p>
                        <div className="card-actions justify-end">
                            <Link
                                to={"/dashboard/Buyer/Payment"}
                                state={{ coins: 35 }}
                            >
                                <button className="btn">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    );
};

PurchaseCoin.propTypes = {};

export default PurchaseCoin;
