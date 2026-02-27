import React from "react";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaEnvelope,
} from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-black text-gray-300 transition-colors duration-300">
            {/* Top Section: Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Column 1: Brand Identity */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-[#59ba4a] p-2 rounded-xl text-white shadow-lg transition-transform group-hover:rotate-12">
                                <FaHandHoldingDollar size={24} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Gig<span className="text-[#59ba4a]">Flow</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                            <span className="text-[#59ba4a] font-bold">
                                Micro Tasks, Mega Possibilities.
                            </span>{" "}
                            <br />
                            The leading platform for connecting global workers
                            with meaningful opportunities since 2024.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#59ba4a] hover:text-white transition-all"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#59ba4a] hover:text-white transition-all"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#59ba4a] hover:text-white transition-all"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Platform Navigation */}
                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-l-4 border-[#59ba4a] pl-3">
                            Platform
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/alltasks"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Browse Tasks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Become a Worker
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Post a Task
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Support & Resources */}
                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-l-4 border-[#59ba4a] pl-3">
                            Resources
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Safety Guidelines
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#59ba4a] transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact/Newsletter Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-l-4 border-[#59ba4a] pl-3">
                            Contact Us
                        </h4>
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="p-3 bg-gray-800 rounded-xl text-[#59ba4a] group-hover:bg-[#59ba4a] group-hover:text-white transition-all">
                                <FaEnvelope />
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-500 font-bold uppercase text-[10px]">
                                    Email Address
                                </p>
                                <p className="text-white font-medium">
                                    support@gigflow.com
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                            Available 24/7 for our community support and
                            verification services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className="border-t border-gray-800 dark:border-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-medium">
                        © {currentYear} GigFlow Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-gray-600">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Status
                        </a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Cookies
                        </a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Security
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
