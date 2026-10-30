// import mongoose from "mongoose";

// const { Schema } = mongoose;

// export const RESIDENTIAL_SALE_ENUMS = {
//   buildingTypes: ["Residential"],

//   propertyTypes: [
//     "Apartment",
//     "Villa",
//     "Plot",
//     "Builder Floor",
//     "Penthouse",
//     "Independent House",
//   ],

//   bhkTypes: [
//     "Studio",
//     "1 RK",
//     "1 BHK",
//     "1.5 BHK",
//     "2 BHK",
//     "2.5 BHK",
//     "3 BHK",
//     "3.5 BHK",
//     "4 BHK",
//     "5 BHK",
//     "6 BHK",
//     "6+ BHK",
//   ],

//   areaTypes: [
//     "Built-up Area",
//     "Super Built-up Area",
//     "Carpet Area",
//     "Saleable Area",
//     "Plot Area",
//   ],

//   sizeUnits: ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"],

//   priceUnits: [
//     "Total Price",
//     "Price Per Sq. Ft.",
//   ],

//   priceAdvantages: [
//     "Affordable Price",
//     "Urgent Sale",
//     "Below Market Value",
//     "Negotiable Price",
//     "Best Price in Locality",
//     "Quick Deal Potential",
//     "Distress Sale",
//   ],

//   possessionStatus: [
//     "Ready To Move",
//     "Under Construction",
//   ],

//   furnishing: [
//     "Furnished",
//     "Semi-Furnished",
//     "Unfurnished",
//   ],

//   ageOfProperty: [
//     "Never Occupied",
//     "0-1",
//     "2-4",
//     "5-7",
//     "8-10",
//     "10+",
//   ],

//   transactionType: [
//     "Resale",
//     "New Booking",
//   ],

//   ownershipType: [
//     "Free Hold",
//     "Leasehold",
//     "Power of Attorney",
//   ],

//   furnishingItems: [
//     "Water Purifier",
//     "Fan",
//     "Fridge",
//     "Exhaust Fan",
//     "Dining Table",
//     "Geyser",
//     "Stove",
//     "Light",
//     "Curtains",
//     "Modular Kitchen",
//     "TV",
//     "Chimney",
//     "AC",
//     "Bed",
//     "Wardrobe",
//     "Sofa",
//     "Washing Machine",
//     "Microwave",
//     "Home Automation",
//     "Smart Card Access",
//     "Solar Heater",
//     "Split AC",
//     "VRV AC",
//   ],

//   waterSources: [
//     "Municipal Supply",
//     "Borewell/Underground",
//     "Tanker",
//     "Others",
//   ],

//   locationAdvantages: [
//     "Good School in vicinity",
//     "Nearby Metro Station",
//     "Peaceful Vicinity",
//     "Near City Center",
//     "Safe & Secure Locality",
//     "Near Reputed Hospital",
//     "Close to Shopping Mall/Market",
//     "Highway/Expressway Access",
//     "Near IT Park/Business Hub",
//     "Close to Railway Station",
//   ],

//   facings: [
//     "East",
//     "West",
//     "North",
//     "South",
//     "North East",
//     "North West",
//     "South East",
//     "South West",
//   ],

//   views: [
//     "Beach View",
//     "Garden View",
//     "Golf Course",
//     "Lake View",
//     "Park View",
//     "Road View",
//     "Community View",
//     "Pool View",
//     "Creek View",
//     "Sea View",
//   ],

//   flooring: [
//     "Marble",
//     "Concrete",
//     "Cemented",
//     "Carpeted",
//     "Wooden",
//     "Vitrified Tiles",
//     "Wooden Tiles",
//     "Imported Tiles",
//     "Indian Tiles",
//     "Ceramic",
//     "Hardwood",
//     "Carpet",
//     "Others",
//   ],

//   spaces: [
//     "Prayer Room",
//     "Servant Room",
//     "Study Room",
//     "Extra Room",
//     "Basement",
//     "Store Room",
//     "Private Garden",
//     "Private Pool",
//     "Terrace",
//   ],

