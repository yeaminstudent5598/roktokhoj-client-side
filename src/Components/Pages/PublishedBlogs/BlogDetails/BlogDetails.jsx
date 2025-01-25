import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // Function to fetch a single blog by ID
  const fetchBlogDetails = async () => {
    const response = await axiosPublic.get(`/blogs/${id}`);
    return response.data;
  };

  // Use TanStack Query's useQuery hook
  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: fetchBlogDetails,
    enabled: !!id,
  });

  // Handle loading and error states
  if (isLoading) {
    return <p className="text-center text-gray-500 pt-20"><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 pt-20">
        Error fetching blog details: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-6xl py-28 mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{blog.title}</h1>
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        {/* Text Section */}
        <div
          className="lg:w-1/2 text-gray-600 text-lg"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetails;
