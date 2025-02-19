import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaCalendar } from "react-icons/fa";

const Blog = (props) => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch("blogs.json",)
            .then((response) => response.json())
            .then((data) => setBlogs(data));
    }, []);
    // console.log(blogs)
    return (
        <div className="pb-20 bg-background dark:bg-text">
            <div className="mx-10">
                <h2 className="text-3xl text-primary font-semibold  text-center">
                    Blogs <br />
                </h2>
                <p className="text-center text-xl lg:w-1/3 mx-auto dark:text-background">
                    Latest tips, strategies, and insights to help you maximize
                    your online earnings.
                </p>
                <div className="grid lg:grid-cols-3 grid-cols-1 pt-5 justify-center items-center gap-5 lg:w-[80%] mx-auto">
                    {blogs.map((blog) => (
                        <div className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                            <img
                                src={blog.image}
                                alt=""
                                className=" object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                            />
                            <div className="flex flex-col justify-between p-6 space-y-8">
                                <div className="flex items-center text-primary font-bold gap-2">
                                    <span><FaCalendar></FaCalendar></span>
                                    <span>{blog.date}</span> |
                                    <span>{ blog.category}</span>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold tracking-wide">
                                        {blog.title}
                                    </h2>
                                    <p className="dark:text-gray-800">
                                        {blog.description}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="flex items-center bg-primary text-background justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-accent dark:text-gray-50"
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Blog.propTypes = {};

export default Blog;
