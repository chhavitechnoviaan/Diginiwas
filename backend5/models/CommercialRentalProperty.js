import mongoose from "mongoose";

const { Schema } = mongoose;

export const COMMERCIAL_RENTAL_ENUMS = {
  listingType: ["Rent"],
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
  furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
  furnishingItems: [
    "Water Purifier", "Fan", "Fridge", "Exhaust Fan", "Dining Table", "Geyser",
    "Stove", "Light", "Curtains", "Modular Kitchen", "TV", "Chimney", "AC",
    "Bed", "Wardrobe", "Sofa", "Washing Machine", "Microwave", "Home Automation",
    "Smart Card Access", "Solar Heater", "Split AC", "VRV AC",
  ],
  officeSpaceTypes: ["Semi-Fitted", "Fitted Space", "Shell and Core"],
  pantryTypes: ["Wet", "Dry", "None"],
  waterSources: ["Municipal Supply", "Borewell/Underground", "Tanker", "Others"],
  locationAdvantages: [
    "Good School in vicinity", "Nearby Metro Station", "Peaceful Vicinity", "Near City Center",
    "Safe & Secure Locality", "Near Reputed Hospital", "Close to Shopping Mall/Market",
    "Highway/Expressway Access", "Near IT Park/Business Hub", "Close to Railway Station",
  ],
  facings: ["East", "West", "North", "South", "North East", "North West", "South East", "South West"],
  views: ["Beach View", "Garden View", "Golf Course", "Lake View", "Park View", "Road View", "Community View", "Pool View", "Creek View", "Sea View"],
  flooring: ["Marble", "Concrete", "Cemented", "Carpeted", "Wooden", "Vitrified Tiles", "Wooden Tiles", "Imported Tiles", "Indian Tiles", "Ceramic", "Hardwood", "Carpet", "Others"],
  amenities: [
    "Gymnasium", "Swimming Pool", "Kids Play Areas", "Jogging/Cycle Track", "Power Backup",
    "Attached Market", "24 x 7 Security", "Clubhouse", "High Speed Elevators", "Day Care Center",
    "Party Hall", "EV Charging", "Multi-level Parking", "Multi-purpose Sports Court",
    "Theatre/Mini Cinema", "Rooftop Deck/Observatory", "Shopping Complex", "Community Shuttle Service", "Central Park",
  ],
  highlights: [
    "Premium Location", "Corner Unit", "Vastu Compliant", "Low Density Project",
    "Quiet/Low Traffic Area", "Wheelchair Accessible", "Never Occupied", "Road Facing",
    "High Visibility", "Ready to Move",
  ],
  securityDepositTypes: ["Zero Deposit", "One Month", "Two Months", "Other"],
  statuses: ["Draft", "Submitted", "Assigned_To_Partner", "Reviewing", "Verified", "Live", "Rejected", "Rented"],
  verificationStatuses: ["Pending", "In_Progress", "Verified", "Rejected"],
};

const areaSchema = new Schema({
  value: { type: Number, required: true, min: 1 },
  type: { type: String, required: true, enum: COMMERCIAL_RENTAL_ENUMS.areaTypes },
  unit: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.sizeUnits, default: "Sq. Ft." },
  display: { type: Boolean, default: true },
}, { _id: false });

const imageSchema = new Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, default: null },
  category: { type: String, default: "Other" },
  isCover: { type: Boolean, default: false },
  caption: { type: String, maxlength: 150, default: "" },
}, { _id: true });

const videoSchema = new Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, default: null },
  title: { type: String, default: "Property tour" },
}, { _id: true });

const fileMetaSchema = new Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, default: null },
  name: { type: String, default: "" },
  mimeType: { type: String, default: "" },
}, { _id: false });

