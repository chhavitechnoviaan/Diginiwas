import React from 'react';

const ComingSoonVideo = () => {
  const propertyVideo =
    import.meta.env?.VITE_NIWAS_AI ||
    "https://res.cloudinary.com/dhuabv2it/video/upload/v1783603443/diginiwas_k2k2bf.mp4";

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden">
      <video
        src={propertyVideo}
        autoPlay
        muted
        playsInline
        controls
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ComingSoonVideo;