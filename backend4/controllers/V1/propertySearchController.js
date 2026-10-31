import {
  getPropertyCollection,
  normalizeUnifiedProperty,
} from "../../services/unifiedPropertyService.js";
import { haversineKm, isUsableCoordinate, propertyPromotionInfo } from "../../services/V1/discoveryService.js";

const LIVE = [
  { status: "Live" },
  { propertyVerificationStatus: "Verified" },
  { isActive: { $ne: false } },
  { deletedByAccount: { $ne: true } },
];

const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const values = (value) => {
  if (Array.isArray(value)) return value.flatMap(values).filter(Boolean);
  if (value === undefined || value === null || value === "") return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const first = (value) => values(value)[0] || "";

const bool = (value) => {
  const v = String(value ?? "").toLowerCase();
  if (v === "true") return true;
  if (v === "false") return false;
  return null;
};

const number = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const rx = (value, exact = false) => {
  const escaped = escapeRegex(String(value).trim());
  return new RegExp(exact ? `^${escaped}$` : escaped, "i");
};

const addRegexArray = (clauses, fields, selected) => {
  const list = values(selected);
  if (!list.length) return;
  clauses.push({ $or: fields.map((field) => ({ [field]: { $in: list } })) });
};

const addRegexIn = (clauses, fields, selected) => {
  const list = values(selected);
  if (!list.length) return;
  clauses.push({
    $or: fields.flatMap((field) => list.map((item) => ({ [field]: rx(item, true) }))),
  });
};

const addBoolean = (clauses, fields, value) => {
  const parsed = bool(value);
  if (parsed === null) return;
  clauses.push({ $or: fields.map((field) => ({ [field]: parsed })) });
};

const addNumberRange = (clauses, fields, minValue, maxValue) => {
  const min = number(minValue);
  const max = number(maxValue);
  if (min === null && max === null) return;
  const range = {};
  if (min !== null) range.$gte = min;
  if (max !== null) range.$lte = max;
  clauses.push({ $or: fields.map((field) => ({ [field]: range })) });
};

const addArrayContains = (clauses, fields, selected) => {
  const list = values(selected);
  if (!list.length) return;
  clauses.push({
    $or: fields.map((field) => ({ [field]: { $in: list } })),
  });
};

const addAreaFilter = (clauses, minArea, maxArea, areaTypes) => {
  const min = number(minArea);
  const max = number(maxArea);
  const types = values(areaTypes);
  if (min === null && max === null && !types.length) return;

  const areaRange = {};
  if (min !== null) areaRange.$gte = min;
  if (max !== null) areaRange.$lte = max;

  const elem = {};
  if (Object.keys(areaRange).length) elem.value = areaRange;
  if (types.length) elem.type = { $in: types };

  const clausesForArea = [];
  if (Object.keys(elem).length) clausesForArea.push({ areaDetails: { $elemMatch: elem } });
  if (min !== null || max !== null) {
    clausesForArea.push({ propertySize: areaRange });
    clausesForArea.push({ superBuiltupArea: areaRange });
    clausesForArea.push({ carpetArea: areaRange });
  }
  if (clausesForArea.length) clauses.push({ $or: clausesForArea });
};

const addTextSearch = (clauses, search) => {
  if (!String(search || "").trim()) return;
  const term = rx(search.trim());
  clauses.push({
    $or: [
      { title: term },
      { propertyId: term },
      { city: term },
      { state: term },
      { locality: term },
      { address: term },
      { pinCode: term },
      { projectName: term },
      { developerName: term },
      { propertyType: term },
      { buildingType: term },
      { category: term },
      { "location.city": term },
      { "location.state": term },
      { "location.locality": term },
      { "location.society": term },
      { "location.address": term },
    ],
  });
};

const addListingContext = (clauses, query) => {
  const category = first(query.category).toLowerCase();
  const transaction = first(query.transactionType).toLowerCase();
  const listingType = first(query.listingType).toLowerCase();
  const building = first(query.buildingType).toLowerCase();

  if (building && building !== "all") clauses.push({ buildingType: rx(building, true) });

  if (category && category !== "all") {
    if (["residential", "commercial"].includes(category)) {
      clauses.push({ buildingType: rx(category, true) });
    } else if (["sell", "sale", "buy", "resale"].includes(category)) {
      clauses.push({ $or: [{ transactionType: { $in: ["Sale", "Resale"] } }, { listingType: { $in: ["Sell", "Sale"] } }] });
    } else if (["rent", "rental", "lease"].includes(category)) {
      clauses.push({ $or: [{ transactionType: "Rent" }, { listingType: { $in: ["Rent", "Lease"] } }] });
    } else {
      clauses.push({ category: rx(category, true) });
    }
  }

  if (transaction && transaction !== "all") {
    if (["rent", "lease"].includes(transaction)) {
      clauses.push({ $or: [{ transactionType: "Rent" }, { listingType: { $in: ["Rent", "Lease"] } }] });
    } else if (["sale", "sell", "buy", "resale", "new booking"].includes(transaction)) {
      clauses.push({ $or: [{ transactionType: { $in: ["Sale", "Resale", "New Booking", "New Project"] } }, { listingType: { $in: ["Sell", "Sale"] } }] });
    } else {
      clauses.push({ transactionType: rx(transaction, true) });
    }
  }

  if (listingType && listingType !== "all") {
    clauses.push({ listingType: rx(listingType, true) });
  }
};

const buildClauses = (query = {}, { includeCity = true } = {}) => {
  const clauses = [...LIVE];
  const city = first(query.city);
  const state = first(query.state);
  const locality = first(query.locality);
  const society = first(query.society);
  const pinCode = first(query.pinCode || query.pincode);

  if (includeCity && city && city.toLowerCase() !== "all") clauses.push({ $or: [{ city: rx(city, true) }, { "location.city": rx(city, true) }] });
  if (state) clauses.push({ $or: [{ state: rx(state, true) }, { "location.state": rx(state, true) }] });
  if (locality) clauses.push({ $or: [{ locality: rx(locality, true) }, { "location.locality": rx(locality, true) }] });
  if (society) clauses.push({ $or: [{ "location.society": rx(society, true) }, { projectName: rx(society, true) }] });
  if (pinCode) clauses.push({ $or: [{ pinCode: rx(pinCode, true) }, { "location.pinCode": rx(pinCode, true) }] });

  addListingContext(clauses, query);

  const propertyTypes = query.propertyType;
  addRegexIn(clauses, ["propertyType"], propertyTypes);

  addTextSearch(clauses, query.search || query.q || query.textSearch);

  const isRent = [first(query.transactionType), first(query.category), first(query.listingType)]
    .some((v) => ["rent", "rental", "lease"].includes(String(v).toLowerCase()));

  const minPrice = query.minPrice ?? query.priceMin;
  const maxPrice = query.maxPrice ?? query.priceMax;
  const minRent = query.minRent ?? query.rentMin;
  const maxRent = query.maxRent ?? query.rentMax;
  if (isRent || minRent !== undefined || maxRent !== undefined) {
    addNumberRange(clauses, ["rent.amount", "price"], minRent ?? minPrice, maxRent ?? maxPrice);
  } else {
    addNumberRange(clauses, ["price", "price.amount"], minPrice, maxPrice);
  }

  addAreaFilter(clauses, query.minArea ?? query.areaMin, query.maxArea ?? query.areaMax, query.areaType ?? query.areaTypes);

  addRegexIn(clauses, ["bedrooms", "bhk"], query.bedrooms ?? query.bhk);
  addNumberRange(clauses, ["bathrooms", "specifications.bathrooms"], query.bathroomsMin, query.bathroomsMax);
  if (query.bathrooms && query.bathroomsMin === undefined && query.bathroomsMax === undefined) {
    const bathroomValues = values(query.bathrooms);
    const hasFivePlus = bathroomValues.includes("5+");
    const exactBathrooms = bathroomValues.filter((item) => item !== "5+").map(Number).filter(Number.isFinite);
    const bathroomClauses = [];
    if (exactBathrooms.length) bathroomClauses.push({ $or: [{ bathrooms: { $in: exactBathrooms } }, { "specifications.bathrooms": { $in: exactBathrooms } }] });
    if (hasFivePlus) bathroomClauses.push({ $or: [{ bathrooms: { $gte: 5 } }, { "specifications.bathrooms": { $gte: 5 } }] });
    if (bathroomClauses.length === 1) clauses.push(bathroomClauses[0]);
    else if (bathroomClauses.length > 1) clauses.push({ $or: bathroomClauses });
  }

  addRegexIn(clauses, ["furnishing", "furnishing.status"], query.furnishing);
  addRegexIn(clauses, ["price.unit", "priceUnit"], query.priceUnit);
  addRegexIn(clauses, ["rent.frequency"], query.rentFrequency);
  addRegexIn(clauses, ["sizeUnit", "areaDetails.unit"], query.sizeUnit);
  addArrayContains(clauses, ["furnishing.items.name", "furnishingDetails.items.name"], query.furnishingItems);
  addArrayContains(clauses, ["additionalSpaces"], query.additionalSpaces);
  addArrayContains(clauses, ["suitedFor"], query.suitedFor);
  addArrayContains(clauses, ["specifications.waterSources"], query.waterSources);
  addArrayContains(clauses, ["specifications.locationAdvantages"], query.locationAdvantages);
  addArrayContains(clauses, ["amenities"], query.amenities);
  addArrayContains(clauses, ["propertyHighlights", "highlights"], query.highlights);
  addRegexIn(clauses, ["specifications.facing", "facing"], query.facing ?? query.facings);
  addRegexIn(clauses, ["specifications.view", "view"], query.view ?? query.views);
  addRegexIn(clauses, ["specifications.flooring", "flooring"], query.flooring);
  addRegexIn(clauses, ["possessionStatus"], query.possessionStatus);
  addRegexIn(clauses, ["ageOfProperty"], query.ageOfProperty);
  addRegexIn(clauses, ["ownershipType"], query.ownershipType);
  addRegexIn(clauses, ["transactionType"], query.transactionModel ?? query.transaction);
  addRegexIn(clauses, ["availability.availableFrom"], query.availability);
  addRegexIn(clauses, ["workspaceFacilities.officeSpaceType"], query.officeSpaceTypes ?? query.officeSpaceType);
  addRegexIn(clauses, ["workspaceFacilities.pantry"], query.pantryTypes ?? query.pantryType);
  addRegexIn(clauses, ["securityDeposit.type"], query.securityDepositTypes ?? query.securityDepositType);

  addNumberRange(clauses, ["maintenance.amount", "maintenance"], query.maintenanceMin, query.maintenanceMax);
  addNumberRange(clauses, ["securityDeposit.amount"], query.securityDepositMin, query.securityDepositMax);
  addNumberRange(clauses, ["specifications.coveredParking", "workspaceFacilities.coveredParking"], query.coveredParkingMin, query.coveredParkingMax);
  addNumberRange(clauses, ["specifications.openParking", "workspaceFacilities.openParking"], query.openParkingMin, query.openParkingMax);
  addNumberRange(clauses, ["specifications.balconies", "balconies"], query.balconiesMin, query.balconiesMax);

  addBoolean(clauses, ["negotiable", "price.negotiable", "rent.negotiable"], query.negotiable);
  addBoolean(clauses, ["companyLease"], query.companyLease);
  addBoolean(clauses, ["workspaceFacilities.personalWashroom"], query.personalWashroom);
  addBoolean(clauses, ["specifications.powerBackup", "workspaceFacilities.powerBackup"], query.powerBackup);
  addBoolean(clauses, ["specifications.liftAvailable", "workspaceFacilities.liftAvailable"], query.liftAvailable);

  return clauses;
};

const normalizeForResponse = (doc, location) => {
  const property = normalizeUnifiedProperty(doc);
  const latitude = Number(property.latitude);
  const longitude = Number(property.longitude);
  const hasCoords = isUsableCoordinate(latitude) && isUsableCoordinate(longitude);
  const distanceKm = hasCoords && location?.latitude != null && location?.longitude != null
    ? haversineKm(location.latitude, location.longitude, latitude, longitude)
    : null;
  const sameCity = Boolean(location?.city && property.city && String(location.city).toLowerCase() === String(property.city).toLowerCase());
  const promotion = propertyPromotionInfo(property);
  return { ...property, distanceKm: distanceKm == null ? null : Number(distanceKm.toFixed(2)), sameCity, promotion };
};

const sortProperties = (properties, location, sort) => {
  const requested = String(sort || "relevance").toLowerCase();
  return [...properties].sort((a, b) => {
    if (requested === "price_low") return (a.price || 0) - (b.price || 0);
    if (requested === "price_high") return (b.price || 0) - (a.price || 0);
    if (requested === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (a.sameCity !== b.sameCity) return a.sameCity ? -1 : 1;
    if ((b.promotion?.score || 0) !== (a.promotion?.score || 0)) return (b.promotion?.score || 0) - (a.promotion?.score || 0);
    if (a.distanceKm != null && b.distanceKm != null && a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
};

export const searchProperties = async (req, res) => {
  try {
    const query = req.query || {};
    const limit = Math.min(Math.max(Number(query.limit) || 24, 1), 100);
    const page = Math.max(Number(query.page) || 1, 1);
    const mode = String(query.mode || "search").toLowerCase();
    const lat = number(query.lat);
    const lng = number(query.lng);
    const locationCity = first(query.locationCity || query.detectedCity);
    const location = { latitude: lat, longitude: lng, city: locationCity };

    const explicitCity = first(query.city);

    // IMPORTANT: when the user has granted location permission and no explicit city
    // filter was selected, locationCity is the city constraint — not merely a
    // relevance/sorting hint. Previously it was only used for `popular` mode, so a
    // `search` request with locationCity=Bhopal could return unrelated cities such
    // as Jaipur.
    const effectiveCity = explicitCity || locationCity;
    const effectiveQuery = effectiveCity
      ? { ...query, city: effectiveCity }
      : query;

    const baseClauses = buildClauses(effectiveQuery, { includeCity: Boolean(effectiveCity) });
    const collection = getPropertyCollection();

    // Location filtering must never silently fall back to another city. If Bhopal
    // has no matching inventory, return an empty result rather than Jaipur/another city.
    const docs = await collection.find({ $and: baseClauses }).toArray();
    const fallbackUsed = false;

    const ranked = sortProperties(docs.map((doc) => normalizeForResponse(doc, location)), location, query.sort);
    const total = ranked.length;
    const skip = (page - 1) * limit;
    const properties = ranked.slice(skip, skip + limit);

    return res.json({
      success: true,
      message: "Property search completed successfully",
      mode,
      location: {
        city: locationCity || "",
        latitude: lat,
        longitude: lng,
        permission: lat != null && lng != null ? "granted" : "unavailable-or-denied",
      },
      fallbackUsed,
      count: properties.length,
      total,
      pagination: { currentPage: page, totalPages: Math.ceil(total / limit), limit },
      appliedFilters: query,
      properties,
    });
  } catch (error) {
    console.error("PROPERTY SEARCH ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to search properties", error: error.message });
  }
};
