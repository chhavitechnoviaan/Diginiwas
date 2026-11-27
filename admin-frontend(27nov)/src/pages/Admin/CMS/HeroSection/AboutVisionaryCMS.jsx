import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";

import {
  MdOutlineGroups,
  MdAdd,
  MdOutlinePerson,
  MdClose,
} from "react-icons/md";

export default function AboutVisionaryCMS() {

  const initialState = {

    name: "",

    designation: "",

    description: "",

  };

  const [formData,setFormData]=useState({

    sectionTitle:"",

    sectionSubtitle:"",

  });

  const [members,setMembers]=useState([]);

  const [memberData,setMemberData]=useState(initialState);

  const [image,setImage]=useState(null);

  const [preview,setPreview]=useState("");

  const [editingId,setEditingId]=useState(null);

  const [showModal,setShowModal]=useState(false);

  const [loading,setLoading]=useState(false);

  // ================= Image =================

  const handleImage=(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // ================= GET =================

  const getVisionaries=async()=>{

    try{

      const res=await axios.get(
        "/cms/about-visionaries"
      );

      setFormData({

        sectionTitle:res.data.sectionTitle,

        sectionSubtitle:res.data.sectionSubtitle,

      });

      setMembers(res.data.members||[]);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getVisionaries();

  },[]);

  // ================= SAVE HEADER =================

  const saveHeader=async()=>{

    try{

      await axios.put(

        "/cms/about-visionaries/header",

        formData

      );

      alert("Header Updated");

      getVisionaries();

    }

    catch(error){

      console.log(error);

    }

  };

  // ================= Modal =================

  const openAddModal=()=>{

    setEditingId(null);

    setMemberData(initialState);

    setPreview("");

    setImage(null);

    setShowModal(true);

  };

  return(

    <div className="space-y-6">

      {/* ================= Header ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">

            <MdOutlineGroups
              size={24}
              className="text-teal-600"
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-[#0d2d2a]">

              Visionaries Section

            </h3>

            <p className="text-sm text-gray-500">

              Manage heading and subtitle.

            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="block font-semibold mb-2">

              Section Title

            </label>

            <input

              value={formData.sectionTitle}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  sectionTitle:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-3"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Section Subtitle

            </label>

            <textarea

              rows={3}

              value={formData.sectionSubtitle}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  sectionSubtitle:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

          <div className="flex justify-end">

            <button

              onClick={saveHeader}

              className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-8 py-3 rounded-xl"

            >

              Save Header

            </button>

          </div>

        </div>

      </div>

            {/* ================= Members ================= */}

            <div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center justify-between mb-7">

  <div>

    <h3 className="text-xl font-bold text-[#0d2d2a]">
      Team Members
    </h3>

    <p className="text-sm text-gray-500">
      Manage Visionary Members.
    </p>

  </div>

  <button
    onClick={openAddModal}
    className="flex items-center gap-2 bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-xl"
  >
    <MdAdd />
    Add Member
  </button>

</div>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

  {members.map((item)=>(

    <div
      key={item._id}
      className="bg-white rounded-3xl overflow-hidden border shadow-sm"
    >

      <div className="h-80 bg-gray-100">

        {item.image?.url ? (

          <img
            src={item.image.url}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="h-full flex items-center justify-center">

            <MdOutlinePerson
              size={70}
              className="text-gray-300"
            />

          </div>

        )}

      </div>

      <div className="p-5">

        <h4 className="font-bold text-xl">

          {item.name}

        </h4>

        <p className="text-teal-600 font-medium">

          {item.designation}

        </p>

        <p className="text-gray-500 text-sm mt-3 line-clamp-3">

          {item.description}

        </p>

        <div className="flex gap-3 mt-5">

          <button

            onClick={()=>{

              setEditingId(item._id);

              setMemberData({

                name:item.name,

                designation:item.designation,

                description:item.description,

              });

              setPreview(item.image?.url||"");

              setImage(null);

              setShowModal(true);

            }}

            className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl"

          >

            Edit

          </button>

          <button

            onClick={async()=>{

              if(!window.confirm("Delete Member?")) return;

              await axios.delete(

                `/cms/about-visionaries/member/${item._id}`

              );

              getVisionaries();

            }}

            className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl"

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  ))}

</div>

</div>


      {/* ================= Modal ================= */}

      {showModal && (

<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
<div className="bg-white w-full max-w-3xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

    {/* Header */}

    <div className="border-b px-8 py-6 shrink-0 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold text-[#0d2d2a]">

          {editingId ? "Edit Member" : "Add Member"}

        </h2>

        <p className="text-gray-500 mt-1">

          Manage visionary details

        </p>

      </div>

      <button

        onClick={()=>setShowModal(false)}

        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center"

      >

        <MdClose size={24}/>

      </button>

    </div>

    {/* Body */}
    <div className="flex-1 overflow-y-auto p-8 space-y-6">

      {/* Image */}

      <div>

        <label className="font-semibold">

          Profile Image

        </label>

        <div className="mt-3 flex items-center gap-5">

          <div className="w-28 h-28 rounded-full overflow-hidden border bg-gray-100">

            {preview ? (

              <img
                src={preview}
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
            htmlFor="memberImage"
            className="bg-[#0d2d2a] text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-[#16443f]"
          >

            Upload Image

          </label>

          <input
            hidden
            id="memberImage"
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

          value={memberData.name}

          onChange={(e)=>

            setMemberData({

              ...memberData,

              name:e.target.value,

            })

          }

          className="w-full mt-2 border rounded-xl px-5 py-3"

        />

      </div>

      {/* Designation */}

      <div>

        <label className="font-semibold">

          Designation

        </label>

        <input

          value={memberData.designation}

          onChange={(e)=>

            setMemberData({

              ...memberData,

              designation:e.target.value,

            })

          }

          className="w-full mt-2 border rounded-xl px-5 py-3"

        />

      </div>

      {/* Description */}

      <div>

        <label className="font-semibold">

          Description

        </label>

        <textarea

          rows={5}

          value={memberData.description}

          onChange={(e)=>

            setMemberData({

              ...memberData,

              description:e.target.value,

            })

          }

          className="w-full mt-2 border rounded-xl px-5 py-4"

        />

      </div>

    </div>

    {/* Footer */}

    <div className="border-t px-8 py-6 flex justify-end gap-4 shrink-0 bg-white">

      <button

        onClick={()=>setShowModal(false)}

        className="px-7 py-3 rounded-xl border"

      >

        Cancel

      </button>

      <button

        disabled={loading}

        onClick={async()=>{

          try{

            setLoading(true);

            const data=new FormData();

            data.append("name",memberData.name);

            data.append("designation",memberData.designation);

            data.append("description",memberData.description);

            if(image){

              data.append("image",image);

            }

            if(editingId){

              await axios.put(

                `/cms/about-visionaries/member/${editingId}`,

                data,

                {

                  headers:{

                    "Content-Type":"multipart/form-data",

                  },

                }

              );

            }

            else{

              await axios.post(

                "/cms/about-visionaries/member",

                data,

                {

                  headers:{

                    "Content-Type":"multipart/form-data",

                  },

                }

              );

            }

            setShowModal(false);

            getVisionaries();

          }

          catch(error){

            console.log(error);

          }

          finally{

            setLoading(false);

          }

        }}

        className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-8 py-3 rounded-xl font-semibold"

      >

        {

          loading

          ? "Saving..."

          : editingId

          ? "Update Member"

          : "Add Member"

        }

      </button>

    </div>

  </div>

</div>

)}

</div>

);

}