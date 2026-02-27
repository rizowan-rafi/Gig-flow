import React from "react";
import newsletter from "../../assets/newsletter/newsletter.jpg";

const Newsletter = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* UI FIX: Added 'dark:bg-emerald-900/40' for a deeper base 
                    Added 'dark:border dark:border-white/10' for better definition
                */}
                <div className="relative overflow-hidden bg-[#48ae38] dark:bg-emerald-800/80 rounded-3xl shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:flex items-center border border-transparent dark:border-white/10">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 dark:bg-emerald-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/10 dark:bg-black/20 rounded-full blur-3xl"></div>

                    {/* Image Section */}
                    <div className="lg:w-5/12 p-8 lg:p-12">
                        <div className="relative group">
                            {/* Visual Polish: Adjusted blur opacity for dark mode */}
                            <div className="absolute -inset-1 bg-white/20 dark:bg-emerald-400/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img
                                src={newsletter}
                                className="relative rounded-2xl shadow-xl w-full h-64 lg:h-80 object-cover transform transition duration-500 hover:scale-[1.02]"
                                alt="Newsletter Illustration"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-7/12 p-8 lg:pr-16 lg:pl-0 space-y-6 text-white text-center lg:text-left z-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                <span className="text-green-100 dark:text-emerald-300">
                                    Subscribe
                                </span>{" "}
                                to our <br className="hidden lg:block" />
                                <span className="underline decoration-white/30 dark:decoration-emerald-400/30 decoration-4 underline-offset-8">
                                    Newsletter
                                </span>
                            </h2>
                            <p className="text-lg lg:text-xl text-green-50 dark:text-emerald-100/80 font-medium">
                                Stay ahead and earn more!
                            </p>
                        </div>

                        <p className="text-green-50/90 dark:text-emerald-50/70 text-md lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Get exclusive tips, high-paying earning
                            opportunities, and special rewards delivered
                            straight to your inbox every week.
                        </p>

                        {/* Subscription Form */}
                        <form
                            className="relative max-w-md mx-auto lg:mx-0 pt-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* UI FIX: Input now blends better in dark mode 
                                    using 'dark:bg-white/10' and 'dark:text-white'
                                */}
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="flex-grow px-6 py-4 rounded-xl text-gray-900 bg-white dark:bg-black/20 dark:text-white dark:placeholder-gray-400 dark:border dark:border-white/10 focus:ring-4 focus:ring-[#48ae38]/50 dark:focus:ring-emerald-500/30 outline-none transition-all shadow-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gray-900 dark:bg-emerald-500 text-white dark:text-gray-900 font-bold rounded-xl hover:bg-black dark:hover:bg-emerald-400 transition-all active:scale-95 shadow-lg whitespace-nowrap"
                                >
                                    Get Started
                                </button>
                            </div>
                            <p className="mt-3 text-xs text-green-100/70 dark:text-emerald-200/50">
                                No spam, ever. Unsubscribe at any time.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
