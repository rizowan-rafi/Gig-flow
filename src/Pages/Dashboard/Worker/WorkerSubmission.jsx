import React, { useEffect, useState } from "react";
import { FaHistory, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerSubmission = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const fetchItems = async (page) => {
        setLoading(true);
        try {
            const response = await axiosSecure.get(
                `/submissions/${user?.email}?page=${page}&limit=${itemsPerPage}`
            );

            if (response.data && Array.isArray(response.data.items)) {
                setItems(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                setItems([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchItems(currentPage);
    }, [currentPage, user?.email]);

    // Helper to style status badges
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return <FaCheckCircle className="text-xs" />;
            case 'rejected': return <FaTimesCircle className="text-xs" />;
            default: return <FaHourglassHalf className="text-xs" />;
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            My <span className="text-[#59ba4a]">Submissions</span>
                            <div className="badge text-xs badge-lg bg-gray-200 dark:bg-gray-800 text-gray-500 border-none font-bold">
                                Page {currentPage}
                            </div>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Track the status and feedback of your completed tasks.</p>
                    </div>
                </div>

                {/* Table Card Container */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-gray-50 dark:bg-gray-750 border-none">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                                    <th className="py-5 pl-8">#</th>
                                    <th>Task Title</th>
                                    <th className="hidden md:table-cell">Submission Details</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700">
                                            <th className="pl-8 text-gray-300 font-medium">
                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                            </th>
                                            <td className="font-bold text-gray-900 dark:text-white max-w-[200px] truncate">
                                                {item.task_title}
                                            </td>
                                            <td className="hidden md:table-cell text-sm text-gray-500 dark:text-gray-400 max-w-md">
                                                <p className="line-clamp-1 italic">"{item.submission_details}"</p>
                                            </td>
                                            <td className="text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(item.status)}`}>
                                                    {getStatusIcon(item.status)}
                                                    {item.status}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center text-gray-400 italic">
                                            <FaHistory size={40} className="mx-auto mb-3 opacity-20" />
                                            No submissions found. Start working to see them here!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modern Pagination Bar */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                            className="btn btn-circle bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-[#59ba4a] hover:text-white transition-all disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>
                        
                        <div className="px-6 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm font-black text-sm">
                            <span className="text-[#59ba4a]">{currentPage}</span>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-gray-500">{totalPages}</span>
                        </div>

                        <button
                            className="btn btn-circle bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-[#59ba4a] hover:text-white transition-all disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerSubmission;