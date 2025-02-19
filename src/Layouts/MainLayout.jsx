import React from "react";
import PropTypes from "prop-types";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = (props) => {
    return (
        <div>
            <nav className="sticky z-50 top-0">
                <NavBar></NavBar>
            </nav>
            <main className="">
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {};

export default MainLayout;
