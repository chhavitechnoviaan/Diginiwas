// import { useState } from "react";
// import {
//   MdArticle,
//   MdOutlineCategory,
//   MdOutlineTrendingUp,
//   MdDeleteOutline,
//   MdAdd,
//   MdAutoAwesome,
//   MdOutlineMail,
//   MdOutlineImage,
//   MdStarOutline,
//   MdDragIndicator,
// } from "react-icons/md";

// /* ============================================================
//    REUSABLE UI
// ============================================================ */

// const fieldClass =
//   "mt-2 w-full rounded-[14px] border border-[#DCE5E9] bg-white px-4 py-3 text-sm text-[#173247] outline-none transition placeholder:text-[#A6B2B8] focus:border-[#35A98C] focus:ring-2 focus:ring-[#35A98C]/10";

// const textAreaClass =
//   "mt-2 min-h-[110px] w-full resize-none rounded-[14px] border border-[#DCE5E9] bg-white px-4 py-3 text-sm leading-6 text-[#173247] outline-none transition placeholder:text-[#A6B2B8] focus:border-[#35A98C] focus:ring-2 focus:ring-[#35A98C]/10";

// function CMSContainer({
//   icon: Icon,
//   title,
//   description,
//   children,
//   buttonText = "Save Changes",
//   onSave,
// }) {
//   return (
//     <div className="overflow-hidden rounded-[22px] border border-[#E4EBEE] bg-white">
//       <div className="p-5 sm:p-6 lg:p-8">
//         <div className="mb-7 flex items-start gap-4">
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[17px] bg-[#EAF9F4] text-[#15966F]">
//             <Icon size={26} />
//           </div>

//           <div>
//             <h3 className="text-xl font-extrabold text-[#102E40]">
//               {title}
//             </h3>

//             <p className="mt-1 text-sm leading-6 text-[#74868F]">
//               {description}
//             </p>
//           </div>
//         </div>

//         {children}
//       </div>

//       <div className="sticky bottom-0 z-20 flex justify-end border-t border-[#E8EEF0] bg-white/95 px-5 py-5 backdrop-blur-md sm:px-8">
//         <button
//           type="button"
//           onClick={onSave}
//           className="min-w-[230px] rounded-[18px] bg-[#0B3934] px-6 py-4 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(11,57,52,0.18)] transition hover:bg-[#092F2B]"
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <div>
//       <label className="text-[13px] font-semibold text-[#526B78]">
//         {label}
//       </label>

//       {children}
//     </div>
//   );
// }

// function SectionCard({ children }) {
//   return (
//     <div className="rounded-[20px] border border-[#E0E8EC] bg-[#FCFDFD] p-4 sm:p-5">
//       {children}
//     </div>
//   );
// }

// function ImagePreview({ src }) {
//   if (!src) {
//     return (
//       <div className="mt-3 flex h-40 items-center justify-center rounded-[16px] border border-dashed border-[#CAD7DC] bg-[#F7F9FA] text-[#9BABAF]">
//         <div className="text-center">
//           <MdOutlineImage size={28} className="mx-auto" />
//           <p className="mt-2 text-xs">Image preview</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <img
//       src={src}
//       alt="preview"
//       className="mt-3 h-44 w-full rounded-[16px] border border-[#E1E8EB] object-cover"
//     />
//   );
// }

// /* ============================================================
//    BLOG HERO CMS
// ============================================================ */

// export function BlogHeroCMS() {
//   const [data, setData] = useState({
//     eyebrow: "DigiNiwas Blog",
//     headingLine1: "Insights that move",
//     headingLine2: "you forward.",
//     description:
//       "Expert perspectives, market trends and AI-powered insights to help you make smarter property decisions.",
//     buttonText: "Ask Niwas AI About Anything",
//     image:
//       "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=90",
//     marketTag: "Market Trends",
//     aiTag: "AI Insights",
//     buyerTag: "Buyer Guides",
//     investmentTag: "Investment Ideas",
//   });

//   const update = (key, value) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const save = () => {
//     console.log("SAVE BLOG HERO", data);

//     // API integration
//     // await axios.put("/api/cms/blog/hero", data);
//   };

//   return (
//     <CMSContainer
//       icon={MdArticle}
//       title="Blog Hero"
//       description="Manage heading, description, hero image, CTA and floating tags displayed at the top of the blog."
//       buttonText="Save Blog Hero"
//       onSave={save}
//     >
//       <div className="grid gap-5 lg:grid-cols-2">
//         <SectionCard>
//           <div className="space-y-5">
//             <Field label="Small Heading">
//               <input
//                 className={fieldClass}
//                 value={data.eyebrow}
//                 onChange={(e) => update("eyebrow", e.target.value)}
//               />
//             </Field>

//             <Field label="Heading Line 1">
//               <input
//                 className={fieldClass}
//                 value={data.headingLine1}
//                 onChange={(e) =>
//                   update("headingLine1", e.target.value)
//                 }
//               />
//             </Field>

//             <Field label="Heading Line 2">
//               <input
//                 className={fieldClass}
//                 value={data.headingLine2}
//                 onChange={(e) =>
//                   update("headingLine2", e.target.value)
//                 }
//               />
//             </Field>

//             <Field label="Description">
//               <textarea
//                 className={textAreaClass}
//                 value={data.description}
//                 onChange={(e) =>
//                   update("description", e.target.value)
//                 }
//               />
//             </Field>

//             <Field label="CTA Button Text">
//               <input
//                 className={fieldClass}
//                 value={data.buttonText}
//                 onChange={(e) =>
//                   update("buttonText", e.target.value)
//                 }
//               />
//             </Field>
//           </div>
//         </SectionCard>

//         <SectionCard>
//           <Field label="Hero Image URL">
//             <input
//               className={fieldClass}
//               value={data.image}
//               onChange={(e) => update("image", e.target.value)}
//             />
//           </Field>

//           <ImagePreview src={data.image} />

//           <div className="mt-5 grid gap-4 sm:grid-cols-2">
//             <Field label="Market Tag">
//               <input
//                 className={fieldClass}
//                 value={data.marketTag}
//                 onChange={(e) =>
//                   update("marketTag", e.target.value)
//                 }
//               />
//             </Field>

//             <Field label="AI Tag">
//               <input
//                 className={fieldClass}
//                 value={data.aiTag}
//                 onChange={(e) => update("aiTag", e.target.value)}
//               />
//             </Field>

//             <Field label="Buyer Tag">
//               <input
//                 className={fieldClass}
//                 value={data.buyerTag}
//                 onChange={(e) =>
//                   update("buyerTag", e.target.value)
//                 }
//               />
//             </Field>

//             <Field label="Investment Tag">
//               <input
//                 className={fieldClass}
//                 value={data.investmentTag}
//                 onChange={(e) =>
//                   update("investmentTag", e.target.value)
//                 }
//               />
//             </Field>
//           </div>
//         </SectionCard>
//       </div>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    BLOG CATEGORIES
// ============================================================ */

// export function BlogCategoriesCMS() {
//   const [categories, setCategories] = useState([
//     "All Articles",
//     "Niwas AI",
//     "Market Trends",
//     "Buying Guide",
//     "Renting Guide",
//     "Investment",
//     "Home Loans",
//     "Interior & Living",
//     "Legal & Finance",
//   ]);

//   const addCategory = () => {
//     setCategories((prev) => [...prev, "New Category"]);
//   };

//   const updateCategory = (index, value) => {
//     setCategories((prev) =>
//       prev.map((item, i) => (i === index ? value : item))
//     );
//   };

//   const removeCategory = (index) => {
//     setCategories((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   };

//   const save = () => {
//     console.log("SAVE BLOG CATEGORIES", categories);
//   };

//   return (
//     <CMSContainer
//       icon={MdOutlineCategory}
//       title="Blog Categories"
//       description="Add, rename, delete and arrange categories displayed in the blog filter."
//       buttonText="Save Categories"
//       onSave={save}
//     >
//       <div className="space-y-3">
//         {categories.map((category, index) => (
//           <div
//             key={`${index}-${category}`}
//             className="flex items-center gap-3 rounded-[16px] border border-[#E1E9EC] bg-[#FCFDFD] p-3"
//           >
//             <MdDragIndicator
//               size={21}
//               className="shrink-0 text-[#A4B2B7]"
//             />

//             <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-xs font-extrabold text-[#15966F]">
//               {index + 1}
//             </span>

//             <input
//               value={category}
//               onChange={(e) =>
//                 updateCategory(index, e.target.value)
//               }
//               className="min-w-0 flex-1 rounded-xl border border-[#DCE5E9] bg-white px-4 py-3 text-sm font-semibold text-[#173247] outline-none focus:border-[#35A98C]"
//             />

//             <button
//               type="button"
//               onClick={() => removeCategory(index)}
//               disabled={index === 0}
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F1D8D8] bg-[#FFF7F7] text-[#DC6464] transition hover:bg-[#FFEEEE] disabled:cursor-not-allowed disabled:opacity-30"
//             >
//               <MdDeleteOutline size={19} />
//             </button>
//           </div>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={addCategory}
//         className="mt-4 flex items-center gap-2 rounded-[14px] border border-dashed border-[#91CDBB] bg-[#F4FCF9] px-5 py-3 text-xs font-bold text-[#15966F]"
//       >
//         <MdAdd size={18} />
//         Add Category
//       </button>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    FEATURED BLOG CMS
// ============================================================ */

// export function BlogFeaturedCMS() {
//   const [data, setData] = useState({
//     badge: "Featured",
//     category: "Market Trends",
//     readTime: "5 min read",
//     title: "Where is India's Real Estate Market Headed?",
//     description:
//       "A deep dive into demand patterns, emerging micro-markets and what Niwas AI is seeing ahead.",
//     buttonText: "Read More",
//     image:
//       "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=90",

//     showAITake: true,
//     aiHeading: "Niwas AI Take",
//     aiDescription:
//       "Demand is shifting towards well-connected, lifestyle-rich micro-markets with strong infrastructure momentum.",
//     aiButtonText: "Ask Niwas AI",
//   });

//   const update = (key, value) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <CMSContainer
//       icon={MdStarOutline}
//       title="Featured Article"
//       description="Manage the large featured story and Niwas AI insight card."
//       buttonText="Save Featured Article"
//       onSave={() =>
//         console.log("SAVE FEATURED ARTICLE", data)
//       }
//     >
//       <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
//         <SectionCard>
//           <div className="grid gap-5 sm:grid-cols-2">
//             <Field label="Badge">
//               <input
//                 value={data.badge}
//                 onChange={(e) => update("badge", e.target.value)}
//                 className={fieldClass}
//               />
//             </Field>

//             <Field label="Category">
//               <input
//                 value={data.category}
//                 onChange={(e) =>
//                   update("category", e.target.value)
//                 }
//                 className={fieldClass}
//               />
//             </Field>

//             <Field label="Read Time">
//               <input
//                 value={data.readTime}
//                 onChange={(e) =>
//                   update("readTime", e.target.value)
//                 }
//                 className={fieldClass}
//               />
//             </Field>

//             <Field label="Button Text">
//               <input
//                 value={data.buttonText}
//                 onChange={(e) =>
//                   update("buttonText", e.target.value)
//                 }
//                 className={fieldClass}
//               />
//             </Field>

//             <div className="sm:col-span-2">
//               <Field label="Article Title">
//                 <input
//                   value={data.title}
//                   onChange={(e) => update("title", e.target.value)}
//                   className={fieldClass}
//                 />
//               </Field>
//             </div>

//             <div className="sm:col-span-2">
//               <Field label="Article Description">
//                 <textarea
//                   value={data.description}
//                   onChange={(e) =>
//                     update("description", e.target.value)
//                   }
//                   className={textAreaClass}
//                 />
//               </Field>
//             </div>

//             <div className="sm:col-span-2">
//               <Field label="Featured Image">
//                 <input
//                   value={data.image}
//                   onChange={(e) => update("image", e.target.value)}
//                   className={fieldClass}
//                 />
//               </Field>

//               <ImagePreview src={data.image} />
//             </div>
//           </div>
//         </SectionCard>

//         <SectionCard>
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="font-extrabold text-[#173247]">
//                 Niwas AI Take
//               </h4>

//               <p className="mt-1 text-xs text-[#8A9AA2]">
//                 Display AI insight inside featured article.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 update("showAITake", !data.showAITake)
//               }
//               className={`relative h-7 w-12 rounded-full transition ${
//                 data.showAITake
//                   ? "bg-[#15966F]"
//                   : "bg-[#CBD5D9]"
//               }`}
//             >
//               <span
//                 className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
//                   data.showAITake ? "left-6" : "left-1"
//                 }`}
//               />
//             </button>
//           </div>

//           {data.showAITake && (
//             <div className="mt-6 space-y-5">
//               <Field label="AI Heading">
//                 <input
//                   value={data.aiHeading}
//                   onChange={(e) =>
//                     update("aiHeading", e.target.value)
//                   }
//                   className={fieldClass}
//                 />
//               </Field>

//               <Field label="AI Description">
//                 <textarea
//                   value={data.aiDescription}
//                   onChange={(e) =>
//                     update("aiDescription", e.target.value)
//                   }
//                   className={textAreaClass}
//                 />
//               </Field>

//               <Field label="AI Button Text">
//                 <input
//                   value={data.aiButtonText}
//                   onChange={(e) =>
//                     update("aiButtonText", e.target.value)
//                   }
//                   className={fieldClass}
//                 />
//               </Field>
//             </div>
//           )}
//         </SectionCard>
//       </div>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    ARTICLES CMS
// ============================================================ */

// const initialArticles = [
//   {
//     id: 1,
//     title: "Home Buying Checklist: Everything You Must Know",
//     excerpt:
//       "A complete step-by-step checklist to help your dream home journey feel confident and informed.",
//     category: "Buying Guide",
//     readTime: "6 min read",
//     author: "DigiNiwas Team",
//     date: "Sep 05, 2026",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
//     published: true,
//   },

//   {
//     id: 2,
//     title: "Inside Niwas AI: How We Understand You Better",
//     excerpt:
//       "The technology, data and intelligence behind smarter property recommendations.",
//     category: "Niwas AI",
//     readTime: "4 min read",
//     author: "Niwas AI",
//     date: "Sep 03, 2026",
//     image:
//       "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85",
//     published: true,
//   },
// ];

// export function BlogArticlesCMS() {
//   const [articles, setArticles] = useState(initialArticles);
//   const [editingId, setEditingId] = useState(1);

//   const current =
//     articles.find((article) => article.id === editingId) ||
//     articles[0];

//   const updateCurrent = (key, value) => {
//     setArticles((prev) =>
//       prev.map((article) =>
//         article.id === editingId
//           ? {
//               ...article,
//               [key]: value,
//             }
//           : article
//       )
//     );
//   };

//   const addArticle = () => {
//     const article = {
//       id: Date.now(),
//       title: "New Blog Article",
//       excerpt: "",
//       category: "Market Trends",
//       readTime: "5 min read",
//       author: "DigiNiwas Team",
//       date: "",
//       image: "",
//       published: false,
//     };

//     setArticles((prev) => [...prev, article]);
//     setEditingId(article.id);
//   };

//   const deleteArticle = (id) => {
//     const remaining = articles.filter(
//       (article) => article.id !== id
//     );

//     setArticles(remaining);

//     if (editingId === id) {
//       setEditingId(remaining[0]?.id || null);
//     }
//   };

//   return (
//     <CMSContainer
//       icon={MdArticle}
//       title="Blog Articles"
//       description="Create, edit, publish and manage articles shown inside Latest Articles."
//       buttonText="Save Blog Articles"
//       onSave={() => console.log("SAVE ARTICLES", articles)}
//     >
//       <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
//         {/* ARTICLE LIST */}
//         <div className="rounded-[18px] border border-[#E1E9EC] bg-[#F8FAFB] p-3">
//           <div className="mb-3 flex items-center justify-between">
//             <div>
//               <h4 className="text-sm font-extrabold text-[#173247]">
//                 Articles
//               </h4>

//               <p className="text-[10px] text-[#8A9AA2]">
//                 {articles.length} total articles
//               </p>
//             </div>

//             <button
//               onClick={addArticle}
//               className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#15966F] text-white"
//             >
//               <MdAdd size={19} />
//             </button>
//           </div>

//           <div className="max-h-[650px] space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
//             {articles.map((article) => {
//               const selected = editingId === article.id;

//               return (
//                 <button
//                   type="button"
//                   key={article.id}
//                   onClick={() => setEditingId(article.id)}
//                   className={`w-full rounded-[14px] border p-3 text-left transition ${
//                     selected
//                       ? "border-[#90CDBA] bg-[#EAF9F4]"
//                       : "border-[#E2E9EC] bg-white hover:border-[#C7D5DA]"
//                   }`}
//                 >
//                   <div className="flex gap-3">
//                     {article.image ? (
//                       <img
//                         src={article.image}
//                         alt=""
//                         className="h-14 w-16 shrink-0 rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg bg-[#EEF2F3]">
//                         <MdOutlineImage />
//                       </div>
//                     )}

//                     <div className="min-w-0">
//                       <p className="line-clamp-2 text-[11px] font-bold leading-4 text-[#173247]">
//                         {article.title}
//                       </p>

//                       <div className="mt-1.5 flex items-center gap-2">
//                         <span className="text-[8px] font-bold uppercase text-[#15966F]">
//                           {article.category}
//                         </span>

//                         <span
//                           className={`h-1.5 w-1.5 rounded-full ${
//                             article.published
//                               ? "bg-[#27AE60]"
//                               : "bg-[#F2A93B]"
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* EDITOR */}
//         {current ? (
//           <SectionCard>
//             <div className="mb-5 flex items-center justify-between border-b border-[#E6ECEF] pb-4">
//               <div>
//                 <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#35A98C]">
//                   Article Editor
//                 </p>

