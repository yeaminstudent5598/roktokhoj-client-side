import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaSearch } from 'react-icons/fa';

const PublishedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axiosPublic.get('/blogs');
        const publishedBlogs = response.data.filter(blog => blog.status === 'published');
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    
    fetchPublishedBlogs();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Published Blogs</h2>
      
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
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <div key={blog._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-56 object-cover" />
              <div className="card-body p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className=" btn btn-xs badge badge-primary">{blog.status}</span>
                  <button className="btn btn-outline btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 pt-20">No published blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default PublishedBlogs;
