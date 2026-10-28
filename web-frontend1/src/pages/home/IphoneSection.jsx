

// import React, { useEffect, useRef, useState } from "react";
// import backImg from "../../assets/images/back.png";
// import axios from "../../api/axios";
// import niwas from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.33 AM.jpeg";
// import first from "../../assets/images/ChatGPT Image Sep 24, 2026, 04_13_40 PM.png";



// const RADIUS = window.innerWidth < 640 ? 180 : 300;
// const SPEED = 0.2;

// export default function IphoneSection() {
//   const [roundData, setRoundData] = useState(null);

//  const autoRef = useRef(true);
//   const angleRef = useRef(0);
//   const rafRef = useRef(null);
//   const slotsRef = useRef([]);
//   const shellsRef = useRef([]);

//   const FRONT_IMAGES = [
//     roundData?.image1?.url || niwas ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736766/niwas_jzpp87.png",
  
//     roundData?.image2?.url || first ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",
  
//     roundData?.image3?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",
  
//     roundData?.image4?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",
  
//     roundData?.image5?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",
//   ];
  
//   const N = FRONT_IMAGES.length;

//   const faceStateRef = useRef(Array(N).fill("front")); 

//   const getRoundSection = async () => {
//     try {
//       const res = await axios.get("/cms/round-section");
//       setRoundData(res.data.roundSection);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getRoundSection();
//   }, []);


//   // 🔥 PHONE 3D COMPONENT
//   function Phone3D({ img, autoRef }) {
//   const thickness = 14;

//   return (
//     <div 
//   className=" "   
//        style={{
//       position: "absolute", 
//       inset: 0,              
//       transformStyle: "preserve-3d", 
//     }}
//         onMouseEnter={() => {
//     autoRef.current = false;
//   }}
//   onMouseLeave={() => {
//     autoRef.current = true;
//   }}
//   >
     

//       {/* FRONT */}
//       <div 
//         style={{
//           position: "absolute",
//           inset: "0px",
//           transform: `translateZ(${thickness / 2}px)`,
//           borderRadius: "36px",
//           overflow: "hidden",
//           background: "#000",
//           backfaceVisibility: "hidden",
//         }}
//       >
//         <img
//           src={img}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />

//         {/* notch */}
//         <div 
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "90px",
//             height: "22px",
//             background: "#000",
//             borderRadius: "20px",
//           }}
//         />
//       </div>

//       {/* BACK */}
//       <div
//         style={{
//           position: "absolute",
//           inset: "3px",
//           transform: `rotateY(180deg) translateZ(${thickness / 2}px)`,
//           borderRadius: "36px",
//           overflow: "hidden",
//           backfaceVisibility: "hidden",
//           background: "#111",
//         }}
//       >
//         <img
//           src={backImg}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />
//       </div>

    

     
//     </div>
//   );
// }

//   useEffect(() => {
//     const tick = () => {
//       if (autoRef.current) {
//           angleRef.current -= SPEED;
//         }

//       slotsRef.current.forEach((slot, i) => {
//         if (!slot) return;

//         const baseAngle = (360 / N) * i;
//         const angle = angleRef.current + baseAngle;
//         const rad = (angle * Math.PI) / 180;

//         const x = Math.sin(rad) * RADIUS;
//         const z = Math.cos(rad) * RADIUS;

//         const depth = (z / RADIUS + 1) / 2;
//         const scale = 0.6 + depth * 0.6;

//         // 📍 POSITION
//         slot.style.transform = `
//           translateX(${x}px)
//           translateZ(${z}px)
//         `;
//         slot.style.zIndex = Math.round(depth * 100);

//         const shell = shellsRef.current[i];
//         if (shell) {
//           const deg = -(angle);
              
//           shell.style.transform = `
//           rotateY(${deg}deg)
//           scale(${scale})         `;
        