const commercialRentalPropertySchema = new Schema({
  sourceModel: { type: String, enum: ["RentalProperty", "CommercialRentalProperty"], default: "CommercialRentalProperty", index: true },
  propertyId: { type: String, unique: true, sparse: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  listingType: { type: String, enum: ["Rent"], default: "Rent", immutable: true },
  transactionType: { type: String, enum: ["Rent"], default: "Rent", immutable: true },
  category: { type: String, enum: ["Commercial"], default: "Commercial", index: true },
  buildingType: { type: String, enum: ["Commercial"], default: "Commercial", immutable: true, index: true },
  propertyType: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.propertyTypes, required: true, index: true },

  location: {
    city: { type: String, required: true, trim: true, index: true },
    state: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "India" },
    locality: { type: String, required: true, trim: true, index: true },
    society: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    pinCode: { type: String, match: [/^[1-9][0-9]{5}$/, "Invalid PIN code"], default: null },
    latitude: { type: Number, min: -90, max: 90, default: null },
    longitude: { type: Number, min: -180, max: 180, default: null },
    isLocationConfirmed: { type: Boolean, default: false },
  },

  rent: {
    amount: { type: Number, required: true, min: 1, index: true },
    frequency: { type: String, enum: ["Per Month", "Per Year"], default: "Per Month" },
    negotiable: { type: Boolean, default: false },
  },
  maintenance: {
    amount: { type: Number, min: 0, default: 0 },
    frequency: { type: String, enum: ["Per SqFt", "Monthly", "Quarterly", "Yearly", "One Time"], default: "Monthly" },
    includedInRent: { type: Boolean, default: false },
  },
  securityDeposit: {
    type: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.securityDepositTypes, default: "One Month" },
    amount: { type: Number, min: 0, default: 0 },
    description: { type: String, maxlength: 200, default: "" },
  },

  areaDetails: { type: [areaSchema], validate: [(v) => Array.isArray(v) && v.length > 0, "At least one area is required"] },

  media: {
    images: { type: [imageSchema], default: [] },
    videos: { type: [videoSchema], default: [] },
  },

  floorPlan: { type: fileMetaSchema, default: null },
  reraCertificate: { type: fileMetaSchema, default: null },
  documents: { type: [fileMetaSchema], default: [] },

  companyLease: { type: Boolean, default: false },

  furnishing: {
    status: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.furnishing, required: true, index: true },
    items: [{
      name: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.furnishingItems },
      quantity: { type: Number, min: 1, default: 1 },
    }],
  },

  workspaceFacilities: {
    officeSpaceType: [{ type: String, enum: COMMERCIAL_RENTAL_ENUMS.officeSpaceTypes }],
    pantry: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.pantryTypes, default: "None" },
    personalWashroom: { type: Boolean, default: false },
    coveredParking: { type: Number, min: 0, max: 20, default: 0 },
    openParking: { type: Number, min: 0, max: 20, default: 0 },
    powerBackup: { type: Boolean, default: false },
    liftAvailable: { type: Boolean, default: false },
  },

  specifications: {
    bathrooms: { type: Number, min: 0, max: 20, default: 0 },
    coveredParking: { type: Number, min: 0, max: 20, default: 0 },
    openParking: { type: Number, min: 0, max: 20, default: 0 },
    powerBackup: { type: Boolean, default: false },
    waterSources: [{ type: String, enum: COMMERCIAL_RENTAL_ENUMS.waterSources }],
    liftAvailable: { type: Boolean, default: false },
    locationAdvantages: [{ type: String, enum: COMMERCIAL_RENTAL_ENUMS.locationAdvantages }],
    balconies: { type: Number, min: 0, max: 20, default: 0 },
    facing: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.facings, default: null },
    view: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.views, default: null },
    flooring: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.flooring, default: null },
    connectingRoadWidth: {
      value: { type: Number, min: 0, default: null },
      unit: { type: String, enum: ["Feet", "Meter"], default: "Feet" },
    },
    totalFloorCount: { type: Number, min: 0, default: null },
    propertyFloor: { type: Number, min: -5, default: null },
    towerBlock: { type: String, trim: true, default: "" },
    unitNo: { type: String, trim: true, default: "" },
    keepUnitNoPrivate: { type: Boolean, default: false },
  },

  amenities: [{ type: String, enum: COMMERCIAL_RENTAL_ENUMS.amenities }],
  propertyHighlights: [{ type: String, enum: COMMERCIAL_RENTAL_ENUMS.highlights }],
  oneLineDescription: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true, minlength: 25, maxlength: 4000 },
  aiGeneratedDescriptions: [{ description: String, isSelected: { type: Boolean, default: false } }],

  createdBy: {
    id: { type: Schema.Types.ObjectId, default: null },
    role: { type: String, enum: ["admin", "seller", "partner"], default: "admin" },
  },
  status: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.statuses, default: "Draft", index: true },
  propertyVerificationStatus: { type: String, enum: COMMERCIAL_RENTAL_ENUMS.verificationStatuses, default: "Pending", index: true },
  verified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false, collection: "newproperties" });

commercialRentalPropertySchema.pre("validate", function () {
  if (!this.propertyId) {
    this.propertyId = `DWCR-${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;
  }
  if (this.status === "Submitted" && (!this.media?.images?.length || !this.media.images.some((x) => x.isCover))) {
  throw new(new Error("At least one image and one cover image are required before submission."));
  }
  if (this.media?.images?.length) {
    const covers = this.media.images.filter((x) => x.isCover);
    if (covers.length > 1) return next(new Error("Only one cover image is allowed."));
  }
  // next();
});

commercialRentalPropertySchema.index({ "location.city": 1, "location.locality": 1, status: 1 });
commercialRentalPropertySchema.index({ "rent.amount": 1, propertyType: 1, "furnishing.status": 1 });
commercialRentalPropertySchema.index({ buildingType: 1, propertyType: 1, status: 1 });
commercialRentalPropertySchema.index({ "location.latitude": 1, "location.longitude": 1 });

const CommercialRentalProperty = mongoose.models.CommercialRentalProperty || mongoose.model("CommercialRentalProperty", commercialRentalPropertySchema);
export default CommercialRentalProperty;
