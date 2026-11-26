import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdOutlineTitle,
  MdWorkspacePremium,
  MdAdd,
} from "react-icons/md";

export default function PlanSectionCMS() {

  const [formData, setFormData] = useState({
    topTitle: "",
    heading: "",
  });

  const [plans, setPlans] = useState([]);

  // ================= GET =================

  const getPlanSection = async () => {

    try {

      const res = await axios.get("/cms/plan-section");

      setFormData({

        topTitle: res.data.topTitle || "",

        heading: res.data.heading || "",

      });

      setPlans(res.data.plans || []);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    getPlanSection();

  },[]);

  // ================= SAVE =================

  const savePlanSection = async()=>{

    try{

      await axios.put("/cms/plan-section",{

        ...formData,

        plans,

      });

      alert("Plan Section Updated Successfully");

      getPlanSection();

    }

    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };

  // ================= ADD PLAN =================

  const addPlan=()=>{

    setPlans([
      ...plans,
      {
        title:"",
        description:"",
        price:"",
        duration:"",
        badge:"",
        buttonText:"",
        buttonType:"outline",
        features:[],
      },
    ]);

  };

  // ================= DELETE PLAN =================

  const deletePlan=(index)=>{

    const temp=[...plans];

    temp.splice(index,1);

    setPlans(temp);

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

              Partnership Plans

            </h3>

            <p className="text-sm text-gray-500">

              Update section heading.

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

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

              placeholder="PARTNERSHIP PLANS"

            />

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Main Heading

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

              placeholder="Choose Your Growth Path"

            />

          </div>

        </div>

      </div>

      {/* ================= Plans Header ================= */}

      <div className="bg-white rounded-3xl shadow-sm p-7">

        <div className="flex items-center justify-between mb-7">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">

              <MdWorkspacePremium
                size={24}
                className="text-amber-600"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold text-[#0d2d2a]">

                Plans

              </h3>

              <p className="text-sm text-gray-500">

                Manage partnership plans.

              </p>

            </div>

          </div>

          <button

            onClick={addPlan}

            className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-xl flex items-center gap-2"

          >

            <MdAdd/>

            Add Plan

          </button>

        </div>


        <div className="space-y-8">

{plans.map((plan, planIndex) => (

  <div
    key={planIndex}
    className="border border-gray-200 rounded-3xl p-7 bg-gray-50"
  >

    {/* Header */}

    <div className="flex justify-between items-center mb-6">

      <h4 className="text-xl font-bold text-[#0d2d2a]">

        Plan {planIndex + 1}

      </h4>

      <button

        onClick={() => deletePlan(planIndex)}

        className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-xl"

      >

        Delete Plan

      </button>

    </div>

    {/* Basic Fields */}

    <div className="grid md:grid-cols-2 gap-6">

      <div>

        <label className="block font-semibold mb-2">

          Title

        </label>

        <input

          value={plan.title}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].title=e.target.value;

            setPlans(temp);

          }}

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div>

        <label className="block font-semibold mb-2">

          Badge

        </label>

        <input

          value={plan.badge}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].badge=e.target.value;

            setPlans(temp);

          }}

          placeholder="MOST POPULAR"

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div className="md:col-span-2">

        <label className="block font-semibold mb-2">

          Description

        </label>

        <textarea

          rows={3}

          value={plan.description}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].description=e.target.value;

            setPlans(temp);

          }}

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div>

        <label className="block font-semibold mb-2">

          Price

        </label>

        <input

          value={plan.price}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].price=e.target.value;

            setPlans(temp);

          }}

          placeholder="₹2,499"

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div>

        <label className="block font-semibold mb-2">

          Duration

        </label>

        <input

          value={plan.duration}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].duration=e.target.value;

            setPlans(temp);

          }}

          placeholder="/month"

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div>

        <label className="block font-semibold mb-2">

          Button Text

        </label>

        <input

          value={plan.buttonText}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].buttonText=e.target.value;

            setPlans(temp);

          }}

          className="w-full border rounded-xl px-5 py-3"

        />

      </div>

      <div>

        <label className="block font-semibold mb-2">

          Button Style

        </label>

        <select

          value={plan.buttonType}

          onChange={(e)=>{

            const temp=[...plans];

            temp[planIndex].buttonType=e.target.value;

            setPlans(temp);

          }}

          className="w-full border rounded-xl px-5 py-3"

        >

          <option value="outline">

            Outline

          </option>

          <option value="filled">

            Filled

          </option>

        </select>

      </div>

    </div>

    {/* Features */}

    <div className="mt-8">

      <div className="flex justify-between items-center mb-4">

        <h5 className="font-bold text-lg">

          Features

        </h5>

        <button

          onClick={()=>{

            const temp=[...plans];

            temp[planIndex].features.push("");

            setPlans(temp);

          }}

          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl"

        >

          Add Feature

        </button>

      </div>

      <div className="space-y-3">

        {plan.features.map((feature, featureIndex)=>(

          <div
            key={featureIndex}
            className="flex gap-3"
          >

            <input

              value={feature}

              onChange={(e)=>{

                const temp=[...plans];

                temp[planIndex].features[featureIndex]=e.target.value;

                setPlans(temp);

              }}

              className="flex-1 border rounded-xl px-5 py-3"

            />

            <button

              onClick={()=>{

                const temp=[...plans];

                temp[planIndex].features.splice(featureIndex,1);

                setPlans(temp);

              }}

              className="bg-red-50 hover:bg-red-100 text-red-600 px-5 rounded-xl"

            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>

  </div>

))}

</div>

</div>

{/* Save */}

<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">

<button

onClick={savePlanSection}

className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg"

>

Save Partnership Plans

</button>

</div>

</div>

);

}