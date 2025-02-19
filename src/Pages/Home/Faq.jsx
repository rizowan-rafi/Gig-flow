import React from "react";
import PropTypes from "prop-types";

const Faq = (props) => {
    // Got Questions? We've Got Answers – Your Guide to Earning & Buying!
    return (
        <div className="px-10 pb-20 bg-background dark:bg-text">
            <div className="mb-5 dark:text-background">
                <h1 className="text-3xl text-primary font-semibold  text-center">
                    Frequent Ask Question
                </h1>
                <p className="text-center text-xl lg:w-1/3  mx-auto">
                    Got Questions? We've Got Answers – Your Guide to Earning &
                    Buying!
                </p>
            </div>

            <div className="space-y-2">
                <div className="collapse collapse-plus  bg-primary">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-white font-bold text-xl ">
                        How do I sign up and start earning?
                    </div>
                    <div className="collapse-content text-white">
                        <p>
                            Signing up is easy! Click on the "Sign Up" button,
                            fill in your details and register as a Worker. Once
                            registered, you can log in, browse available tasks,
                            and start earning coins by completing them.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-primary">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-bold text-white">
                        Is there a minimum payout limit?
                    </div>
                    <div className="collapse-content text-white">
                        <p>
                            Yes, the minimum payout is $10, which equals 200
                            coins. Once you reach the threshold, you can request
                            a withdrawal.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-primary">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-bold text-white">
                        How can I create a task for workers?
                    </div>
                    <div className="collapse-content text-white">
                        <p>
                            To create a task, log in to your buyer account and
                            go to Dashboard and then "Create Task" section. Fill
                            in the task details such as title, description,
                            required workers, and deadline. You can upload any
                            necessary files or images, set the payment per
                            worker, and submit the task once you have enough
                            coins in your balance.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-primary">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-bold text-white">
                        How do I withdraw my earnings?
                    </div>
                    <div className="collapse-content text-white">
                        <p>
                            You can withdraw your earnings once you reach the
                            minimum payout threshold. Withdrawals can be made
                            via:
                            <ul className="list-disc ml-5">
                                <li>PayPal</li>
                                <li>Bank Transfer</li>
                                <li>Mobile Wallets</li>
                                <li>Bkash</li>
                                <li>Nagad</li>
                            </ul>
                            (depending on availability in your country).our
                            Admin will check your request you will get your
                            payment within 4-5 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Faq.propTypes = {};

export default Faq;
