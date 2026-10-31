import {useEffect,useState} from 'react';
import axios from 'axios';
const api=(import.meta.env.VITE_API_BASE_URL||'http://localhost:5000/api').replace(/\/$/,'');
const auth=()=>({headers:{Authorization:`Bearer ${localStorage.getItem('token')||''}`}});
export default function CustomPromotionPlans(){
 const [plans,setPlans]=useState([]),[err,setErr]=useState(''),[loading,setLoading]=useState(false);
 const [draft,setDraft]=useState({name:'',targetType:'PROPERTY',placement:'BOOST',credits:99,durationDays:7,description:'',features:''});
 const load=async()=>{try{const r=await axios.get(`${api}/promotion-plans/all`,auth());setPlans(r.data?.data?.plans||[]);}catch(e){setErr(e.response?.data?.message||e.message)}};
 useEffect(()=>{load()},[]);
 const save=async(e)=>{e.preventDefault();setLoading(true);setErr('');try{await axios.post(`${api}/promotion-plans`,{...draft,credits:Number(draft.credits),durationDays:Number(draft.durationDays),features:draft.features.split('\n').map(x=>x.trim()).filter(Boolean)},auth());setDraft({...draft,name:'',description:'',features:''});await load()}catch(e){setErr(e.response?.data?.message||e.message)}finally{setLoading(false)}};
 const change=async(id,key,value)=>{try{await axios.patch(`${api}/promotion-plans/${id}`,{[key]:value},auth());await load()}catch(e){setErr(e.response?.data?.message||e.message)}};
 return <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-bold text-[#1F3C50]">Custom Promotion Plans</h2><p className="my-2 text-sm text-slate-500">Six basic plans above remain available. New plans require Admin approval on purchase.</p>
 <form onSubmit={save} className="mt-4 grid gap-3 md:grid-cols-3">
 <input required className="rounded-lg border p-3" placeholder="Plan name" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/>
 <select className="rounded-lg border p-3" value={draft.targetType} onChange={e=>setDraft({...draft,targetType:e.target.value})}><option value="PROPERTY">Property</option><option value="PARTNER">Partner profile</option></select>
 <select className="rounded-lg border p-3" value={draft.placement} onChange={e=>setDraft({...draft,placement:e.target.value})}><option value="BOOST">Boost</option><option value="FEATURED">Featured</option><option value="LOCALITY_TOP">Locality Top</option></select>
 <label className="text-sm">Credits<input type="number" required min="0" className="mt-1 w-full rounded-lg border p-3" value={draft.credits} onChange={e=>setDraft({...draft,credits:e.target.value})}/></label>
 <label className="text-sm">Duration (days)<input type="number" required min="1" className="mt-1 w-full rounded-lg border p-3" value={draft.durationDays} onChange={e=>setDraft({...draft,durationDays:e.target.value})}/></label>
 <input className="rounded-lg border p-3" placeholder="Description" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/>
 <textarea className="rounded-lg border p-3 md:col-span-2" rows="3" placeholder="Included features (one per line)" value={draft.features} onChange={e=>setDraft({...draft,features:e.target.value})}/>
 <button disabled={loading} className="rounded-lg bg-emerald-700 p-3 font-bold text-white">{loading?'Saving...':'Create Plan'}</button>
 </form>{err&&<p className="mt-3 text-sm text-red-600" role="alert">{err}</p>}
 <div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="bg-slate-100">{['Plan','Target','Placement','Credits','Days','Active'].map(t=><th key={t} className="p-3">{t}</th>)}</tr></thead><tbody>{plans.map(p=><tr key={p.code} className="border-b"><td className="p-3">{p.name}<p className="text-xs text-slate-400">{p.code}</p></td><td className="p-3">{p.targetType}</td><td className="p-3">{p.placement}</td><td className="p-3">{p.isBasic?p.credits:<input aria-label={`Credits ${p.name}`} type="number" min="0" className="w-24 rounded border p-2" defaultValue={p.credits} key={p.code+'c'+p.credits} onBlur={e=>{if(Number(e.target.value)!==p.credits)change(p._id,'credits',Number(e.target.value))}}/>}</td><td className="p-3">{p.isBasic?p.durationDays:<input aria-label={`Days ${p.name}`} type="number" min="1" className="w-20 rounded border p-2" defaultValue={p.durationDays} key={p.code+'d'+p.durationDays} onBlur={e=>{if(Number(e.target.value)!==p.durationDays)change(p._id,'durationDays',Number(e.target.value))}}/>}</td><td className="p-3">{p.isBasic?'Basic':<input type="checkbox" checked={p.isActive} onChange={e=>change(p._id,'isActive',e.target.checked)}/>}</td></tr>)}</tbody></table></div></section>
}
