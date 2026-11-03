import RentalProperty, { RENTAL_ENUMS } from "../../models/RentalProperty.js";

const parsePayload = (body = {}) => {
  if (body.data) {
    return typeof body.data === "string" ? JSON.parse(body.data) : body.data;
  }
  return body;
};

const uploadedUrl = (file) => file?.path || file?.secure_url || file?.url || "";

const toFileMeta = (file) => ({
  url: uploadedUrl(file),
  publicId: file?.filename || file?.public_id || null,
  name: file?.originalname || file?.filename || "",
  mimeType: file?.mimetype || "",
});

const normalizeDraft = (payload) => {
  const draft = { ...payload };

  draft.status = "Draft";
  draft.buildingType = draft.buildingType || "Residential";
  draft.propertyType = draft.propertyType || "Apartment";

  draft.location = {
    city: draft.location?.city || "Not specified",
    locality: draft.location?.locality || "Not specified",
    society: draft.location?.society || "",
    address: draft.location?.address || "",
    pinCode: draft.location?.pinCode || null,
    latitude: draft.location?.latitude || null,
    longitude: draft.location?.longitude || null,
    isLocationConfirmed: Boolean(
      draft.location?.latitude && draft.location?.longitude,
    ),
  };

  draft.rent = {
    amount: Number(draft.rent?.amount) > 0 ? Number(draft.rent.amount) : 1,
    frequency: draft.rent?.frequency || "Per Month",
    negotiable: Boolean(draft.rent?.negotiable),
  };

  draft.maintenance = {
    amount: Number(draft.maintenance?.amount || 0),
    frequency: draft.maintenance?.frequency || "Monthly",
    includedInRent: Boolean(draft.maintenance?.includedInRent),
  };

  draft.securityDeposit = {
    type: draft.securityDeposit?.type || "Zero Deposit",
    amount: Number(draft.securityDeposit?.amount || 0),
  };

  draft.bhk = draft.bhk || "Studio";
  draft.areaDetails =
    Array.isArray(draft.areaDetails) && draft.areaDetails.length
      ? draft.areaDetails
      : [{ value: 1, type: "Built-up Area", unit: "Sq. Ft.", display: false }];

  draft.additionalSpaces = Array.isArray(draft.additionalSpaces)
    ? draft.additionalSpaces
    : [];

  draft.availability = {
    availableFrom: draft.availability?.availableFrom || "Immediately",
    availableDate: draft.availability?.availableDate || null,
  };

  draft.suitedFor = Array.isArray(draft.suitedFor) ? draft.suitedFor : [];
  draft.furnishing = {
    status: draft.furnishing?.status || "Unfurnished",
    items: Array.isArray(draft.furnishing?.items)
      ? draft.furnishing.items
      : [],
  };

  draft.specifications = {
    bathrooms: Number(draft.specifications?.bathrooms || 0),
    coveredParking: Number(draft.specifications?.coveredParking || 0),
    openParking: Number(draft.specifications?.openParking || 0),
    powerBackup: Boolean(draft.specifications?.powerBackup),
    waterSources: Array.isArray(draft.specifications?.waterSources)
      ? draft.specifications.waterSources
      : [],
    liftAvailable: Boolean(draft.specifications?.liftAvailable),
    locationAdvantages: Array.isArray(draft.specifications?.locationAdvantages)
      ? draft.specifications.locationAdvantages
      : [],
    balconies: Number(draft.specifications?.balconies || 0),
    facing: draft.specifications?.facing || null,
    view: draft.specifications?.view || null,
    flooring: draft.specifications?.flooring || null,
    connectingRoadWidth: draft.specifications?.connectingRoadWidth || {
      value: null,
      unit: "Feet",
    },
    totalFloorCount: draft.specifications?.totalFloorCount ?? null,
    propertyFloor: draft.specifications?.propertyFloor ?? null,
    towerBlock: draft.specifications?.towerBlock || "",
    unitNo: draft.specifications?.unitNo || "",
    keepUnitNoPrivate: Boolean(draft.specifications?.keepUnitNoPrivate),
  };

  draft.amenities = Array.isArray(draft.amenities) ? draft.amenities : [];
  draft.propertyHighlights = Array.isArray(draft.propertyHighlights)
    ? draft.propertyHighlights
    : [];
  draft.oneLineDescription = draft.oneLineDescription || "Draft property";
  draft.description = draft.description || "Draft property";
  draft.tags = Array.isArray(draft.tags) ? draft.tags : [];

  return draft;
};

export const getRentalFormOptions = async (_req, res) =>
  res.json({ success: true, data: RENTAL_ENUMS });

