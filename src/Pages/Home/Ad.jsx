import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Ad = () => {
    const navigate = useNavigate();
    const [data] = useUser();

    const handleAd = () => {
        if (!data) navigate("/register", { replace: true });
        else navigate(`/dashboard/${data?.role}/home`);
    };

    return (
        <section className="py-20 px-6 lg:px-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="relative max-w-7xl mx-auto overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

                <div className="bg-[#59ba4a] dark:bg-emerald-600 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Text Content */}
                    <div className="lg:w-2/3 text-center lg:text-left space-y-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Start Earning Instantly{" "}
                            <br className="hidden md:block" />
                            with{" "}
                            <span className="text-gray-900/30">
                                Simple Tasks!
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-green-50/90 font-medium max-w-2xl leading-relaxed">
                            Join thousands of users who are earning real money
                            by completing easy tasks from the comfort of their
                            homes. No experience needed—just your skills and a
                            few minutes.
                        </p>

                        {/* Trust Indicator */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-[#59ba4a] bg-gray-200 overflow-hidden"
                                    >
                                        <img
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="user"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-green-100 font-semibold italic">
                                +2,400 members joined this week
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={handleAd}
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-[#59ba4a] hover:bg-gray-900 hover:text-white font-black text-xl rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">
                                Get Started Today
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ad;