//                 <h4 className="mt-1 font-extrabold text-[#173247]">
//                   Edit Article
//                 </h4>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => deleteArticle(current.id)}
//                 className="flex items-center gap-2 rounded-xl bg-[#FFF1F1] px-3 py-2 text-[10px] font-bold text-[#D95F5F]"
//               >
//                 <MdDeleteOutline size={16} />
//                 Delete
//               </button>
//             </div>

//             <div className="grid gap-5 md:grid-cols-2">
//               <div className="md:col-span-2">
//                 <Field label="Article Title">
//                   <input
//                     className={fieldClass}
//                     value={current.title}
//                     onChange={(e) =>
//                       updateCurrent("title", e.target.value)
//                     }
//                   />
//                 </Field>
//               </div>

//               <Field label="Category">
//                 <select
//                   className={fieldClass}
//                   value={current.category}
//                   onChange={(e) =>
//                     updateCurrent("category", e.target.value)
//                   }
//                 >
//                   <option>Niwas AI</option>
//                   <option>Market Trends</option>
//                   <option>Buying Guide</option>
//                   <option>Renting Guide</option>
//                   <option>Investment</option>
//                   <option>Home Loans</option>
//                   <option>Interior & Living</option>
//                   <option>Legal & Finance</option>
//                 </select>
//               </Field>

//               <Field label="Author">
//                 <input
//                   className={fieldClass}
//                   value={current.author}
//                   onChange={(e) =>
//                     updateCurrent("author", e.target.value)
//                   }
//                 />
//               </Field>

//               <Field label="Read Time">
//                 <input
//                   className={fieldClass}
//                   value={current.readTime}
//                   onChange={(e) =>
//                     updateCurrent("readTime", e.target.value)
//                   }
//                 />
//               </Field>

