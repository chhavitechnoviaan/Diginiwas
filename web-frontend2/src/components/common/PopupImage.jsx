import React from 'react'

import { Smartphone, Bell , X} from "lucide-react";

const PopupImage = ({image, setShowPopUpImg}) => {
  return (

                <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setShowPopUpImg(false)}
            >
            <div
                className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,.45)]"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                src={image}
                alt=""
                className="block w-full h-auto max-h-[85vh] rounded-2xl bg-[#111] shadow-2xl object-contain"
                />

                <button
                onClick={() => setShowPopUpImg(false)}
                className="absolute top-4 right-4 h-11 w-11 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
                >
                <X size={22} />
                </button>
            </div>
            </div>
  )
}

export default PopupImage