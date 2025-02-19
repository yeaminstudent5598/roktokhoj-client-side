import React, { useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");



  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Ensure the thumbnail state is being used correctly
      if (!thumbnail) {
        Swal.fire("Error", "Please select a thumbnail image.", "error");
        return;
      }
      // Prepare the image for upload
      const imageFile = new FormData();
      imageFile.append("image", thumbnail);
  
      // Upload the image to the hosting service
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.data.display_url;
      // Create the new blog object
      const newBlog = { title, thumbnail: imageUrl, content, status: "draft" };
      // Send the blog data to your API
    await axiosSecure.post("/blogs", newBlog);
   

      Swal.fire("Success", "Blog created successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create blog.", "error");
    }
  };
  

  return (
    <div className="p-6 mt-28">
      <h2 className="text-3xl font-semibold mb-6">Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <JoditEditor value={content} onChange={(e) => setContent(e)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
