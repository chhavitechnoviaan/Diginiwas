import { useState } from "react";
import {
  MdOutlineTitle,
  MdOutlineImage,
  MdAdd,
} from "react-icons/md";
import axios from "../../../../Services/axios";
import { useEffect } from "react";

export default function HeroSectionCMS() {
    const [formData, setFormData] = useState({
        headingLine1: "",
        headingLine2: "",
      
        verifiedAgents: "",
        propertiesListed: "",
        happyCustomers: "",
        localitiesCovered: "",
      });

  const [heroImages, setHeroImages] = useState({
    heroImage1: null,
    heroImage2: null,
    heroImage3: null,
  });
  
  const [previewImages, setPreviewImages] = useState({
    heroImage1: "",
    heroImage2: "",
    heroImage3: "",
  });
  

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    setHeroImages((prev) => ({
      ...prev,
      [field]: file,
    }));
  
    setPreviewImages((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  const saveHeroSection = async () => {
    try {
      const data = new FormData();
  
      data.append("headingLine1", formData.headingLine1);
      data.append("headingLine2", formData.headingLine2);
      data.append("verifiedAgents", formData.verifiedAgents);
data.append("propertiesListed", formData.propertiesListed);
data.append("happyCustomers", formData.happyCustomers);
data.append("localitiesCovered", formData.localitiesCovered);
  
      if (heroImages.heroImage1) {
        data.append("heroImage1", heroImages.heroImage1);
      }
  
      if (heroImages.heroImage2) {
        data.append("heroImage2", heroImages.heroImage2);
      }
  
      if (heroImages.heroImage3) {
        data.append("heroImage3", heroImages.heroImage3);
      }
  
      const res = await axios.post("/cms/hero", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert(res.data.message);
  
      getHeroSection();
    } catch (error) {
      console.log(error);
  
      alert("Something went wrong");
    }
  };
  const getHeroSection = async () => {

    try{

        const res = await axios.get(
        "/cms/hero"
        );

        if(res.data.hero){

            setFormData({

                headingLine1: res.data.hero.headingLine1,
              
                headingLine2: res.data.hero.headingLine2,
              
                verifiedAgents: res.data.hero.verifiedAgents,
              
                propertiesListed: res.data.hero.propertiesListed,
              
                happyCustomers: res.data.hero.happyCustomers,
              
                localitiesCovered: res.data.hero.localitiesCovered,
              
              });

            setPreviewImages({
                heroImage1: res.data.hero.heroImage1?.url || "",
                heroImage2: res.data.hero.heroImage2?.url || "",
                heroImage3: res.data.hero.heroImage3?.url || "",
              });

        }

    }

    catch(error){

        console.log(error);

    }

}

useEffect(()=>{
getHeroSection();
    },[]);

const deleteImage = async (imageNo) => {
        try {
          await axios.delete("/cms/hero/image", {
            data: {
              imageNo,
            },
          });
      
          getHeroSection();
        } catch (error) {
          console.log(error);
        }
      };


        

  return (
    <div className="space-y-6">
      {/* Hero Heading */}
      <div className="bg-white rounded-3xl shadow-sm p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
            <MdOutlineTitle size={24} className="text-teal-700" />
          </div>

          <div>
            <h3 className="font-bold text-xl text-[#0d2d2a]">
              Hero Heading
            </h3>

            <p className="text-sm text-gray-500">
              Update homepage hero title.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-semibold text-gray-600 mb-2">
            Heading Line 1
          </label>

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Ghar ki Talaash bhi,"
            value={formData.headingLine1}
            onChange={(e) =>
              setFormData({
                ...formData,
                headingLine1: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Heading Line 2
          </label>

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Vishwas bhi."
            value={formData.headingLine2}
            onChange={(e) =>
              setFormData({
                ...formData,
                headingLine2: e.target.value,
              })
            }
          />
        </div>
      </div>


      {/* Hero Stats */}

<div className="bg-white rounded-3xl shadow-sm p-7 mt-6">

<div className="flex items-center gap-3 mb-7">

  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
    <MdAdd className="text-emerald-600" size={24} />
  </div>

  <div>

    <h3 className="text-xl font-bold text-[#0d2d2a]">
      Hero Statistics
    </h3>

    <p className="text-sm text-gray-500">
      Manage the statistics shown below the Hero Section.
    </p>

  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Verified */}

  <div className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">

    <p className="text-sm text-gray-500 mb-2">
      Verified Agents
    </p>

    <input
      type="text"
      value={formData.verifiedAgents}
      onChange={(e)=>
        setFormData({
          ...formData,
          verifiedAgents:e.target.value
        })
      }
      className="w-full text-3xl font-bold border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500"
      placeholder="150+"
    />

    <p className="text-gray-400 text-xs mt-2">
      Example : 150+
    </p>

  </div>

  {/* Properties */}

  <div className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">

    <p className="text-sm text-gray-500 mb-2">
      Properties Listed
    </p>

    <input
      type="text"
      value={formData.propertiesListed}
      onChange={(e)=>
        setFormData({
          ...formData,
          propertiesListed:e.target.value
        })
      }
      className="w-full text-3xl font-bold border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500"
      placeholder="500+"
    />

    <p className="text-gray-400 text-xs mt-2">
      Example : 500+
    </p>

  </div>

  {/* Customers */}

  <div className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">

    <p className="text-sm text-gray-500 mb-2">
      Happy Customers
    </p>

    <input
      type="text"
      value={formData.happyCustomers}
      onChange={(e)=>
        setFormData({
          ...formData,
          happyCustomers:e.target.value
        })
      }
      className="w-full text-3xl font-bold border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500"
      placeholder="1000+"
    />

    <p className="text-gray-400 text-xs mt-2">
      Example : 1000+
    </p>

  </div>

  {/* Localities */}

  <div className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">

    <p className="text-sm text-gray-500 mb-2">
      Localities Covered
    </p>

    <input
      type="text"
      value={formData.localitiesCovered}
      onChange={(e)=>
        setFormData({
          ...formData,
          localitiesCovered:e.target.value
        })
      }
      className="w-full text-3xl font-bold border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500"
      placeholder="25+"
    />

    <p className="text-gray-400 text-xs mt-2">
      Example : 25+
    </p>

  </div>

</div>

</div>

      {/* Images */}
     {/* Images Section */}
<div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center gap-3 mb-8">
  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
    <MdOutlineImage size={24} className="text-blue-600" />
  </div>

  <div>
    <h3 className="text-xl font-bold text-[#0d2d2a]">
      Hero Mobile Images
    </h3>

    <p className="text-sm text-gray-500">
      Upload 3 Mobile Mockup Images
    </p>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-7">

  {[1,2,3].map((item)=>{

    const field=`heroImage${item}`;

    return(

      <div
      key={item}
      className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm"
      >

        <div className="h-80 bg-gray-100">

          {
            previewImages[field] ?

            <img
            src={previewImages[field]}
            className="w-full h-full object-cover"
            />

            :

            <div className="h-full flex flex-col items-center justify-center text-gray-400">

              <MdOutlineImage size={45}/>

              <p className="mt-3">
                No Image 
                
              </p>
<span>Image size 900 × 1800 px</span>
            </div>

          }

        </div>

        <div className="p-5">

          <h4 className="font-semibold text-gray-700 mb-4">
            Phone Image {item}
          </h4>

          <div className="flex gap-3">

            <label
            htmlFor={field}
            className="flex-1 bg-[#0d2d2a] text-white text-center py-3 rounded-xl cursor-pointer hover:bg-[#16443f] transition"
            >
              {previewImages[field] ? "Replace" : "Upload"}
            </label>

            {
              previewImages[field] && (

                <button
                onClick={()=>deleteImage(item)}
                className="px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white"
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
      <div className="sticky bottom-0 mt-8 bg-white border-t border-gray-200 p-6 flex justify-end">

<button
onClick={saveHeroSection}
className="bg-[#0d2d2a] hover:bg-[#16443f] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all duration-300"
>
Save Hero Section
</button>

</div>
    </div>
  );
}


