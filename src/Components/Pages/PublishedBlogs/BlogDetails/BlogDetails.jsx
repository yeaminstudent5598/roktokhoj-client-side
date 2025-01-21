import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query"; // Import useQuery from TanStack Query

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
    queryKey: ["blogDetails", id], // Unique query key based on blog ID
    queryFn: fetchBlogDetails, // Query function
    enabled: !!id, // Ensure the query only runs when the ID is available
  });

  // Handle loading and error states
  if (isLoading) {
    return <p className="text-center text-gray-500 pt-20">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 pt-20">
        Error fetching blog details: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog.title}</h1>
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-64 object-cover mb-6 rounded-lg"
      />
      <div
        className="text-gray-600 text-lg"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
      ></div>
    </div>
  );
};

export default BlogDetails;
