import React from 'react'

import { Smartphone, Bell , X} from "lucide-react";

const ComingSoonVideo = ({setShowComingSoon, video}) => {
  return (
      <div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={() => setShowComingSoon(false)}
              >
                <div
                  className="  relative w-full sm:max-w-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full h-auto max-h-[85vh] rounded-2xl shadow-2xl object-contain"
                  />

                
                  <button
                    onClick={() => setShowComingSoon(false)}
                    className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center 
                    rounded-full bg-black/60 text-white transition hover:bg-black/80"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
  )
}

export default ComingSoonVideo