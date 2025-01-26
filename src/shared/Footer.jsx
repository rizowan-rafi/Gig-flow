import React from "react";
import PropTypes from "prop-types";
import logo from '../assets/Logo/footerLogo.png'
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
const Footer = (props) => {
    return (
        <footer className="footer bg-[#ff5851] bg-opacity-70 text-neutral-content p-10">
            <aside>
                <p className="flex items-center gap-2">
                    <img src={logo} className="w-[50px]" alt="" />
                    <h3 className="text-2xl font-bold text-white">GigFlow</h3>
                </p>
                <p className="text-white">
                    <span className="text-xl font-semibold">
                        Micro Tasks, Mega Possibilities.
                    </span>
                    <br />
                    Providing reliable service since 2024
                </p>
            </aside>
            <nav>
                <h6 className="footer-title text-white">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a
                        href="https://web.facebook.com/profile.php?id=100086192710600"
                        className="text-2xl text-white"
                    >
                        <FaFacebookSquare></FaFacebookSquare>
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=rizowanrafi71@gmail.com"
                        className="text-2xl text-white"
                    >
                        <BiLogoGmail />
                    </a>
                    <a
                        href="https://github.com/isagi299"
                        className="text-2xl text-white"
                    >
                        <FaGithubSquare></FaGithubSquare>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;