//   amenities: [
//     "Gymnasium",
//     "Swimming Pool",
//     "Kids Play Areas",
//     "Jogging/Cycle Track",
//     "Power Backup",
//     "Attached Market",
//     "24 x 7 Security",
//     "Clubhouse",
//     "High Speed Elevators",
//     "Day Care Center",
//     "Party Hall",
//     "EV Charging",
//     "Multi-level Parking",
//     "Multi-purpose Sports Court",
//     "Theatre/Mini Cinema",
//     "Rooftop Deck/Observatory",
//     "Shopping Complex",
//     "Community Shuttle Service",
//     "Central Park",
//   ],

//   highlights: [
//     "Pet Friendly",
//     "Gated Community",
//     "Smart Home",
//     "Premium Location",
//     "Corner Unit",
//     "Vastu Compliant",
//     "Private Garden",
//     "Low Density Project",
//     "Quiet/Low Traffic Area",
//     "Wheelchair Accessible",
//     "Never Occupied",
//   ],

//   imageCategories: [
//     "Bedroom",
//     "Study Room",
//     "Attached Bathroom",
//     "Bathroom",
//     "Floor Plan",
//     "Master Plan",
//     "Exterior View",
//     "Nearby",
//     "Common Area",
//     "Washroom",
//     "Kitchen",
//     "Room",
//     "Map Location",
//     "Gym",
//     "Garden",
//     "Parking",
//     "Terrace",
//     "Swimming Pool",
//     "Living Room",
//     "Dining Area",
//     "Balcony",
//     "Lobby",
//     "Other",
//   ],
// };

// const areaSchema = new Schema(
//   {
//     value: { type: Number, required: true, min: 1 },
//     type: {
//       type: String,
//       required: true,
//       enum: RESIDENTIAL_SALE_ENUMS.areaTypes,
//     },
//     unit: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.sizeUnits,
//       default: "Sq. Ft.",
//     },
//     display: { type: Boolean, default: false },
//   },
//   { _id: false }
// );

// const imageSchema = new Schema(
//   {
//     url: { type: String, required: true, trim: true },
//     publicId: { type: String, default: null },
//     category: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.imageCategories,
//       default: "Other",
//     },
//     isCover: { type: Boolean, default: false },
//     caption: { type: String, maxlength: 150, default: "" },
//   },
//   { _id: true }
// );

// const residentialSalePropertySchema = new Schema(
//   {
//     sourceModel: { type: String, enum: ["ResidentialSaleProperty", "CommercialSaleProperty"], default: "ResidentialSaleProperty", index: true },
//     title: { type: String, trim: true, maxlength: 180, default: "" },
//     category: { type: String, enum: ["Sell"], default: "Sell", index: true },
//     propertyId: {
//       type: String,
//       unique: true,
//       sparse: true,
//       index: true,
//     },

//     listingType: {
//       type: String,
//       enum: ["Sale"],
//       default: "Sale",
//       immutable: true,
//     },

//     buildingType: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.buildingTypes,
//       default: "Residential",
//       required: true,
//       index: true,
//     },

//     propertyType: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.propertyTypes,
//       required: true,
//       index: true,
//     },

//     location: {
//       city: {
//         type: String,
//         required: true,
//         trim: true,
//         index: true,
//       },
//       state: { type: String, trim: true, default: "" },
//       country: { type: String, trim: true, default: "India" },

//       locality: {
//         type: String,
//         required: true,
//         trim: true,
//         index: true,
//       },
//       society: { type: String, trim: true, default: "" },
//       address: { type: String, trim: true, default: "" },
//       pinCode: {
//         type: String,
//         match: [/^[1-9][0-9]{5}$/, "Invalid PIN code"],
//         default: null,
//       },
//       latitude: {
//         type: Number,
//         min: -90,
//         max: 90,
//         default: null,
//       },
//       longitude: {
//         type: Number,
//         min: -180,
//         max: 180,
//         default: null,
//       },
//       isLocationConfirmed: { type: Boolean, default: false },
//     },

