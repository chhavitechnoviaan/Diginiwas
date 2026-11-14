import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdAdd,
  MdOutlineTitle,
  MdLocationOn,
} from "react-icons/md";

export default function NetworkDensityCMS() {

  const [formData, setFormData] = useState({
    headingLine1: "",
    headingHighlight: "",
    description: "",
  });

  const [cities, setCities] = useState([]);

  // ================= GET =================

  const getNetworkDensity = async () => {

    try {

      const res = await axios.get("/cms/network-density");

      setFormData({

        headingLine1: res.data.headingLine1 || "",

        headingHighlight: res.data.headingHighlight || "",

        description: res.data.description || "",

      });

      setCities(res.data.cities || []);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getNetworkDensity();

  },[]);

  // ================= SAVE =================

  const saveNetworkDensity = async()=>{

    try{

      await axios.put("/cms/network-density",{

        ...formData,

        cities,

      });

      alert("Network Density Updated Successfully");

      getNetworkDensity();

    }

    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };

  // ================= Add City =================

  const addCity=()=>{

    setCities([
      ...cities,
      {
        name:"",
        count:"",
      },
    ]);

  };

  // ================= Delete =================

  const deleteCity=(index)=>{

    const temp=[...cities];

    temp.splice(index,1);

    setCities(temp);

  };

  return(

    <div className="space-y-6">

      {/* ================= Heading ================= */}

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

              Network Density Content

            </h3>

            <p className="text-sm text-gray-500">

              Manage heading and description.

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">

              Heading Line 1

            </label>

            <input

              value={formData.headingLine1}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  headingLine1:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-3"

              placeholder="Explore the Agent"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Highlight Text

            </label>

            <input

              value={formData.headingHighlight}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  headingHighlight:e.target.value,

                })

              }

              className="w-full border rounded-xl px-5 py-3"

              placeholder="Network Density"

            />

          </div>

        </div>

        <div className="mt-6">

          <label className="block font-semibold mb-2">

            Description

          </label>

          <textarea

            rows={5}

            value={formData.description}

            onChange={(e)=>

              setFormData({

                ...formData,

                description:e.target.value,

              })

            }

            className="w-full border rounded-xl px-5 py-4"

            placeholder="Enter Description"

          />

        </div>

      </div>

            {/* ================= Cities ================= */}

            <div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center justify-between mb-7">

  <div className="flex items-center gap-3">

    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">

      <MdLocationOn
        size={24}
        className="text-emerald-600"
      />

    </div>

    <div>

      <h3 className="text-xl font-bold text-[#0d2d2a]">

        Cities

      </h3>

      <p className="text-sm text-gray-500">

        Manage network cities.

      </p>

    </div>

  </div>

  <button

    onClick={addCity}

    className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-xl flex items-center gap-2"

  >

    <MdAdd />

    Add City

  </button>

</div>

<div className="space-y-5">

  {cities.map((city,index)=>(

    <div

      key={index}

      className="rounded-2xl border border-gray-200 bg-gray-50 p-6"

    >

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block font-semibold mb-2">

            City Name

          </label>

          <input

            value={city.name}

            onChange={(e)=>{

              const temp=[...cities];

              temp[index].name=e.target.value;

              setCities(temp);

            }}

            className="w-full border rounded-xl px-5 py-3"

            placeholder="Chandigarh"

          />

        </div>

        <div>

          <label className="block font-semibold mb-2">

            Count

          </label>

          <input

            value={city.count}

            onChange={(e)=>{

              const temp=[...cities];

              temp[index].count=e.target.value;

              setCities(temp);

            }}

            className="w-full border rounded-xl px-5 py-3"

            placeholder="850+"

          />

        </div>

      </div>

      <div className="flex justify-end mt-5">

        <button

          onClick={()=>deleteCity(index)}

          className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl"

        >

          Delete

        </button>

      </div>

    </div>

  ))}

</div>

</div>

{/* ================= Save Button ================= */}

<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">

<button

  onClick={saveNetworkDensity}

  className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition"

>

  Save Network Density

</button>

</div>

</div>

);

}