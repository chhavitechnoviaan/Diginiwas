// import mongoose from "mongoose";

// const { Schema } = mongoose;

// export const COMMERCIAL_SALE_ENUMS = {
//   buildingTypes: ["Commercial"],

//   propertyTypes: [
//     "Office Space",
//     "Shop",
//     "Land",
//     "Office Space in IT/SEZ",
//     "Showroom",
//     "Warehouse",
//     "Industrial Plot",
//     "Co-working Space",
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

//   officeSpaceTypes: [
//     "Semi-Fitted",
//     "Fitted Space",
//     "Shell and Core",
//   ],

//   pantryTypes: [
//     "Wet",
//     "Dry",
//     "None",
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
//     "Premium Location",
//     "Corner Unit",
//     "Vastu Compliant",
//     "Low Density Project",
//     "Quiet/Low Traffic Area",
//     "Wheelchair Accessible",
//     "Never Occupied",
//   ],

//   imageCategories: [
//     "Floor Plan",
//     "Master Plan",
//     "Exterior View",
//     "Nearby",
//     "Common Area",
//     "Washroom",
//     "Office",
//     "Room",
//     "Map Location",
//     "Gym",
//     "Garden",
//     "Parking",
//     "Terrace",
//     "Swimming Pool",
//     "Lobby",
//     "Other",
//   ],
// };

// const areaSchema = new Schema(
//   {
//     value: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     type: {
//       type: String,
//       required: true,
//       enum: COMMERCIAL_SALE_ENUMS.areaTypes,
//     },
//     unit: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.sizeUnits,
//       default: "Sq. Ft.",
//     },
//     display: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { _id: false }
// );

// const imageSchema = new Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     publicId: {
//       type: String,
//       default: null,
//     },
//     category: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.imageCategories,
//       default: "Other",
//     },
//     isCover: {
//       type: Boolean,
//       default: false,
//     },
//     caption: {
//       type: String,
//       maxlength: 150,
//       default: "",
//     },
//   },
//   { _id: true }
// );

// const commercialSalePropertySchema = new Schema(
//   {
//     sourceModel: { type: String, enum: ["ResidentialSaleProperty", "CommercialSaleProperty"], default: "CommercialSaleProperty", index: true },
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
//       enum: COMMERCIAL_SALE_ENUMS.buildingTypes,
//       default: "Commercial",
//       required: true,
//       index: true,
//     },

//     propertyType: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.propertyTypes,
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

//       society: {
//         type: String,
//         trim: true,
//         default: "",
//       },

//       address: {
//         type: String,
//         trim: true,
//         default: "",
//       },

//       pinCode: {
//         type: String,
//         match: [
//           /^[1-9][0-9]{5}$/,
//           "Invalid PIN code",
//         ],
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

//       isLocationConfirmed: {
//         type: Boolean,
//         default: false,
//       },
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
//         enum: COMMERCIAL_SALE_ENUMS.priceUnits,
//         default: "Total Price",
//       },

//       pricePerSqFt: {
//         type: Number,
//         min: 0,
//         default: null,
//       },

//       negotiable: {
//         type: Boolean,
//         default: false,
//       },
//     },

//     priceAdvantages: [
//       {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.priceAdvantages,
//       },
//     ],

//     areaDetails: {
//       type: [areaSchema],
//       validate: [
//         (v) => v?.length > 0,
//         "At least one area is required",
//       ],
//     },

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
//           url: {
//             type: String,
//             trim: true,
//           },
//           publicId: {
//             type: String,
//             default: null,
//           },
//           title: {
//             type: String,
//             default: "",
//           },
//         },
//       ],
//     },

//     floorPlan: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
//     reraCertificate: { url: { type: String, default: "" }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } },
//     documents: [{ url: { type: String, required: true }, publicId: { type: String, default: null }, name: { type: String, default: "" }, mimeType: { type: String, default: "" } }],

//     possessionStatus: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.possessionStatus,
//       required: true,
//       index: true,
//     },

//     furnishing: {
//       status: {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.furnishing,
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
//             enum: COMMERCIAL_SALE_ENUMS.furnishingItems,
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
//       enum: COMMERCIAL_SALE_ENUMS.ageOfProperty,
//       default: null,
//       index: true,
//     },

//     transactionType: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.transactionType,
//       required: true,
//     },

//     ownershipType: {
//       type: String,
//       enum: COMMERCIAL_SALE_ENUMS.ownershipType,
//       required: true,
//     },

//     workspaceFacilities: {
//       officeSpaceType: [
//         {
//           type: String,
//           enum: COMMERCIAL_SALE_ENUMS.officeSpaceTypes,
//         },
//       ],

//       pantry: {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.pantryTypes,
//         default: "None",
//       },

//       personalWashroom: {
//         type: Boolean,
//         default: false,
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

//       liftAvailable: {
//         type: Boolean,
//         default: false,
//       },
//     },

//     specifications: {
//       bathrooms: {
//         type: Number,
//         min: 0,
//         max: 20,
//         default: 0,
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

