import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; 
import { FaSearch } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share"; // Import share buttons

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
 
  if (isLoading) return <p><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></p>;
  if (isError) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Published Blogs
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="card-body p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                {/* Display Published Date */}
                <p className="text-sm text-gray-500 mb-4">
                  Published on: {formatDate(blog.publishedDate)}
                </p>
                <div
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      DOMPurify.sanitize(blog.content.slice(0, 150)) + "...",
                  }}
                ></div>
                <div className="flex justify-between items-center">
                  <span className="btn btn-xs badge badge-primary">
                    {blog.status}
                  </span>
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                  >
                    Read More
                  </button>
                </div>

                {/* Social Media Share Buttons */}
<div className="mt-4 flex space-x-4">
  <FacebookShareButton url={window.location.href} quote={blog.title}>
    <FacebookIcon size={32} round />
  </FacebookShareButton>
  <TwitterShareButton url={window.location.href} title={blog.title}>
    <TwitterIcon size={32} round />
  </TwitterShareButton>
  <LinkedinShareButton url={window.location.href}>
    <LinkedinIcon size={32} round />
  </LinkedinShareButton>
</div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 pt-20">
            No published blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublishedBlogs;
