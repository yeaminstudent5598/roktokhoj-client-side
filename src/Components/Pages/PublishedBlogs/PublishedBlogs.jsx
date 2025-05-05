import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaSearch } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const PublishedBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to fetch published blogs
  const fetchPublishedBlogs = async () => {
    try {
      const response = await axiosPublic.get("/blogs");
      return response.data.filter((blog) => blog.status === "published");
    } catch (error) {
      throw new Error("Error fetching blogs: " + error.message);
    }
  };

  // Use TanStack Query's useQuery hook to fetch data
  const { data: blogs, error, isLoading, isError } = useQuery({
    queryKey: ["publishedBlogs"], // Query Key
    queryFn: fetchPublishedBlogs, // Query Function (GET method)
  });

  // Handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      DOMPurify.sanitize(blog.content)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Function to format date
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner"></div>
      </div>
    );
  if (isError) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Published Blogs
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input input-bordered w-full pl-10 pr-4 py-3 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-white dark:bg-gray-900  shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Thumbnail */}
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full  h-64 object-cover"
              />

              {/* Blog Content */}
              <div className="card-body p-6">
                {/* Blog Title */}
                <h3 className="text-2xl dark:text-white font-bold text-gray-800 mb-3">
                  {blog.title}
                </h3>

                
                {/* Blog Content Preview */}
                <div
                  className="text-gray-600 dark:text-white mb-6"
                  dangerouslySetInnerHTML={{
                    __html:
                      DOMPurify.sanitize(blog.content.slice(0, 150)) + "...",
                  }}
                ></div>

                {/* Status and Read More Button */}
                <div className="flex justify-between items-center">
                 
                  <button
                    className="btn bg-red-600 text-white btn-sm"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                  >
                    Read More
                  </button>
                </div>

                {/* Social Media Share Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={blog.title}
                  >
                    <FacebookIcon size={32} round className="hover:opacity-80 transition-opacity" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={blog.title}
                  >
                    <TwitterIcon size={32} round className="hover:opacity-80 transition-opacity" />
                  </TwitterShareButton>
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon size={32} round className="hover:opacity-80 transition-opacity" />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-20">
            No published blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublishedBlogs;