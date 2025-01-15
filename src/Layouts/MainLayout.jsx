import React from "react";
import PropTypes from "prop-types";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = (props) => {
    return (
        <div>
            <nav>
                <NavBar></NavBar>
            </nav>
            <main className="mb-6">
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