//       liftAvailable: {
//         type: Boolean,
//         default: false,
//       },

//       locationAdvantages: [
//         {
//           type: String,
//           enum: COMMERCIAL_SALE_ENUMS.locationAdvantages,
//         },
//       ],

//       facing: {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.facings,
//         default: null,
//       },

//       view: {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.views,
//         default: null,
//       },

//       flooring: {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.flooring,
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

//     amenities: [
//       {
//         type: String,
//         enum: COMMERCIAL_SALE_ENUMS.amenities,
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
//         enum: COMMERCIAL_SALE_ENUMS.highlights,
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

// commercialSalePropertySchema.pre("validate", function () {
//   if (!this.propertyId) {
//     this.propertyId =
//       `DWCS-${Date.now().toString().slice(-8)}${Math.floor(
//         Math.random() * 90 + 10
//       )}`;
//   }

//   const covers =
//     this.media?.images?.filter((image) => image.isCover) || [];

//   if (this.media?.images?.length && covers.length !== 1) {
//     throw new Error("Exactly one cover image is required");
//   }
// });

// commercialSalePropertySchema.index({
//   "location.city": 1,
//   "location.locality": 1,
//   status: 1,
// });

// commercialSalePropertySchema.index({
//   "price.amount": 1,
//   propertyType: 1,
//   "furnishing.status": 1,
// });

// commercialSalePropertySchema.index({
//   transactionType: 1,
//   possessionStatus: 1,
//   propertyType: 1,
// });

// const CommercialSaleProperty =
//   mongoose.models.CommercialSaleProperty ||
//   mongoose.model(
//     "CommercialSaleProperty",
//     commercialSalePropertySchema
//   );

// export default CommercialSaleProperty;

import mongoose from "mongoose";

const { Schema } = mongoose;

export const COMMERCIAL_SALE_ENUMS = {
  buildingTypes: ["Commercial"],

  propertyTypes: [
    "Office Space",
    "Shop",
    "Land",
    "Office Space in IT/SEZ",
    "Showroom",
    "Warehouse",
    "Industrial Plot",
    "Co-working Space",
  ],

  areaTypes: [
    "Built-up Area",
    "Super Built-up Area",
    "Carpet Area",
    "Saleable Area",
    "Plot Area",
  ],

  sizeUnits: ["Sq. Ft.", "Sq. Meter", "Sq. Yard", "Acre", "Hectare"],

  priceUnits: ["Total Price", "Price Per Sq. Ft."],

  priceAdvantages: [
    "Affordable Price",
    "Urgent Sale",
    "Below Market Value",
    "Negotiable Price",
    "Best Price in Locality",
    "Quick Deal Potential",
    "Distress Sale",
  ],

  possessionStatus: ["Ready To Move", "Under Construction"],

  furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],

  ageOfProperty: ["Never Occupied", "0-1", "2-4", "5-7", "8-10", "10+"],

  transactionType: ["Resale", "New Booking"],

  ownershipType: ["Free Hold", "Leasehold", "Power of Attorney"],

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

  officeSpaceTypes: ["Semi-Fitted", "Fitted Space", "Shell and Core"],

  pantryTypes: ["Wet", "Dry", "None"],

  waterSources: [
    "Municipal Supply",
    "Borewell/Underground",
    "Tanker",
    "Others",
  ],

  securityDepositTypes: ["Zero Deposit", "One Month", "Two Months", "Other"],

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
    "Premium Location",
    "Corner Unit",
    "Vastu Compliant",
    "Low Density Project",
    "Quiet/Low Traffic Area",
    "Wheelchair Accessible",
    "Never Occupied",
  ],

  imageCategories: [
    "Floor Plan",
    "Master Plan",
    "Exterior View",
    "Nearby",
    "Common Area",
    "Washroom",
    "Office",
    "Room",
    "Map Location",
    "Gym",
    "Garden",
    "Parking",
    "Terrace",
    "Swimming Pool",
    "Lobby",
    "Other",
  ],
};

const areaSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      required: true,
      enum: COMMERCIAL_SALE_ENUMS.areaTypes,
    },
    unit: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.sizeUnits,
      default: "Sq. Ft.",
    },
    display: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.imageCategories,
      default: "Other",
    },
    isCover: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      maxlength: 150,
      default: "",
    },
  },
  { _id: true },
);

