import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BestWorker = (props) => {
    const [topWorker, setTopWorker] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic
            .get("/topWorker")
            .then((response) => setTopWorker(response.data))
            .catch((error) =>
            {}    // console.log(error)
            );
    }, []);
    return (
        <div className="py-20 px-10 bg-background dark:bg-text">
            <div className="mb-5">
                <p className="text-4xl font-semibold text-primary text-center">
                    Best Worker
                </p>
                <p className="text-center text-xl lg:w-1/4 mx-auto dark:text-background">
                    Strive for the top and join the ranks of our best-performing
                    members!
                </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
                {topWorker.map((worker) => (
                    <div className="card card-compact p-5  shadow-md bg-secondary dark:bg-accent text-text">
                        <figure>
                            <img src={worker.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl dark:text-background">
                                {worker.name}
                            </h2>
                            <h2 className="card-title text-xl dark:text-background">
                                Email: {worker.email}
                            </h2>
                            <p className="text-xl dark:text-background">
                                Coin :{" "}
                                <span className="font-semibold text-primary">
                                    {worker.coin}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

BestWorker.propTypes = {};

export default BestWorker;