//     price: {
//       amount: {
//         type: Number,
//         required: true,
//         min: 1,
//         index: true,
//       },
//       unit: {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.priceUnits,
//         default: "Total Price",
//       },
//       pricePerSqFt: {
//         type: Number,
//         min: 0,
//         default: null,
//       },
//       negotiable: { type: Boolean, default: false },
//     },

//     bhk: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.bhkTypes,
//       required: true,
//       index: true,
//     },

//     areaDetails: {
//       type: [areaSchema],
//       validate: [
//         (v) => v?.length > 0,
//         "At least one area is required",
//       ],
//     },

//     additionalSpaces: [
//       {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.spaces,
//       },
//     ],

//     media: {
//       images: {
//         type: [imageSchema],
//         validate: [
//           function (v) { return this.status === "Draft" || (Array.isArray(v) && v.length > 0); },
//           "At least one image is required for a submitted property",
//         ],
//       },
//       videos: [
//         {
//           url: { type: String, trim: true },
//           publicId: { type: String, default: null },
//           title: { type: String, default: "" },
//         },
//       ],
//     },

//     floorPlan: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
//     reraCertificate: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
//     documents: [{ url: { type: String, required: true }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } }],

//     possessionStatus: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.possessionStatus,
//       required: true,
//       index: true,
//     },

//     furnishing: {
//       status: {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.furnishing,
//         required: true,
//         index: true,
//       },
//       count: {
//         type: Number,
//         min: 0,
//         default: 0,
//       },
//       items: [
//         {
//           name: {
//             type: String,
//             enum: RESIDENTIAL_SALE_ENUMS.furnishingItems,
//           },
//           quantity: {
//             type: Number,
//             min: 1,
//             default: 1,
//           },
//         },
//       ],
//     },

//     ageOfProperty: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.ageOfProperty,
//       default: null,
//       index: true,
//     },

//     transactionType: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.transactionType,
//       required: true,
//     },

//     ownershipType: {
//       type: String,
//       enum: RESIDENTIAL_SALE_ENUMS.ownershipType,
//       required: true,
//     },

//     specifications: {
//       bathrooms: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 20,
//       },

//       coveredParking: {
//         type: Number,
//         min: 0,
//         max: 20,
//         default: 0,
//       },

//       openParking: {
//         type: Number,
//         min: 0,
//         max: 20,
//         default: 0,
//       },

//       powerBackup: {
//         type: Boolean,
//         default: false,
//       },

//       waterSources: [
//         {
//           type: String,
//           enum: RESIDENTIAL_SALE_ENUMS.waterSources,
//         },
//       ],

//       liftAvailable: {
//         type: Boolean,
//         default: false,
//       },

//       locationAdvantages: [
//         {
//           type: String,
//           enum: RESIDENTIAL_SALE_ENUMS.locationAdvantages,
//         },
//       ],

//       balconies: {
//         type: Number,
//         min: 0,
//         max: 20,
//         default: 0,
//       },

//       facing: {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.facings,
//         default: null,
//       },

//       view: {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.views,
//         default: null,
//       },

//       flooring: {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.flooring,
//         default: null,
//       },

//       connectingRoadWidth: {
//         value: {
//           type: Number,
//           min: 0,
//           default: null,
//         },
//         unit: {
//           type: String,
//           enum: ["Feet", "Meter"],
//           default: "Feet",
//         },
//       },

//       totalFloorCount: {
//         type: Number,
//         min: 0,
//         default: null,
//       },

//       propertyFloor: {
//         type: Number,
//         min: -5,
//         default: null,
//       },

//       towerBlock: {
//         type: String,
//         trim: true,
//         default: "",
//       },

//       unitNo: {
//         type: String,
//         trim: true,
//         default: "",
//       },

