import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { FaUser, FaEnvelope, FaUserTag, FaCoins, FaEdit } from "react-icons/fa";

const Profile = () => {
    const [user1, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`).then((response) => {
            setUser(response.data);
            setLoading(false);
        });
    }, [axiosSecure, user.email]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-10 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                    Account <span className="text-[#59ba4a]">Profile</span>
                </h2>

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Decorative Header/Cover */}
                    <div className="h-32 md:h-48 bg-gradient-to-r from-[#59ba4a] to-emerald-600 relative">
                        <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-xl transition-all">
                            <FaEdit size={18} />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="relative px-6 pb-12">
                        {/* Avatar - Overlapping the cover */}
                        <div className="flex justify-center md:justify-start">
                            <div className="-mt-16 md:-mt-20 relative">
                                <img
                                    src={user1.image}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                                    alt={user1.name}
                                />
                                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                            </div>
                        </div>

                        {/* User Header Info */}
                        <div className="mt-6 text-center md:text-left">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {user1.name}
                            </h3>
                            <div className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-[#59ba4a] text-xs font-black uppercase tracking-widest rounded-lg">
                                Official {user1.role}
                            </div>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            {/* Email Card */}
                            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 transition-hover hover:border-[#59ba4a]">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-[#59ba4a]">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                        Email Address
                                    </p>
                                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                                        {user1.email}
                                    </p>
                                </div>
                            </div>

                            {/* Coin Card */}
                            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 transition-hover hover:border-[#59ba4a]">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-yellow-500">
                                    <FaCoins size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                        Current Balance
                                    </p>
                                    <p className="text-xl font-black text-gray-900 dark:text-white">
                                        {user1.coin?.toLocaleString()}{" "}
                                        <span className="text-sm font-medium text-gray-500">
                                            Coins
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Role Card */}
                            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 transition-hover hover:border-[#59ba4a]">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-blue-500">
                                    <FaUserTag size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                        Account Type
                                    </p>
                                    <p className="font-semibold text-gray-700 dark:text-gray-200 capitalize">
                                        {user1.role}
                                    </p>
                                </div>
                            </div>

                            {/* Member ID Card */}
                            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 transition-hover hover:border-[#59ba4a]">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-gray-400">
                                    <FaUser size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                        Account Status
                                    </p>
                                    <p className="font-semibold text-green-600">
                                        Active / Verified
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