export const createRentalProperty = async (req, res) => {
  try {
    let payload = parsePayload(req.body);
    payload.sourceModel = "RentalProperty";

    if (payload.status === "Draft") {
      payload = normalizeDraft(payload);
    }

    const imageMeta = Array.isArray(payload.imageMeta) ? payload.imageMeta : [];
    const uploadedImages = (req.files?.images || []).map((file, index) => ({
      url: uploadedUrl(file),
      publicId: file.filename || file.public_id || null,
      category:
        imageMeta[index]?.category ||
        (index === 0 ? "Living Room" : "Other"),
      caption: imageMeta[index]?.caption || "",
      isCover: imageMeta[index]?.isCover ?? index === 0,
    }));

    const suppliedImages = payload.media?.images || [];
    const images = uploadedImages.length ? uploadedImages : suppliedImages;

    const uploadedVideo = req.files?.video?.[0];
    const videos = uploadedVideo
      ? [
          {
            url: uploadedUrl(uploadedVideo),
            publicId: uploadedVideo.filename || uploadedVideo.public_id || null,
            title: "Property tour",
          },
        ]
      : payload.media?.videos || [];

    const floorPlanFile = req.files?.floorPlan?.[0];
    const reraFile = req.files?.reraCertificate?.[0];
    const documentFiles = req.files?.documents || [];

    const property = await RentalProperty.create({
      ...payload,
      media: { ...(payload.media || {}), images, videos },
      video: uploadedVideo
        ? uploadedUrl(uploadedVideo)
        : payload.video || "",
      floorPlan: floorPlanFile
        ? toFileMeta(floorPlanFile)
        : payload.floorPlan || undefined,
      reraCertificate: reraFile
        ? toFileMeta(reraFile)
        : payload.reraCertificate || undefined,
      documents: documentFiles.length
        ? documentFiles.map(toFileMeta)
        : Array.isArray(payload.documents)
          ? payload.documents.slice(0, 3)
          : [],
      createdBy:
        payload.createdBy ||
        (() => {
          const user = req.user || {};
          return {
            id: user._id || user.id || null,
            role: ["admin", "seller", "partner"].includes(user.role)
              ? user.role
              : "admin",
          };
        })(),
    });

    return res.status(201).json({
      success: true,
      message:
        property.status === "Draft"
          ? "Rental property draft saved successfully"
          : "Rental property created successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRentalProperties = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.city)
      query["location.city"] = new RegExp(req.query.city, "i");

    const data = await RentalProperty.find(query).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRentalPropertyById = async (req, res) => {
  const data = await RentalProperty.findById(req.params.id);
  if (!data)
    return res.status(404).json({
      success: false,
      message: "Rental property not found",
    });

  return res.json({ success: true, data });
};

export const updateRentalProperty = async (req, res) => {
  try {
    const property = await RentalProperty.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Rental property not found",
      });
    }

    let payload = parsePayload(req.body);
    payload.sourceModel = "RentalProperty";
    if (payload.status === "Draft") payload = normalizeDraft(payload);
    const imageMeta = Array.isArray(payload.imageMeta) ? payload.imageMeta : [];

    const updates = { ...payload };
    delete updates.imageMeta;
    delete updates.media;

    if (req.files?.images?.length) {
      const newImages = req.files.images.map((file, index) => ({
        url: uploadedUrl(file),
        publicId: file.filename || file.public_id || null,
        category:
          imageMeta[index]?.category ||
          (index === 0 ? "Living Room" : "Other"),
        caption: imageMeta[index]?.caption || "",
        isCover: imageMeta[index]?.isCover ?? false,
      }));
      updates.media = {
        ...(property.media?.toObject?.() || property.media || {}),
        images: [...(property.media?.images || []), ...newImages].slice(0, 25),
      };
    }

    if (req.files?.video?.[0]) {
      updates.video = uploadedUrl(req.files.video[0]);
      updates.media = {
        ...(updates.media || property.media?.toObject?.() || property.media || {}),
        videos: [
          {
            url: uploadedUrl(req.files.video[0]),
            publicId:
              req.files.video[0].filename ||
              req.files.video[0].public_id ||
              null,
            title: "Property tour",
          },
        ],
      };
    }

    if (req.files?.floorPlan?.[0]) {
      updates.floorPlan = toFileMeta(req.files.floorPlan[0]);
    }

    if (req.files?.reraCertificate?.[0]) {
      updates.reraCertificate = toFileMeta(req.files.reraCertificate[0]);
    }

    if (req.files?.documents?.length) {
      updates.documents = [
        ...(property.documents || []),
        ...req.files.documents.map(toFileMeta),
      ].slice(-3);
    }

    const data = await RentalProperty.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    return res.json({
      success: true,
      message: "Rental property updated",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
