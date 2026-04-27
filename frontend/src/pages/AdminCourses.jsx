import React, { useState } from "react";
import Layout from "../admin/utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../context/CourseContext";
import toast from "react-hot-toast";
import { server } from "../main";
import axios from 'axios';

function AdminCourses({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  
  if (user && user.role !== "admin") return navigate("/");

  const { courses, fetchCourses } = CourseData();
  
  const Categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setImage(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("createdBy", createdBy);
    myForm.append("category", category);
    myForm.append("duration", duration);
    myForm.append("price", price);
    if(image) myForm.append("file", image);
      
    try {
      const { data } = await axios.post(`${server}/admin/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setCategory("");
      setDuration("");
      setCreatedBy("");
      setPrice("");
      setImagePreview("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto py-8 px-4">
        <div className="bg-card shadow-md rounded-3xl border border-border p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-border pb-6">
             <div>
               <h2 className="text-3xl font-light text-foreground tracking-tight">Create Course</h2>
               <p className="text-muted-foreground font-light mt-1">Publish a new learning experience</p>
             </div>
          </div>
          
          <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-light text-foreground tracking-wide">
                  COURSE TITLE
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g. Advanced React Masterclass"
                  className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-light text-foreground tracking-wide">
                  DESCRIPTION
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will students learn?"
                  className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[140px] font-light resize-y"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-light text-foreground tracking-wide">
                    PRICE (₹)
                  </label>
                  <input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="999"
                    className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="duration" className="block text-sm font-light text-foreground tracking-wide">
                    DURATION (WEEKS)
                  </label>
                  <input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    type="number"
                    placeholder="12"
                    className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="createdBy" className="block text-sm font-light text-foreground tracking-wide">
                  INSTRUCTOR NAME
                </label>
                <input
                  id="createdBy"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-light text-foreground tracking-wide">
                  CATEGORY
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none font-light"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {Categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-light text-foreground tracking-wide">
                  THUMBNAIL IMAGE
                </label>
                <div className="relative overflow-hidden w-full px-5 py-4 bg-input border border-border border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-light text-muted-foreground mb-2">Click to browse or drag file</span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={imageHandler}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2 w-full h-32 rounded-lg overflow-hidden ring-2 ring-primary/50">
                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="md:col-span-2 mt-6 pt-6 border-t border-border">
              <button
                disabled={btnLoading}
                className="w-full py-4 bg-primary text-primary-foreground font-light text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-wide"
                type="submit"
              >
                {btnLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    CREATING...
                  </span>
                ) : "PUBLISH COURSE"}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AdminCourses;
