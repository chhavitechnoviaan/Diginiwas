import { useEffect, useMemo, useState } from "react";
import { MdOutlineHomeWork, MdSave, MdCheckCircle } from "react-icons/md";
import axiosInstance from "../../../../Services/axios";

const inputClass = "mt-2 w-full rounded-xl border border-[#DCE5E9] bg-white px-3 py-2.5 text-sm text-[#173247] outline-none focus:border-[#35A98C] focus:ring-2 focus:ring-[#35A98C]/10";
const areaClass = `${inputClass} min-h-[110px] resize-y leading-6`;
const linesToArray = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const arrayToLines = (value) => Array.isArray(value) ? value.join("\n") : "";
const faqToLines = (value) => Array.isArray(value) ? value.map((item) => `${item.question || ""} | ${item.answer || ""}`).join("\n") : "";
const linesToFaq = (value) => value.split("\n").map((line) => { const [question, ...answer] = line.split("|"); return { question: (question || "").trim(), answer: answer.join("|").trim() }; }).filter((item) => item.question && item.answer);
const sectionsToLines = (value) => Array.isArray(value) ? value.map((item) => [item.icon, item.number, item.title, item.content, item.subcontent, item.image].map((v) => v || "").join(" | ")).join("\n") : "";
const linesToSections = (value) => value.split("\n").map((line) => { const [icon, number, title, content, subcontent, image] = line.split("|").map((v) => v.trim()); return { icon: icon || "check-circle", number: number || "", title: title || "", content: content || "", subcontent: subcontent || "", image: image || "" }; }).filter((item) => item.title || item.content || item.image);

const fallbackServices = [
  { title: "Home Loan Assistance", slug: "home-loan-assistance", shortDescription: "Find the right home loan with guidance through the financing journey.", description: "Buying a home is a major milestone. DigiNiwas helps you understand your options, prepare documentation and connect with suitable lending partners. Our team can guide you through the application journey so you can make informed decisions with confidence.", features: ["Understand loan eligibility and documentation", "Connect with lending partners", "Get guidance through the application process"], process: ["Share your basic requirements", "Review suitable loan options", "Proceed with the lender of your choice"], benefits: ["Clear next steps", "Guidance through paperwork", "Support built around your needs"], icon: "wallet", ctaText: "Enquire About Home Loans", ctaLink: "/niwas-ai" },
  { title: "Property Photography & Videography", slug: "property-photography-videography", shortDescription: "Showcase your property with professional-quality photos and video tours.", description: "Help buyers and tenants understand your property before they visit. Photography and videography highlight the layout, natural light, amenities and details that make a listing stand out.", features: ["Property photos and visual highlights", "Video walkthroughs and reels", "Visual assets for online listings"], process: ["Tell us about your property", "Plan the shoot and key highlights", "Receive visuals ready to share"], benefits: ["More compelling listings", "A clearer view of the property", "Consistent presentation"], icon: "camera", ctaText: "Request a Shoot", ctaLink: "/contact" },
  { title: "Digital Property Promotion", slug: "digital-property-promotion", shortDescription: "Give your property listing more visibility with digital promotion.", description: "Present your property to a wider online audience through thoughtful digital promotion. We help you prepare a stronger listing and explore suitable promotional opportunities to attract relevant enquiries.", features: ["Listing presentation guidance", "Digital and social promotion options", "Visibility-focused campaign planning"], process: ["Share listing details", "Choose a promotion plan", "Track enquiries and optimise"], benefits: ["Stronger online presence", "Better listing presentation", "Promotion aligned to your goals"], icon: "megaphone", ctaText: "Explore Promotion", ctaLink: "/contact" },
  { title: "Property Management", slug: "property-management", shortDescription: "Organise rental coordination and property-related tasks in one place.", description: "Property management support is designed to make ownership easier, from coordinating tenant-related tasks to keeping property information organised. Availability may vary by location.", features: ["Rental coordination support", "Maintenance request coordination", "Organised property information"], process: ["Discuss your property needs", "Agree on the support required", "Coordinate the next steps"], benefits: ["Less day-to-day friction", "Organised follow-up", "Structured rental journey"], icon: "building", ctaText: "Discuss Your Property", ctaLink: "/contact" },
  { title: "Retired Government Officers Network", slug: "retired-government-officers-network", shortDescription: "Build a meaningful second career as a local property partner.", description: "DigiNiwas welcomes experienced people who understand their local communities and want to help people navigate property journeys through local knowledge and relevant connections.", features: ["Local property assistance", "Partner onboarding guidance", "Community-focused opportunities"], process: ["Register your interest", "Connect with our team", "Complete onboarding steps"], benefits: ["Purposeful engagement", "Use your local knowledge", "Grow your network"], icon: "users", ctaText: "Become a Partner", ctaLink: "/agent-corner" },
  { title: "Documentation & Verification Support", slug: "documentation-verification-support", shortDescription: "Get help understanding property paperwork and verification steps.", description: "Property transactions involve documents and checks. DigiNiwas helps you understand common documentation requirements and organise next steps. This informational support does not replace independent legal advice or official verification.", features: ["Documentation checklist guidance", "Help organising property records", "Direction to verification steps"], process: ["Tell us about the transaction", "Review the relevant checklist", "Follow up on outstanding documents"], benefits: ["Organised paperwork", "Awareness of next steps", "Less avoidable confusion"], icon: "file", ctaText: "Get Documentation Help", ctaLink: "/contact" },
];