//       keepUnitNoPrivate: {
//         type: Boolean,
//         default: false,
//       },
//     },

//     priceAdvantages: [
//       {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.priceAdvantages,
//       },
//     ],

//     amenities: [
//       {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.amenities,
//       },
//     ],

//     oneLineDescription: {
//       type: String,
//       trim: true,
//       maxlength: 200,
//       default: "",
//     },

//     propertyHighlights: [
//       {
//         type: String,
//         enum: RESIDENTIAL_SALE_ENUMS.highlights,
//       },
//     ],

//     description: {
//       type: String,
//       trim: true,
//       minlength: 25,
//       maxlength: 4000,
//       default: "",
//     },

//     aiGeneratedDescriptions: [
//       {
//         description: {
//           type: String,
//           trim: true,
//           maxlength: 4000,
//         },
//         isSelected: {
//           type: Boolean,
//           default: false,
//         },
//       },
//     ],

//     createdBy: {
//       id: {
//         type: Schema.Types.ObjectId,
//         default: null,
//       },
//       role: {
//         type: String,
//         enum: ["admin", "seller", "partner"],
//         default: "admin",
//       },
//     },

//     status: {
//       type: String,
//       enum: [
//         "Draft",
//         "Submitted",
//         "Assigned_To_Partner",
//         "Reviewing",
//         "Verified",
//         "Live",
//         "Rejected",
//         "Sold",
//       ],
//       default: "Draft",
//       index: true,
//     },

//     propertyVerificationStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "In_Progress",
//         "Verified",
//         "Rejected",
//       ],
//       default: "Pending",
//       index: true,
//     },

//     verified: {
//       type: Boolean,
//       default: false,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     collection: "newproperties",
//   }
// );

// residentialSalePropertySchema.pre("validate", function () {
//   if (!this.propertyId) {
//     this.propertyId =
//       `DWRS-${Date.now().toString().slice(-8)}${Math.floor(
//         Math.random() * 90 + 10
//       )}`;
//   }

//   const covers =
//     this.media?.images?.filter((image) => image.isCover) || [];

//   if (this.media?.images?.length && covers.length !== 1) {
//     throw new Error("Exactly one cover image is required");
//   }

//   if (
//     this.ageOfProperty === "Never Occupied" &&
//     this.possessionStatus === "Under Construction"
//   ) {
//     // Valid business combination; no error intentionally.
//   }
// });

// residentialSalePropertySchema.index({
//   "location.city": 1,
//   "location.locality": 1,
//   status: 1,
// });

// residentialSalePropertySchema.index({
//   "price.amount": 1,
//   bhk: 1,
//   "furnishing.status": 1,
// });

// residentialSalePropertySchema.index({
//   transactionType: 1,
//   possessionStatus: 1,
//   propertyType: 1,
// });

// const ResidentialSaleProperty =
//   mongoose.models.ResidentialSaleProperty ||
//   mongoose.model(
//     "ResidentialSaleProperty",
//     residentialSalePropertySchema
//   );

// export default ResidentialSaleProperty;
import mongoose from "mongoose";

const { Schema } = mongoose;

