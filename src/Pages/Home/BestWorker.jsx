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
        <div className="my-20 w-[90%] mx-auto">
            <h1 className="text-4xl font-semibold pb-5 text-[#ff5851]">
                Best Worker
            </h1>
            <div className="grid grid-cols-3">
                {topWorker.map((worker) => (
                    <div className="card card-compact p-5 w-96 shadow-md">
                        <figure>
                            <img src={worker.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl">
                                {worker.name}
                            </h2>
                            <p className="text-xl">
                                Coin :{" "}
                                <span className="font-semibold text-[#ff5851]">
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
