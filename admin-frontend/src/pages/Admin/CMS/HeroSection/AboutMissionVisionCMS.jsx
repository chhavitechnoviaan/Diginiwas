import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdOutlineFlag,
} from "react-icons/md";

export default function AboutMissionVisionCMS() {

  const [formData, setFormData] = useState({

    mission: {
      title: "",
      heading: "",
      description: "",
    },

    vision: {
      title: "",
      heading: "",
      description: "",
    },

  });

  // ================= GET =================

  const getMissionVision = async () => {

    try {

      const res = await axios.get(
        "/cms/about-mission-vision"
      );

      setFormData({

        mission: res.data.mission,

        vision: res.data.vision,

      });

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getMissionVision();

  },[]);

  // ================= SAVE =================

  const saveMissionVision = async()=>{

    try{

      await axios.put(

        "/cms/about-mission-vision",

        formData

      );

      alert("Mission & Vision Updated Successfully");

      getMissionVision();

    }

    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };

  return(

    <div className="space-y-6">

      {/* ================= Mission ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">

            <MdOutlineFlag
              size={24}
              className="text-amber-600"
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-[#0d2d2a]">

              Mission Section

            </h3>

            <p className="text-sm text-gray-500">

              Manage mission content.

            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="block font-semibold mb-2">

              Mission Title

            </label>

            <input

              value={formData.mission.title}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  mission:{

                    ...formData.mission,

                    title:e.target.value,

                  }

                })

              }

              className="w-full border rounded-xl px-5 py-3"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Mission Heading

            </label>

            <textarea

              rows={3}

              value={formData.mission.heading}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  mission:{

                    ...formData.mission,

                    heading:e.target.value,

                  }

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Mission Description

            </label>

            <textarea

              rows={5}

              value={formData.mission.description}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  mission:{

                    ...formData.mission,

                    description:e.target.value,

                  }

                })

              }

              className="w-full border rounded-xl px-5 py-4"

            />

          </div>

        </div>

      </div>


            {/* ================= Vision ================= */}

            <div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center gap-3 mb-7">

  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">

    <MdOutlineFlag
      size={24}
      className="text-green-600"
    />

  </div>

  <div>

    <h3 className="text-xl font-bold text-[#0d2d2a]">

      Vision Section

    </h3>

    <p className="text-sm text-gray-500">

      Manage vision content.

    </p>

  </div>

</div>

<div className="space-y-5">

  <div>

    <label className="block font-semibold mb-2">

      Vision Title

    </label>

    <input

      value={formData.vision.title}

      onChange={(e)=>

        setFormData({

          ...formData,

          vision:{

            ...formData.vision,

            title:e.target.value,

          }

        })

      }

      className="w-full border rounded-xl px-5 py-3"

    />

  </div>

  <div>

    <label className="block font-semibold mb-2">

      Vision Heading

    </label>

    <textarea

      rows={3}

      value={formData.vision.heading}

      onChange={(e)=>

        setFormData({

          ...formData,

          vision:{

            ...formData.vision,

            heading:e.target.value,

          }

        })

      }

      className="w-full border rounded-xl px-5 py-4"

    />

  </div>

  <div>

    <label className="block font-semibold mb-2">

      Vision Description

    </label>

    <textarea

      rows={5}

      value={formData.vision.description}

      onChange={(e)=>

        setFormData({

          ...formData,

          vision:{

            ...formData.vision,

            description:e.target.value,

          }

        })

      }

      className="w-full border rounded-xl px-5 py-4"

    />

  </div>

</div>

</div>

{/* ================= Save Button ================= */}

<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">

<button

  onClick={saveMissionVision}

  className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition"

>

  Save Mission & Vision

</button>

</div>

</div>

);

}