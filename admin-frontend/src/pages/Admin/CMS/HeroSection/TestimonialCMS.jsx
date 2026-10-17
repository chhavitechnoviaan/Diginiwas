import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";

import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdPlayCircleFilled,
  MdClose,
  MdOutlinePerson,
} from "react-icons/md";

export default function TestimonialCMS(){

const initialState = {
    name: "",
    designation: "",
    review: "",
    videoLink: "",
  };
  
  const [formData, setFormData] = useState(initialState);
  
  const [image, setImage] = useState(null);
  
  const [preview, setPreview] = useState("");
  
  const [testimonials, setTestimonials] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {

    const file = e.target.files[0];
  
    if (!file) return;
  
    setImage(file);
  
    setPreview(URL.createObjectURL(file));
  
  };


  const getTestimonials = async () => {

    try {
  
      const res = await axios.get("/cms/testimonials");
  
      setTestimonials(res.data.testimonials);
  
    } catch (error) {
  
      console.log(error);
  
    }
  
  };

  useEffect(() => {

    getTestimonials();
  
  }, []);

  const openAddModal = () => {

    setEditingId(null);
  
    setFormData(initialState);
  
    setImage(null);
  
    setPreview("");
  
    setShowModal(true);
  
  };

  const editTestimonial = (item) => {

    setEditingId(item._id);
  
    setFormData({
  
      name: item.name,
  
      designation: item.designation,
  
      review: item.review,
  
      videoLink: item.videoLink,
  
    });
  
    setPreview(item.image?.url || "");
  
    setImage(null);
  
    setShowModal(true);
  
  };

  const deleteTestimonial = async (id) => {

    if (!window.confirm("Delete this testimonial?")) return;
  
    try {
  
      await axios.delete(`/cms/testimonials/${id}`);
  
      getTestimonials();
  
    }
  
    catch(error){
  
      console.log(error);
  
    }
  
  };

  const saveTestimonial = async () => {

    try {
  
      setLoading(true);
  
      const data = new FormData();
  
      data.append("name", formData.name);
  
      data.append("designation", formData.designation);
  
      data.append("review", formData.review);
  
      data.append("videoLink", formData.videoLink);
  
      if(image){
  
        data.append("image", image);
  
      }
  
      if(editingId){
  
        await axios.put(
  
          `/cms/testimonials/${editingId}`,
  
          data,
  
          {
  
            headers:{
  
              "Content-Type":"multipart/form-data"
  
            }
  
          }
  
        );
  
      }
  
      else{
  
        await axios.post(
  
          "/cms/testimonials",
  
          data,
  
          {
  
            headers:{
  
              "Content-Type":"multipart/form-data"
  
            }
  
          }
  
        );
  
      }
  
      setShowModal(false);
  
      getTestimonials();
  
    }
  
    catch(error){
  
      console.log(error);
  
    }
  
    finally{
  
      setLoading(false);
  
    }
  
  };

  return (
    <div className="space-y-8">
  
      {/* Header */}
  
      <div className="bg-white rounded-3xl shadow-sm p-7 flex items-center justify-between">
  
        <div>
  
          <h2 className="text-2xl font-bold text-[#0d2d2a]">
            Testimonials
          </h2>
  
          <p className="text-gray-500 mt-1">
            Manage customer testimonials and video reviews.
          </p>
  
        </div>
  
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-2xl font-semibold transition"
        >
          <MdAdd size={22} />
          Add Testimonial
        </button>
  
      </div>
  
      {/* Cards */}
  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
  
        {testimonials.map((item) => (
  
          <div
            key={item._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
  
            {/* Image */}
  
            <div className="relative h-64 bg-gray-100">
  
              <img
                src={item.image?.url}
                className="w-full h-full object-cover"
              />
  
              {item.videoLink && (
  
                <button
                  onClick={() =>
                    window.open(item.videoLink, "_blank")
                  }
                  className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
                >
                  <MdPlayCircleFilled size={32} />
                </button>
  
              )}
  
            </div>
  
            {/* Content */}
  
            <div className="p-6">
  
              <h3 className="text-xl font-bold text-[#0d2d2a]">
                {item.name}
              </h3>
  
              <p className="text-sm text-teal-600 font-medium mt-1">
                {item.designation}
              </p>
  
              <p className="text-gray-600 text-sm mt-4 line-clamp-4">
                {item.review}
              </p>
  
              <div className="flex gap-3 mt-6">
  
                <button
                  onClick={() => editTestimonial(item)}
                  className="flex-1 bg-blue-50 text-blue-700 rounded-xl py-3 font-semibold hover:bg-blue-100 transition flex justify-center items-center gap-2"
                >
                  <MdEdit />
                  Edit
                </button>
  
                <button
                  onClick={() => deleteTestimonial(item._id)}
                  className="flex-1 bg-red-50 text-red-600 rounded-xl py-3 font-semibold hover:bg-red-100 transition flex justify-center items-center gap-2"
                >
                  <MdDelete />
                  Delete
                </button>
  
              </div>
  
            </div>
  
          </div>
  
        ))}
  
      </div>

      {testimonials.length===0 && (

<div className="bg-white rounded-3xl p-16 text-center shadow-sm">

<MdOutlinePerson
size={80}
className="mx-auto text-gray-300"
/>

<h3 className="text-2xl font-bold mt-6 text-[#0d2d2a]">

No Testimonials Yet

</h3>

<p className="text-gray-500 mt-3">

Click on "Add Testimonial" to create your first testimonial.

</p>

</div>


)}

{/* ================= Modal ================= */}

{showModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-8 py-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[#0d2d2a]">
            {editingId ? "Edit Testimonial" : "Add Testimonial"}
          </h2>

          <p className="text-gray-500 mt-1">
            Manage testimonial details
          </p>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {/* Image */}
        <div>
          <label className="font-semibold text-gray-700">
            Profile Image
          </label>

          <div className="mt-3 flex items-center gap-5">
            <div className="w-28 h-28 rounded-full overflow-hidden border bg-gray-100">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MdOutlinePerson
                    size={45}
                    className="text-gray-300"
                  />
                </div>
              )}
            </div>

            <label
              htmlFor="profileImage"
              className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-xl cursor-pointer transition"
            >
              Upload Image
            </label>

            <input
              hidden
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="font-semibold">
            Name
          </label>

          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-xl px-5 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Enter Name"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="font-semibold">
            Designation
          </label>

          <input
            value={formData.designation}
            onChange={(e) =>
              setFormData({
                ...formData,
                designation: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-xl px-5 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="CEO, Investor etc."
          />
        </div>

        {/* Review */}
        <div>
          <label className="font-semibold">
            Review
          </label>

          <textarea
            rows={5}
            value={formData.review}
            onChange={(e) =>
              setFormData({
                ...formData,
                review: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Write customer review..."
          />
        </div>

        {/* Video */}
        <div>
          <label className="font-semibold">
            Youtube / Instagram Link
          </label>

          <input
            value={formData.videoLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                videoLink: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-xl px-5 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-8 py-6 flex justify-end gap-4 flex-shrink-0">
        <button
          onClick={() => setShowModal(false)}
          className="px-7 py-3 rounded-xl border hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={saveTestimonial}
          className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Testimonial"
            : "Add Testimonial"}
        </button>
      </div>

    </div>
  </div>
)}
</div>
    );
}