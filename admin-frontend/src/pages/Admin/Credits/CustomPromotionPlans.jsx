import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Check, CirclePause, CirclePlay, Plus, Sparkles, LayoutGrid, RefreshCcw } from 'lucide-react';

const api = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('token') || ''}` } });
const initial = { name: '', targetType: 'PROPERTY', placement: 'BOOST', credits: 99, durationDays: 7, description: '' };
const normalized = value => String(value || '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');

export default function CustomPromotionPlans() {
  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [draft, setDraft] = useState(initial);
  const [newFeature, setNewFeature] = useState('');
  const [featureTarget, setFeatureTarget] = useState('PROPERTY');
  const [selected, setSelected] = useState([]);
  const [matrixTarget, setMatrixTarget] = useState('PROPERTY');
  const [availabilityFilter, setAvailabilityFilter] = useState('UNLIVE');
  const [working, setWorking] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    const [p, f] = await Promise.all([
      axios.get(`${api}/promotion-plans/all`, auth()),
      axios.get(`${api}/promotion-plans/features`, auth()),
    ]);
    setPlans(p.data?.data?.plans || []);
    setFeatures(f.data?.data?.features || []);
  };
  useEffect(() => { load().catch(e => setError(e.response?.data?.message || e.message)); }, []);

  const customPlans = useMemo(() => plans.filter(p => !p.isBasic), [plans]);
  const targetPlans = useMemo(() => plans.filter(p => p.targetType === matrixTarget), [plans, matrixTarget]);
  const matrixFeatures = useMemo(() => features.filter(f => f.targetType === 'BOTH' || f.targetType === matrixTarget), [features, matrixTarget]);
  const draftFeatures = useMemo(() => features.filter(f => f.targetType === 'BOTH' || f.targetType === draft.targetType), [features, draft.targetType]);
  const listedPlans = useMemo(() => customPlans.filter(p => availabilityFilter === 'LIVE' ? p.isActive : !p.isActive), [customPlans, availabilityFilter]);
  const liveCount = customPlans.filter(p => p.isActive).length;
  const unliveCount = customPlans.length - liveCount;

  async function save(fn, ok = 'Changes saved successfully') {
    setWorking('saving'); setError(''); setNotice('');
    try { await fn(); await load(); setNotice(ok); }
    catch (e) { setError(e.response?.data?.message || e.message); }
    finally { setWorking(''); }
  }
  const createFeature = async e => {
    e.preventDefault();
    await save(async () => { await axios.post(`${api}/promotion-plans/features`, { name: newFeature.trim(), targetType: featureTarget }, auth()); setNewFeature(''); }, 'Feature added to library');
  };
  const createPlan = async e => {
    e.preventDefault();
    await save(async () => {
      await axios.post(`${api}/promotion-plans`, { ...draft, credits: Number(draft.credits), durationDays: Number(draft.durationDays), features: selected }, auth());
      setDraft(initial); setSelected([]); setAvailabilityFilter('UNLIVE');
    }, 'Plan created as Unlive. Activate it when ready.');
  };
  const edit = (plan, field, value) => save(() => axios.patch(`${api}/promotion-plans/${plan._id}`, { [field]: value }, auth()));
  const toggleFeature = (plan, key, checked) => {
    const current = (plan.features || []).map(normalized);
    const next = checked ? [...new Set([...current, key])] : current.filter(x => x !== key);
    return save(() => axios.patch(`${api}/promotion-plans/${plan.code}/features`, { features: next }, auth()));
  };

  return <section className="mt-8 space-y-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-xl font-bold text-[#123C4A]">Promotion Plans & Feature Permissions</h2><p className="mt-1 text-sm text-slate-500">Create your own features, assign them to plans, and publish plans when ready. Admin approval remains required for every promotion request.</p></div>
      <button type="button" onClick={() => save(async () => {}, 'Plans refreshed')} disabled={!!working} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-slate-700"><RefreshCcw size={15}/> Refresh</button>
    </div>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {notice && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
    <div className="grid gap-5 lg:grid-cols-2">
      <form onSubmit={createFeature} className="space-y-3 rounded-xl border p-4">
        <h3 className="flex items-center gap-2 font-semibold text-[#123C4A]"><Plus size={17}/> Create Feature</h3>
        <input required maxLength={100} className="w-full rounded-lg border p-2" placeholder="e.g. Priority Site Visit Assistance" value={newFeature} onChange={e => setNewFeature(e.target.value)}/>
        <select className="w-full rounded-lg border p-2" value={featureTarget} onChange={e => setFeatureTarget(e.target.value)}><option value="PROPERTY">Property plans</option><option value="PARTNER">Partner profile plans</option><option value="BOTH">Both types</option></select>
        <button disabled={!!working} className="rounded-lg bg-[#075E50] px-4 py-2 font-semibold text-white disabled:opacity-50">Add to Feature Library</button>
        <p className="text-xs text-slate-500">Only Admin-created features appear in the plan checklist. Creating a feature does not activate its underlying service.</p>
      </form>
      <form onSubmit={createPlan} className="space-y-3 rounded-xl border p-4">
        <h3 className="flex items-center gap-2 font-semibold text-[#123C4A]"><Sparkles size={17}/> Create Custom Plan</h3>
        <input required className="w-full rounded-lg border p-2" placeholder="Plan name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}/>
        <div className="grid grid-cols-2 gap-2">
          <select className="rounded-lg border p-2" value={draft.targetType} onChange={e => { setDraft({ ...draft, targetType: e.target.value }); setSelected([]); }}><option value="PROPERTY">Property</option><option value="PARTNER">Partner profile</option></select>
          <select className="rounded-lg border p-2" value={draft.placement} onChange={e => setDraft({ ...draft, placement: e.target.value })}><option value="BOOST">Boost</option><option value="FEATURED">Featured</option><option value="LOCALITY_TOP">Locality Top</option></select>
          <label className="text-xs">Credits<input type="number" min="0" required className="mt-1 w-full rounded-lg border p-2" value={draft.credits} onChange={e => setDraft({ ...draft, credits: e.target.value })}/></label>
          <label className="text-xs">Duration (days)<input type="number" min="1" required className="mt-1 w-full rounded-lg border p-2" value={draft.durationDays} onChange={e => setDraft({ ...draft, durationDays: e.target.value })}/></label>
        </div>
        <textarea className="w-full rounded-lg border p-2" placeholder="Description" value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })}/>
        <div><p className="mb-2 text-xs font-semibold text-slate-700">Choose features from your library</p>{draftFeatures.length ? <div className="flex flex-wrap gap-2">{draftFeatures.map(f => <label key={f.key} className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2 text-xs"><input type="checkbox" checked={selected.includes(f.key)} onChange={e => setSelected(v => e.target.checked ? [...v, f.key] : v.filter(x => x !== f.key))}/>{f.name}</label>)}</div> : <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">No features created for this plan type. Add features in the Feature Library first, or create a plan without extras.</p>}</div>
        <button disabled={!!working} className="rounded-lg bg-[#075E50] px-4 py-2 font-semibold text-white disabled:opacity-50">Create Unlive Plan</button>
      </form>
    </div>
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-lg font-semibold text-[#123C4A]"><LayoutGrid size={18}/> What's included in each plan?</h3><div className="flex gap-2"><button type="button" onClick={() => setMatrixTarget('PROPERTY')} className={`rounded-lg px-3 py-2 text-sm ${matrixTarget === 'PROPERTY' ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>Property Plans</button><button type="button" onClick={() => setMatrixTarget('PARTNER')} className={`rounded-lg px-3 py-2 text-sm ${matrixTarget === 'PARTNER' ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>Partner Plans</button></div></div>
      <p className="text-xs text-slate-500">All six basic plans and every Admin-created plan appear here. Only your created features are shown as rows; checked permissions are saved to the backend.</p>
      <div className="overflow-x-auto rounded-xl border"><table className="min-w-full border-collapse text-sm"><thead><tr className="bg-slate-100"><th className="sticky left-0 z-10 min-w-56 bg-slate-100 p-3 text-left">Your Features</th>{targetPlans.map(p => <th className="min-w-40 border-l p-3 text-center" key={p.code}><div className="font-semibold">{p.name}</div><div className="text-xs font-normal text-slate-500">{p.durationDays} days · {p.credits} credits</div><span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] ${p.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{p.isActive ? 'LIVE' : 'UNLIVE'}</span></th>)}</tr></thead><tbody>{matrixFeatures.map(f => <tr key={f.key} className="border-t hover:bg-slate-50"><th className="sticky left-0 bg-white p-3 text-left font-normal">{f.name}</th>{targetPlans.map(p => <td key={p.code} className="border-l p-3 text-center"><input aria-label={`${f.name} for ${p.name}`} type="checkbox" disabled={!!working} className="h-5 w-5 cursor-pointer accent-emerald-700" checked={(p.features || []).map(normalized).includes(f.key)} onChange={e => toggleFeature(p, f.key, e.target.checked)}/></td>)}</tr>)}</tbody></table>{!matrixFeatures.length && <p className="p-5 text-center text-sm text-slate-500">Create a feature above to start managing plan permissions.</p>}</div>
    </div>
    <div className="space-y-4">
      <div><h3 className="text-lg font-semibold text-[#123C4A]">Manage Custom Plan Prices & Availability</h3><p className="mt-1 text-sm text-slate-500">New plans stay Unlive until published. Switch them Live to make them available to eligible Seller and Partner apps.</p></div>
      <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setAvailabilityFilter('LIVE')} className={`flex items-center justify-between rounded-xl border p-4 text-left ${availabilityFilter === 'LIVE' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'bg-white'}`}><span className="flex items-center gap-2 font-semibold text-emerald-800"><CirclePlay size={20}/> Live Plans</span><span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-800">{liveCount}</span></button><button type="button" onClick={() => setAvailabilityFilter('UNLIVE')} className={`flex items-center justify-between rounded-xl border p-4 text-left ${availabilityFilter === 'UNLIVE' ? 'border-slate-500 bg-slate-100 ring-1 ring-slate-500' : 'bg-white'}`}><span className="flex items-center gap-2 font-semibold text-slate-700"><CirclePause size={20}/> Unlive Plans</span><span className="rounded-full bg-slate-200 px-3 py-1 font-bold text-slate-700">{unliveCount}</span></button></div>
      {!listedPlans.length ? <div className="rounded-xl border border-dashed p-8 text-center text-sm text-slate-500">No {availabilityFilter.toLowerCase()} custom plans yet.</div> : <div className="grid gap-4 lg:grid-cols-2">{listedPlans.map(p => <article key={p.code} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-2"><div><div className="font-bold text-[#123C4A]">{p.name}</div><div className="mt-1 text-xs text-slate-500">{p.targetType === 'PROPERTY' ? 'Property' : 'Partner profile'} · {p.placement.replaceAll('_', ' ')}</div></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${p.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{p.isActive ? '● LIVE' : '○ UNLIVE'}</span></div><p className="mt-2 text-xs text-slate-500">{p.description || 'No description added'}</p><div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs font-medium text-slate-600">Credits<input key={`${p.code}-credits-${p.credits}`} type="number" min="0" defaultValue={p.credits} onBlur={e => Number(e.target.value) !== p.credits && edit(p, 'credits', Number(e.target.value))} className="mt-1 w-full rounded-lg border p-2"/></label><label className="text-xs font-medium text-slate-600">Duration (days)<input key={`${p.code}-days-${p.durationDays}`} type="number" min="1" defaultValue={p.durationDays} onBlur={e => Number(e.target.value) !== p.durationDays && edit(p, 'durationDays', Number(e.target.value))} className="mt-1 w-full rounded-lg border p-2"/></label></div><div className="mt-3 text-xs text-slate-500">{(p.features || []).length} selected feature(s)</div><button type="button" disabled={!!working} onClick={() => edit(p, 'isActive', !p.isActive)} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold disabled:opacity-50 ${p.isActive ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}>{p.isActive ? <><CirclePause size={17}/> Make Unlive</> : <><Check size={17}/> Make Live</>}</button></article>)}</div>}
    </div>
  </section>;
}
