
// import big from "../../assets/images/big.webp"
// import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
// import { useEffect, useState } from "react";
// import { useMap } from "react-leaflet";
// import axios from "axios";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { MapPin, BedDouble, Bath } from "lucide-react";
// import PopupImage from "../../components/common/PopupImage"

// const DARK_TILE_URL = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${import.meta.env.VITE_STADIA_API_KEY}`;
// const DARK_TILE_ATTRIBUTION = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>';

// const normalizeText = (value) => {
//   return String(value ?? "")
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, " ");
// };
// const formatIndianCurrency = (amount) => {
//   const num = Number(amount);
//   if (!num || isNaN(num)) return "0";

//   if (num >= 10000000) {
//     // 1 Crore = 10,000,000
//     const cr = num / 10000000;
//     return `${Number.isInteger(cr) ? cr : cr.toFixed(2)} Crore`;
//   } else if (num >= 100000) {
//     // 1 Lakh = 100,000
//     const lakh = num / 100000;
//     return `${Number.isInteger(lakh) ? lakh : lakh.toFixed(2)} Lakh`;
//   } else if (num >= 1000) {
//     // Optional: formats thousands as 'k' or keep standard comma
//     const k = num / 1000;
//     return `${Number.isInteger(k) ? k : k.toFixed(1)} Thousand`;
//   }

//   return num.toLocaleString("en-IN");
// };
// function CustomZoomControl() {
//   const map = useMap();
//   return (
//     <div
//       style={{
//         position: "absolute",
//         bottom: "20px",
//         right: "16px",
//         zIndex: 1000,
//         display: "flex",
//         flexDirection: "column",
//         gap: "4px",
//       }}
//     >
//       {["+", "−"].map((sym, i) => (
//         <button
//           key={sym}
//           onClick={() => (i === 0 ? map.zoomIn() : map.zoomOut())}
//           style={{
//             width: "32px",
//             height: "32px",
//             borderRadius: "8px",
//             background: "rgba(255,255,255,0.12)",
//             backdropFilter: "blur(12px)",
//             WebkitBackdropFilter: "blur(12px)",
//             border: "1px solid rgba(255,255,255,0.20)",
//             color: "#fff",
//             fontSize: "18px",
//             fontWeight: 300,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             lineHeight: 1,
//           }}
//         >
//           {sym}
//         </button>
//       ))}
//     </div>
//   );
// }

// function FixMapSize() {
//   const map = useMap();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!map?._container) return;

//       try {
//         map.invalidateSize();
//       } catch (error) {
//         console.log("Map resize error:", error);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [map]);

//   return null;
// }

// function FlyToCity({ selectedCity, hasSearch, notFound }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const latitude = Number(selectedCity?.position?.[0]);
//     const longitude = Number(selectedCity?.position?.[1]);

//     const hasValidCoordinates =
//       Number.isFinite(latitude) &&
//       Number.isFinite(longitude);

//     const timer = setTimeout(() => {
//       if (!map?._container) return;

//       try {
//         map.invalidateSize();

//         if (hasSearch && hasValidCoordinates) {
//           map.flyTo([latitude, longitude], 12, {
//             duration: 1.2,
//           });
//         } else if (hasSearch && notFound) {
//           map.flyTo([23.5, 82], 4, {
//             duration: 1.2,
//           });
//         }
//       } catch (error) {
//         console.log("Map fly error:", error);
//       }
//     }, 250);

//     return () => clearTimeout(timer);
//   }, [map, selectedCity, hasSearch, notFound]);