const commercialSalePropertySchema = new Schema(
  {
    propertyId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    // Common listing fields shared with Commercial Rental
    sourceModel: {
      type: String,
      enum: ["CommercialSaleProperty"],
      default: "CommercialSaleProperty",
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    category: { type: String, enum: ["Sell"], default: "Sell", index: true },

    listingType: {
      type: String,
      enum: ["Sell", "Sale"],
      default: "Sell",
      immutable: true,
    },

    buildingType: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.buildingTypes,
      default: "Commercial",
      required: true,
      index: true,
    },

    propertyType: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.propertyTypes,
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

      state: {
        type: String,
        trim: true,
        default: "",
      },

      country: {
        type: String,
        trim: true,
        default: "India",
      },

      locality: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      society: {
        type: String,
        trim: true,
        default: "",
      },

      address: {
        type: String,
        trim: true,
        default: "",
      },

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

      isLocationConfirmed: {
        type: Boolean,
        default: false,
      },
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
        enum: COMMERCIAL_SALE_ENUMS.priceUnits,
        default: "Total Price",
      },

      pricePerSqFt: {
        type: Number,
        min: 0,
        default: null,
      },

      negotiable: {
        type: Boolean,
        default: false,
      },
    },

    priceAdvantages: [
      {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.priceAdvantages,
      },
    ],

    // Optional rental-compatible fields. They remain optional for Sale listings.
    rent: {
      amount: { type: Number, min: 0, default: 0 },
      frequency: {
        type: String,
        enum: ["Per Month", "Per Year"],
        default: "Per Month",
      },
      negotiable: { type: Boolean, default: false },
    },

    maintenance: {
      amount: { type: Number, min: 0, default: 0 },
      frequency: {
        type: String,
        enum: ["Per SqFt", "Monthly", "Quarterly", "Yearly", "One Time"],
        default: "Monthly",
      },
      includedInRent: { type: Boolean, default: false },
    },

    securityDeposit: {
      type: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.securityDepositTypes,
        default: "Zero Deposit",
      },
      amount: { type: Number, min: 0, default: 0 },
      description: { type: String, maxlength: 200, default: "" },
    },

    companyLease: {
      type: Boolean,
      default: false,
    },

    areaDetails: {
      type: [areaSchema],
      validate: [(v) => v?.length > 0, "At least one area is required"],
    },

    media: {
      images: {
        type: [imageSchema],
        // Image presence is enforced by the sale controller only when publishing.
        // Drafts may intentionally be saved before Step 3 media upload.
        validate: [(v) => Array.isArray(v), "Images must be an array"],
      },

      videos: [
        {
          url: {
            type: String,
            trim: true,
          },
          publicId: {
            type: String,
            default: null,
          },
          title: {
            type: String,
            default: "",
          },
        },
      ],
    },

    possessionStatus: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.possessionStatus,
      required: true,
      index: true,
    },

    furnishing: {
      status: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.furnishing,
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
            enum: COMMERCIAL_SALE_ENUMS.furnishingItems,
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
      enum: COMMERCIAL_SALE_ENUMS.ageOfProperty,
      default: null,
      index: true,
    },

    transactionType: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.transactionType,
      required: true,
    },

    ownershipType: {
      type: String,
      enum: COMMERCIAL_SALE_ENUMS.ownershipType,
      required: true,
    },

    workspaceFacilities: {
      officeSpaceType: [
        {
          type: String,
          enum: COMMERCIAL_SALE_ENUMS.officeSpaceTypes,
        },
      ],

      pantry: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.pantryTypes,
        default: "None",
      },

      personalWashroom: {
        type: Boolean,
        default: false,
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

      liftAvailable: {
        type: Boolean,
        default: false,
      },
    },

    specifications: {
      bathrooms: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
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
          enum: COMMERCIAL_SALE_ENUMS.waterSources,
        },
      ],

      balconies: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
      },

      liftAvailable: {
        type: Boolean,
        default: false,
      },

      locationAdvantages: [
        {
          type: String,
          enum: COMMERCIAL_SALE_ENUMS.locationAdvantages,
        },
      ],

      facing: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.facings,
        default: null,
      },

      view: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.views,
        default: null,
      },

      flooring: {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.flooring,
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

    amenities: [
      {
        type: String,
        enum: COMMERCIAL_SALE_ENUMS.amenities,
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
        enum: COMMERCIAL_SALE_ENUMS.highlights,
      },
    ],

    description: {
      type: String,
      trim: true,
      minlength: 25,
      maxlength: 4000,
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
      enum: ["Pending", "In_Progress", "Verified", "Rejected"],
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
  },
);

commercialSalePropertySchema.pre("validate", function () {
  if (!this.propertyId) {
    this.propertyId = `DWCS-${Date.now().toString().slice(-8)}${Math.floor(
      Math.random() * 90 + 10,
    )}`;
  }

  const covers = this.media?.images?.filter((image) => image.isCover) || [];

  if (this.media?.images?.length && covers.length !== 1) {
    throw new Error("Exactly one cover image is required");
  }
});

commercialSalePropertySchema.index({
  "location.city": 1,
  "location.locality": 1,
  status: 1,
});

commercialSalePropertySchema.index({
  "price.amount": 1,
  propertyType: 1,
  "furnishing.status": 1,
});

commercialSalePropertySchema.index({
  transactionType: 1,
  possessionStatus: 1,
  propertyType: 1,
});

const CommercialSaleProperty =
  mongoose.models.CommercialSaleProperty ||
  mongoose.model("CommercialSaleProperty", commercialSalePropertySchema);

export default CommercialSaleProperty;