export default function ServicesPageCMS() {
  const [page, setPage] = useState({ eyebrow: "EVERYTHING YOU NEED", heading: "Everything You Need.", subheading: "All Under One Roof.", description: "Trusted support for every step of your property journey.", services: fallbackServices });
  const [selectedSlug, setSelectedSlug] = useState("home-loan-assistance");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    let alive = true;
    axiosInstance.get("/cms/services/admin")
      .then(({ data }) => {
        const loaded = data?.data || data;
        if (alive && Array.isArray(loaded?.services) && loaded.services.length) {
          setPage({ ...page, ...loaded, services: loaded.services });
          setSelectedSlug(loaded.services[0].slug);
        }
      })
      .catch(() => { if (alive) setMessage("Using default service content. Save to initialize/update CMS content."); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // Load once when the CMS section opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedIndex = useMemo(() => page.services.findIndex((item) => item.slug === selectedSlug), [page.services, selectedSlug]);
  const selected = selectedIndex >= 0 ? page.services[selectedIndex] : page.services[0];

  const updatePageField = (field, value) => setPage((current) => ({ ...current, [field]: value }));
  const updateServiceField = (field, value) => {
    setPage((current) => ({ ...current, services: current.services.map((item, index) => index === selectedIndex ? { ...item, [field]: value } : item) }));
  };


  const uploadImage = async (file, onUploaded) => {
    if (!file) return;
    setUploadingImage(true); setMessage("");
    try {
      const form = new FormData(); form.append("image", file);
      const { data } = await axiosInstance.post("/cms/services/upload-image", form, { headers: { "Content-Type": "multipart/form-data" } });
      if (!data?.url) throw new Error("Upload completed without an image URL.");
      onUploaded(data.url); setMessage("Image uploaded successfully. Save Services Content to publish it."); return data.url;
    } catch (error) { setMessage(error?.response?.data?.message || error.message || "Image upload failed."); }
    finally { setUploadingImage(false); }
  };

  const save = async () => {
    setSaving(true); setMessage("");
    try {
      await axiosInstance.put("/cms/services/admin", page);
      setMessage("Services page content saved successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Could not save. Check that the backend is running and the admin API URL is correct.");
    } finally { setSaving(false); }
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#DCE5E9] bg-white">
      <div className="flex items-start gap-4 border-b border-[#E7EDF0] p-5 sm:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#15966F]"><MdOutlineHomeWork size={25} /></div>
        <div><h2 className="text-lg font-extrabold text-[#173247]">Services Page CMS</h2><p className="mt-1 text-sm leading-6 text-[#74868F]">Manage each service detail page, hero/gallery images, numbered content blocks and optional FAQs. FAQs are shown publicly only when saved here.</p></div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <section className="rounded-2xl border border-[#E0E8EC] bg-[#FCFDFD] p-4 sm:p-5">
          <h3 className="font-bold text-[#173247]">Page headings</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#526B78]">Eyebrow<input className={inputClass} value={page.eyebrow || ""} onChange={(e) => updatePageField("eyebrow", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78]">Heading<input className={inputClass} value={page.heading || ""} onChange={(e) => updatePageField("heading", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78]">Subheading<input className={inputClass} value={page.subheading || ""} onChange={(e) => updatePageField("subheading", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78]">Description<textarea className={areaClass} value={page.description || ""} onChange={(e) => updatePageField("description", e.target.value)} /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E0E8EC] bg-[#FCFDFD] p-4 sm:p-5">
          <label className="block text-sm font-semibold text-[#526B78]">Choose service to edit<select className={inputClass} value={selected?.slug || ""} onChange={(e) => setSelectedSlug(e.target.value)}>{page.services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></label>
          {selected && <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#526B78]">Service title<input className={inputClass} value={selected.title || ""} onChange={(e) => updateServiceField("title", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78]">URL slug (keep stable)<input className={inputClass} value={selected.slug || ""} readOnly /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Short description<textarea className={areaClass} value={selected.shortDescription || ""} onChange={(e) => updateServiceField("shortDescription", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Detail page overview<textarea className={`${areaClass} min-h-[150px]`} value={selected.description || ""} onChange={(e) => updateServiceField("description", e.target.value)} /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Hero image URL<input className={inputClass} value={selected.heroImage || ""} onChange={(e) => updateServiceField("heroImage", e.target.value)} placeholder="https://..." /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Upload hero image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploadingImage} className={inputClass} onChange={(e) => uploadImage(e.target.files?.[0], (url) => updateServiceField("heroImage", url))} /><span className="mt-1 block text-xs font-normal text-[#74868F]">JPG, PNG, WEBP or AVIF; maximum 20 MB. {uploadingImage ? "Uploading…" : ""}</span>{selected.heroImage && <img src={selected.heroImage} alt="Service hero preview" className="mt-3 h-32 w-full rounded-lg object-cover" />}</label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Image gallery URLs (one URL per line)<textarea className={areaClass} value={arrayToLines(selected.imageTags)} onChange={(e) => updateServiceField("imageTags", linesToArray(e.target.value))} placeholder="https://image-1.jpg\nhttps://image-2.jpg" /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Upload gallery images<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploadingImage} className={inputClass} onChange={async (e) => { const files = Array.from(e.target.files || []); const urls = [...(selected.imageTags || [])]; for (const file of files) { const url = await uploadImage(file, () => {}); if (url) urls.push(url); } updateServiceField("imageTags", urls); e.target.value = ""; }} /><span className="mt-1 block text-xs font-normal text-[#74868F]">Uploaded URLs are added to the gallery list above. For detail block images, paste an uploaded image URL into that block’s image URL field.</span></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">Detail content blocks (one block per line: icon | number | title | content | subcontent | image URL)<textarea className={`${areaClass} min-h-[160px]`} value={sectionsToLines(selected.detailSections)} onChange={(e) => updateServiceField("detailSections", linesToSections(e.target.value))} placeholder="check-circle | 01 | Consultation | Main content | Supporting content | https://image.jpg" /></label>
            <label className="text-sm font-semibold text-[#526B78] sm:col-span-2">FAQs (one per line: question | answer). Leave empty to hide the FAQ section.<textarea className={`${areaClass} min-h-[140px]`} value={faqToLines(selected.faqs)} onChange={(e) => updateServiceField("faqs", linesToFaq(e.target.value))} placeholder="What documents do I need? | Our team will guide you through the required documents." /></label>
            <label className="text-sm font-semibold text-[#526B78]">Features (one per line)<textarea className={areaClass} value={arrayToLines(selected.features)} onChange={(e) => updateServiceField("features", linesToArray(e.target.value))} /></label>
            <label className="text-sm font-semibold text-[#526B78]">Process steps (one per line)<textarea className={areaClass} value={arrayToLines(selected.process)} onChange={(e) => updateServiceField("process", linesToArray(e.target.value))} /></label>
            <label className="text-sm font-semibold text-[#526B78]">Benefits (one per line)<textarea className={areaClass} value={arrayToLines(selected.benefits)} onChange={(e) => updateServiceField("benefits", linesToArray(e.target.value))} /></label>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#526B78]">CTA button text<input className={inputClass} value={selected.ctaText || ""} onChange={(e) => updateServiceField("ctaText", e.target.value)} /></label>
              <label className="block text-sm font-semibold text-[#526B78]">CTA destination<input className={inputClass} value={selected.ctaLink || ""} onChange={(e) => updateServiceField("ctaLink", e.target.value)} placeholder="/contact" /></label>
            </div>
          </div>}
        </section>
        {message && <p className="rounded-xl bg-[#EAF9F4] px-4 py-3 text-sm text-[#176A52]">{message}</p>}
        {loading && <p className="text-sm text-[#74868F]">Loading saved CMS content…</p>}
      </div>
      <div className="flex justify-end border-t border-[#E7EDF0] bg-[#FAFCFD] p-5"><button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#087F5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066849] disabled:cursor-not-allowed disabled:opacity-60"><MdSave size={18} />{saving ? "Saving…" : "Save Services Content"}</button></div>
    </div>
  );
}
