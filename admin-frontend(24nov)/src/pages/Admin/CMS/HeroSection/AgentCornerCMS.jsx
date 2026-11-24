import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdAdd,
  MdOutlineImage,
} from "react-icons/md";

export default function AgentCornerCMS() {

  const [stats, setStats] = useState([
    {
      value: "",
      label: "",
    },
    {
      value: "",
      label: "",
    },
    {
      value: "",
      label: "",
    },
  ]);

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

  const getAgentCorner = async () => {

    try {

        const res = await axios.get("/cms/agentcorner");

      setStats(
        res.data.stats || [
          {
            value: "",
            label: "",
          },
          {
            value: "",
            label: "",
          },
          {
            value: "",
            label: "",
          },
        ]
      );

      setPreview(res.data.image?.url || "");

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getAgentCorner();

  }, []);

  // ================= SAVE =================

  const saveAgentCorner = async () => {

    try {

      const data = new FormData();

      data.append("stats", JSON.stringify(stats));

      if (image) {

        data.append("image", image);

      }

      await axios.put("/cms/agentcorner", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Agent Corner Updated Successfully");

      getAgentCorner();

    }

    catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

    <div className="space-y-6">

      {/* ================= Statistics ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">

            <MdAdd
              className="text-emerald-600"
              size={24}
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-[#0d2d2a]">

              Agent Corner Statistics

            </h3>

            <p className="text-sm text-gray-500">

              Manage the statistics displayed below the hero section.

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {stats.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50"
            >

              <label className="block text-sm text-gray-500 mb-2">

                Value

              </label>

              <input
                type="text"
                value={item.value}
                onChange={(e) => {

                  const temp = [...stats];

                  temp[index].value = e.target.value;

                  setStats(temp);

                }}
                className="w-full border rounded-2xl px-5 py-4 text-3xl font-bold focus:ring-2 focus:ring-teal-500"
                placeholder="10,000+"
              />

              <label className="block text-sm text-gray-500 mt-5 mb-2">

                Label

              </label>

              <input
                type="text"
                value={item.label}
                onChange={(e) => {

                  const temp = [...stats];

                  temp[index].label = e.target.value;

                  setStats(temp);

                }}
                className="w-full border rounded-2xl px-5 py-3 focus:ring-2 focus:ring-teal-500"
                placeholder="VERIFIED LEADS"
              />

            </div>

          ))}

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

      Agent Corner Image

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
        alt="Agent Corner"
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

  <div className="p-5">

    <label
      htmlFor="agentImage"
      className="block bg-[#0d2d2a] hover:bg-[#16443f] text-white text-center py-3 rounded-xl cursor-pointer transition"
    >

      {preview ? "Replace Image" : "Upload Image"}

    </label>

    <input
      hidden
      id="agentImage"
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
  onClick={saveAgentCorner}
  className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition"
>

  Save Agent Corner

</button>

</div>

</div>

);

}