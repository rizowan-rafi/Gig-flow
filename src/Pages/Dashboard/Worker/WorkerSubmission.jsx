import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerSubmission = (props) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const fetchItems = async (page) => {
        try {
            const response = await axiosSecure.get(
                `/submissions/${user?.email}?page=${page}&limit=${itemsPerPage}`
            );

            if (response.data && Array.isArray(response.data.items)) {
                setItems(response.data.items); 
                setTotalPages(response.data.totalPages); 
                setLoading(false);
            } else {
                setItems([]); 
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

               if (loading) {
                   return (
                       <div className="h-screen w-screen flex justify-center items-center">
                           <span className="loading loading-spinner loading-lg  text-success"></span>
                       </div>
                   );
               }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="dark:text-background">
                            <th></th>
                            <th>Task Title</th>
                            <th>Submission Detail</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={item._id} className="dark:text-background">
                                    <th>{index + 1}</th>
                                    <td>{item.task_title}</td>
                                    <td>{item.submission_details}</td>
                                    <td className="badge badge-warning">
                                        {item.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No submissions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="join mt-5 flex justify-center items-center">
                <button
                    className="join-item btn dark:bg-background"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button className="join-item btn">
                    {" "}
                    Page {currentPage} of {totalPages}{" "}
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="join-item btn"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

WorkerSubmission.propTypes = {};

export default WorkerSubmission;
