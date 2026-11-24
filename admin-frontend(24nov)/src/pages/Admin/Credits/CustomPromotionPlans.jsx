import {useEffect,useState} from "react";
import { Check, Minus, Sparkles, ShieldCheck } from "lucide-react";
import axios from "axios";
const api=(import.meta.env.VITE_API_BASE_URL||"http://localhost:5000/api").replace(/\/$/,"");
const auth=()=>({headers:{Authorization:`Bearer ${localStorage.getItem("adminToken")||localStorage.getItem("token")||""}`}});
const initial={name:"",targetType:"PROPERTY",credits:99,durationDays:7,description:"",features:[]};
export default function CustomPromotionPlans(){
 const [plans,setPlans]=useState([]),[features,setFeatures]=useState([]),[draft,setDraft]=useState(initial),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const load=async()=>{const [p,f]=await Promise.all([axios.get(`${api}/promotion-plans/all`,auth()),axios.get(`${api}/promotion-plans/features`,auth())]);setPlans((p.data.data.plans||[]).filter(x=>x.targetType==="PROPERTY"));setFeatures(f.data.data.features||[])};
 useEffect(()=>{load().catch(e=>setMessage(e.response?.data?.message||e.message))},[]);
 const run=async(fn)=>{setBusy(true);setMessage("");try{await fn();await load();setMessage("Changes saved") }catch(e){setMessage(e.response?.data?.message||e.message)}finally{setBusy(false)}};
 const edit=(p,k,v)=>run(()=>axios.patch(`${api}/promotion-plans/${p._id}`,{[k]:v},auth()));
 const toggle=(p,key)=>run(()=>axios.patch(`${api}/promotion-plans/${p.code}/features`,{features:(p.features||[]).includes(key)?p.features.filter(x=>x!==key):[...(p.features||[]),key]},auth()));
 return <section className="mt-8 space-y-6 rounded-[24px] border border-[#d8e8e5] bg-white p-5 shadow-sm md:p-7">
 <div className="rounded-2xl bg-gradient-to-r from-[#075e54] to-[#127b75] p-5 text-white"><div className="flex items-center gap-3"><Sparkles size={24}/><h2 className="text-xl font-extrabold">Promotion Plans & Feature Permissions</h2></div><p className="mt-2 text-sm text-white/80">Manage property promotion pricing, duration and fixed feature permissions. Partner-funded plans require final Admin approval.</p></div>
 {message&&<p role="status" className="rounded-lg bg-slate-100 p-3 text-sm">{message}</p>}
 <form className="grid gap-3 rounded-xl border p-4 md:grid-cols-2" onSubmit={e=>{e.preventDefault();run(async()=>{await axios.post(`${api}/promotion-plans`,{...draft,placement:"FEATURE_BASED"},auth());setDraft(initial)})}}>
 <h3 className="font-semibold md:col-span-2">Create New Property Promotion Plan</h3>
 <input required placeholder="Plan name" className="rounded-lg border p-2" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/>
 <input placeholder="Description" className="rounded-lg border p-2" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/>
 <label className="text-sm">Credits<input type="number" min="0" required className="mt-1 w-full rounded-lg border p-2" value={draft.credits} onChange={e=>setDraft({...draft,credits:Number(e.target.value)})}/></label>
 <label className="text-sm">Duration (days)<input type="number" min="1" required className="mt-1 w-full rounded-lg border p-2" value={draft.durationDays} onChange={e=>setDraft({...draft,durationDays:Number(e.target.value)})}/></label>
 <div className="md:col-span-2 flex flex-wrap gap-2">{features.map(f=><label key={f.key} className="rounded-lg border p-2 text-xs"><input type="checkbox" className="mr-2" checked={draft.features.includes(f.key)} onChange={e=>setDraft({...draft,features:e.target.checked?[...draft.features,f.key]:draft.features.filter(x=>x!==f.key)})}/>{f.name}</label>)}</div>
 <button disabled={busy} className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white">Create Active Plan</button>
 </form>
 <div className="grid gap-3 md:grid-cols-2">{plans.map(p=><article key={p.code} className="rounded-xl border p-4"><div className="flex justify-between gap-2"><h3 className="font-semibold">{p.name}</h3><span className={p.isActive?"text-emerald-700":"text-slate-500"}>{p.isActive?"Active":"Inactive"}</span></div><p className="mt-1 text-xs text-slate-500">{p.code}</p><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs">Credits<input key={p.code+"c"+p.credits} className="mt-1 w-full rounded-lg border p-2" type="number" min="0" defaultValue={p.credits} onBlur={e=>Number(e.target.value)!==p.credits&&edit(p,"credits",Number(e.target.value))}/></label><label className="text-xs">Days<input key={p.code+"d"+p.durationDays} className="mt-1 w-full rounded-lg border p-2" type="number" min="1" defaultValue={p.durationDays} onBlur={e=>Number(e.target.value)!==p.durationDays&&edit(p,"durationDays",Number(e.target.value))}/></label></div><div className="mt-3 flex flex-wrap gap-2">{features.map(f=><label key={f.key} className="flex items-center gap-1 rounded-md bg-slate-50 p-1 text-xs"><input type="checkbox" disabled={busy} checked={(p.features||[]).includes(f.key)} onChange={()=>toggle(p,f.key)}/>{f.name}</label>)}</div><div className="mt-4 flex gap-2"><button disabled={busy} className="rounded-lg border px-3 py-2 text-sm" onClick={()=>edit(p,"isActive",!p.isActive)}>{p.isActive?"Deactivate":"Activate"}</button><button disabled={busy} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700" onClick={()=>{if(window.confirm(`Delete ${p.name}? Historical promotions will remain.`))run(()=>axios.delete(`${api}/promotion-plans/${p._id}`,auth()))}}>Delete</button></div></article>)}</div>
 <PlanComparison plans={plans} features={features}/>
 </section>
}

