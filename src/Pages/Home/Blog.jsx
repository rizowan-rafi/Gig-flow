import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("blogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data));
    }, []);

    return (
        <section className="py-24 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Latest <span className="text-[#59ba4a]">Insights</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Tips, strategies, and expert insights to help you maximize
                    your online earnings.
                </p>
                <div className="w-20 h-1.5 bg-[#59ba4a] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {blogs.map((blog, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 bg-[#59ba4a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                                {blog.category}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm mb-4">
                                <FaCalendarAlt className="text-[#59ba4a]" />
                                <span className="font-medium">{blog.date}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#59ba4a] transition-colors">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                {blog.description}
                            </p>

                            {/* Push button to bottom */}
                            <div className="mt-auto">
                                <button className="inline-flex items-center gap-2 text-[#59ba4a] font-bold group/btn">
                                    Read Article
                                    <FaArrowRight className="transform group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
