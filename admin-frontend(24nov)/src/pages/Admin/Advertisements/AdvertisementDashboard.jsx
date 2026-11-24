import { useEffect, useRef, useState } from "react";
import axios from "../../../Services/axios";
import {
  FiArrowLeft,
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
  FiPlus,
  FiX,
  FiEdit2,
  FiTrash2,
  FiPause,
  FiPlay,
  FiMoreHorizontal,
  FiEye,
  FiCopy,
  FiImage,
  FiVideo,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiUsers,
  FiSend,
  FiAlertTriangle,
  FiUploadCloud,
}from "react-icons/fi";
import {
  MdOutlineCampaign,
  MdOutlineHome,
  MdOutlineAccountBalance,
  MdOutlineShield,
  MdOutlineApartment,
  MdOutlineHomeRepairService,
  MdOutlineVerified,
  MdOutlineLocalOffer,
  MdOutlineSupportAgent,
} from "react-icons/md";

/* ----------------------------- constants ----------------------------- */

const TITLE_MAX = 80;
const PARA_MAX = 200;
const TEXT_MAX = 500;
const VIDEO_MAX_MB = 50;

const SERVICES = [
  { id: "property", label: "Property", sub: "Buy • Rent • Plot", type: "Property", icon: MdOutlineHome },
  { id: "homeloan", label: "Home Loan", sub: "Low Interest Rate", type: "Service", icon: MdOutlineAccountBalance },
  { id: "insurance", label: "Insurance", sub: "Secure Your Future", type: "Service", icon: MdOutlineShield },
  { id: "commercial", label: "Commercial", sub: "For Your Business", type: "Property", icon: MdOutlineApartment },
  { id: "service", label: "Service", sub: "Home Services", type: "Service", icon: MdOutlineHomeRepairService },
];

const BUTTON_COLORS = {
  Teal: "bg-teal-600 hover:bg-teal-700",
  Blue: "bg-blue-600 hover:bg-blue-700",
  Orange: "bg-orange-500 hover:bg-orange-600",
  Red: "bg-red-600 hover:bg-red-700",
  Purple: "bg-purple-600 hover:bg-purple-700",
};

const FEATURES = [
  { label: "Verified Listings", icon: MdOutlineVerified },
  { label: "Trusted Owners", icon: FiUsers },
  { label: "Best Deals", icon: MdOutlineLocalOffer },
  { label: "24/7 Support", icon: MdOutlineSupportAgent },
];

const emptyForm = {
  title: "",
  subtitle: "",
  icon: null,
  paragraph: "",
  service: null,
  photo: null,
  video: null,
  textHtml: "",
  btnText: "View Details",
  btnColor: "Teal",
  status: "Active",
};

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

const getService = (id) => SERVICES.find((s) => s.id === id);
const getType = (ad) => getService(ad.service)?.type || "General";

const htmlToText = (html) => {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
};

const fmtDate = (iso) => {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
};

/* ----------------------------- components ----------------------------- */

function Field({ label, required, error, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-red-500">{error}</span>}
    </label>
  );
}

function SectionCard({ title, hint, children }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="rounded-lg bg-teal-50/70 px-3 py-1.5 text-sm font-semibold text-gray-800">
        {title}
      </h3>
      {hint && <p className="mb-3 mt-2 px-1 text-xs text-gray-500">{hint}</p>}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-gray-400"}`} />
      {status}
    </span>
  );
}

function Modal({ title, onClose, children, width = "max-w-lg" }) {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-2xl bg-white shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-3.5">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <FiX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* rich text editor for step 4 */
function RichTextBox({ value, onChange }) {
  const ref = useRef(null);
  const last = useRef(value);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
      last.current = value;
    }
  }, [value]);

  const exec = (cmd) => {
    document.execCommand(cmd, false, null);
    handleInput();
  };

  const handleInput = () => {
    const el = ref.current;
    if (htmlToText(el.innerHTML).length > TEXT_MAX) {
      el.innerHTML = last.current;
      return;
    }
    last.current = el.innerHTML;
    onChange(el.innerHTML);
  };

  const tools = [
    [FiBold, "bold"],
    [FiItalic, "italic"],
    [FiUnderline, "underline"],
    [FiAlignLeft, "justifyLeft"],
    [FiAlignCenter, "justifyCenter"],
    [FiAlignRight, "justifyRight"],
    [FiList, "insertUnorderedList"],
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
      <div className="flex flex-wrap gap-1 border-b border-gray-100 bg-gray-50 px-2 py-1.5">
        {tools.map(([Icon, cmd]) => (
          <button
            key={cmd}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              exec(cmd);
            }}
            className="flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-white hover:text-teal-700"
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={(e) => {
          e.preventDefault();
          document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
        }}
        className="min-h-[80px] px-3 py-2 text-sm text-gray-800 outline-none [&_ul]:list-disc [&_ul]:pl-5"
      />
      <p className="px-3 pb-1.5 text-right text-[11px] text-gray-400">
        {htmlToText(value).length}/{TEXT_MAX}
      </p>
    </div>
  );
}