//   return null;
// }
// export default function IndiaMap({ searchCity }) {
//   const [properties, setProperties] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);
//   const [searchParams] = useSearchParams();
//   const searchedCity = searchParams.get("city") || "";
//     const [showPopUpImg, setShowPopUpImg] = useState(false)
//     const [image, setImage] = useState(null)

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`);
//       setProperties(res.data.properties);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
// useEffect(() => {
//   const grouped = {};

//   properties.forEach((item) => {
//     const cityName = String(item?.city ?? "").trim();
//     const latitude = Number(item?.latitude);
//     const longitude = Number(item?.longitude);

//     if (
//       !cityName ||
//       !Number.isFinite(latitude) ||
//       !Number.isFinite(longitude)
//     ) {
//       return;
//     }

//     const cityKey = cityName.toLowerCase();

//     if (!grouped[cityKey]) {
//       grouped[cityKey] = {
//         name: cityName,
//         position: [latitude, longitude],
//         properties: [],
//       };
//     }

//     grouped[cityKey].properties.push(item);
//   });

//   setCities(Object.values(grouped));
// }, [properties]);

//   // useEffect(() => {
//   //   if (!cities.length) return;
//   //   const term = (searchCity || searchedCity || "").trim();
//   //   if (!term) {
//   //     setSelectedCity(cities[0]);
//   //     setNotFound(false);
//   //     return;
//   //   }
//   //   const found = cities.find((c) => c.name.toLowerCase() === term.toLowerCase());
//   //   if (found) {
//   //     setSelectedCity(found);
//   //     setNotFound(false);
//   //   } else {
//   //     setSelectedCity(null);
//   //     setNotFound(true);
//   //   }
//   // }, [searchCity, searchedCity, cities]);
// useEffect(() => {
//   if (!cities.length) return;

//   const term = normalizeText(searchCity || searchedCity || "");

//   if (!term) {
//     setSelectedCity(cities[0] || null);
//     setNotFound(false);
//     return;
//   }

//   let found = cities.find(
//     (city) => normalizeText(city?.name) === term
//   );

//   if (!found) {
//     found = cities.find((city) => {
//       const cityName = normalizeText(city?.name);

//       return (
//         cityName.includes(term) ||
//         term.includes(cityName)
//       );
//     });
//   }

//   if (found) {
//     setSelectedCity(found);
//     setNotFound(false);
//   } else {
//     setSelectedCity(null);
//     setNotFound(true);
//   }
// }, [searchCity, searchedCity, cities]);

//   if (loading) {
//     return <div className="text-center py-20">Loading....</div>;
//   }

//   const marketData = { activeListings: "1,284" };
// const hasSearchTerm = Boolean(
//   String(searchCity || searchedCity || "").trim()
// );
  
//   return (
//     <div className="w-full min-h-[600px] flex flex-col lg:flex-row gap-5 px-4 lg:px-6 py-8 bg-[#274255]">
//       {/* MAP SECTION */}
//       <div className="relative w-full lg:w-[58%] h-[350px] sm:h-[450px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
//         <MapContainer
//           center={[26.9124, 75.7873]}
//           zoom={8}
//           minZoom={3}
//           maxZoom={18}
//           zoomControl={false}
//           scrollWheelZoom={true}
//           style={{ width: "100%", height: "100%" }}
//         >
//           <FixMapSize />
//           <CustomZoomControl />
//           <FlyToCity selectedCity={selectedCity} hasSearch={hasSearchTerm} notFound={notFound} />
//           <TileLayer url={DARK_TILE_URL} attribution={DARK_TILE_ATTRIBUTION} noWrap={true} />

//           {/* {cities.map((location) => ( */}
//           {cities
//   .filter(
//     (location) =>
//       Number.isFinite(Number(location?.position?.[0])) &&
//       Number.isFinite(Number(location?.position?.[1]))
//   )
//   .map((location) => (
//             <CircleMarker
//               className="border-2 border-white"
//               key={location.name}
//               center={location.position}
//               radius={selectedCity?.name === location.name ? 9 : 5}
//               eventHandlers={{
//                 click: () => {
//                   setSelectedCity(location);
//                   setNotFound(false);
//                 },
//               }}
//               pathOptions={{
//                 color: "#ffffff",
//                 weight: 1.5,
//                 fillColor: "#10b981",
//                 fillOpacity: 1,
//               }}
//             >
//               <Popup>
//                 <div className="text-xs">
//                   <h3 className="font-bold">{location.name}</h3>
//                   <p>{location.properties.length} Properties</p>
//                 </div>
//               </Popup>
//             </CircleMarker>
//           ))}
//         </MapContainer>

//         <div
//           className="absolute top-3 right-3 z-[1000] rounded-xl p-3 w-[170px]"
//           style={{
//             background: "rgba(255,255,255,0.10)",
//             backdropFilter: "blur(14px)",
//             WebkitBackdropFilter: "blur(14px)",
//             border: "1px solid rgba(255,255,255,0.15)",
//           }}
//         >
//           <p className="text-white text-xs font-bold mb-1 tracking-tight">Market Pulse</p>
//           <div className="flex items-center justify-between">
//             <span className="text-[9px] font-semibold tracking-wider text-white/60 uppercase">Active Listings</span>
//             <span className="text-sm font-bold text-white">{marketData.activeListings}</span>
//           </div>
//         </div>
//       </div>

//       {/* PROPERTY LIST SECTION */}
//       <div className="w-full lg:w-[42%] sm:h-full py-3 sm:py-0 overflow-y-auto pr-1 custom-scrollbar">
//         {notFound || !selectedCity || selectedCity.properties.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-white/40 text-center p-6">
//             <h2 className="text-lg font-medium">No Property Found</h2>
//             <p className="text-xs mt-0.5">Try searching for another region</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {selectedCity.properties.map((p, i) => (
//               <div
//                 key={i}
//                 className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden border border-gray-100"
//               >
//                 {/* Image Window */}
//                 <div className="relative h-36 overflow-hidden bg-gray-50 shrink-0">
//                   <img
//                     src={p.images?.length ? p.images[0].url : "/no-image.png"}
//                     alt={p.title}
//                     className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
//                   />
//                   <div className="absolute top-2 left-2 flex gap-1 z-10">
//                     <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#0f2e46] text-white rounded shadow-sm">
//                       {p.transactionType || "Sale"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* 🔧 FIXED & ALIGNED: Content Section */}
//                 <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  
//                   {/* Row 1: Price and Title (VILLA) Aligned side-by-side */}
//                   <div className="flex items-center justify-between gap-2">
//                     <div className="flex items-baseline">
//                       {/* <span className="text-xl font-black text-[#0f2e46] tracking-tight">
//                         ₹{Number(p.price).toLocaleString('en-IN')}
//                       </span> */}
//                       <span className="text-xl font-black text-[#0f2e46] tracking-tight">
//   ₹{formatIndianCurrency(p.price)}
// </span>
//                       {p.transactionType?.toLowerCase() === "rent" && (
//                         <span className="text-[10px] font-semibold text-gray-400 ml-0.5">/mo</span>
//                       )}
//                     </div>
//                     <h3 className="text-sm font-bold text-emerald-700 tracking-wide uppercase truncate max-w-[100px]">
//                       {p.title || "Villa"}
//                     </h3>
//                   </div>

//                   {/* Row 2: Location and Specs Inline with Equal Distribution */}
//                   <div className="flex items-center justify-between text-gray-500 text-[11px] font-medium border-t border-gray-50 pt-2">
//                     {/* Location Info */}
//                     <div className="flex items-center gap-1 truncate max-w-[50%]">
//                       <MapPin size={12} className="text-emerald-500 shrink-0" />
//                       <span className="truncate">{p.locality || p.city || "Dausa"}</span>
//                     </div>

//                     {/* Specs info */}
//                     <div className="flex items-center gap-2 shrink-0">
//                       <div className="flex items-center gap-0.5">
//                         <BedDouble size={12} className="text-gray-400" />
//                         <span className="font-bold text-gray-700">{p.bedrooms || "2"} BHK</span>
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <Bath size={12} className="text-gray-400" />
//                         <span className="font-bold text-gray-700">{p.bathrooms || "2"} Bth</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* View Details Button */}
//                   <button onClick={() => { 
//                     // setShowPopUpImg(true)
//                                         // setImage(big);
//                                       window.open("https://wa.me/917988537478", "_blank");}
//                      } className="w-full bg-[#0F2E46] hover:bg-emerald-600 transition-colors duration-200 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm mt-1">
//                     View Details
//                   </button>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//        {showPopUpImg && (
//                      <PopupImage  image={image} setShowPopUpImg={setShowPopUpImg} />
//                   )}
//     </div>
//   );
// }


import big from "../../assets/images/big.webp";
import propertyFallback from "../../assets/images/property.png";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, BedDouble, Bath } from "lucide-react";
import PopupImage from "../../components/common/PopupImage";
import { createPropertyLogoIcon, propertyMarkerPopup } from "../../components/common/propertyMapMarker";

const DARK_TILE_URL = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${
  import.meta.env.VITE_STADIA_API_KEY
}`;
const DARK_TILE_ATTRIBUTION =
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>';

