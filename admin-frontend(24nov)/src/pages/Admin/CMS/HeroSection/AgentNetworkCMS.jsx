import { useEffect, useState } from "react";
import axios from "../../../../Services/axios";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdOutlineTitle,
  MdOutlinePerson,
} from "react-icons/md";

export default function AgentNetworkCMS() {

  const [topTitle, setTopTitle] = useState("");

  const [heading, setHeading] = useState("");

  const [cards, setCards] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingCard, setEditingCard] = useState(null);

  const initialState = {
    name: "",
    designation: "",
    review: "",
  };
  
  const [formData, setFormData] = useState(initialState);
  
  const [image, setImage] = useState(null);
  
  const [preview, setPreview] = useState("");

  const getNetwork = async () => {

    try {
  
      const res = await axios.get("/cms/agent-network");
  
      setTopTitle(res.data.topTitle);
  
      setHeading(res.data.heading);
  
      setCards(res.data.cards || []);
  
    }
  
    catch(error){
  
      console.log(error);
  
    }
  
  };
  
  useEffect(()=>{
  
  getNetwork();
  
  },[]);

  const saveHeading = async()=>{

    try{
    
    await axios.put("/cms/agent-network/heading",{
    
    topTitle,
    
    heading
    
    });
    
    alert("Heading Updated");
    
    }
    
    catch(error){
    
    console.log(error);
    
    }
    
    };

    const openAddModal = () => {

        setEditingCard(null);
      
        setFormData(initialState);
      
        setImage(null);
      
        setPreview("");
      
        setShowModal(true);
      
      };

      const editCard = (card) => {

        setEditingCard(card);
      
        setFormData({
      
          name: card.name,
      
          designation: card.designation,
      
          review: card.review,
      
        });
      
        setPreview(card.image?.url || "");
      
        setImage(null);
      
        setShowModal(true);
      
      };

      const handleImage = (e) => {

        const file = e.target.files[0];
      
        if (!file) return;
      
        setImage(file);
      
        setPreview(URL.createObjectURL(file));
      
      };

      const saveCard = async () => {

        try {
      
          const data = new FormData();
      
          data.append("name", formData.name);
      
          data.append("designation", formData.designation);
      
          data.append("review", formData.review);
      
          if (image) {
      
            data.append("image", image);
      
          }
      
          if (editingCard) {
      
            await axios.put(
      
              `/cms/agent-network/card/${editingCard._id}`,
      
              data,
      
              {
      
                headers: {
      
                  "Content-Type": "multipart/form-data",
      
                },
      
              }
      
            );
      
          }
      
          else {
      
            await axios.post(
      
              "/cms/agent-network/card",
      
              data,
      
              {
      
                headers: {
      
                  "Content-Type": "multipart/form-data",
      
                },
      
              }
      
            );
      
          }
      
          setShowModal(false);
      
          getNetwork();
      
        }
      
        catch (error) {
      
          console.log(error);
      
        }
      
      };

            const deleteCard=async(id)=>{

                if(!window.confirm("Delete this card?")) return;
                
                try{
                
                await axios.delete(`/cms/agent-network/card/${id}`);
                
                getNetwork();
                
                }
                
                catch(error){
                
                console.log(error);
                
                }
                
                };

                return(

                    <div className="space-y-7">

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

Network Heading

</h3>

<p className="text-gray-500 text-sm">

Manage section heading.

</p>

</div>

</div>

<div className="grid md:grid-cols-2 gap-6">

<div>

<label className="block font-semibold mb-2">

Top Label

</label>

<input

value={topTitle}

onChange={(e)=>setTopTitle(e.target.value)}

className="w-full border rounded-xl px-5 py-3"

/>

</div>

<div>

<label className="block font-semibold mb-2">

Heading

</label>

<input

value={heading}

onChange={(e)=>setHeading(e.target.value)}

className="w-full border rounded-xl px-5 py-3"

/>

</div>

</div>

<div className="mt-6 flex justify-end">

<button

onClick={saveHeading}

className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-7 py-3 rounded-xl"

>

Save Heading

</button>

</div>

</div>

<div className="bg-white rounded-3xl shadow-sm p-7">

<div className="flex items-center justify-between mb-7">

<div>

<h3 className="text-xl font-bold text-[#0d2d2a]">

Agent Testimonials

</h3>

<p className="text-sm text-gray-500">

Manage testimonial cards.

</p>

</div>

<button

onClick={openAddModal}

className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-6 py-3 rounded-xl flex items-center gap-2"

>

<MdAdd/>

Add Card

</button>

</div>

<div className="grid md:grid-cols-2 gap-7">

{cards.map((item)=>(

<div

key={item._id}

className="rounded-3xl border overflow-hidden"

>

<div className="h-56 bg-gray-100 flex items-center justify-center">

{

item.image?.url ?

<img

src={item.image.url}

className="w-full h-full object-cover"

/>

:

<MdOutlinePerson

size={70}

className="text-gray-300"

/>

}

</div>

<div className="p-6">

<h3 className="font-bold text-xl">

{item.name}

</h3>

<p className="text-gray-500">

{item.designation}

</p>

<p className="text-sm mt-4 line-clamp-4">

{item.review}

</p>

<div className="flex gap-3 mt-6">

<button

onClick={()=>editCard(item)}

className="flex-1 py-3 rounded-xl bg-blue-50 text-blue-600 flex justify-center items-center gap-2"

>

<MdEdit/>

Edit

</button>

<button

onClick={()=>deleteCard(item._id)}

className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 flex justify-center items-center gap-2"

>

<MdDelete/>

Delete

</button>

</div>

</div>

</div>

))}

</div>

</div>

{showModal && (

<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5">

<div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">

{/* Header */}

<div className="border-b px-8 py-6 flex justify-between items-center">

<h2 className="text-2xl font-bold text-[#0d2d2a]">

{editingCard ? "Edit Card" : "Add Card"}

</h2>

<button

onClick={()=>setShowModal(false)}

className="text-3xl"

>

×

</button>

</div>

{/* Body */}

<div className="flex-1 overflow-y-auto p-8 space-y-6">

{/* Image */}

<div>

<label className="font-semibold">

Profile Image

</label>

<div className="mt-4 flex items-center gap-6">

<div className="w-28 h-28 rounded-full overflow-hidden border bg-gray-100">

{

preview ?

<img

src={preview}

className="w-full h-full object-cover"

/>

:

<div className="w-full h-full flex items-center justify-center">

<MdOutlinePerson

size={45}

className="text-gray-300"

/>

</div>

}

</div>

<label

htmlFor="networkImage"

className="bg-[#0d2d2a] text-white px-6 py-3 rounded-xl cursor-pointer"

>

Upload Image

</label>

<input

hidden

id="networkImage"

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

onChange={(e)=>

setFormData({

...formData,

name:e.target.value

})

}

className="w-full border rounded-xl mt-2 px-5 py-3"

/>

</div>

{/* Designation */}

<div>

<label className="font-semibold">

Designation

</label>

<input

value={formData.designation}

onChange={(e)=>

setFormData({

...formData,

designation:e.target.value

})

}

className="w-full border rounded-xl mt-2 px-5 py-3"

/>

</div>

{/* Review */}

<div>

<label className="font-semibold">

Review

</label>

<textarea

rows={6}

value={formData.review}

onChange={(e)=>

setFormData({

...formData,

review:e.target.value

})

}

className="w-full border rounded-xl mt-2 px-5 py-4"

></textarea>

</div>

</div>

{/* Footer */}

<div className="border-t px-8 py-6 flex justify-end gap-4">

<button

onClick={()=>setShowModal(false)}

className="border px-7 py-3 rounded-xl"

>

Cancel

</button>

<button

onClick={saveCard}

className="bg-[#0d2d2a] hover:bg-[#16443f] text-white px-8 py-3 rounded-xl"

>

{

editingCard ?

"Update Card"

:

"Add Card"

}

</button>

</div>

</div>

</div>

)}

</div>

)};