const DEFAULT_PHOTO = {
  url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  name: "default-photo",
};
const DEFAULT_VIDEO = {
  url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  name: "default-video",
};

function AdPreview({ data: adData }) {
  // preview me kuch upload nahi hua ho to default photo/video link dikhao
  const data = {
    ...adData,
    photo: adData.photo || DEFAULT_PHOTO,
    video: adData.video || DEFAULT_VIDEO,
  };
  const service = getService(data.service);
  const [first, ...rest] = (data.title || "Good Evening, Rahul").split(",");
  const hasSplit = rest.length > 0;
  const ServiceIcon = service?.icon;
  const btnCls = BUTTON_COLORS[data.btnColor] || BUTTON_COLORS.Teal;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="p-3">
        {/* hero */}
        <div className="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 via-white to-teal-100">
          {data.photo && (
            <img src={data.photo.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          {!data.photo && (
            <div className="absolute inset-0 flex items-center justify-end pr-8 text-teal-200">
              <FiImage size={80} />
            </div>
          )}
          <div className="relative max-w-[60%] p-4">
            <h4 className="text-2xl font-extrabold leading-tight text-gray-900 [text-shadow:0_1px_6px_rgba(255,255,255,0.8)]">
              {hasSplit ? `${first},` : data.title || "Advertisement title"}
              {hasSplit && (
                <span className="block text-teal-700">{rest.join(",").trim()}</span>
              )}
            </h4>
            <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-gray-800 [text-shadow:0_1px_4px_rgba(255,255,255,0.8)]">
              <FiCheckCircle className="mt-0.5 shrink-0 text-teal-700" size={14} />
              {data.subtitle || "Subtitle goes here"}
            </p>
          </div>
          <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-teal-600 text-white shadow-lg">
            {data.icon ? (
              <img src={typeof data.icon === "string" ? data.icon : data.icon.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <MdOutlineShield size={24} />
            )}
          </span>
        </div>

        {/* service card */}
        {service && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-3 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <ServiceIcon size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{service.label}</p>
              <p className="text-[11px] text-gray-500">{service.sub.replaceAll("•", "·")}</p>
            </div>
            <FiChevronRight className="text-gray-500" />
          </div>
        )}

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {data.paragraph || "Your advertisement description will appear here."}
        </p>

        {htmlToText(data.textHtml).trim() && (
          <div
            className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 [&_ul]:list-disc [&_ul]:pl-4"
            dangerouslySetInnerHTML={{ __html: data.textHtml }}
          />
        )}

        <div className="mt-4 grid grid-cols-4 gap-1 border-y border-gray-100 py-3">
          {FEATURES.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center">
              <Icon size={20} className="text-teal-600" />
              <span className="text-[10px] font-medium leading-tight text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        <span
          className={`mt-3 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white ${btnCls}`}
        >
          {data.btnText || "View Details"} <FiChevronRight />
        </span>
      </div>

      {/* media preview */}
      <div className="mx-3 mb-3 rounded-xl border border-gray-100 p-3">
        <p className="mb-2 text-xs font-semibold text-gray-700">Media Preview</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Photo", data.photo, "image"],
            ["Video", data.video, "video"],
          ].map(([label, m, kind]) => (
            <div key={label}>
              <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-300">
                {m && kind === "image" && <img src={m.url} alt="" className="h-full w-full object-cover" />}
                {m && kind === "video" && (
                  <video src={m.url} controls muted className="h-full w-full bg-black object-cover" />
                )}
                {!m && (kind === "image" ? <FiImage size={26} /> : <FiVideo size={26} />)}
              </div>
              <p className="mt-1 text-[11px] text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UploadTile({ kind, media, onFile, onRemove }) {
  const ref = useRef(null);
  const isImage = kind === "image";
  const Icon = isImage ? FiImage : FiVideo;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100"
      >
        <FiUploadCloud size={20} />
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800">
          {isImage ? "Upload Photo" : "Upload Video"}
        </p>
        <p className="text-[11px] leading-snug text-gray-500">
          {isImage
            ? "Recommended size: 1200x800 px (JPG, PNG)"
            : `Recommended format: MP4, MOV (Max ${VIDEO_MAX_MB}MB)`}
        </p>
        {media && <p className="mt-0.5 truncate text-[11px] text-teal-700">{media.name}</p>}
      </div>
      <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-300">
        {media && isImage && <img src={media.url} alt="" className="h-full w-full object-cover" />}
        {media && !isImage && <video src={media.url} className="h-full w-full object-cover" />}
        {!media && <Icon size={22} />}
        {media && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white"
          >
            <FiX size={11} />
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept={isImage ? "image/png,image/jpeg" : "video/mp4,video/quicktime"}
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function AdForm({ form, setForm, errors, setErrors, editing, saving, onSubmit, onCancel }) {
  const iconRef = useRef(null);
  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const readImage = (file, cb) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePhoto = (file) =>
    readImage(file, (url) => set("photo", { url, name: file.name, file }));

  const handleVideo = (file) => {
    if (!file) return;
    if (file.size > VIDEO_MAX_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, video: `Video must be under ${VIDEO_MAX_MB}MB` }));
      return;
    }
    setErrors((e) => ({ ...e, video: undefined }));
    set("video", { url: URL.createObjectURL(file), name: file.name, file });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* 1. Basic information */}
      <SectionCard title="1. Basic Information">
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_150px]">
          <Field label="Title" required error={errors.title}>
            <input
              className={inputCls}
              maxLength={TITLE_MAX}
              placeholder="Good Evening, Rahul"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>
          <Field label="Subtitle" required error={errors.subtitle}>
            <input
              className={inputCls}
              placeholder="Verified homes match your preferences"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </Field>
          <div>
            <span className="mb-1 block text-xs font-semibold text-gray-700">Icon</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-teal-600 text-white">
                {form.icon ? (
                  <img src={form.icon} alt="" className="h-full w-full object-cover" />
                ) : (
                  <MdOutlineHome size={24} />
                )}
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => iconRef.current?.click()}
                  className="rounded-md bg-teal-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-teal-700"
                >
                  Upload
                </button>
                {form.icon && (
                  <button
                    type="button"
                    onClick={() => set("icon", null)}
                    className="ml-1 text-[11px] text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1 text-[10px] text-gray-400">Recommended: 64x64 px (PNG, JPG)</p>
            <input
              ref={iconRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => {
                readImage(e.target.files?.[0], (url) => set("icon", { url, name: e.target.files?.[0]?.name, file: e.target.files?.[0] }));
                e.target.value = "";
              }}
            />
          </div>
        </div>

        <Field label="Paragraph / Description" required error={errors.paragraph} className="mt-4">
          <textarea
            rows={3}
            maxLength={PARA_MAX}
            className={`${inputCls} resize-none`}
            placeholder="Explore verified homes, real stories and the best deals for you and your family."
            value={form.paragraph}
            onChange={(e) => set("paragraph", e.target.value)}
          />
          <span className="block text-right text-[11px] text-gray-400">
            {form.paragraph.length}/{PARA_MAX}
          </span>
        </Field>
      </SectionCard>

      {/* 2. Service card */}
      <SectionCard
        title="2. Service Card (Optional)"
        hint="Select a service card to show with your advertisement"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s) => {
            const selected = form.service === s.id;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => set("service", selected ? null : s.id)}
                className={`relative flex flex-col items-center rounded-xl border px-2 py-4 text-center transition ${
                  selected
                    ? "border-teal-600 bg-teal-50/60 ring-2 ring-teal-200"
                    : "border-gray-200 hover:border-teal-300"
                }`}
              >
                {selected && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-white">
                    <FiCheck size={10} />
                  </span>
                )}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    selected ? "bg-teal-600 text-white" : "bg-teal-50 text-teal-700"
                  }`}
                >
                  <Icon size={20} />
                </span>
                <span className="mt-2 text-xs font-semibold text-gray-800">{s.label}</span>
                <span className="text-[10px] text-gray-400">{s.sub}</span>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* 3. Media upload */}
      <SectionCard
        title="3. Media Upload"
        hint="Add photo and/or video for your advertisement"
      >
        <div className="grid gap-3 lg:grid-cols-2">
          <UploadTile kind="image" media={form.photo} onFile={handlePhoto} onRemove={() => set("photo", null)} />
          <UploadTile kind="video" media={form.video} onFile={handleVideo} onRemove={() => set("video", null)} />
        </div>
        {errors.video && <p className="mt-2 text-[11px] text-red-500">{errors.video}</p>}
      </SectionCard>

      {/* 4. Text box */}
      <SectionCard
        title="4. Text Box (Optional)"
        hint="Add additional text or highlights (e.g. offers, features, benefits)"
      >
        <RichTextBox value={form.textHtml} onChange={(v) => set("textHtml", v)} />
      </SectionCard>

      {/* 5. Add new button */}
      <SectionCard
        title="5. Add New Button"
        hint="Add a call-to-action button (e.g. View Details, Learn More, Enquire Now)"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Button Text" required error={errors.btnText}>
            <input className={inputCls} placeholder="View Details" value={form.btnText}
              onChange={(e) => set("btnText", e.target.value)} />
          </Field>
          <p className="self-center text-xs text-gray-500">Button destination is determined by the selected service.</p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 disabled:opacity-60 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-700"
          >
            <FiSend size={13} />
            {saving ? "Saving..." : editing ? "Update & Publish" : "Save & Publish"}
          </button>
        </div>
      </SectionCard>
    </form>
  );
}

function AdThumb({ ad }) {
  return (
    <div className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-teal-50 text-teal-500">
      {ad.photo ? (
        <img src={ad.photo.url} alt="" className="h-full w-full object-cover" />
      ) : (
        <FiImage size={18} />
      )}
    </div>
  );
}

function AdTable({ ads, onEdit, onToggle, onDelete, onMenu }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="bg-gray-50 text-[11px] font-semibold text-gray-500">
            <th className="px-4 py-2.5">#</th>
            <th className="px-4 py-2.5">Title</th>
            <th className="px-4 py-2.5">Type</th>
            <th className="px-4 py-2.5">Media</th>
            <th className="px-4 py-2.5">Status</th>
            <th className="px-4 py-2.5">Created On</th>
            <th className="px-4 py-2.5">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ads.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                No advertisements yet. Create your first one above.
              </td>
            </tr>
          )}
          {ads.map((ad, i) => {
            const type = getType(ad);
            const created = fmtDate(ad.createdAt);
            return (
              <tr key={ad._id || ad.id} className="hover:bg-gray-50/70">
                <td className="px-4 py-2.5 text-xs text-gray-500">{i + 1}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <AdThumb ad={ad} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-900">{ad.title}</p>
                      <p className="truncate text-[11px] text-gray-500">{ad.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      type === "Property"
                        ? "bg-teal-50 text-teal-700"
                        : type === "Service"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {type}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-2">
                    <span
                      title={ad.photo ? "Photo added" : "No photo"}
                      className={`flex h-6 w-6 items-center justify-center rounded-md ${
                        ad.photo ? "bg-teal-50 text-teal-700" : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      <FiImage size={13} />
                    </span>
                    <span
                      title={ad.video ? "Video added" : "No video"}
                      className={`flex h-6 w-6 items-center justify-center rounded-md ${
                        ad.video ? "bg-teal-50 text-teal-700" : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      <FiVideo size={13} />
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={ad.status} />
                </td>
                <td className="px-4 py-2.5 text-[11px] leading-snug text-gray-500">
                  {created.date}
                  <br />
                  {created.time}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => onEdit(ad)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 text-white hover:bg-teal-700"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      type="button"
                      title={ad.status === "Active" ? "Pause" : "Activate"}
                      onClick={() => onToggle(ad)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-400 text-white hover:bg-amber-500"
                    >
                      {ad.status === "Active" ? <FiPause size={13} /> : <FiPlay size={13} />}
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => onDelete(ad)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      <FiTrash2 size={13} />
                    </button>
                    <button
                      type="button"
                      title="More"
                      onClick={(e) => onMenu(ad, e.currentTarget.getBoundingClientRect())}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <FiMoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RowMenu({ menu, onView, onDuplicate, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl"
        style={{ top: menu.top, right: menu.right }}
      >
        <button
          type="button"
          onClick={onView}
          className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-teal-50"
        >
          <FiEye size={14} /> View Details
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-teal-50"
        >
          <FiCopy size={14} /> Duplicate
        </button>
      </div>
    </>
  );
}

function ViewAdModal({ ad, onClose }) {
  const created = fmtDate(ad.createdAt);
  const rows = [
    ["Type", getType(ad)],
    ["Button", ad.btnText],
    ["Created On", `${created.date}, ${created.time}`],
  ];
  return (
    <Modal title="Advertisement Details" onClose={onClose} width="max-w-md">
      <div className="space-y-4 p-5">
        <AdPreview data={ad} />
        <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-500">Status</span>
            <StatusBadge status={ad.status} />
          </div>
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4">
              <span className="font-semibold text-gray-500">{k}</span>
              <span className="truncate font-medium text-gray-800">{v || "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function DeleteAdModal({ ad, onCancel, onConfirm }) {
  return (
    <Modal title="Delete Advertisement" onClose={onCancel} width="max-w-md">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FiAlertTriangle size={20} />
          </span>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{ad.title}</span>? This action cannot be
            undone.
          </p>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------- page -------------------------------- */

const AdvertisementDashboard = () => {
  const [ads, setAds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingAds, setLoadingAds] = useState(true);

  const loadAds = async () => {
    try {
      const response = await axios.get("/advertisements?all=true");
      setAds(response.data?.advertisements || []);
     } catch (error) {
      console.error("Failed to load advertisements:", error?.response?.data || error);
      flash(error?.response?.data?.message || error?.message || "Unable to load advertisements");
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => { loadAds(); }, []);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [viewAd, setViewAd] = useState(null);
  const [deleteAd, setDeleteAd] = useState(null);
  const [menu, setMenu] = useState(null);
  const [notice, setNotice] = useState("");
  const topRef = useRef(null);
  const tableRef = useRef(null);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
  };

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.subtitle.trim()) e.subtitle = "Subtitle is required";
    if (!form.paragraph.trim()) e.paragraph = "Description is required";
    if (!form.btnText.trim()) e.btnText = "Button text is required";
    setErrors((prev) => ({ ...e, video: prev.video }));
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = new FormData();
      ["title", "subtitle", "paragraph", "service", "textHtml", "btnText", "status"].forEach((key) => payload.append(key, form[key] ?? ""));
      ["photo", "video", "icon"].forEach((key) => {
        const media = form[key];
        if (media?.file) payload.append(key, media.file);
        else payload.append(`${key}Url`, media?.url || "");
        if (media?.name) payload.append(`${key}Name`, media.name);
      });
      const response = editingId
        ? await axios.put(`/advertisements/${editingId}`, payload, { headers: { "Content-Type": "multipart/form-data" } })
        : await axios.post("/advertisements", payload, { headers: { "Content-Type": "multipart/form-data" } });
      await loadAds();
      flash(response.data?.message || "Advertisement published successfully");
      resetForm();
     } catch (error) {
      console.error("Failed to save advertisement:", error?.response?.data || error);
      flash(error?.response?.data?.message || error?.message || "Unable to save advertisement. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (ad) => {
    const { _id, id, createdAt, updatedAt, ...rest } = ad;
    setForm({ ...emptyForm, ...rest });
    setEditingId(_id || id);
    setErrors({});
    scrollTop();
  };

  const handleToggle = (ad) => {
    axios.patch(`/advertisements/${ad._id || ad.id}/toggle`).then(() => loadAds()).then(() => flash("Advertisement status updated")).catch((error) => flash(error?.response?.data?.message || "Unable to update status"));
  };

  const confirmDelete = () => {
    axios.delete(`/advertisements/${deleteAd._id || deleteAd.id}`).then(() => {
      if (editingId === (deleteAd._id || deleteAd.id)) resetForm();
      setDeleteAd(null);
      return loadAds();
    }).then(() => flash("Advertisement deleted")).catch((error) => flash(error?.response?.data?.message || "Unable to delete advertisement"));
  };

  const handleDuplicate = (ad) => {
    const { _id, id, createdAt, updatedAt, ...copy } = ad;
    const payload = new FormData();
    Object.entries({ ...copy, title: `${ad.title} (Copy)`, status: "Paused" }).forEach(([key, value]) => {
      if (["photo", "video", "icon"].includes(key)) payload.append(`${key}Url`, value?.url || "");
      else if (value != null && typeof value !== "object") payload.append(key, value);
    });
    axios.post("/advertisements", payload, { headers: { "Content-Type": "multipart/form-data" } })
      .then(() => loadAds()).then(() => flash("Advertisement duplicated"))
      .catch((error) => flash(error?.response?.data?.message || "Unable to duplicate advertisement"));
    setMenu(null);
  };

  const openMenu = (ad, rect) =>
    setMenu({ ad, top: rect.bottom + 4, right: window.innerWidth - rect.right });

  return (
    <div className="space-y-5 p-1">
      {/* HEADER */}
      <div
        ref={topRef}
        className="relative isolate flex min-h-[94px] flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[20px] border border-slate-200/40 bg-[#203f52] px-5 py-4 text-white shadow-sm sm:px-7"
      >
        <div className="pointer-events-none absolute -right-8 -top-16 h-44 w-44 rounded-full border-[28px] border-teal-400/10" />
        <div className="pointer-events-none absolute bottom-[-78px] right-24 h-36 w-36 rounded-full bg-teal-400/10" />
        <div className="relative flex min-w-0 items-center gap-3.5">
          <button
            type="button"
            onClick={() => (editingId ? resetForm() : window.history.back())}
            aria-label="Back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-white transition hover:bg-emerald-300"
          >
            <MdOutlineCampaign size={23} />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              {editingId ? "Edit Advertisement" : "Add Advertisement"}
            </h1>
            <p className="mt-1 text-xs text-slate-200 sm:text-[13px]">
              Create and manage advertisements for your platform
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="relative inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-left transition hover:bg-white/15"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-300">Current View</span>
            <span className="block text-xs font-bold text-white">Advertisement Directory</span>
          </span>
        </button>
      </div>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
          <FiCheckCircle /> {notice}
        </div>
      )}

      {/* FORM + PREVIEW */}
      <div className="grid items-start gap-5 xl:grid-cols-[1fr_400px]">
        <AdForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          editing={!!editingId}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <aside className="xl:sticky xl:top-4">
          <h2 className="mb-3 text-sm font-bold text-gray-900">Live Phone Preview</h2>
          <div className="mx-auto max-w-[330px] rounded-[2.2rem] border-[7px] border-slate-900 bg-slate-900 p-1.5 shadow-xl">
            <div className="mb-1 flex h-5 items-center justify-center rounded-t-[1.5rem] bg-slate-900">
              <span className="h-1.5 w-16 rounded-full bg-slate-600" />
            </div>
            <div className="max-h-[690px] overflow-y-auto rounded-[1.5rem] bg-white">
              <AdPreview data={form} />
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-500">Preview updates as you edit the story.</p>
        </aside>
      </div>

      {/* ALL ADVERTISEMENTS */}
      <div
        ref={tableRef}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">All Advertisements</h2>
            <p className="text-xs text-gray-500">Manage, edit, pause or delete your ads</p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              scrollTop();
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-700"
          >
            <FiPlus size={14} /> Add Advertisement
          </button>
        </div>

        <AdTable
          ads={ads}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={setDeleteAd}
          onMenu={openMenu}
        />
      </div>

      {menu && (
        <RowMenu
          menu={menu}
          onClose={() => setMenu(null)}
          onView={() => {
            setViewAd(menu.ad);
            setMenu(null);
          }}
          onDuplicate={() => handleDuplicate(menu.ad)}
        />
      )}
      {viewAd && <ViewAdModal ad={viewAd} onClose={() => setViewAd(null)} />}
      {deleteAd && (
        <DeleteAdModal
          ad={deleteAd}
          onCancel={() => setDeleteAd(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdvertisementDashboard;
