import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdOutlineTitle,
  MdOutlineImage,
} from "react-icons/md";

export default function AboutGenesisCMS() {

  const [formData, setFormData] = useState({
    topTitle: "",
    heading: "",
    paragraph1: "",
    paragraph2: "",
    quote: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  // ================= Image Upload =================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // ================= GET =================

  const getAboutGenesis = async () => {

    try {

      const res = await axios.get("/cms/about-genesis");

      setFormData({

        topTitle: res.data.topTitle || "",

        heading: res.data.heading || "",

        paragraph1: res.data.paragraph1 || "",

        paragraph2: res.data.paragraph2 || "",

        quote: res.data.quote || "",

      });

      setPreview(res.data.image?.url || "");

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getAboutGenesis();

  },[]);

  // ================= SAVE =================

  const saveAboutGenesis = async()=>{

    try{

      const data=new FormData();

      data.append("topTitle",formData.topTitle);

      data.append("heading",formData.heading);

      data.append("paragraph1",formData.paragraph1);

      data.append("paragraph2",formData.paragraph2);

      data.append("quote",formData.quote);

      if(image){

        data.append("image",image);

      }

      await axios.put(
        "/cms/about-genesis",
        data,
        {
          headers:{
            "Content-Type":"multipart/form-data",
          },
        }
      );

      alert("About Genesis Updated Successfully");

      getAboutGenesis();

    }

    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };

  return(

    <div className="space-y-6">

      {/* ================= Text Content ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">

            <MdOutlineTitle
              size={24}
              className="text-teal-600"
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-[#0d2d2a]">

              About Genesis

            </h3>

            <p className="text-sm text-gray-500">

              Manage About section content.

            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <label className="block font-semibold mb-2">

              Top Label

            </label>

            <input

              value={formData.topTitle}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  topTitle:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-3"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Heading

            </label>

            <input

              value={formData.heading}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  heading:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-3"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Paragraph 1

            </label>

            <textarea

              rows={5}

              value={formData.paragraph1}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  paragraph1:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Paragraph 2

            </label>

            <textarea

              rows={5}

              value={formData.paragraph2}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  paragraph2:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Quote

            </label>

            <textarea

              rows={3}

              value={formData.quote}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  quote:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

        </div>

      </div>

            {/* ================= Image Section ================= */}

            <div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center gap-3 mb-8">

  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

    <MdOutlineImage
      size={24}
      className="text-blue-600"
    />

  </div>

  <div>

    <h3 className="text-xl font-bold text-[#0d2d2a]">

      About Image

    </h3>

    <p className="text-sm text-gray-500">

      Upload the image displayed on the right side.

    </p>

  </div>

</div>

<div className="max-w-md rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">

  <div className="h-96 bg-gray-100">

    {preview ? (

      <img
        src={preview}
        alt="About"
        className="w-full h-full object-cover"
      />

    ) : (

      <div className="h-full flex flex-col items-center justify-center text-gray-400">

        <MdOutlineImage size={55} />

        <p className="mt-3">

          No Image Selected

        </p>

      </div>

    )}

  </div>

  <div className="p-5 flex gap-3">

    <label
      htmlFor="aboutImage"
      className="flex-1 bg-[#0d2d2a] hover:bg-[#16443f] text-white text-center py-3 rounded-xl cursor-pointer transition"
    >

      {preview ? "Replace Image" : "Upload Image"}

    </label>

    {preview && (

      <button

        onClick={async()=>{

          try{

            await axios.delete("/cms/about-genesis/image");

            setImage(null);

            setPreview("");

            getAboutGenesis();

          }

          catch(error){

            console.log(error);

          }

        }}

        className="px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white"

      >

        Delete

      </button>

    )}

    <input
      hidden
      id="aboutImage"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
    />

  </div>

</div>

</div>

{/* ================= Save Button ================= */}

<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">

<button

  onClick={saveAboutGenesis}

  className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition"

>

  Save About Section

</button>

</div>

</div>

);

}