//           shell.style.boxShadow =
//             depth > 0.5
//               ? "0 40px 100px rgba(0,0,0,0.9)"
//               : "0 20px 60px rgba(0,0,0,0.5)";
//         }
//       });

//       rafRef.current = requestAnimationFrame(tick);
//     };

//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, []);

//   return (
//     <div
//       className="w-full flex items-center  sm:pt-48 sm:pb-28 mb-20 justify-center overflow-hidden "
//       style={{
//         background: "#274255",
//         minHeight: "700px",
//       }}
      
//     >
//       <div
//         className="relative "
//         style={{
//           width: "100%",
//           maxWidth: "1000px",
//           height: "600px",
//           perspective: "1200px",
//         }}
//       >
//         <div
//           className="absolute w-full h-full flex items-center justify-center"
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           {FRONT_IMAGES.map((img, i) => (
//             <div
//               key={i}
//               ref={(el) => (slotsRef.current[i] = el)}
//               style={{
//                 position: "absolute",
//                 width: "200px",
//                 height: "420px",
//                 transformStyle: "preserve-3d",
                
//               }}
//             >
//             <div
//   ref={(el) => (shellsRef.current[i] = el)}
//   style={{
//     width: "100%",
//     height: "100%",
//     transformStyle: "preserve-3d",
//     background: "transparent", 
//     backfaceVisibility: "hidden", 
//     borderRadius:  "36px",   // add this
//     // overflow: "hidden",   
//   }}
// >
//                 <Phone3D img={img} autoRef={autoRef} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import backImg from "../../assets/images/back.png";
import axios from "../../api/axios";

import niwas from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.33 AM.jpeg";
import first from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.34 AM.jpeg";
import second from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.46 AM.jpeg";
import third from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.51 AM.jpeg";
import fourth from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.41 AM.jpeg";
const SPEED = 0.2;

export default function IphoneSection() {
  const [roundData, setRoundData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const autoRef = useRef(true);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  const slotsRef = useRef([]);
  const shellsRef = useRef([]);

  // =========================================================
  // RESPONSIVE
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const RADIUS = isMobile ? 175 : 300;

  // =========================================================
  // GET CMS DATA
  // =========================================================

  useEffect(() => {
    const getRoundSection = async () => {
      try {
        const res = await axios.get("/cms/round-section");

        setRoundData(res.data?.roundSection || null);
      } catch (error) {
        console.log("Round Section Error:", error);
      }
    };

    getRoundSection();
  }, []);

  // =========================================================
  // FRONT SCREEN IMAGES
  // =========================================================

  const FRONT_IMAGES = [
    roundData?.image1?.url ||
      niwas ||
      "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736766/niwas_jzpp87.png",

    roundData?.image2?.url ||
      first ||
      "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",

    roundData?.image3?.url || second ||
      "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",

    roundData?.image4?.url || third ||
      "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",

    roundData?.image5?.url || fourth ||
      "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",
  ];

  const N = FRONT_IMAGES.length;

  // =========================================================
  // IPHONE 3D COMPONENT
  // =========================================================

  function Phone3D({ img }) {
    const thickness = isMobile ? 10 : 14;

    return (
      <div
        onMouseEnter={() => {
          autoRef.current = false;
        }}
        onMouseLeave={() => {
          autoRef.current = true;
        }}
        style={{
          position: "absolute",
          inset: 0,

          width: "100%",
          height: "100%",

          transformStyle: "preserve-3d",

          /*
           * IMPORTANT:
           * Parent shell rotates the complete phone.
           */
          backfaceVisibility: "visible",

          pointerEvents: "auto",
        }}
      >
        {/* =====================================================
            FRONT PHONE BODY
        ===================================================== */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            width: "100%",
            height: "100%",

            boxSizing: "border-box",

            padding: isMobile ? "5px" : "6px",

            /*
             * Real phone frame
             */
            background:
              "linear-gradient(145deg, #2b2b2b 0%, #080808 45%, #202020 100%)",

            borderRadius: isMobile
              ? "32px"
              : "40px",

            border:
              "1px solid rgba(255,255,255,0.24)",

            transform:
              `translateZ(${thickness / 2}px)`,

            transformStyle: "preserve-3d",

            backfaceVisibility: "hidden",

            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* =================================================
              SCREEN
          ================================================= */}

          <div
            style={{
              position: "relative",

              width: "100%",
              height: "100%",

              overflow: "hidden",

              borderRadius: isMobile
                ? "27px"
                : "34px",

              background: "#fff",

              isolation: "isolate",
            }}
          >
            {/* =================================================
                APP SCREEN IMAGE
            ================================================= */}

            <img
              src={img}
              alt="DigiNiwas App"
              draggable={false}
              style={{
                position: "absolute",

                top: 0,
                left: 0,

                width: "100%",
                height: "100%",

                objectFit: "cover",

                objectPosition: "center top",

                display: "block",

                userSelect: "none",

                WebkitUserDrag: "none",
              }}
            />

            {/* =================================================
                DYNAMIC ISLAND
            ================================================= */}

            <div
              style={{
                position: "absolute",

                top: isMobile
                  ? "6px"
                  : "8px",

                left: "50%",

                transform:
                  "translateX(-50%)",

                width: isMobile
                  ? "35%"
                  : "34%",

                minWidth: isMobile
                  ? "42px"
                  : "48px",

                maxWidth: isMobile
                  ? "65px"
                  : "78px",

                height: isMobile
                  ? "14px"
                  : "18px",

                background: "#000",

                borderRadius: "999px",

                zIndex: 20,

                pointerEvents: "none",

                boxShadow:
                  "0 2px 5px rgba(0,0,0,0.5)",
              }}
            >
              {/* CAMERA */}

              <div
                style={{
                  position: "absolute",

                  right: isMobile
                    ? "6px"
                    : "8px",

                  top: "50%",

                  transform:
                    "translateY(-50%)",

                  width: isMobile
                    ? "4px"
                    : "5px",

                  height: isMobile
                    ? "4px"
                    : "5px",

                  borderRadius: "50%",

                  background: "#161616",
                }}
              />
            </div>

            {/* =================================================
                SCREEN GLASS
            ================================================= */}

            <div
              style={{
                position: "absolute",

                inset: 0,

                borderRadius: isMobile
                  ? "27px"
                  : "34px",

                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.10), transparent 30%, transparent 75%, rgba(255,255,255,0.03))",

                zIndex: 10,

                pointerEvents: "none",
              }}
            />

            {/* =================================================
                HOME INDICATOR
            ================================================= */}

            <div
              style={{
                position: "absolute",

                bottom: isMobile
                  ? "5px"
                  : "7px",

                left: "50%",

                transform:
                  "translateX(-50%)",

                width: "34%",

                height: isMobile
                  ? "2.5px"
                  : "3px",

                borderRadius: "999px",

                background: "#111",

                opacity: 0.75,

                zIndex: 20,

                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* =====================================================
            IPHONE BACK
            NO BLACK RECTANGLE
        ===================================================== */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            width: "100%",
            height: "100%",

            /*
             * IMPORTANT:
             * Completely transparent.
             *
             * The actual back.png is rendered here.
             */
            background: "transparent",

            border: "none",

            boxShadow: "none",

            borderRadius: isMobile
              ? "32px"
              : "40px",

            overflow: "visible",

            transform: `
              rotateY(180deg)
              translateZ(${thickness / 2}px)
            `,

            transformStyle:
              "preserve-3d",

            backfaceVisibility:
              "hidden",

            pointerEvents: "none",
          }}
        >
          {/* =================================================
              ACTUAL BACK IMAGE
          ================================================= */}

          <img
            src={backImg}
            alt="iPhone Back"
            draggable={false}
            style={{
              position: "absolute",

              inset: 0,

              width: "100%",
              height: "100%",

              /*
               * IMPORTANT:
               *
               * contain prevents the image from being
               * cropped.
               */
              objectFit: "contain",

              objectPosition: "center",

              display: "block",

              background: "transparent",

              border: "none",

              borderRadius: isMobile
                ? "32px"
                : "40px",

              userSelect: "none",

              WebkitUserDrag: "none",
            }}
          />
        </div>

        {/* =====================================================
            THIN LEFT SIDE
        ===================================================== */}

        <div
          style={{
            position: "absolute",

            top: "4%",

            left: 0,

            width: `${thickness}px`,

            height: "92%",

            background:
              "linear-gradient(90deg, #050505, #3a3a3a, #111)",

            borderRadius: "10px",

            transform: `
              translateX(-${thickness / 2}px)
              rotateY(90deg)
            `,

            transformOrigin:
              "center center",

            backfaceVisibility:
              "visible",

            pointerEvents: "none",
          }}
        />

        {/* =====================================================
            THIN RIGHT SIDE
        ===================================================== */}

        <div
          style={{
            position: "absolute",

            top: "4%",

            right: 0,

            width: `${thickness}px`,

            height: "92%",

            background:
              "linear-gradient(90deg, #111, #3a3a3a, #050505)",

            borderRadius: "10px",

            transform: `
              translateX(${thickness / 2}px)
              rotateY(90deg)
            `,

            transformOrigin:
              "center center",

            backfaceVisibility:
              "visible",

            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // =========================================================
  // 3D ROTATION
  // =========================================================

  useEffect(() => {
    if (!N) return;

    const tick = () => {
      /*
       * AUTO ROTATION
       */

      if (autoRef.current) {
        angleRef.current -= SPEED;
      }

      /*
       * EACH PHONE
       */

      slotsRef.current.forEach(
        (slot, i) => {
          if (!slot) return;

          /*
           * Circular position
           */

          const baseAngle =
            (360 / N) * i;

          const angle =
            angleRef.current +
            baseAngle;

          const radians =
            (angle * Math.PI) / 180;

          /*
           * X
           */

          const x =
            Math.sin(radians) *
            RADIUS;

          /*
           * Z
           */

          const z =
            Math.cos(radians) *
            RADIUS;

          /*
           * DEPTH
           */

          const depth =
            (z / RADIUS + 1) / 2;

          /*
           * SCALE
           */

          const scale =
            0.62 + depth * 0.38;

          /*
           * POSITION
           */

          slot.style.transform = `
            translate3d(
              ${x}px,
              0px,
              ${z}px
            )
          `;

          /*
           * Z INDEX
           */

          slot.style.zIndex =
            Math.round(depth * 100);

          const shell =
            shellsRef.current[i];

          if (shell) {
            /*
             * =================================================
             * PHONE ROTATION
             *
             * 0°   = FRONT
             * 90°  = SIDE
             * 180° = BACK
             * 270° = SIDE
             * 360° = FRONT
             * =================================================
             */

            shell.style.transform = `
              rotateY(${-angle}deg)
              scale(${scale})
            `;

            /*
             * Lighting
             */

            const brightness =
              0.72 + depth * 0.28;

            shell.style.filter =
              `brightness(${brightness})`;

            /*
             * Shadow
             */

            shell.style.boxShadow =
              depth > 0.45
                ? "0 30px 70px rgba(0,0,0,0.45)"
                : "0 15px 35px rgba(0,0,0,0.18)";
          }
        }
      );

      rafRef.current =
        requestAnimationFrame(tick);
    };

    rafRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, [N, RADIUS]);

  // =========================================================
  // SECTION
  // =========================================================

  return (
    <section
      className="
        relative
        w-full
        flex
        items-center
        justify-center
        overflow-hidden
      "
      style={{
        background: "#274255",

        minHeight: isMobile
          ? "560px"
          : "700px",

        paddingTop: isMobile
          ? "40px"
          : "70px",

        paddingBottom: isMobile
          ? "40px"
          : "70px",
      }}
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        style={{
          position: "absolute",

          width: isMobile
            ? "400px"
            : "700px",

          height: isMobile
            ? "300px"
            : "500px",

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(51,204,153,0.10), transparent 70%)",

          filter: "blur(30px)",

          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          3D CONTAINER
      ===================================================== */}

      <div
        className="relative"
        style={{
          width: "100%",

          maxWidth: "1100px",

          height: isMobile
            ? "450px"
            : "600px",

          perspective: "1400px",

          perspectiveOrigin:
            "50% 50%",

          overflow: "visible",
        }}
      >
        {/* ===================================================
            3D STAGE
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
          style={{
            transformStyle:
              "preserve-3d",

            overflow: "visible",
          }}
        >
          {/* =================================================
              PHONES
          ================================================= */}

          {FRONT_IMAGES.map(
            (img, i) => (
              <div
                key={i}
                ref={(el) => {
                  slotsRef.current[i] =
                    el;
                }}
                style={{
                  position: "absolute",

                  width: isMobile
                    ? "155px"
                    : "205px",

                  height: isMobile
                    ? "336px"
                    : "444px",

                  transformStyle:
                    "preserve-3d",

                  transformOrigin:
                    "center center",

                  willChange:
                    "transform",

                  pointerEvents:
                    "auto",
                }}
              >
                {/* =========================================
                    PHONE SHELL
                ========================================= */}

                <div
                  ref={(el) => {
                    shellsRef.current[i] =
                      el;
                  }}
                  style={{
                    position: "relative",

                    width: "100%",
                    height: "100%",

                    transformStyle:
                      "preserve-3d",

                    transformOrigin:
                      "center center",

                    /*
                     * IMPORTANT:
                     * Do NOT hide back here.
                     */

                    backfaceVisibility:
                      "visible",

                    background:
                      "transparent",

                    borderRadius:
                      isMobile
                        ? "32px"
                        : "40px",

                    willChange:
                      "transform, filter",

                    pointerEvents:
                      "auto",
                  }}
                >
                  <Phone3D
                    img={img}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import backImg from "../../assets/images/back.png";
// import axios from "../../api/axios";

// import niwas from "../../assets/images/WhatsApp Image 2026-09-24 at 11.12.33 AM.jpeg";
// import first from "../../assets/images/ChatGPT Image Sep 24, 2026, 04_13_40 PM.png";

// const SPEED = 0.2;

// export default function IphoneSection() {
//   const [roundData, setRoundData] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const autoRef = useRef(true);
//   const angleRef = useRef(0);
//   const rafRef = useRef(null);

//   const slotsRef = useRef([]);
//   const shellsRef = useRef([]);

//   // ==========================================
//   // RESPONSIVE
//   // ==========================================

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const RADIUS = isMobile ? 170 : 300;

//   // ==========================================
//   // GET CMS DATA
//   // ==========================================

//   useEffect(() => {
//     const getRoundSection = async () => {
//       try {
//         const res = await axios.get("/cms/round-section");

//         setRoundData(res.data?.roundSection || null);
//       } catch (error) {
//         console.log("Round Section Error:", error);
//       }
//     };

//     getRoundSection();
//   }, []);

//   // ==========================================
//   // APP SCREEN IMAGES
//   // ==========================================

//   const FRONT_IMAGES = [
//     roundData?.image1?.url ||
//       niwas ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736766/niwas_jzpp87.png",

//     roundData?.image2?.url ||
//       first ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",

//     roundData?.image3?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",

//     roundData?.image4?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736761/dashboard_t6ocdx.png",

//     roundData?.image5?.url ||
//       "https://res.cloudinary.com/dhuabv2it/image/upload/v1780736767/property_apkuj7.png",
//   ];

//   const N = FRONT_IMAGES.length;

//   // ==========================================
//   // IPHONE 3D
//   // ==========================================

//   function Phone3D({ img }) {
//     const thickness = 16;

//     return (
//       <div
//         onMouseEnter={() => {
//           autoRef.current = false;
//         }}
//         onMouseLeave={() => {
//           autoRef.current = true;
//         }}
//         style={{
//           position: "absolute",
//           inset: 0,

//           width: "100%",
//           height: "100%",

//           transformStyle: "preserve-3d",

//           /*
//            * IMPORTANT
//            * Parent shell rotates,
//            * therefore both faces stay attached.
//            */
//           backfaceVisibility: "visible",

//           pointerEvents: "auto",
//         }}
//       >
//         {/* =====================================================
//             FRONT IPHONE
//         ===================================================== */}

//         <div
//           style={{
//             position: "absolute",
//             inset: 0,

//             width: "100%",
//             height: "100%",

//             boxSizing: "border-box",

//             padding: "6px",

//             /*
//              * REAL IPHONE BODY
//              */
//             background:
//               "linear-gradient(145deg, #242424 0%, #050505 45%, #171717 100%)",

//             borderRadius: "40px",

//             border:
//               "1px solid rgba(255,255,255,0.28)",

//             transform:
//               `translateZ(${thickness / 2}px)`,

//             transformStyle: "preserve-3d",

//             backfaceVisibility: "hidden",

//             boxShadow:
//               "inset 0 0 0 1px rgba(255,255,255,0.08)",
//           }}
//         >
//           {/* ==============================================
//               SCREEN
//           ============================================== */}

//           <div
//             style={{
//               position: "relative",

//               width: "100%",
//               height: "100%",

//               overflow: "hidden",

//               borderRadius: "34px",

//               background: "#fff",

//               /*
//                * IMPORTANT
//                * Image stays INSIDE screen.
//                */
//               isolation: "isolate",
//             }}
//           >
//             {/* ==========================================
//                 APP SCREEN
//             ========================================== */}

//             <img
//               src={img}
//               alt="DigiNiwas App"
//               draggable={false}
//               style={{
//                 position: "absolute",

//                 top: 0,
//                 left: 0,

//                 width: "100%",
//                 height: "100%",

//                 /*
//                  * Mobile screenshots fit naturally.
//                  */
//                 objectFit: "cover",

//                 objectPosition: "center top",

//                 display: "block",

//                 userSelect: "none",

//                 WebkitUserDrag: "none",
//               }}
//             />

//             {/* ==========================================
//                 DYNAMIC ISLAND
//             ========================================== */}

//             <div
//               style={{
//                 position: "absolute",

//                 top: "7px",

//                 left: "50%",

//                 transform:
//                   "translateX(-50%)",

//                 width: "34%",

//                 height: "18px",

//                 minWidth: "48px",

//                 maxWidth: "78px",

//                 background: "#000",

//                 borderRadius: "999px",

//                 zIndex: 10,

//                 pointerEvents: "none",

//                 boxShadow:
//                   "0 2px 5px rgba(0,0,0,0.45)",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",

//                   right: "8px",

//                   top: "50%",

//                   transform:
//                     "translateY(-50%)",

//                   width: "5px",
//                   height: "5px",

//                   borderRadius: "50%",

//                   background: "#151515",
//                 }}
//               />
//             </div>

//             {/* ==========================================
//                 GLASS REFLECTION
//             ========================================== */}

//             <div
//               style={{
//                 position: "absolute",

//                 inset: 0,

//                 borderRadius: "34px",

//                 background:
//                   "linear-gradient(120deg, rgba(255,255,255,0.10), transparent 30%, transparent 75%, rgba(255,255,255,0.04))",

//                 zIndex: 8,

//                 pointerEvents: "none",
//               }}
//             />

//             {/* ==========================================
//                 HOME INDICATOR
//             ========================================== */}

//             <div
//               style={{
//                 position: "absolute",

//                 bottom: "6px",

//                 left: "50%",

//                 transform:
//                   "translateX(-50%)",

//                 width: "35%",

//                 height: "3px",

//                 borderRadius: "999px",

//                 background: "#111",

//                 opacity: 0.75,

//                 zIndex: 10,

//                 pointerEvents: "none",
//               }}
//             />
//           </div>
//         </div>

//         {/* =====================================================
//             BACK OF IPHONE
//         ===================================================== */}

//         <div
//           style={{
//             position: "absolute",
//             inset: 0,

//             width: "100%",
//             height: "100%",

//             boxSizing: "border-box",

//             padding: "5px",

//             background:
//               "linear-gradient(145deg, #292929, #050505 55%, #1b1b1b)",

//             borderRadius: "40px",

//             overflow: "hidden",

//             /*
//              * VERY IMPORTANT:
//              *
//              * translateZ FIRST
//              * rotateY SECOND
//              *
//              * This keeps the back at the correct
//              * distance from the center.
//              */
//             transform: `
//               translateZ(-${thickness / 2}px)
//               rotateY(180deg)
//             `,

//             transformStyle: "preserve-3d",

//             backfaceVisibility: "hidden",

//             border:
//               "1px solid rgba(255,255,255,0.22)",

//             boxShadow:
//               "inset 0 0 20px rgba(255,255,255,0.04)",
//           }}
//         >
//           {/* ==========================================
//               ACTUAL IPHONE BACK IMAGE
//           ========================================== */}

//           <img
//             src={backImg}
//             alt="iPhone Back"
//             draggable={false}
//             style={{
//               position: "absolute",

//               inset: 0,

//               width: "100%",
//               height: "100%",

//               /*
//                * CONTAIN IMPORTANT
//                *
//                * Isse back.png crop nahi hogi.
//                */
//               objectFit: "contain",

//               objectPosition: "center",

//               display: "block",

//               borderRadius: "36px",

//               userSelect: "none",

//               WebkitUserDrag: "none",
//             }}
//           />

//           {/* BACK GLASS */}

//           <div
//             style={{
//               position: "absolute",

//               inset: 0,

//               borderRadius: "36px",

//               background:
//                 "linear-gradient(125deg, rgba(255,255,255,0.10), transparent 35%, transparent 75%, rgba(255,255,255,0.03))",

//               pointerEvents: "none",
//             }}
//           />
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // ROTATION
//   // ==========================================

//   useEffect(() => {
//     if (!N) return;

//     const tick = () => {
//       if (autoRef.current) {
//         angleRef.current -= SPEED;
//       }

//       slotsRef.current.forEach((slot, i) => {
//         if (!slot) return;

//         const baseAngle =
//           (360 / N) * i;

//         const angle =
//           angleRef.current + baseAngle;

//         const radians =
//           (angle * Math.PI) / 180;

//         /*
//          * Circular X position
//          */
//         const x =
//           Math.sin(radians) * RADIUS;

//         /*
//          * Circular Z position
//          */
//         const z =
//           Math.cos(radians) * RADIUS;

//         /*
//          * Depth
//          */
//         const depth =
//           (z / RADIUS + 1) / 2;

//         /*
//          * Size
//          */
//         const scale =
//           0.62 + depth * 0.38;

//         /*
//          * Position around circle
//          */
//         slot.style.transform = `
//           translate3d(
//             ${x}px,
//             0px,
//             ${z}px
//           )
//         `;

//         /*
//          * Correct layering
//          */
//         slot.style.zIndex =
//           Math.round(depth * 100);

//         const shell =
//           shellsRef.current[i];

//         if (shell) {
//           /*
//            * THIS IS THE KEY.
//            *
//            * Phone rotates together with
//            * its front and back.
//            *
//            * 0°    = FRONT
//            * 90°   = SIDE
//            * 180°  = BACK
//            * 270°  = SIDE
//            * 360°  = FRONT
//            */

//           shell.style.transform = `
//             rotateY(${-angle}deg)
//             scale(${scale})
//           `;

//           /*
//            * Depth lighting
//            */
//           const brightness =
//             0.72 + depth * 0.28;

//           shell.style.filter =
//             `brightness(${brightness})`;

//           /*
//            * Shadow
//            */
//           shell.style.boxShadow =
//             depth > 0.45
//               ? "0 30px 70px rgba(0,0,0,0.45)"
//               : "0 15px 35px rgba(0,0,0,0.18)";
//         }
//       });

//       rafRef.current =
//         requestAnimationFrame(tick);
//     };

//     rafRef.current =
//       requestAnimationFrame(tick);

//     return () => {
//       if (rafRef.current) {
//         cancelAnimationFrame(
//           rafRef.current
//         );
//       }
//     };
//   }, [N, RADIUS]);

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <section
//       className="
//         relative
//         w-full
//         flex
//         items-center
//         justify-center
//         overflow-hidden
//       "
//       style={{
//         background: "#274255",

//         minHeight: isMobile
//           ? "560px"
//           : "700px",

//         paddingTop: isMobile
//           ? "40px"
//           : "80px",

//         paddingBottom: isMobile
//           ? "40px"
//           : "80px",
//       }}
//     >
//       {/* Soft glow */}

//       <div
//         style={{
//           position: "absolute",

//           width: isMobile
//             ? "400px"
//             : "700px",

//           height: isMobile
//             ? "300px"
//             : "500px",

//           borderRadius: "50%",

//           background:
//             "radial-gradient(circle, rgba(51,204,153,0.10), transparent 70%)",

//           filter: "blur(30px)",

//           pointerEvents: "none",
//         }}
//       />

//       {/* ========================================
//           3D AREA
//       ======================================== */}

//       <div
//         className="relative"
//         style={{
//           width: "100%",

//           maxWidth: "1100px",

//           height: isMobile
//             ? "450px"
//             : "600px",

//           perspective: "1400px",

//           perspectiveOrigin:
//             "50% 50%",

//           overflow: "visible",
//         }}
//       >
//         <div
//           className="
//             absolute
//             inset-0
//             flex
//             items-center
//             justify-center
//           "
//           style={{
//             transformStyle:
//               "preserve-3d",

//             overflow: "visible",
//           }}
//         >
//           {FRONT_IMAGES.map(
//             (img, i) => (
//               <div
//                 key={i}
//                 ref={(el) => {
//                   slotsRef.current[i] =
//                     el;
//                 }}
//                 style={{
//                   position: "absolute",

//                   width: isMobile
//                     ? "155px"
//                     : "205px",

//                   height: isMobile
//                     ? "336px"
//                     : "444px",

//                   transformStyle:
//                     "preserve-3d",

//                   transformOrigin:
//                     "center center",

//                   willChange:
//                     "transform",

//                   pointerEvents:
//                     "auto",
//                 }}
//               >
//                 <div
//                   ref={(el) => {
//                     shellsRef.current[i] =
//                       el;
//                   }}
//                   style={{
//                     position: "relative",

//                     width: "100%",
//                     height: "100%",

//                     transformStyle:
//                       "preserve-3d",

//                     transformOrigin:
//                       "center center",

//                     /*
//                      * NEVER HIDDEN HERE
//                      *
//                      * Otherwise back can disappear.
//                      */
//                     backfaceVisibility:
//                       "visible",

//                     background:
//                       "transparent",

//                     borderRadius:
//                       "40px",

//                     willChange:
//                       "transform, filter",

//                     pointerEvents:
//                       "auto",
//                   }}
//                 >
//                   <Phone3D img={img} />
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }