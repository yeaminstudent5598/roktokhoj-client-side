import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/axiosSecure";


const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all"); // Filtering options: 'all', 'draft', 'published'

  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

  const handleStatusChange = (blog, newStatus) => {
    axiosSecure
      .patch(`/blogs/status/${blog._id}`, { status: newStatus })
      .then(() => {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Blog status updated to ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update blog status.", "error");
      });
  };

  const handleDelete = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/blogs/${blogId}`)
          .then(() => {
            refetch();
            Swal.fire("Deleted!", "Blog has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete the blog.", "error");
          });
      }
    });
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="card shadow-md p-4">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="h-40 w-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <p className="text-sm mb-4">{blog.content.slice(0, 100)}...</p>
            <div className="flex justify-between items-center">
              {blog.status === "draft" ? (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleStatusChange(blog, "published")}
                >
                  Publish
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleStatusChange(blog, "draft")}
                >
                  Unpublish
                </button>
              )}
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
