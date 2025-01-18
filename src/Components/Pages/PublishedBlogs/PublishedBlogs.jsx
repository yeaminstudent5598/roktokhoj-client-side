
const PublishedBlogs = () => {
  

  return (
    <div>
      <h2>Published Blogs</h2>
      
      {/* Optional Search Bar */}
      <div>
        <input 
          type="text" 
          placeholder="Search blogs..." 
          
           
        />
      </div>

      <div className="blog-list">
        
      </div>
    </div>
  );
};

export default PublishedBlogs;