export const RESIDENTIAL_SALE_ENUMS = {
  buildingTypes: ["Residential"],

  propertyTypes: [
    "Apartment",
    "Villa",
    "Plot",
    "Builder Floor",
    "Penthouse",
    "Independent House",
  ],

  bhkTypes: [
    "Studio",
    "1 RK",
    "1 BHK",
    "1.5 BHK",
    "2 BHK",
    "2.5 BHK",
    "3 BHK",
    "3.5 BHK",
    "4 BHK",
    "5 BHK",
    "6 BHK",
    "6+ BHK",
  ],

  areaTypes: [
    "Built-up Area",
    "Super Built-up Area",
    "Carpet Area",
    "Saleable Area",
    "Plot Area",
  ],

  sizeUnits: ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"],

  priceUnits: [
    "Total Price",
    "Price Per Sq. Ft.",
  ],

  priceAdvantages: [
    "Affordable Price",
    "Urgent Sale",
    "Below Market Value",
    "Negotiable Price",
    "Best Price in Locality",
    "Quick Deal Potential",
    "Distress Sale",
  ],

  possessionStatus: [
    "Ready To Move",
    "Under Construction",
  ],

  furnishing: [
    "Furnished",
    "Semi-Furnished",
    "Unfurnished",
  ],

  ageOfProperty: [
    "Never Occupied",
    "0-1",
    "2-4",
    "5-7",
    "8-10",
    "10+",
  ],

  transactionType: [
    "Resale",
    "New Booking",
  ],

  ownershipType: [
    "Free Hold",
    "Leasehold",
    "Power of Attorney",
  ],

  furnishingItems: [
    "Water Purifier",
    "Fan",
    "Fridge",
    "Exhaust Fan",
    "Dining Table",
    "Geyser",
    "Stove",
    "Light",
    "Curtains",
    "Modular Kitchen",
    "TV",
    "Chimney",
    "AC",
    "Bed",
    "Wardrobe",
    "Sofa",
    "Washing Machine",
    "Microwave",
    "Home Automation",
    "Smart Card Access",
    "Solar Heater",
    "Split AC",
    "VRV AC",
  ],

  waterSources: [
    "Municipal Supply",
    "Borewell/Underground",
    "Tanker",
    "Others",
  ],

  locationAdvantages: [
    "Good School in vicinity",
    "Nearby Metro Station",
    "Peaceful Vicinity",
    "Near City Center",
    "Safe & Secure Locality",
    "Near Reputed Hospital",
    "Close to Shopping Mall/Market",
    "Highway/Expressway Access",
    "Near IT Park/Business Hub",
    "Close to Railway Station",
  ],

  facings: [
    "East",
    "West",
    "North",
    "South",
    "North East",
    "North West",
    "South East",
    "South West",
  ],

  views: [
    "Beach View",
    "Garden View",
    "Golf Course",
    "Lake View",
    "Park View",
    "Road View",
    "Community View",
    "Pool View",
    "Creek View",
    "Sea View",
  ],

  flooring: [
    "Marble",
    "Concrete",
    "Cemented",
    "Carpeted",
    "Wooden",
    "Vitrified Tiles",
    "Wooden Tiles",
    "Imported Tiles",
    "Indian Tiles",
    "Ceramic",
    "Hardwood",
    "Carpet",
    "Others",
  ],

  spaces: [
    "Prayer Room",
    "Servant Room",
    "Study Room",
    "Extra Room",
    "Basement",
    "Store Room",
    "Private Garden",
    "Private Pool",
    "Terrace",
  ],

  amenities: [
    "Gymnasium",
    "Swimming Pool",
    "Kids Play Areas",
    "Jogging/Cycle Track",
    "Power Backup",
    "Attached Market",
    "24 x 7 Security",
    "Clubhouse",
    "High Speed Elevators",
    "Day Care Center",
    "Party Hall",
    "EV Charging",
    "Multi-level Parking",
    "Multi-purpose Sports Court",
    "Theatre/Mini Cinema",
    "Rooftop Deck/Observatory",
    "Shopping Complex",
    "Community Shuttle Service",
    "Central Park",
  ],

  highlights: [
    "Pet Friendly",
    "Gated Community",
    "Smart Home",
    "Premium Location",
    "Corner Unit",
    "Vastu Compliant",
    "Private Garden",
    "Low Density Project",
    "Quiet/Low Traffic Area",
    "Wheelchair Accessible",
    "Never Occupied",
    "Road Facing",
"High Visibility",
"Ready to Move"
  ],

  imageCategories: [
    "Bedroom",
    "Study Room",
    "Attached Bathroom",
    "Bathroom",
    "Floor Plan",
    "Master Plan",
    "Exterior View",
    "Nearby",
    "Common Area",
    "Washroom",
    "Kitchen",
    "Room",
    "Map Location",
    "Gym",
    "Garden",
    "Parking",
    "Terrace",
    "Swimming Pool",
    "Living Room",
    "Dining Area",
    "Balcony",
    "Lobby",
    "Other",
  ],
};

