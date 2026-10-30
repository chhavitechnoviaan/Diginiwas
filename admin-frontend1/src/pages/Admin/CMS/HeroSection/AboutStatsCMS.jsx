import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdAdd,
  MdOutlineLeaderboard,
} from "react-icons/md";

export default function AboutStatsCMS() {

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
    {
      value: "",
      label: "",
    },
  ]);

  // ================= GET =================

  const getAboutStats = async () => {

    try {

      const res = await axios.get("/cms/about-stats");

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
          {
            value: "",
            label: "",
          },
        ]
      );

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getAboutStats();

  },[]);

  // ================= SAVE =================

  const saveAboutStats = async()=>{

    try{

      await axios.put("/cms/about-stats",{

        stats,

      });

      alert("About Statistics Updated Successfully");

      getAboutStats();

    }

    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };

  return(

    <div className="space-y-6">

      {/* ================= Statistics ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">

            <MdOutlineLeaderboard
              className="text-emerald-600"
              size={24}
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-[#0d2d2a]">

              About Statistics

            </h3>

            <p className="text-sm text-gray-500">

              Manage the statistics displayed in the About Hero section.

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
      placeholder="VERIFIED LISTINGS"
    />

  </div>

))}

</div>

    

</div>



{/* ================= Save Button ================= */}

<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">

<button

onClick={saveAboutStats}

className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition"

>

Save About Statistics

</button>

</div>

</div>

);

}