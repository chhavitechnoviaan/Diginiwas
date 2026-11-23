import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdOutlineImage,
} from "react-icons/md";

export default function RoundSectionCMS() {

  const [roundImages, setRoundImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const [previewImages, setPreviewImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  // Upload Image

  const handleImageUpload = (e, field) => {

    const file = e.target.files[0];

    if (!file) return;

    setRoundImages((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreviewImages((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  // Save

  const saveRoundSection = async () => {

    try {

      const data = new FormData();

      if (roundImages.image1)
        data.append("image1", roundImages.image1);

      if (roundImages.image2)
        data.append("image2", roundImages.image2);

      if (roundImages.image3)
        data.append("image3", roundImages.image3);

      if (roundImages.image4)
        data.append("image4", roundImages.image4);

      if (roundImages.image5)
        data.append("image5", roundImages.image5);

      const res = await axios.post(
        "/cms/round-section",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      getRoundSection();

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  // Get Data

  const getRoundSection = async () => {

    try {

      const res = await axios.get("/cms/round-section");

      if (res.data.roundSection) {

        setPreviewImages({

          image1: res.data.roundSection.image1?.url || "",

          image2: res.data.roundSection.image2?.url || "",

          image3: res.data.roundSection.image3?.url || "",

          image4: res.data.roundSection.image4?.url || "",

          image5: res.data.roundSection.image5?.url || "",

        });

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getRoundSection();

  }, []);

  // Delete

  const deleteImage = async (imageNo) => {

    try {

      await axios.delete("/cms/round-section/image", {

        data: {

          imageNo,

        },

      });

      getRoundSection();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="space-y-8">
  
      <div className="bg-white rounded-3xl shadow-sm p-8">
  
        <div className="flex items-center gap-4 mb-8">
  
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
  
            <MdOutlineImage size={28} className="text-teal-600" />
  
          </div>
  
          <div>
  
            <h2 className="text-2xl font-bold text-[#0d2d2a]">
              Round Images Section
            </h2>
  
            <p className="text-gray-500 mt-1">
              Manage the five circular images displayed on the homepage.
            </p>
  
          </div>
  
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
  
          {[1,2,3,4,5].map((item)=>{
  
            const field=`image${item}`;
  
            return(
  
              <div
                key={item}
                className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
  
                {/* Preview */}
  
                <div className="h-72 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
  
                  {
                    previewImages[field]
  
                    ?
  
                    <img
                      src={previewImages[field]}
                      alt=""
                      className="w-52 h-52 rounded-full object-cover border-[8px] border-white shadow-xl"
                    />
  
                    :
  
                    <div className="flex flex-col items-center">
  
                      <div className="w-52 h-52 rounded-full bg-white flex items-center justify-center shadow-inner">
  
                        <MdOutlineImage
                          size={70}
                          className="text-gray-300"
                        />
  
                      </div>
  
                      <p className="mt-5 text-gray-400 font-medium">
                        No Image
                      </p>
  
                    </div>
  
                  }
  
                </div>
  
                {/* Footer */}
  
                <div className="p-6">
  
                  <h4 className="font-bold text-lg text-[#0d2d2a] mb-5">
                    Circle Image {item}
                  </h4>
  
                  <div className="flex gap-3">
  
                    <label
                      htmlFor={field}
                      className="flex-1 cursor-pointer text-center bg-[#0d2d2a] hover:bg-[#16443f] text-white py-3 rounded-xl font-semibold transition"
                    >
                      {previewImages[field] ? "Replace" : "Upload"}
                    </label>
  
                    {
  
                      previewImages[field] && (
  
                        <button
                          onClick={()=>deleteImage(item)}
                          className="bg-red-500 hover:bg-red-600 text-white px-5 rounded-xl font-semibold transition"
                        >
                          Delete
                        </button>
  
                      )
  
                    }
  
                  </div>
  
                  <input
                    hidden
                    id={field}
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleImageUpload(e,field)}
                  />
  
                </div>
  
              </div>
  
            )
  
          })}
  
        </div>
  
      </div>
  
      {/* Save Button */}
  
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end rounded-b-3xl">
  
        <button
          onClick={saveRoundSection}
          className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          Save Changes
        </button>
  
      </div>
  
    </div>
  );}