const areaSchema = new Schema(
  {
    value: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      required: true,
      enum: RESIDENTIAL_SALE_ENUMS.areaTypes,
    },
    unit: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.sizeUnits,
      default: "Sq. Ft.",
    },
    display: { type: Boolean, default: false },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, default: null },
    category: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.imageCategories,
      default: "Other",
    },
    isCover: { type: Boolean, default: false },
    caption: { type: String, maxlength: 150, default: "" },
  },
  { _id: true }
);

const residentialSalePropertySchema = new Schema(
  {
    sourceModel: { type: String, enum: ["ResidentialSaleProperty", "CommercialSaleProperty"], default: "ResidentialSaleProperty", index: true },
    title: { type: String, trim: true, maxlength: 180, default: "" },
    category: { type: String, enum: ["Sell"], default: "Sell", index: true },
    propertyId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    listingType: {
      type: String,
      enum: ["Sell"],
      default: "Sell",
      immutable: true,
    },

    buildingType: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.buildingTypes,
      default: "Residential",
      required: true,
      index: true,
    },

    propertyType: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.propertyTypes,
      required: true,
      index: true,
    },

    location: {
      city: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      state: { type: String, trim: true, default: "" },
      country: { type: String, trim: true, default: "India" },

      locality: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      society: { type: String, trim: true, default: "" },
      address: { type: String, trim: true, default: "" },
      pinCode: {
        type: String,
        match: [/^[1-9][0-9]{5}$/, "Invalid PIN code"],
        default: null,
      },
      latitude: {
        type: Number,
        min: -90,
        max: 90,
        default: null,
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180,
        default: null,
      },
      isLocationConfirmed: { type: Boolean, default: false },
    },

    price: {
      amount: {
        type: Number,
        required: true,
        min: 1,
        index: true,
      },
      unit: {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.priceUnits,
        default: "Total Price",
      },
      pricePerSqFt: {
        type: Number,
        min: 0,
        default: null,
      },
      negotiable: { type: Boolean, default: false },
    },

    bhk: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.bhkTypes,
      required: function () {
        return this.status !== "Draft";
      },
      index: true,
    },

    areaDetails: {
      type: [areaSchema],
      validate: [
        (v) => v?.length > 0,
        "At least one area is required",
      ],
    },

    additionalSpaces: [
      {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.spaces,
      },
    ],

    media: {
      images: {
        type: [imageSchema],
        // Image presence is enforced by the sale controller only when publishing.
        // Drafts may intentionally be saved before Step 3 media upload.
        validate: [
          (v) => Array.isArray(v),
          "Images must be an array",
        ],
      },
      videos: [
        {
          url: { type: String, trim: true },
          publicId: { type: String, default: null },
          title: { type: String, default: "" },
        },
      ],
    },

    floorPlan: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
    reraCertificate: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
    documents: [{ url: { type: String, required: true }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } }],

    availability: {
      availableFrom: {
        type: String,
        enum: ["Immediately", "Later"],
        required: true,
      },
      availableDate: {
        type: Date,
        default: null,
      },
    },

    possessionStatus: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.possessionStatus,
      required: true,
      index: true,
    },

    furnishing: {
      status: {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.furnishing,
        required: true,
        index: true,
      },
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
      items: [
        {
          name: {
            type: String,
            enum: RESIDENTIAL_SALE_ENUMS.furnishingItems,
          },
          quantity: {
            type: Number,
            min: 1,
            default: 1,
          },
        },
      ],
    },

    ageOfProperty: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.ageOfProperty,
      default: null,
      index: true,
    },

    transactionType: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.transactionType,
      required: true,
    },

    ownershipType: {
      type: String,
      enum: RESIDENTIAL_SALE_ENUMS.ownershipType,
      required: true,
    },

    specifications: {
      bathrooms: {
        type: Number,
        required: true,
        min: 0,
        max: 20,
      },

      coveredParking: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
      },

      openParking: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
      },

      powerBackup: {
        type: Boolean,
        default: false,
      },

      waterSources: [
        {
          type: String,
          enum: RESIDENTIAL_SALE_ENUMS.waterSources,
        },
      ],

      liftAvailable: {
        type: Boolean,
        default: false,
      },

      locationAdvantages: [
        {
          type: String,
          enum: RESIDENTIAL_SALE_ENUMS.locationAdvantages,
        },
      ],

      balconies: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
      },

      facing: {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.facings,
        default: null,
      },

      view: {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.views,
        default: null,
      },

      flooring: {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.flooring,
        default: null,
      },

      connectingRoadWidth: {
        value: {
          type: Number,
          min: 0,
          default: null,
        },
        unit: {
          type: String,
          enum: ["Feet", "Meter"],
          default: "Feet",
        },
      },

      totalFloorCount: {
        type: Number,
        min: 0,
        default: null,
      },

      propertyFloor: {
        type: Number,
        min: -5,
        default: null,
      },

      towerBlock: {
        type: String,
        trim: true,
        default: "",
      },

      unitNo: {
        type: String,
        trim: true,
        default: "",
      },

      keepUnitNoPrivate: {
        type: Boolean,
        default: false,
      },
    },

    priceAdvantages: [
      {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.priceAdvantages,
      },
    ],

    amenities: [
      {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.amenities,
      },
    ],

    oneLineDescription: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    propertyHighlights: [
      {
        type: String,
        enum: RESIDENTIAL_SALE_ENUMS.highlights,
      },
    ],

    description: {
      type: String,
      trim: true,
      minlength: 25,
      maxlength: 4000,
      default: "",
    },

    video: {
      type: String,
      default: "",
    },

    videoLink: {
      type: String,
      default: "",
    },

    aiGeneratedDescriptions: [
      {
        description: {
          type: String,
          trim: true,
          maxlength: 4000,
        },
        isSelected: {
          type: Boolean,
          default: false,
        },
      },
    ],

    tags: [{ type: String }],

    createdBy: {
      id: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      role: {
        type: String,
        enum: ["admin", "seller", "partner"],
        default: "admin",
      },
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Submitted",
        "Assigned_To_Partner",
        "Reviewing",
        "Verified",
        "Live",
        "Rejected",
        "Sold",
      ],
      default: "Draft",
      index: true,
    },

    propertyVerificationStatus: {
      type: String,
      enum: [
        "Pending",
        "In_Progress",
        "Verified",
        "Rejected",
      ],
      default: "Pending",
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "newproperties",
  }
);

residentialSalePropertySchema.pre("validate", function () {
  if (!this.propertyId) {
    this.propertyId =
      `DWRS-${Date.now().toString().slice(-8)}${Math.floor(
        Math.random() * 90 + 10
      )}`;
  }

  const covers =
    this.media?.images?.filter((image) => image.isCover) || [];

  if (this.media?.images?.length && covers.length !== 1) {
    throw new Error("Exactly one cover image is required");
  }

  if (
    this.ageOfProperty === "Never Occupied" &&
    this.possessionStatus === "Under Construction"
  ) {
    // Valid business combination; no error intentionally.
  }
});

residentialSalePropertySchema.index({
  "location.city": 1,
  "location.locality": 1,
  status: 1,
});

residentialSalePropertySchema.index({
  "price.amount": 1,
  bhk: 1,
  "furnishing.status": 1,
});

residentialSalePropertySchema.index({
  transactionType: 1,
  possessionStatus: 1,
  propertyType: 1,
});

const ResidentialSaleProperty =
  mongoose.models.ResidentialSaleProperty ||
  mongoose.model(
    "ResidentialSaleProperty",
    residentialSalePropertySchema
  );

export default ResidentialSaleProperty;