const defaultPlanNames = ["Standard Boosting", "AI Promotion", "Premium Property Promotion", "Platinum Property Promotion"];
const defaultFeatureNames = [
  ["RECOMMENDED_FOR_YOU", "Recommended for You"],
  ["POPULAR_NEAR_YOUR_LOCATION", "Popular Near Your Location"],
  ["NIWAS_AI_SUGGESTED_PROPERTIES", "Niwas AI Suggested Properties"],
  ["PROPERTY_STORIES", "Property Stories"],
  ["7_DAYS_META_ADS", "7 Days Meta Ads"],
  ["PROFESSIONAL_VIDEOGRAPHY", "Professional Videography"],
  ["APPOINTMENT_SITE_VISIT_HELP", "Appointment / Site Visit Help"],
  ["PRIORITY_PLACEMENT", "Priority Placement"],
  ["CUSTOM_META_SERVICES", "Custom Meta Services"],
  ["ADMIN_APPROVAL_REQUIRED", "Admin Approval Required"],
];
function PlanComparison({plans,features}) {
 const ordered = defaultPlanNames.map(name => plans.find(p=>p.name?.trim().toLowerCase()===name.toLowerCase())).filter(Boolean);
 const others = plans.filter(p=>!ordered.some(x=>x.code===p.code));
 const shown = [...ordered,...others];
 const featureRows = defaultFeatureNames.map(([key,name])=>({key,name}));
 const extra = features.filter(f=>!featureRows.some(r=>r.key===f.key));
 const rows = [...featureRows,...extra.map(f=>({key:f.key,name:f.name}))];
 return <div className="mt-8 overflow-hidden rounded-[22px] border border-[#d9e9e6] bg-white shadow-sm">
   <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f1f9f7] px-5 py-5 md:px-6">
     <div><h3 className="flex items-center gap-2 text-lg font-extrabold text-[#153f43]"><ShieldCheck size={21} className="text-[#087768]"/> What’s included in each plan?</h3><p className="mt-1 text-xs text-slate-500">Live comparison from saved plan permissions. Changes appear after saving.</p></div>
     <span className="rounded-full border border-[#b7dcd2] bg-white px-3 py-1 text-xs font-bold text-[#087768]">{shown.length} Property Plans</span>
   </div>
   <div className="overflow-x-auto">
    <table className="w-full min-w-[780px] border-collapse text-left text-sm">
     <thead><tr className="bg-[#f8fbfa] text-[#21484c]"><th className="sticky left-0 z-10 min-w-[220px] border-b border-r border-[#e4eeeb] bg-[#f8fbfa] px-5 py-4">Features</th>{shown.map((p,i)=><th key={p.code} className={`min-w-[145px] border-b border-[#e4eeeb] px-3 py-4 text-center ${i===3?'bg-[#f4efff]':i===2?'bg-[#fffaf0]':''}`}><div className="font-extrabold">{p.name}</div><div className="mt-1 text-xs font-semibold text-[#087768]">{p.credits?.toLocaleString()} Credits</div><div className="mt-0.5 text-xs font-normal text-slate-500">{p.durationDays} Days</div></th>)}</tr></thead>
     <tbody>{rows.map((f,i)=><tr key={f.key} className={i%2?'bg-[#fcfdfd]':'bg-white'}><td className={`sticky left-0 border-r border-b border-[#edf2f1] px-5 py-3 font-medium text-[#38545a] ${i%2?'bg-[#fcfdfd]':'bg-white'}`}>{f.name}</td>{shown.map(p=><td key={p.code} className="border-b border-[#edf2f1] px-3 py-3 text-center">{(p.features||[]).includes(f.key)?<Check size={19} strokeWidth={3} className="mx-auto text-[#087768]" aria-label="Included"/>:<Minus size={18} className="mx-auto text-slate-300" aria-label="Not included"/>}</td>)}</tr>)}</tbody>
    </table>
   </div>
   {shown.length===0&&<p className="p-5 text-sm text-slate-500">Plans will appear here once the promotion plan API loads.</p>}
   <p className="bg-[#eef8f5] px-5 py-3 text-xs text-[#38655f]">Only enabled benefits are included in a plan. Final Admin approval is required for every property promotion, regardless of the comparison row.</p>
 </div>;
}