//               <Field label="Publish Date">
//                 <input
//                   className={fieldClass}
//                   value={current.date}
//                   onChange={(e) =>
//                     updateCurrent("date", e.target.value)
//                   }
//                 />
//               </Field>

//               <div className="md:col-span-2">
//                 <Field label="Short Description">
//                   <textarea
//                     className={textAreaClass}
//                     value={current.excerpt}
//                     onChange={(e) =>
//                       updateCurrent("excerpt", e.target.value)
//                     }
//                   />
//                 </Field>
//               </div>

//               <div className="md:col-span-2">
//                 <Field label="Article Image URL">
//                   <input
//                     className={fieldClass}
//                     value={current.image}
//                     onChange={(e) =>
//                       updateCurrent("image", e.target.value)
//                     }
//                   />
//                 </Field>

//                 <ImagePreview src={current.image} />
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between rounded-[15px] border border-[#DFE8EB] bg-white p-4">
//                   <div>
//                     <p className="text-sm font-bold text-[#173247]">
//                       Publish Article
//                     </p>

//                     <p className="mt-1 text-[10px] text-[#8A9AA2]">
//                       Display this article on the public blog page.
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       updateCurrent(
//                         "published",
//                         !current.published
//                       )
//                     }
//                     className={`relative h-7 w-12 rounded-full transition ${
//                       current.published
//                         ? "bg-[#15966F]"
//                         : "bg-[#CBD5D9]"
//                     }`}
//                   >
//                     <span
//                       className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
//                         current.published
//                           ? "left-6"
//                           : "left-1"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SectionCard>
//         ) : (
//           <div className="flex min-h-[350px] items-center justify-center rounded-[18px] border border-dashed border-[#CCD9DE]">
//             No article selected
//           </div>
//         )}
//       </div>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    NIWAS AI CMS
// ============================================================ */

// export function BlogNiwasAICMS() {
//   const [data, setData] = useState({
//     heading: "Ask Niwas AI",
//     title: "Your AI property companion",
//     description:
//       "Get instant answers, insights and recommendations.",
//     buttonText: "Ask Anything",
//     questions: [
//       "Which are the fastest-growing micro-markets right now?",
//       "What affects property prices the most?",
//       "How can I check if a property is a good investment?",
//     ],
//   });

//   const updateQuestion = (index, value) => {
//     setData((prev) => ({
//       ...prev,
//       questions: prev.questions.map((item, i) =>
//         i === index ? value : item
//       ),
//     }));
//   };

//   const addQuestion = () => {
//     setData((prev) => ({
//       ...prev,
//       questions: [...prev.questions, "New question"],
//     }));
//   };

//   const removeQuestion = (index) => {
//     setData((prev) => ({
//       ...prev,
//       questions: prev.questions.filter(
//         (_, i) => i !== index
//       ),
//     }));
//   };

//   return (
//     <CMSContainer
//       icon={MdAutoAwesome}
//       title="Niwas AI Section"
//       description="Manage the AI assistant content and suggested questions displayed beside the featured article."
//       buttonText="Save Niwas AI Section"
//       onSave={() => console.log("SAVE AI CMS", data)}
//     >
//       <div className="grid gap-5 lg:grid-cols-2">
//         <SectionCard>
//           <div className="space-y-5">
//             <Field label="Section Heading">
//               <input
//                 className={fieldClass}
//                 value={data.heading}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     heading: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <Field label="AI Title">
//               <input
//                 className={fieldClass}
//                 value={data.title}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     title: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <Field label="Description">
//               <textarea
//                 className={textAreaClass}
//                 value={data.description}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     description: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <Field label="Button Text">
//               <input
//                 className={fieldClass}
//                 value={data.buttonText}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     buttonText: e.target.value,
//                   })
//                 }
//               />
//             </Field>
//           </div>
//         </SectionCard>

//         <SectionCard>
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <h4 className="font-extrabold text-[#173247]">
//                 Suggested Questions
//               </h4>

//               <p className="text-[10px] text-[#8A9AA2]">
//                 Questions visible inside the AI card.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={addQuestion}
//               className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#15966F]"
//             >
//               <MdAdd size={19} />
//             </button>
//           </div>

//           <div className="space-y-3">
//             {data.questions.map((question, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3"
//               >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F6] text-[10px] font-extrabold text-[#60757F]">
//                   {index + 1}
//                 </span>

//                 <input
//                   value={question}
//                   onChange={(e) =>
//                     updateQuestion(index, e.target.value)
//                   }
//                   className="min-w-0 flex-1 rounded-xl border border-[#DCE5E9] bg-white px-4 py-3 text-xs text-[#173247] outline-none focus:border-[#35A98C]"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => removeQuestion(index)}
//                   className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF2F2] text-[#D65C5C]"
//                 >
//                   <MdDeleteOutline size={17} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </SectionCard>
//       </div>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    TRENDING CMS
// ============================================================ */

// export function BlogTrendingCMS() {
//   const [items, setItems] = useState([
//     {
//       id: 1,
//       title: "What Makes a Location Truly Valuable?",
//       category: "Market Trends",
//       image:
//         "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
//     },

//     {
//       id: 2,
//       title:
//         "Beyond Price: The Real Signs Behind Property Value",
//       category: "Buying Guide",
//       image:
//         "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
//     },

//     {
//       id: 3,
//       title: "How Niwas AI Predicts Property Prices",
//       category: "Niwas AI",
//       image:
//         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
//     },
//   ]);

//   const update = (id, key, value) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               [key]: value,
//             }
//           : item
//       )
//     );
//   };

//   const add = () => {
//     setItems((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         title: "New Trending Article",
//         category: "Market Trends",
//         image: "",
//       },
//     ]);
//   };

//   const remove = (id) => {
//     setItems((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   return (
//     <CMSContainer
//       icon={MdOutlineTrendingUp}
//       title="Trending Articles"
//       description="Manage the articles displayed inside the Trending Now sidebar."
//       buttonText="Save Trending Articles"
//       onSave={() => console.log("SAVE TRENDING", items)}
//     >
//       <div className="space-y-4">
//         {items.map((item, index) => (
//           <SectionCard key={item.id}>
//             <div className="mb-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF9F4] text-xs font-extrabold text-[#15966F]">
//                   {index + 1}
//                 </span>

//                 <p className="text-sm font-extrabold text-[#173247]">
//                   Trending Article {index + 1}
//                 </p>
//               </div>

//               <button
//                 onClick={() => remove(item.id)}
//                 className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF2F2] text-[#D85E5E]"
//               >
//                 <MdDeleteOutline size={18} />
//               </button>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">
//               <Field label="Title">
//                 <input
//                   className={fieldClass}
//                   value={item.title}
//                   onChange={(e) =>
//                     update(
//                       item.id,
//                       "title",
//                       e.target.value
//                     )
//                   }
//                 />
//               </Field>

//               <Field label="Category">
//                 <input
//                   className={fieldClass}
//                   value={item.category}
//                   onChange={(e) =>
//                     update(
//                       item.id,
//                       "category",
//                       e.target.value
//                     )
//                   }
//                 />
//               </Field>

//               <div className="md:col-span-2">
//                 <Field label="Thumbnail URL">
//                   <input
//                     className={fieldClass}
//                     value={item.image}
//                     onChange={(e) =>
//                       update(
//                         item.id,
//                         "image",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </Field>
//               </div>
//             </div>
//           </SectionCard>
//         ))}

//         <button
//           onClick={add}
//           className="flex items-center gap-2 rounded-[14px] border border-dashed border-[#8BC9B7] bg-[#F4FCF9] px-5 py-3 text-xs font-bold text-[#15966F]"
//         >
//           <MdAdd size={18} />
//           Add Trending Article
//         </button>
//       </div>
//     </CMSContainer>
//   );
// }

// /* ============================================================
//    NEWSLETTER CMS
// ============================================================ */

// export function BlogNewsletterCMS() {
//   const [data, setData] = useState({
//     headingLine1: "Smarter property insights,",
//     headingLine2: "straight to your inbox.",
//     description:
//       "Get curated real estate insights, guides and market intelligence every week.",
//     placeholder: "Enter your email",
//     buttonText: "Subscribe",
//     successMessage: "You're subscribed successfully.",
//     enabled: true,
//   });

//   return (
//     <CMSContainer
//       icon={MdOutlineMail}
//       title="Blog Newsletter"
//       description="Manage the newsletter subscription card displayed in the blog sidebar."
//       buttonText="Save Newsletter"
//       onSave={() =>
//         console.log("SAVE NEWSLETTER", data)
//       }
//     >
//       <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
//         <SectionCard>
//           <div className="grid gap-5 sm:grid-cols-2">
//             <Field label="Heading Line 1">
//               <input
//                 className={fieldClass}
//                 value={data.headingLine1}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     headingLine1: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <Field label="Heading Line 2">
//               <input
//                 className={fieldClass}
//                 value={data.headingLine2}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     headingLine2: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <div className="sm:col-span-2">
//               <Field label="Description">
//                 <textarea
//                   className={textAreaClass}
//                   value={data.description}
//                   onChange={(e) =>
//                     setData({
//                       ...data,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </Field>
//             </div>

//             <Field label="Email Placeholder">
//               <input
//                 className={fieldClass}
//                 value={data.placeholder}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     placeholder: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <Field label="Button Text">
//               <input
//                 className={fieldClass}
//                 value={data.buttonText}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     buttonText: e.target.value,
//                   })
//                 }
//               />
//             </Field>

//             <div className="sm:col-span-2">
//               <Field label="Success Message">
//                 <input
//                   className={fieldClass}
//                   value={data.successMessage}
//                   onChange={(e) =>
//                     setData({
//                       ...data,
//                       successMessage: e.target.value,
//                     })
//                   }
//                 />
//               </Field>
//             </div>
//           </div>
//         </SectionCard>

//         {/* LIVE PREVIEW */}
//         <div>
//           <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#8A9AA2]">
//             Card Preview
//           </p>

//           <div className="overflow-hidden rounded-[18px] bg-[#073D31] p-5 text-white shadow-lg">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
//               <MdOutlineMail size={19} />
//             </div>

//             <h3 className="mt-4 text-lg font-extrabold leading-6">
//               {data.headingLine1}
//               <br />
//               {data.headingLine2}
//             </h3>

//             <p className="mt-3 text-[10px] leading-5 text-white/60">
//               {data.description}
//             </p>

//             <div className="mt-5 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-[10px] text-white/50">
//               {data.placeholder}
//             </div>

//             <button className="mt-2 h-11 w-full rounded-lg bg-white text-xs font-extrabold text-[#073D31]">
//               {data.buttonText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </CMSContainer>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  MdArticle,
  MdOutlineCategory,
  MdOutlineTrendingUp,
  MdDeleteOutline,
  MdAdd,
  MdAutoAwesome,
  MdOutlineMail,
  MdOutlineImage,
  MdStarOutline,
  MdDragIndicator,
  MdCloudUpload,
  MdRefresh,
} from "react-icons/md";

import {
  getAdminBlogPage,
  updateBlogHero,
  deleteBlogHeroImage,
  updateBlogCategories,
  updateFeaturedBlogArticle,
  deleteFeaturedBlogImage,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  deleteBlogArticleImage,
  updateBlogNiwasAI,
  createTrendingArticle,
  updateTrendingArticle,
  deleteTrendingArticle,
  updateBlogNewsletter,
} from "../../../../Services/blogService";

/* ============================================================
   DEMO / FALLBACK DATA
============================================================ */

const DEMO_HERO = {
  eyebrow: "DigiNiwas Blog",
  headingLine1: "Insights that move",
  headingLine2: "you forward.",
  description:
    "Expert perspectives, market trends and AI-powered insights to help you make smarter property decisions.",
  buttonText: "Ask Niwas AI About Anything",
  buttonLink: "/niwas-ai",
  image:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=90",
  marketTag: "Market Trends",
  aiTag: "AI Insights",
  buyerTag: "Buyer Guides",
  investmentTag: "Investment Ideas",
};

const DEMO_CATEGORIES = [
  "All Articles",
  "Niwas AI",
  "Market Trends",
  "Buying Guide",
  "Renting Guide",
  "Investment",
  "Home Loans",
  "Interior & Living",
  "Legal & Finance",
];

const EMPTY_CONTENT_BLOCKS = [
  {
    type: "heading",
    text: "Introduction",
  },
  {
    type: "content",
    text: "",
  },
];

const normalizeContentBlocks = (article) => {
  if (Array.isArray(article?.contentBlocks) && article.contentBlocks.length) {
    return article.contentBlocks.map((block) => ({
      type: block.type || "content",
      text: block.text || "",
      points: Array.isArray(block.points)
        ? block.points.map((point) => ({
            text: point?.text || "",
            subPoints: Array.isArray(point?.subPoints)
              ? point.subPoints.map((item) => String(item || ""))
              : [],
          }))
        : [],
    }));
  }

  const content = String(article?.content || "").trim();
  if (!content) return EMPTY_CONTENT_BLOCKS;

  return content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (/^###\s+/.test(part)) {
        return { type: "subheading", text: part.replace(/^###\s+/, "").trim() };
      }
      if (/^##\s+/.test(part)) {
        return { type: "heading", text: part.replace(/^##\s+/, "").trim() };
      }
      if (/^(-|\*|•)\s+/.test(part)) {
        return {
          type: "points",
          text: "",
          points: part
            .split("\n")
            .filter(Boolean)
            .map((line) => ({
              text: line.replace(/^(-|\*|•)\s+/, "").trim(),
              subPoints: [],
            })),
        };
      }
      return { type: "content", text: part };
    });
};

const DEMO_FEATURED = {
  badge: "Featured",
  category: "Market Trends",
  readTime: "5 min read",
  title: "Where is India's Real Estate Market Headed?",
  description:
    "A deep dive into demand patterns, emerging micro-markets and what Niwas AI is seeing ahead.",
  buttonText: "Read More",
  buttonLink: "",
  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=90",
  showAITake: true,
  aiHeading: "Niwas AI Take",
  aiDescription:
    "Demand is shifting towards well-connected, lifestyle-rich micro-markets with strong infrastructure momentum.",
  aiButtonText: "Ask Niwas AI",
  aiButtonLink: "/niwas-ai",
};

const DEMO_ARTICLES = [
  {
    id: "demo-1",
    title: "Home Buying Checklist: Everything You Must Know",
    excerpt:
      "A complete step-by-step checklist to help your dream home journey feel confident and informed.",
    content: "",
    category: "Buying Guide",
    readTime: "6 min read",
    author: "DigiNiwas Team",
    publishDate: "2026-09-05",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    published: true,
    featured: false,
  },
  {
    id: "demo-2",
    title: "Inside Niwas AI: How We Understand You Better",
    excerpt:
      "The technology, data and intelligence behind smarter property recommendations.",
    content: "",
    category: "Niwas AI",
    readTime: "4 min read",
    author: "Niwas AI",
    publishDate: "2026-09-03",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85",
    published: true,
    featured: false,
  },
];

const DEMO_AI = {
  heading: "Ask Niwas AI",
  title: "Your AI property companion",
  description: "Get instant answers, insights and recommendations.",
  buttonText: "Ask Anything",
  buttonLink: "/niwas-ai",
  questions: [
    "Which are the fastest-growing micro-markets right now?",
    "What affects property prices the most?",
    "How can I check if a property is a good investment?",
  ],
};

const DEMO_TRENDING = [
  {
    id: "trend-demo-1",
    title: "What Makes a Location Truly Valuable?",
    category: "Market Trends",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    link: "",
    sortOrder: 0,
  },
  {
    id: "trend-demo-2",
    title: "Beyond Price: The Real Signs Behind Property Value",
    category: "Buying Guide",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
    link: "",
    sortOrder: 1,
  },
  {
    id: "trend-demo-3",
    title: "How Niwas AI Predicts Property Prices",
    category: "Niwas AI",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
    link: "",
    sortOrder: 2,
  },
];

const DEMO_NEWSLETTER = {
  headingLine1: "Smarter property insights,",
  headingLine2: "straight to your inbox.",
  description:
    "Get curated real estate insights, guides and market intelligence every week.",
  placeholder: "Enter your email",
  buttonText: "Subscribe",
  successMessage: "You're subscribed successfully.",
  enabled: true,
};

/* ============================================================
   REUSABLE HELPERS
============================================================ */

const fieldClass =
  "mt-2 w-full rounded-[14px] border border-[#DCE5E9] bg-white px-4 py-3 text-sm text-[#173247] outline-none transition placeholder:text-[#A6B2B8] focus:border-[#35A98C] focus:ring-2 focus:ring-[#35A98C]/10";

const textAreaClass =
  "mt-2 min-h-[110px] w-full resize-none rounded-[14px] border border-[#DCE5E9] bg-white px-4 py-3 text-sm leading-6 text-[#173247] outline-none transition placeholder:text-[#A6B2B8] focus:border-[#35A98C] focus:ring-2 focus:ring-[#35A98C]/10";

const getImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image?.url || "";
};

const toDateInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const readError = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

function CMSContainer({
  icon: Icon,
  title,
  description,
  children,
  buttonText = "Save Changes",
  onSave,
  saving = false,
  status = null,
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#E4EBEE] bg-white">
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="mb-7 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[17px] bg-[#EAF9F4] text-[#15966F]">
            <Icon size={26} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#102E40]">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-[#74868F]">{description}</p>
          </div>
        </div>

        {status?.message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 text-xs font-semibold ${
              status.type === "error"
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {status.message}
          </div>
        )}

        {children}
      </div>

      <div className="sticky bottom-0 z-20 flex justify-end border-t border-[#E8EEF0] bg-white/95 px-5 py-5 backdrop-blur-md sm:px-8">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="min-w-[230px] rounded-[18px] bg-[#0B3934] px-6 py-4 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(11,57,52,0.18)] transition hover:bg-[#092F2B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : buttonText}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[13px] font-semibold text-[#526B78]">{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ children }) {
  return (
    <div className="rounded-[20px] border border-[#E0E8EC] bg-[#FCFDFD] p-4 sm:p-5">
      {children}
    </div>
  );
}

function ImagePreview({ src }) {
  if (!src) {
    return (
      <div className="mt-3 flex h-40 items-center justify-center rounded-[16px] border border-dashed border-[#CAD7DC] bg-[#F7F9FA] text-[#9BABAF]">
        <div className="text-center">
          <MdOutlineImage size={28} className="mx-auto" />
          <p className="mt-2 text-xs">Image preview</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="preview"
      className="mt-3 h-44 w-full rounded-[16px] border border-[#E1E8EB] object-cover"
    />
  );
}

function FilePicker({ onChange, label = "Choose image" }) {
  return (
    <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-dashed border-[#91CDBB] bg-[#F4FCF9] px-4 py-3 text-xs font-bold text-[#15966F]">
      <MdCloudUpload size={18} />
      {label}
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>
  );
}

function useAdminSection(loader, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("demo");

  const load = async () => {
    setLoading(true);
    try {
      const response = await getAdminBlogPage();
      const next = loader(response?.data);
      if (next) {
        setData(next);
        setSource("backend");
      } else {
        setData(fallback);
        setSource("demo");
      }
    } catch (error) {
      console.error(error);
      setData(fallback);
      setSource("demo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { data, setData, loading, source, reload: load };
}

function SourceBadge({ source, loading, onReload }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-[#E4EBEE] bg-[#F8FAFB] px-3 py-2">
      <span
        className={`text-[10px] font-bold ${
          source === "backend" ? "text-[#15966F]" : "text-[#B27A22]"
        }`}
      >
        {loading
          ? "Loading CMS data..."
          : source === "backend"
          ? "Live backend data"
          : "Demo fallback data"}
      </span>
      <button
        type="button"
        onClick={onReload}
        className="flex items-center gap-1 text-[10px] font-bold text-[#617681]"
      >
        <MdRefresh size={14} />
        Refresh
      </button>
    </div>
  );
}

/* ============================================================
   BLOG HERO CMS
============================================================ */

export function BlogHeroCMS() {
  const {
    data,
    setData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) => (blog?.hero ? { ...DEMO_HERO, ...blog.hero } : null),
    DEMO_HERO
  );

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const update = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const selectImage = (file) => {
    setImageFile(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const form = new FormData();
      [
        "eyebrow",
        "headingLine1",
        "headingLine2",
        "description",
        "buttonText",
        "buttonLink",
        "marketTag",
        "aiTag",
        "buyerTag",
        "investmentTag",
      ].forEach((key) => form.append(key, data[key] ?? ""));

      if (imageFile) form.append("heroImage", imageFile);

      const response = await updateBlogHero(form);

      if (response?.data) {
        setData((prev) => ({ ...prev, ...response.data }));
      }

      setImageFile(null);
      setPreview("");
      setStatus({ type: "success", message: "Blog hero saved successfully." });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save blog hero."),
      });
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async () => {
    if (!getImageUrl(data.image)) return;

    if (!window.confirm("Delete current hero image?")) return;

    try {
      await deleteBlogHeroImage();
      setData((prev) => ({ ...prev, image: { url: "", publicId: "" } }));
      setPreview("");
      setImageFile(null);
      setStatus({ type: "success", message: "Hero image deleted." });
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to delete hero image."),
      });
    }
  };

  return (
    <CMSContainer
      icon={MdArticle}
      title="Blog Hero"
      description="Manage heading, description, hero image, CTA and floating tags displayed at the top of the blog."
      buttonText="Save Blog Hero"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard>
          <div className="space-y-5">
            <Field label="Small Heading">
              <input
                className={fieldClass}
                value={data.eyebrow || ""}
                onChange={(e) => update("eyebrow", e.target.value)}
              />
            </Field>

            <Field label="Heading Line 1">
              <input
                className={fieldClass}
                value={data.headingLine1 || ""}
                onChange={(e) => update("headingLine1", e.target.value)}
              />
            </Field>

            <Field label="Heading Line 2">
              <input
                className={fieldClass}
                value={data.headingLine2 || ""}
                onChange={(e) => update("headingLine2", e.target.value)}
              />
            </Field>

            <Field label="Description">
              <textarea
                className={textAreaClass}
                value={data.description || ""}
                onChange={(e) => update("description", e.target.value)}
              />
            </Field>

            <Field label="CTA Button Text">
              <input
                className={fieldClass}
                value={data.buttonText || ""}
                onChange={(e) => update("buttonText", e.target.value)}
              />
            </Field>

            <Field label="CTA Link">
              <input
                className={fieldClass}
                value={data.buttonLink || ""}
                onChange={(e) => update("buttonLink", e.target.value)}
                placeholder="/niwas-ai"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard>
          <Field label="Hero Image">
            <FilePicker onChange={selectImage} label="Choose hero image" />
          </Field>

          <ImagePreview src={preview || getImageUrl(data.image)} />

          {getImageUrl(data.image) && source === "backend" && (
            <button
              type="button"
              onClick={removeImage}
              className="mt-3 flex items-center gap-2 rounded-xl bg-[#FFF1F1] px-3 py-2 text-[10px] font-bold text-[#D95F5F]"
            >
              <MdDeleteOutline size={16} />
              Delete current image
            </button>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Market Tag">
              <input
                className={fieldClass}
                value={data.marketTag || ""}
                onChange={(e) => update("marketTag", e.target.value)}
              />
            </Field>
            <Field label="AI Tag">
              <input
                className={fieldClass}
                value={data.aiTag || ""}
                onChange={(e) => update("aiTag", e.target.value)}
              />
            </Field>
            <Field label="Buyer Tag">
              <input
                className={fieldClass}
                value={data.buyerTag || ""}
                onChange={(e) => update("buyerTag", e.target.value)}
              />
            </Field>
            <Field label="Investment Tag">
              <input
                className={fieldClass}
                value={data.investmentTag || ""}
                onChange={(e) => update("investmentTag", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>
      </div>
    </CMSContainer>
  );
}

/* ============================================================
   BLOG CATEGORIES CMS
============================================================ */

export function BlogCategoriesCMS() {
  const {
    data: categories,
    setData: setCategories,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) =>
      Array.isArray(blog?.categories) && blog.categories.length
        ? blog.categories
        : null,
    DEMO_CATEGORIES
  );

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const addCategory = () =>
    setCategories((prev) => [...prev, "New Category"]);

  const updateCategory = (index, value) =>
    setCategories((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );

  const removeCategory = (index) =>
    setCategories((prev) => prev.filter((_, i) => i !== index));

  const save = async () => {
    const cleaned = categories.map((x) => x.trim()).filter(Boolean);

    if (!cleaned.length) {
      setStatus({ type: "error", message: "At least one category is required." });
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      const response = await updateBlogCategories(cleaned);
      setCategories(response?.data?.length ? response.data : cleaned);
      setStatus({ type: "success", message: "Categories saved successfully." });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save categories."),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <CMSContainer
      icon={MdOutlineCategory}
      title="Blog Categories"
      description="Add, rename, delete and arrange categories displayed in the blog filter."
      buttonText="Save Categories"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={`${index}-${category}`}
            className="flex items-center gap-3 rounded-[16px] border border-[#E1E9EC] bg-[#FCFDFD] p-3"
          >
            <MdDragIndicator size={21} className="shrink-0 text-[#A4B2B7]" />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F4] text-xs font-extrabold text-[#15966F]">
              {index + 1}
            </span>
            <input
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-[#DCE5E9] bg-white px-4 py-3 text-sm font-semibold text-[#173247] outline-none focus:border-[#35A98C]"
            />
            <button
              type="button"
              onClick={() => removeCategory(index)}
              disabled={index === 0}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F1D8D8] bg-[#FFF7F7] text-[#DC6464] transition hover:bg-[#FFEEEE] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <MdDeleteOutline size={19} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCategory}
        className="mt-4 flex items-center gap-2 rounded-[14px] border border-dashed border-[#91CDBB] bg-[#F4FCF9] px-5 py-3 text-xs font-bold text-[#15966F]"
      >
        <MdAdd size={18} />
        Add Category
      </button>
    </CMSContainer>
  );
}

/* ============================================================
   FEATURED BLOG CMS
============================================================ */

export function BlogFeaturedCMS() {
  const {
    data,
    setData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) =>
      blog
        ? (blog.featuredArticle
            ? { ...DEMO_FEATURED, ...blog.featuredArticle }
            : {
                articleId: "",
                badge: "Featured",
                category: "",
                readTime: "",
                title: "",
                description: "",
                buttonText: "Read More",
                buttonLink: "",
                image: { url: "", publicId: "" },
                showAITake: true,
                aiHeading: "Niwas AI Take",
                aiDescription: "",
                aiButtonText: "Ask Niwas AI",
                aiButtonLink: "/niwas-ai",
              })
        : null,
    DEMO_FEATURED
  );

  const { data: availableArticles } = useAdminSection(
    (blog) =>
      blog
        ? (Array.isArray(blog.articles) ? blog.articles : [])
        : null,
    DEMO_ARTICLES
  );

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const update = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const selectImage = (file) => {
    setImageFile(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const form = new FormData();
      form.append("articleId", data.articleId || "");
      [
        "badge",
        "category",
        "readTime",
        "title",
        "description",
        "buttonText",
        "buttonLink",
        "aiHeading",
        "aiDescription",
        "aiButtonText",
        "aiButtonLink",
      ].forEach((key) => form.append(key, data[key] ?? ""));

      form.append("showAITake", String(Boolean(data.showAITake)));

      if (imageFile) form.append("featuredImage", imageFile);

      const response = await updateFeaturedBlogArticle(form);

      if (response?.data) {
        setData((prev) => ({ ...prev, ...response.data }));
      }

      setImageFile(null);
      setPreview("");
      setStatus({
        type: "success",
        message: "Featured article saved successfully.",
      });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save featured article."),
      });
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async () => {
    if (!window.confirm("Delete featured image?")) return;

    try {
      await deleteFeaturedBlogImage();
      setData((prev) => ({
        ...prev,
        image: { url: "", publicId: "" },
      }));
      setImageFile(null);
      setPreview("");
      setStatus({ type: "success", message: "Featured image deleted." });
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to delete featured image."),
      });
    }
  };

  return (
    <CMSContainer
      icon={MdStarOutline}
      title="Featured Article"
      description="Manage the large featured story and Niwas AI insight card."
      buttonText="Save Featured Article"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <SectionCard>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Badge">
              <input
                value={data.badge || ""}
                onChange={(e) => update("badge", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="Featured Article">
              <select
                value={data.articleId || ""}
                onChange={(e) => {
                  const selected = availableArticles.find(
                    (article) => String(article._id) === String(e.target.value)
                  );
                  update("articleId", e.target.value);

                  if (selected) {
                    update("title", selected.title || "");
                    update("description", selected.excerpt || "");
                    update("category", selected.category || "");
                    update("readTime", selected.readTime || "");
                    update("buttonLink", `/blog/${selected.slug || ""}`);
                    update("image", selected.image || { url: "", publicId: "" });
                  }
                }}
                className={fieldClass}
              >
                <option value="">Select an added article</option>
                {availableArticles.map((article) => (
                  <option key={article._id} value={article._id}>
                    {article.title} {article.published ? "• Published" : "• Draft"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Read Time">
              <input
                value={data.readTime || ""}
                onChange={(e) => update("readTime", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="Button Text">
              <input
                value={data.buttonText || ""}
                onChange={(e) => update("buttonText", e.target.value)}
                className={fieldClass}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Button Link">
                <input
                  value={data.buttonLink || ""}
                  onChange={(e) => update("buttonLink", e.target.value)}
                  className={fieldClass}
                  placeholder="/blog/article-slug"
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Article Title">
                <input
                  value={data.title || ""}
                  onChange={(e) => update("title", e.target.value)}
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Article Description">
                <textarea
                  value={data.description || ""}
                  onChange={(e) => update("description", e.target.value)}
                  className={textAreaClass}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Featured Image">
                <p className="mb-3 text-[10px] leading-5 text-[#71818A]">
                  The featured image is taken automatically from the selected article.
                  Create the article first, then select it above.
                </p>
              </Field>
              <ImagePreview src={getImageUrl(data.image)} />
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#173247]">Niwas AI Take</h4>
              <p className="mt-1 text-xs text-[#8A9AA2]">
                Display AI insight inside featured article.
              </p>
            </div>

            <button
              type="button"
              onClick={() => update("showAITake", !data.showAITake)}
              className={`relative h-7 w-12 rounded-full transition ${
                data.showAITake ? "bg-[#15966F]" : "bg-[#CBD5D9]"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  data.showAITake ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {data.showAITake && (
            <div className="mt-6 space-y-5">
              <Field label="AI Heading">
                <input
                  value={data.aiHeading || ""}
                  onChange={(e) => update("aiHeading", e.target.value)}
                  className={fieldClass}
                />
              </Field>

              <Field label="AI Description">
                <textarea
                  value={data.aiDescription || ""}
                  onChange={(e) => update("aiDescription", e.target.value)}
                  className={textAreaClass}
                />
              </Field>

              <Field label="AI Button Text">
                <input
                  value={data.aiButtonText || ""}
                  onChange={(e) => update("aiButtonText", e.target.value)}
                  className={fieldClass}
                />
              </Field>

              <Field label="AI Button Link">
                <input
                  value={data.aiButtonLink || ""}
                  onChange={(e) => update("aiButtonLink", e.target.value)}
                  className={fieldClass}
                  placeholder="/niwas-ai"
                />
              </Field>
            </div>
          )}
        </SectionCard>
      </div>
    </CMSContainer>
  );
}

/* ============================================================
   ARTICLES CMS
============================================================ */

export function BlogArticlesCMS() {
  const {
    data: initialData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) =>
      blog
        ? (Array.isArray(blog.articles)
            ? blog.articles.map((item) => ({
                ...item,
                id: item._id || item.id,
                publishDate: toDateInput(item.publishDate || item.date),
                contentBlocks: normalizeContentBlocks(item),
              }))
            : [])
        : null,
    DEMO_ARTICLES.map((item) => ({
      ...item,
      contentBlocks: normalizeContentBlocks(item),
    }))
  );

  const {
    data: blogCategories,
  } = useAdminSection(
    (blog) => (blog ? (Array.isArray(blog.categories) ? blog.categories : []) : null),
    DEMO_CATEGORIES
  );

  const articleCategoryOptions = blogCategories.filter(
    (category) => category && category !== "All Articles"
  );

  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFiles, setImageFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setArticles(initialData);
    setEditingId((currentId) => {
      if (initialData.some((x) => (x._id || x.id) === currentId)) {
        return currentId;
      }
      return initialData[0]?._id || initialData[0]?.id || null;
    });
  }, [initialData]);

  const current = useMemo(
    () =>
      articles.find((article) => (article._id || article.id) === editingId) ||
      articles[0] ||
      null,
    [articles, editingId]
  );

  const updateCurrent = (key, value) => {
    setArticles((prev) =>
      prev.map((article) =>
        (article._id || article.id) === editingId
          ? { ...article, [key]: value }
          : article
      )
    );
  };

  const addArticle = () => {
    const id = `new-${Date.now()}`;
    const article = {
      id,
      _isNew: true,
      title: "New Blog Article",
      excerpt: "",
      content: "",
      category: articleCategoryOptions[0] || "",
      readTime: "5 min read",
      author: "DigiNiwas Team",
      publishDate: new Date().toISOString().slice(0, 10),
      image: "",
      published: false,
      featured: false,
      sortOrder: 0,
    };

    setArticles((prev) => [article, ...prev]);
    setEditingId(id);
    setStatus(null);
  };

  const chooseImage = (file) => {
    if (!current) return;
    const id = current._id || current.id;

    setImageFiles((prev) => ({ ...prev, [id]: file }));
    setPreviews((prev) => {
      if (prev[id]) URL.revokeObjectURL(prev[id]);
      return {
        ...prev,
        [id]: file ? URL.createObjectURL(file) : "",
      };
    });
  };

  const saveCurrentArticle = async () => {
    if (!current) return;

    if (!current.title?.trim() || !current.category?.trim()) {
      setStatus({
        type: "error",
        message: "Article title and category are required.",
      });
      return;
    }

    const localId = current._id || current.id;
    setSaving(true);
    setStatus(null);

    try {
      const form = new FormData();
      form.append("title", current.title || "");
      form.append("excerpt", current.excerpt || "");
      form.append("content", current.content || "");
      form.append(
        "contentBlocks",
        JSON.stringify(current.contentBlocks || [])
      );
      form.append("category", current.category || "");
      form.append("readTime", current.readTime || "5 min read");
      form.append("author", current.author || "DigiNiwas Team");
      form.append("publishDate", current.publishDate || "");
      form.append("published", String(Boolean(current.published)));
      form.append("featured", String(Boolean(current.featured)));
      form.append("sortOrder", String(Number(current.sortOrder || 0)));

      if (imageFiles[localId]) {
        form.append("articleImage", imageFiles[localId]);
      }

      let response;

      if (current._id && !current._isNew) {
        response = await updateBlogArticle(current._id, form);
      } else {
        response = await createBlogArticle(form);
      }

      const saved = response?.data;

      if (saved) {
        const savedId = saved._id || saved.id;
        setArticles((prev) =>
          prev.map((article) =>
            (article._id || article.id) === localId
              ? {
                  ...saved,
                  id: savedId,
                  publishDate: toDateInput(saved.publishDate),
                }
              : article
          )
        );
        setEditingId(savedId);
      }

      setImageFiles((prev) => {
        const copy = { ...prev };
        delete copy[localId];
        return copy;
      });

      setPreviews((prev) => {
        const copy = { ...prev };
        delete copy[localId];
        return copy;
      });

      setStatus({
        type: "success",
        message: current._id ? "Article updated successfully." : "Article created successfully.",
      });

      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save article."),
      });
    } finally {
      setSaving(false);
    }
  };

  const removeArticle = async (article) => {
    const id = article._id || article.id;

    if (!window.confirm(`Delete "${article.title}"?`)) return;

    try {
      if (article._id && !article._isNew) {
        await deleteBlogArticle(article._id);
      }

      const remaining = articles.filter((x) => (x._id || x.id) !== id);
      setArticles(remaining);
      setEditingId(remaining[0]?._id || remaining[0]?.id || null);
      setStatus({ type: "success", message: "Article deleted successfully." });

      if (article._id) await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to delete article."),
      });
    }
  };

  const removeArticleImage = async () => {
    if (!current?._id) return;
    if (!window.confirm("Delete current article image?")) return;

    try {
      const response = await deleteBlogArticleImage(current._id);
      updateCurrent("image", response?.data?.image || { url: "", publicId: "" });
      setStatus({ type: "success", message: "Article image deleted." });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to delete article image."),
      });
    }
  };

  const currentId = current?._id || current?.id;

  return (
    <CMSContainer
      icon={MdArticle}
      title="Blog Articles"
      description="Create, edit, publish and manage articles shown inside Latest Articles."
      buttonText={current?._id ? "Update Article" : "Create Article"}
      onSave={saveCurrentArticle}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-[18px] border border-[#E1E9EC] bg-[#F8FAFB] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-[#173247]">Articles</h4>
              <p className="text-[10px] text-[#8A9AA2]">{articles.length} total articles</p>
            </div>

            <button
              type="button"
              onClick={addArticle}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#15966F] text-white"
            >
              <MdAdd size={19} />
            </button>
          </div>

          <div className="max-h-[650px] space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
            {articles.map((article) => {
              const id = article._id || article.id;
              const selected = editingId === id;
              const image = previews[id] || getImageUrl(article.image);

              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => setEditingId(id)}
                  className={`w-full rounded-[14px] border p-3 text-left transition ${
                    selected
                      ? "border-[#90CDBA] bg-[#EAF9F4]"
                      : "border-[#E2E9EC] bg-white hover:border-[#C7D5DA]"
                  }`}
                >
                  <div className="flex gap-3">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="h-14 w-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg bg-[#EEF2F3]">
                        <MdOutlineImage />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-[11px] font-bold leading-4 text-[#173247]">
                        {article.title}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase text-[#15966F]">
                          {article.category}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            article.published ? "bg-[#27AE60]" : "bg-[#F2A93B]"
                          }`}
                        />
                        {article._isNew && (
                          <span className="text-[8px] font-bold text-[#B27A22]">UNSAVED</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {current ? (
          <SectionCard>
            <div className="mb-5 flex items-center justify-between border-b border-[#E6ECEF] pb-4">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#35A98C]">
                  Article Editor
                </p>
                <h4 className="mt-1 font-extrabold text-[#173247]">
                  {current._id ? "Edit Article" : "Create Article"}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => removeArticle(current)}
                className="flex items-center gap-2 rounded-xl bg-[#FFF1F1] px-3 py-2 text-[10px] font-bold text-[#D95F5F]"
              >
                <MdDeleteOutline size={16} />
                Delete
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Article Title">
                  <input
                    className={fieldClass}
                    value={current.title || ""}
                    onChange={(e) => updateCurrent("title", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Category">
                <select
                  className={fieldClass}
                  value={current.category || ""}
                  onChange={(e) => updateCurrent("category", e.target.value)}
                >
                  <option value="">Select category</option>
                  {articleCategoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Author">
                <input
                  className={fieldClass}
                  value={current.author || ""}
                  onChange={(e) => updateCurrent("author", e.target.value)}
                />
              </Field>

              <Field label="Read Time">
                <input
                  className={fieldClass}
                  value={current.readTime || ""}
                  onChange={(e) => updateCurrent("readTime", e.target.value)}
                />
              </Field>

              <Field label="Publish Date">
                <input
                  type="date"
                  className={fieldClass}
                  value={toDateInput(current.publishDate)}
                  onChange={(e) => updateCurrent("publishDate", e.target.value)}
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Short Description">
                  <textarea
                    className={textAreaClass}
                    value={current.excerpt || ""}
                    onChange={(e) => updateCurrent("excerpt", e.target.value)}
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Article Content Builder">
                  <div className="space-y-3">
                    {(current.contentBlocks || []).map((block, blockIndex) => (
                      <div
                        key={`block-${blockIndex}`}
                        className="rounded-2xl border border-[#DCE6E9] bg-[#FAFCFC] p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <select
                            className="rounded-xl border border-[#DCE5E9] bg-white px-3 py-2 text-xs font-bold text-[#173247] outline-none"
                            value={block.type || "content"}
                            onChange={(e) => {
                              const next = [...(current.contentBlocks || [])];
                              next[blockIndex] = {
                                ...next[blockIndex],
                                type: e.target.value,
                                points:
                                  e.target.value === "points"
                                    ? next[blockIndex].points?.length
                                      ? next[blockIndex].points
                                      : [{ text: "", subPoints: [] }]
                                    : next[blockIndex].points || [],
                              };
                              updateCurrent("contentBlocks", next);
                            }}
                          >
                            <option value="heading">Heading</option>
                            <option value="subheading">Subheading</option>
                            <option value="content">Content / Sub-content</option>
                            <option value="points">Points + Sub-points</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              const next = (current.contentBlocks || []).filter(
                                (_, i) => i !== blockIndex
                              );
                              updateCurrent("contentBlocks", next);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF1F1] text-[#D85E5E]"
                          >
                            <MdDeleteOutline size={16} />
                          </button>
                        </div>

                        {block.type !== "points" ? (
                          <textarea
                            className={textAreaClass}
                            value={block.text || ""}
                            onChange={(e) => {
                              const next = [...(current.contentBlocks || [])];
                              next[blockIndex] = {
                                ...next[blockIndex],
                                text: e.target.value,
                              };
                              updateCurrent("contentBlocks", next);
                            }}
                            placeholder={
                              block.type === "heading"
                                ? "Enter main heading"
                                : block.type === "subheading"
                                ? "Enter subheading"
                                : "Enter paragraph / sub-content"
                            }
                          />
                        ) : (
                          <div className="space-y-3">
                            {(block.points || []).map((point, pointIndex) => (
                              <div
                                key={`point-${pointIndex}`}
                                className="rounded-xl border border-[#E2EAED] bg-white p-3"
                              >
                                <div className="flex gap-2">
                                  <input
                                    className={`${fieldClass} flex-1`}
                                    value={point.text || ""}
                                    onChange={(e) => {
                                      const next = [...(current.contentBlocks || [])];
                                      const points = [...(next[blockIndex].points || [])];
                                      points[pointIndex] = {
                                        ...points[pointIndex],
                                        text: e.target.value,
                                      };
                                      next[blockIndex] = {
                                        ...next[blockIndex],
                                        points,
                                      };
                                      updateCurrent("contentBlocks", next);
                                    }}
                                    placeholder={`Point ${pointIndex + 1}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = [...(current.contentBlocks || [])];
                                      const points = (next[blockIndex].points || []).filter(
                                        (_, i) => i !== pointIndex
                                      );
                                      next[blockIndex] = {
                                        ...next[blockIndex],
                                        points,
                                      };
                                      updateCurrent("contentBlocks", next);
                                    }}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF1F1] text-[#D85E5E]"
                                  >
                                    <MdDeleteOutline size={15} />
                                  </button>
                                </div>

                                <div className="mt-3 space-y-2 pl-4">
                                  {(point.subPoints || []).map((subPoint, subIndex) => (
                                    <div key={`sub-${subIndex}`} className="flex gap-2">
                                      <input
                                        className={`${fieldClass} flex-1`}
                                        value={subPoint || ""}
                                        onChange={(e) => {
                                          const next = [...(current.contentBlocks || [])];
                                          const points = [...(next[blockIndex].points || [])];
                                          const subPoints = [...(points[pointIndex].subPoints || [])];
                                          subPoints[subIndex] = e.target.value;
                                          points[pointIndex] = {
                                            ...points[pointIndex],
                                            subPoints,
                                          };
                                          next[blockIndex] = {
                                            ...next[blockIndex],
                                            points,
                                          };
                                          updateCurrent("contentBlocks", next);
                                        }}
                                        placeholder={`Sub-point ${subIndex + 1}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const next = [...(current.contentBlocks || [])];
                                          const points = [...(next[blockIndex].points || [])];
                                          points[pointIndex] = {
                                            ...points[pointIndex],
                                            subPoints: (points[pointIndex].subPoints || []).filter(
                                              (_, i) => i !== subIndex
                                            ),
                                          };
                                          next[blockIndex] = {
                                            ...next[blockIndex],
                                            points,
                                          };
                                          updateCurrent("contentBlocks", next);
                                        }}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F6] text-[#71818A]"
                                      >
                                        <MdDeleteOutline size={15} />
                                      </button>
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = [...(current.contentBlocks || [])];
                                      const points = [...(next[blockIndex].points || [])];
                                      points[pointIndex] = {
                                        ...points[pointIndex],
                                        subPoints: [
                                          ...(points[pointIndex].subPoints || []),
                                          "",
                                        ],
                                      };
                                      next[blockIndex] = {
                                        ...next[blockIndex],
                                        points,
                                      };
                                      updateCurrent("contentBlocks", next);
                                    }}
                                    className="text-[10px] font-bold text-[#15966F]"
                                  >
                                    + Add Sub-point
                                  </button>
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                const next = [...(current.contentBlocks || [])];
                                next[blockIndex] = {
                                  ...next[blockIndex],
                                  points: [
                                    ...(next[blockIndex].points || []),
                                    { text: "", subPoints: [] },
                                  ],
                                };
                                updateCurrent("contentBlocks", next);
                              }}
                              className="text-[10px] font-bold text-[#15966F]"
                            >
                              + Add Point
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-wrap gap-2">
                      {[
                        ["heading", "Add Heading"],
                        ["subheading", "Add Subheading"],
                        ["content", "Add Content"],
                        ["points", "Add Points"],
                      ].map(([type, label]) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            const next = [
                              ...(current.contentBlocks || []),
                              {
                                type,
                                text: "",
                                points:
                                  type === "points"
                                    ? [{ text: "", subPoints: [] }]
                                    : [],
                              },
                            ];
                            updateCurrent("contentBlocks", next);
                          }}
                          className="rounded-xl border border-dashed border-[#91CDBB] bg-[#F4FCF9] px-3 py-2 text-[10px] font-bold text-[#15966F]"
                        >
                          + {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-[#71818A]">
                    Build the article section-by-section. You can add main headings,
                    subheadings, paragraphs/sub-content, points and nested sub-points.
                  </p>
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Article Image">
                  <FilePicker onChange={chooseImage} label="Choose article image" />
                </Field>

                <ImagePreview
                  src={previews[currentId] || getImageUrl(current.image)}
                />

                {current._id && getImageUrl(current.image) && (
                  <button
                    type="button"
                    onClick={removeArticleImage}
                    className="mt-3 flex items-center gap-2 rounded-xl bg-[#FFF1F1] px-3 py-2 text-[10px] font-bold text-[#D95F5F]"
                  >
                    <MdDeleteOutline size={16} />
                    Delete current image
                  </button>
                )}
              </div>

              <Field label="Sort Order">
                <input
                  type="number"
                  className={fieldClass}
                  value={current.sortOrder ?? 0}
                  onChange={(e) => updateCurrent("sortOrder", e.target.value)}
                />
              </Field>

              <div className="flex items-end">
                <div className="flex w-full items-center justify-between rounded-[15px] border border-[#DFE8EB] bg-white p-4">
                  <div>
                    <p className="text-sm font-bold text-[#173247]">Publish Article</p>
                    <p className="mt-1 text-[10px] text-[#8A9AA2]">
                      Show this article on public Blog page.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => updateCurrent("published", !current.published)}
                    className={`relative h-7 w-12 rounded-full transition ${
                      current.published ? "bg-[#15966F]" : "bg-[#CBD5D9]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        current.published ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        ) : (
          <div className="flex min-h-[350px] items-center justify-center rounded-[18px] border border-dashed border-[#CCD9DE]">
            No article selected
          </div>
        )}
      </div>
    </CMSContainer>
  );
}

/* ============================================================
   NIWAS AI CMS
============================================================ */

export function BlogNiwasAICMS() {
  const {
    data,
    setData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) => (blog?.niwasAI ? { ...DEMO_AI, ...blog.niwasAI } : null),
    DEMO_AI
  );

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const updateQuestion = (index, value) =>
    setData((prev) => ({
      ...prev,
      questions: prev.questions.map((item, i) => (i === index ? value : item)),
    }));

  const addQuestion = () =>
    setData((prev) => ({
      ...prev,
      questions: [...prev.questions, "New question"],
    }));

  const removeQuestion = (index) =>
    setData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const response = await updateBlogNiwasAI({
        heading: data.heading,
        title: data.title,
        description: data.description,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        questions: data.questions,
      });

      if (response?.data) setData((prev) => ({ ...prev, ...response.data }));

      setStatus({ type: "success", message: "Niwas AI section saved successfully." });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save Niwas AI section."),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <CMSContainer
      icon={MdAutoAwesome}
      title="Niwas AI Section"
      description="Manage the AI assistant content and suggested questions displayed beside the featured article."
      buttonText="Save Niwas AI Section"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard>
          <div className="space-y-5">
            <Field label="Section Heading">
              <input
                className={fieldClass}
                value={data.heading || ""}
                onChange={(e) => setData({ ...data, heading: e.target.value })}
              />
            </Field>

            <Field label="AI Title">
              <input
                className={fieldClass}
                value={data.title || ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </Field>

            <Field label="Description">
              <textarea
                className={textAreaClass}
                value={data.description || ""}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </Field>

            <Field label="Button Text">
              <input
                className={fieldClass}
                value={data.buttonText || ""}
                onChange={(e) => setData({ ...data, buttonText: e.target.value })}
              />
            </Field>

            <Field label="Button Link">
              <input
                className={fieldClass}
                value={data.buttonLink || ""}
                onChange={(e) => setData({ ...data, buttonLink: e.target.value })}
                placeholder="/niwas-ai"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#173247]">Suggested Questions</h4>
              <p className="text-[10px] text-[#8A9AA2]">
                Questions visible inside the AI card.
              </p>
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF9F4] text-[#15966F]"
            >
              <MdAdd size={19} />
            </button>
          </div>

          <div className="space-y-3">
            {data.questions.map((question, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F6] text-[10px] font-extrabold text-[#60757F]">
                  {index + 1}
                </span>

                <input
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-[#DCE5E9] bg-white px-4 py-3 text-xs text-[#173247] outline-none focus:border-[#35A98C]"
                />

                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF2F2] text-[#D65C5C]"
                >
                  <MdDeleteOutline size={17} />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </CMSContainer>
  );
}

/* ============================================================
   TRENDING CMS
============================================================ */

export function BlogTrendingCMS() {
  const {
    data: initialData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) =>
      blog
        ? (Array.isArray(blog.trendingArticles)
            ? blog.trendingArticles.map((item) => ({
                ...item,
                id: item._id || item.id,
              }))
            : [])
        : null,
    DEMO_TRENDING
  );

  const { data: trendingSourceArticles } = useAdminSection(
    (blog) =>
      blog
        ? (Array.isArray(blog.articles) ? blog.articles : [])
        : null,
    DEMO_ARTICLES
  );

  const [items, setItems] = useState([]);
  const [imageFiles, setImageFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => setItems(initialData), [initialData]);

  const update = (id, key, value) =>
    setItems((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, [key]: value } : item))
    );

  const add = () => {
    const id = `new-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        _isNew: true,
        title: "",
        category: "",
        articleId: "",
        image: "",
        link: "",
        sortOrder: prev.length,
      },
    ]);
  };

  const chooseImage = (id, file) => {
    setImageFiles((prev) => ({ ...prev, [id]: file }));
    setPreviews((prev) => {
      if (prev[id]) URL.revokeObjectURL(prev[id]);
      return {
        ...prev,
        [id]: file ? URL.createObjectURL(file) : "",
      };
    });
  };

  const remove = async (item) => {
    const id = item._id || item.id;
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    try {
      if (item._id && !item._isNew) {
        await deleteTrendingArticle(item._id);
      }

      setItems((prev) => prev.filter((x) => (x._id || x.id) !== id));
      setStatus({ type: "success", message: "Trending item deleted." });

      if (item._id) await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to delete trending item."),
      });
    }
  };

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const savedItems = [];

      for (const item of items) {
        const id = item._id || item.id;
        const form = new FormData();

        form.append("articleId", item.articleId || "");
        form.append("sortOrder", String(Number(item.sortOrder || 0)));

        let response;

        if (item._id && !item._isNew) {
          response = await updateTrendingArticle(item._id, form);
        } else {
          response = await createTrendingArticle(form);
        }

        if (response?.data) savedItems.push(response.data);
      }

      setStatus({
        type: "success",
        message: `${savedItems.length} trending item(s) saved successfully.`,
      });

      setImageFiles({});
      setPreviews({});
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save trending articles."),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <CMSContainer
      icon={MdOutlineTrendingUp}
      title="Trending Articles"
      description="Manage the articles displayed inside the Trending Now sidebar."
      buttonText="Save Trending Articles"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="space-y-4">
        {items.map((item, index) => {
          const id = item._id || item.id;

          return (
            <SectionCard key={id}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF9F4] text-xs font-extrabold text-[#15966F]">
                    {index + 1}
                  </span>

                  <div>
                    <p className="text-sm font-extrabold text-[#173247]">
                      Trending Article {index + 1}
                    </p>
                    {item._isNew && (
                      <p className="text-[9px] font-bold text-[#B27A22]">Unsaved</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF2F2] text-[#D85E5E]"
                >
                  <MdDeleteOutline size={18} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Select Article">
                  <select
                    className={fieldClass}
                    value={item.articleId || ""}
                    onChange={(e) => {
                      const selected = trendingSourceArticles.find(
                        (article) => String(article._id) === String(e.target.value)
                      );
                      update(id, "articleId", e.target.value);
                      if (selected) {
                        update(id, "title", selected.title || "");
                        update(id, "category", selected.category || "");
                        update(
                          id,
                          "link",
                          `/blog/${selected.slug || ""}`
                        );
                        update(id, "image", selected.image || "");
                      }
                    }}
                  >
                    <option value="">Select an added article</option>
                    {trendingSourceArticles.map((article) => (
                      <option key={article._id} value={article._id}>
                        {article.title} {article.published ? "• Published" : "• Draft"}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Category">
                  <input
                    className={`${fieldClass} bg-[#F7FAFA]`}
                    value={item.category || ""}
                    readOnly
                  />
                </Field>

                <Field label="Article Link">
                  <input
                    className={`${fieldClass} bg-[#F7FAFA]`}
                    value={item.link || ""}
                    readOnly
                  />
                </Field>

                <Field label="Sort Order">
                  <input
                    type="number"
                    className={fieldClass}
                    value={item.sortOrder ?? index}
                    onChange={(e) => update(id, "sortOrder", e.target.value)}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Article Thumbnail">
                    <p className="mb-2 text-[10px] text-[#71818A]">
                      Trending Now uses the selected article's image automatically.
                    </p>
                  </Field>
                  <ImagePreview src={getImageUrl(item.image)} />
                </div>
              </div>
            </SectionCard>
          );
        })}

        <button
          type="button"
          onClick={add}
          className="flex items-center gap-2 rounded-[14px] border border-dashed border-[#8BC9B7] bg-[#F4FCF9] px-5 py-3 text-xs font-bold text-[#15966F]"
        >
          <MdAdd size={18} />
          Add Trending Article
        </button>
      </div>
    </CMSContainer>
  );
}

/* ============================================================
   NEWSLETTER CMS
============================================================ */

export function BlogNewsletterCMS() {
  const {
    data,
    setData,
    loading,
    source,
    reload,
  } = useAdminSection(
    (blog) =>
      blog?.newsletter ? { ...DEMO_NEWSLETTER, ...blog.newsletter } : null,
    DEMO_NEWSLETTER
  );

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const response = await updateBlogNewsletter({
        headingLine1: data.headingLine1,
        headingLine2: data.headingLine2,
        description: data.description,
        placeholder: data.placeholder,
        buttonText: data.buttonText,
        successMessage: data.successMessage,
        enabled: Boolean(data.enabled),
      });

      if (response?.data) setData((prev) => ({ ...prev, ...response.data }));

      setStatus({ type: "success", message: "Newsletter settings saved." });
      await reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: readError(error, "Failed to save newsletter settings."),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <CMSContainer
      icon={MdOutlineMail}
      title="Blog Newsletter"
      description="Manage the newsletter subscription card displayed in the blog sidebar."
      buttonText="Save Newsletter"
      onSave={save}
      saving={saving}
      status={status}
    >
      <SourceBadge source={source} loading={loading} onReload={reload} />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <SectionCard>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading Line 1">
              <input
                className={fieldClass}
                value={data.headingLine1 || ""}
                onChange={(e) => setData({ ...data, headingLine1: e.target.value })}
              />
            </Field>

            <Field label="Heading Line 2">
              <input
                className={fieldClass}
                value={data.headingLine2 || ""}
                onChange={(e) => setData({ ...data, headingLine2: e.target.value })}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  className={textAreaClass}
                  value={data.description || ""}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Email Placeholder">
              <input
                className={fieldClass}
                value={data.placeholder || ""}
                onChange={(e) => setData({ ...data, placeholder: e.target.value })}
              />
            </Field>

            <Field label="Button Text">
              <input
                className={fieldClass}
                value={data.buttonText || ""}
                onChange={(e) => setData({ ...data, buttonText: e.target.value })}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Success Message">
                <input
                  className={fieldClass}
                  value={data.successMessage || ""}
                  onChange={(e) => setData({ ...data, successMessage: e.target.value })}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between rounded-[15px] border border-[#DFE8EB] bg-white p-4">
                <div>
                  <p className="text-sm font-bold text-[#173247]">Enable Newsletter</p>
                  <p className="mt-1 text-[10px] text-[#8A9AA2]">
                    Show newsletter card on public Blog page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setData({ ...data, enabled: !data.enabled })}
                  className={`relative h-7 w-12 rounded-full transition ${
                    data.enabled ? "bg-[#15966F]" : "bg-[#CBD5D9]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      data.enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        <div>
          <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#8A9AA2]">
            Card Preview
          </p>

          <div className="overflow-hidden rounded-[18px] bg-[#073D31] p-5 text-white shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <MdOutlineMail size={19} />
            </div>

            <h3 className="mt-4 text-lg font-extrabold leading-6">
              {data.headingLine1}
              <br />
              {data.headingLine2}
            </h3>

            <p className="mt-3 text-[10px] leading-5 text-white/60">
              {data.description}
            </p>

            <div className="mt-5 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-[10px] text-white/50">
              {data.placeholder}
            </div>

            <button
              type="button"
              className="mt-2 h-11 w-full rounded-lg bg-white text-xs font-extrabold text-[#073D31]"
            >
              {data.buttonText}
            </button>
          </div>
        </div>
      </div>
    </CMSContainer>
  );
}