const normalizeText = (value) => {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

const getPropertyImages = (property = {}) => {
  const direct = Array.isArray(property?.images) ? property.images : [];
  const media = Array.isArray(property?.media?.images) ? property.media.images : [];
  const gallery = Array.isArray(property?.gallery) ? property.gallery : [];

  const combined = [...direct, ...media, ...gallery]
    .map((item) => (typeof item === "string" ? { url: item } : item))
    .filter((item) => item?.url);

  // Cover image must always be first, followed by the remaining images.
  const cover = combined.find((item) => item?.isCover);
  const rest = combined.filter((item) => item !== cover);
  return cover ? [cover, ...rest] : rest;
};

const formatIndianCurrency = (amount) => {
  const num = Number(amount);
  if (!num || isNaN(num)) return "0";

  if (num >= 10000000) {
    const cr = num / 10000000;
    return `${Number.isInteger(cr) ? cr : cr.toFixed(2)} Crore`;
  } else if (num >= 100000) {
    const lakh = num / 100000;
    return `${Number.isInteger(lakh) ? lakh : lakh.toFixed(2)} Lakh`;
  } else if (num >= 1000) {
    const k = num / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)} Thousand`;
  }

  return num.toLocaleString("en-IN");
};

function CustomZoomControl() {
  const map = useMap();
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {["+", "−"].map((sym, i) => (
        <button
          key={sym}
          onClick={() => (i === 0 ? map.zoomIn() : map.zoomOut())}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.20)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          {sym}
        </button>
      ))}
    </div>
  );
}

function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!map?._container) return;

      try {
        map.invalidateSize();
      } catch (error) {
        console.log("Map resize error:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

function FlyToCity({ selectedCity, hasSearch, notFound }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const latitude = Number(selectedCity?.position?.[0]);
    const longitude = Number(selectedCity?.position?.[1]);

    const hasValidCoordinates =
      Number.isFinite(latitude) && Number.isFinite(longitude);

    const timer = setTimeout(() => {
      if (!map?._container) return;

      try {
        map.invalidateSize();

        if (hasSearch && hasValidCoordinates) {
          map.flyTo([latitude, longitude], 12, {
            duration: 1.2,
          });
        } else if (hasSearch && notFound) {
          map.flyTo([23.5, 82], 4, {
            duration: 1.2,
          });
        }
      } catch (error) {
        console.log("Map fly error:", error);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [map, selectedCity, hasSearch, notFound]);

  return null;
}

export default function IndiaMap({ searchCity, searchFilters }) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searchParams] = useSearchParams();
  const searchedCity = searchParams.get("city") || "";
  const [showPopUpImg, setShowPopUpImg] = useState(false);
  const [image, setImage] = useState(null);

  // Active Search Values Extract Karein
  const activeCity = searchFilters?.city || searchCity || searchedCity || "";
  const activePropertyType = searchFilters?.propertyType || "";
  const activeTransactionType = searchFilters?.transactionType || "";
  const activeBuildingType = searchFilters?.buildingType || "";

  useEffect(() => {
    fetchProperties();
  }, [activeCity, activePropertyType, activeTransactionType, activeBuildingType]);

 const fetchProperties = async () => {
  try {
    setLoading(true);
    const params = new URLSearchParams();

    // Query parameters set karein
    if (activeCity) params.append("city", activeCity);
    if (activePropertyType) params.append("propertyType", activePropertyType);
    if (activeTransactionType) params.append("transactionType", activeTransactionType);
    if (activeBuildingType) params.append("buildingType", activeBuildingType);

    // 🎯 Filter API route `/api/properties/filter` bind kar diya gaya hai
    const url = `${import.meta.env.VITE_API_URL}/api/properties/filter?${params.toString()}`;
    
    const res = await axios.get(url);
    
    setProperties(res.data.properties || []);
  } catch (err) {
    console.log("Error fetching filtered properties:", err);
  } finally {
    setLoading(false);
  }
};

  // Grouping and Filtering Properties for Map Display
  useEffect(() => {
    const grouped = {};

    properties.forEach((item) => {
      const cityName = String(item?.city ?? "").trim();
      const latitude = Number(item?.latitude);
      const longitude = Number(item?.longitude);

      if (
        !cityName ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        return;
      }

      // Local Filter for Building Type
      if (activeBuildingType) {
        const itemBuilding = normalizeText(item?.buildingType);
        if (itemBuilding !== normalizeText(activeBuildingType)) return;
      }

      // Local Filter for Property Type (Category OR PropertyType match)
      if (activePropertyType) {
        const itemType = normalizeText(item?.propertyType);
        const itemCategory = normalizeText(item?.category);
        const filterType = normalizeText(activePropertyType);

        const typeAliases = {
          plot: ["plot", "plot/land", "land", "industrial plot"],
          house: ["house", "independent house", "residential"],
          flat: ["flat", "apartment", "builder floor"],
          apartment: ["apartment", "flat"],
          villa: ["villa"],
          commercial: ["commercial"],
        };
        const aliases = typeAliases[filterType] || [filterType];
        const matchesType = aliases.some((alias) =>
          itemType === alias || itemType.includes(alias) || itemCategory === alias || itemCategory.includes(alias)
        );

        if (!matchesType) return;
      }

      // Local Filter for Buy/Rent.
      // UI sends Buy as category=Sell, while property documents may store
      // category="Sell" and transactionType="Sale" or "Resale".
      if (activeTransactionType && activeTransactionType !== "search") {
        const itemCategory = normalizeText(item?.category);
        const itemTrans = normalizeText(item?.transactionType);
        const requested = normalizeText(activeTransactionType);

        if (requested === "sell" || requested === "buy" || requested === "sale" || requested === "resale") {
          const matchesBuy =
            itemCategory === "sell" ||
            itemTrans === "sale" ||
            itemTrans === "resale";
          if (!matchesBuy) return;
        } else if (requested === "rent" || requested === "lease") {
          const matchesRent = itemCategory === "rent" || itemTrans === "rent" || itemTrans === "lease";
          if (!matchesRent) return;
        }
      }

      const cityKey = cityName.toLowerCase();

      if (!grouped[cityKey]) {
        grouped[cityKey] = {
          name: cityName,
          position: [latitude, longitude],
          properties: [],
        };
      }

      grouped[cityKey].properties.push(item);
    });

    const citiesList = Object.values(grouped);
    setCities(citiesList);
  }, [properties, activePropertyType, activeTransactionType, activeBuildingType]);

  // City selection logic based on search inputs
  useEffect(() => {
    if (!cities.length) {
      setSelectedCity(null);
      setNotFound(Boolean(activeCity));
      return;
    }

    const term = normalizeText(activeCity);

    if (!term) {
      setSelectedCity(cities[0] || null);
      setNotFound(false);
      return;
    }

    let found = cities.find((city) => normalizeText(city?.name) === term);

    if (!found) {
      found = cities.find((city) => {
        const cityName = normalizeText(city?.name);
        return cityName.includes(term) || term.includes(cityName);
      });
    }

    if (found) {
      setSelectedCity(found);
      setNotFound(false);
    } else {
      setSelectedCity(null);
      setNotFound(true);
    }
  }, [activeCity, cities]);

  if (loading) {
    return <div className="text-center py-20 text-white font-medium">Loading properties...</div>;
  }

  const marketData = { activeListings: properties.length || "0" };
  const hasSearchTerm = Boolean(activeCity.trim() || activePropertyType.trim());

  return (
    <div className="w-full min-h-[600px] flex flex-col lg:flex-row gap-5 px-4 lg:px-6 py-8 bg-[#274255]">
      {/* MAP SECTION */}
      <div className="relative w-full lg:w-[58%] h-[350px] sm:h-[450px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <MapContainer
          center={[26.9124, 75.7873]}
          zoom={8}
          minZoom={3}
          maxZoom={18}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <FixMapSize />
          <CustomZoomControl />
          <FlyToCity
            selectedCity={selectedCity}
            hasSearch={hasSearchTerm}
            notFound={notFound}
          />
          <TileLayer
            url={DARK_TILE_URL}
            attribution={DARK_TILE_ATTRIBUTION}
            noWrap={true}
          />

          {cities
            .filter(
              (location) =>
                Number.isFinite(Number(location?.position?.[0])) &&
                Number.isFinite(Number(location?.position?.[1]))
            )
            .map((location) => (
              <Marker
                key={location.name}
                position={location.position}
                icon={createPropertyLogoIcon(selectedCity?.name === location.name ? 52 : 46)}
                eventHandlers={{
                  click: () => {
                    setSelectedCity(location);
                    setNotFound(false);
                  },
                }}
              >
                <Popup>
                  <div dangerouslySetInnerHTML={{ __html: propertyMarkerPopup(location.name, location.properties.length) }} />
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        <div
          className="absolute top-3 right-3 z-[1000] rounded-xl p-3 w-[170px]"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <p className="text-white text-xs font-bold mb-1 tracking-tight">
            Market Pulse
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-wider text-white/60 uppercase">
              Active Listings
            </span>
            <span className="text-sm font-bold text-white">
              {marketData.activeListings}
            </span>
          </div>
        </div>
      </div>

      {/* PROPERTY LIST SECTION */}
      <div className="w-full lg:w-[42%] sm:h-full py-3 sm:py-0 overflow-y-auto pr-1 custom-scrollbar">
        {notFound || !selectedCity || selectedCity.properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/40 text-center p-6">
            <h2 className="text-lg font-medium">No Properties Found</h2>
            <p className="text-xs mt-0.5">
              Try searching for another region or changing property type filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedCity.properties.map((p, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden border border-gray-100"
              >
                {/* Image Window */}
                <div className="relative h-36 overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={getPropertyImages(p)[0]?.url || propertyFallback}
                    alt={p.title || "Property"}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = propertyFallback;
                    }}
                  />
                  <div className="absolute top-2 left-2 flex gap-1 z-10">
                    <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#0f2e46] text-white rounded shadow-sm">
                      {p.transactionType || "Sale"}
                    </span>
                    {(p.propertyType || p.category) && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-emerald-600 text-white rounded shadow-sm">
                        {p.propertyType || p.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  {/* Row 1: Price and Title */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline">
                      <span className="text-xl font-black text-[#0f2e46] tracking-tight">
                        ₹{formatIndianCurrency(
                          String(p?.category || p?.transactionType || "").toLowerCase() === "rent"
                            ? (p?.rent?.amount ?? p?.rentAmount ?? p?.price ?? 0)
                            : (p?.price?.amount ?? p?.price ?? p?.priceAmount ?? 0)
                        )}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-emerald-700 tracking-wide uppercase truncate max-w-[100px]">
                      {p.title || p.category || "Property"}
                    </h3>
                  </div>

                  {/* Row 2: Location and Specs */}
                  <div className="flex items-center justify-between text-gray-500 text-[11px] font-medium border-t border-gray-50 pt-2">
                    <div className="flex items-center gap-1 truncate max-w-[50%]">
                      <MapPin size={12} className="text-emerald-500 shrink-0" />
                      <span className="truncate">
                        {p.locality || p.city || "Location"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-0.5">
                        <BedDouble size={12} className="text-gray-400" />
                        <span className="font-bold text-gray-700">
                          {p.bedrooms || "2"} BHK
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Bath size={12} className="text-gray-400" />
                        <span className="font-bold text-gray-700">
                          {p.bathrooms || "2"} Bth
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const id = p?.propertyId || p?._id;
                      if (id) navigate(`/property/${id}`, { state: { property: p } });
                    }}
                    className="w-full bg-[#0F2E46] hover:bg-emerald-600 transition-colors duration-200 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm mt-1"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPopUpImg && (
        <PopupImage image={image} setShowPopUpImg={setShowPopUpImg} />
      )}
    </div>
  );
}