import Advertisement from "../../models/Advertisement.js";

const mediaFrom = (file, url, name) => file
  ? { url: file.path || file.secure_url, name: file.originalname || name || "" }
  : (url ? { url, name: name || "" } : null);

const parseBody = (body, files = {}, current = {}) => {
  const getFile = (key) => files?.[key]?.[0];
  const data = {
    title: body.title,
    subtitle: body.subtitle,
    paragraph: body.paragraph,
    service: body.service || null,
    textHtml: body.textHtml || "",
    btnText: body.btnText || "View Details",
    status: body.status || "Active",
  };
  for (const key of ["photo", "video", "icon"]) {
    if (getFile(key)) data[key] = mediaFrom(getFile(key));
    else if (body[`${key}Url`] !== undefined) data[key] = mediaFrom(null, body[`${key}Url`], body[`${key}Name`]);
    else if (current[key] !== undefined) data[key] = current[key];
  }
  return data;
};

export const listAdvertisements = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { status: "Active" };
    const ads = await Advertisement.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, advertisements: ads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch advertisements." });
  }
};

export const getAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found." });
    res.json({ success: true, advertisement: ad });
  } catch {
    res.status(400).json({ success: false, message: "Invalid advertisement ID." });
  }
};

export const createAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.create(parseBody(req.body, req.files));
    res.status(201).json({ success: true, message: "Advertisement published successfully.", advertisement: ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Unable to create advertisement." });
  }
};

export const updateAdvertisement = async (req, res) => {
  try {
    const current = await Advertisement.findById(req.params.id);
    if (!current) return res.status(404).json({ success: false, message: "Advertisement not found." });
    const data = parseBody(req.body, req.files, current);
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    res.json({ success: true, message: "Advertisement updated successfully.", advertisement: ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Unable to update advertisement." });
  }
};

export const deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found." });
    res.json({ success: true, message: "Advertisement deleted successfully." });
  } catch {
    res.status(400).json({ success: false, message: "Unable to delete advertisement." });
  }
};

export const toggleAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found." });
    ad.status = ad.status === "Active" ? "Paused" : "Active";
    await ad.save();
    res.json({ success: true, message: `Advertisement ${ad.status.toLowerCase()}.`, advertisement: ad });
  } catch {
    res.status(400).json({ success: false, message: "Unable to change advertisement status." });
  }
};
