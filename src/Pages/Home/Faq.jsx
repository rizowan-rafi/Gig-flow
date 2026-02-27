import React from "react";

const Faq = () => {
    return (
        <section className="py-24 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Frequently Asked{" "}
                    <span className="text-[#59ba4a]">Questions</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Got Questions? We've Got Answers – Your Guide to Earning &
                    Buying!
                </p>
                <div className="w-20 h-1.5 bg-[#59ba4a] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Accordion Container */}
            <div className="max-w-4xl mx-auto space-y-4">
                {/* FAQ Item 1 */}
                <div className="collapse collapse-plus bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title text-xl font-bold text-gray-800 dark:text-gray-100 py-5">
                        How do I sign up and start earning?
                    </div>
                    <div className="collapse-content">
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed py-2">
                            Signing up is easy! Click on the{" "}
                            <span className="text-[#59ba4a] font-semibold">
                                "Sign Up"
                            </span>{" "}
                            button, fill in your details and register as a
                            Worker. Once registered, you can log in, browse
                            available tasks, and start earning coins by
                            completing them.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="collapse collapse-plus bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-bold text-gray-800 dark:text-gray-100 py-5">
                        Is there a minimum payout limit?
                    </div>
                    <div className="collapse-content">
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed py-2">
                            Yes, the minimum payout is{" "}
                            <span className="font-bold text-gray-800 dark:text-white">
                                $10
                            </span>
                            , which equals{" "}
                            <span className="font-bold text-[#59ba4a]">
                                200 coins
                            </span>
                            . Once you reach this threshold, you can request a
                            withdrawal through your dashboard.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="collapse collapse-plus bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-bold text-gray-800 dark:text-gray-100 py-5">
                        How can I create a task for workers?
                    </div>
                    <div className="collapse-content">
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed py-2">
                            Log in to your buyer account and navigate to{" "}
                            <span className="font-semibold italic">
                                Dashboard {">"} Create Task
                            </span>
                            . Fill in the title, description, and worker
                            requirements. You can upload reference images, set
                            the payment per worker, and submit once your coin
                            balance is sufficient.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="collapse collapse-plus bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-bold text-gray-800 dark:text-gray-100 py-5">
                        How do I withdraw my earnings?
                    </div>
                    <div className="collapse-content">
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed py-2">
                            Withdrawals are processed within{" "}
                            <span className="font-semibold text-gray-800 dark:text-white">
                                4-5 business days
                            </span>
                            . Available methods include:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {[
                                "PayPal",
                                "Bank Transfer",
                                "Mobile Wallets",
                                "Bkash",
                                "Nagad",
                            ].map((method) => (
                                <div
                                    key={method}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm font-medium"
                                >
                                    <span className="text-[#59ba4a]">✓</span>{" "}
                                    {method}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
