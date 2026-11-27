import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  WalletCards,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  RefreshCcw,
  Plus,
  Minus,
  History,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Gift,
  IndianRupee,
  Filter,
} from "lucide-react";
// import "./index.css";

const seed = [
  {
    id: "PRT-43286",
    name: "Chhavi Chaturvedi",
    email: "chhavichaturvedi@gmail.com",
    type: "Partner",
    balance: 0,
    purchased: 0,
    spent: 0,
    avatar: "C",
  },
  {
    id: "PRT-26369681",
    name: "Amit Verma",
    email: "chhavichaturvedi012@gmail.com",
    type: "Team Partner",
    balance: 25225,
    purchased: 25250,
    spent: 25,
    avatar: "A",
  },
  {
    id: "PRT-71145981",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    type: "Partner",
    balance: 480,
    purchased: 500,
    spent: 20,
    avatar: "R",
  },
  {
    id: "ADM-00001",
    name: "DigiNiwas Admin",
    email: "admin@diginiwas.com",
    type: "Admin",
    balance: 1000,
    purchased: 0,
    spent: 0,
    avatar: "D",
  },
];
const money = (n) => new Intl.NumberFormat("en-IN").format(n);
const Card = ({ icon: Icon, label, value, tone = "blue", note }) => {
  const c = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-emerald-50 text-emerald-500",
    orange: "bg-orange-50 text-orange-500",
    red: "bg-rose-50 text-rose-500",
  }[tone];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className={`rounded-xl p-3 ${c}`}>
          <Icon size={22} />
        </span>
        <span className="text-[10px] text-slate-400">{note}</span>
      </div>
      <p className="mt-5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
};

function Modal({ mode, onClose, accounts, onApply }) {
  const [scope, setScope] = useState("single");
  const [selected, setSelected] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [query, setQuery] = useState("");
  const filtered = accounts.filter((a) =>
    (a.name + a.id + a.email).toLowerCase().includes(query.toLowerCase()),
  );
  const all = scope === "all" ? accounts.map((a) => a.id) : selected;
  const valid =
    Number(amount) > 0 && all.length > 0 && reason.trim().length >= 5;
  const choose = (id) =>
    setSelected((s) =>
      scope === "single"
        ? [id]
        : s.includes(id)
          ? s.filter((x) => x !== id)
          : [...s, id],
    );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold">
              {mode === "add" ? "Add Credits" : "Withdraw Credits"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Apply credits to a single or multiple accounts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border p-2 hover:bg-slate-50"
          >
            <X size={19} />
          </button>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <label className="text-sm font-semibold">Account selection</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                ["single", "Single"],
                ["multiple", "Multiple"],
                ["all", "All accounts"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => {
                    setScope(v);
                    setSelected([]);
                  }}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${scope === v ? "border-mint bg-emerald-50 text-emerald-700" : "border-slate-200"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          {scope !== "all" ? (
            <div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search partner, email or ID..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 outline-none focus:border-mint"
                />
              </div>
              <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border scrollbar">
                {filtered.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-center gap-3 border-b p-3 last:border-0 hover:bg-slate-50"
                  >
                    <input
                      type={scope === "single" ? "radio" : "checkbox"}
                      checked={selected.includes(a.id)}
                      onChange={() => choose(a.id)}
                      className="h-4 w-4 accent-emerald-500"
                    />
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                      {a.avatar}
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block truncate text-sm">{a.name}</b>
                      <span className="text-xs text-slate-400">
                        {a.id} · {money(a.balance)} credits
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <Gift size={20} className="shrink-0" />
              <span>
                This adjustment will be applied to all {accounts.length}{" "}
                eligible accounts.
              </span>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Credit amount
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 100"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-mint"
              />
            </label>
            <label className="text-sm font-semibold">
              Reference (optional)
              <input
                placeholder="Cash receipt / campaign ID"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-mint"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Reason <span className="text-rose-500">*</span>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              placeholder={
                mode === "add"
                  ? "Example: Festive bonus credits"
                  : "Example: DigiNiwas deducted credits for maintenance"
              }
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-mint"
            />
            <span className="mt-1 block text-right text-[11px] font-normal text-slate-400">
              Minimum 5 characters
            </span>
          </label>
          {amount && all.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span>Selected accounts</span>
                <b>{all.length}</b>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Total credit adjustment</span>
                <b
                  className={
                    mode === "add" ? "text-emerald-600" : "text-rose-600"
                  }
                >
                  {mode === "add" ? "+" : "-"}
                  {money(Number(amount) * all.length)} credits
                </b>
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            disabled={!valid}
            onClick={() =>
              onApply({ mode, ids: all, amount: Number(amount), reason })
            }
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 ${mode === "add" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"}`}
          >
            Confirm {mode === "add" ? "Credit Addition" : "Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [accounts, setAccounts] = useState(seed);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState("Accounts");
  const [tx, setTx] = useState([
    {
      id: "TXN-10031",
      account: "Amit Verma",
      action: "Withdraw",
      credits: 25,
      reason: "Lead unlock service charge",
      date: "09 Sep 2026, 10:20 AM",
    },
    {
      id: "TXN-10030",
      account: "All partners",
      action: "Add",
      credits: 100,
      reason: "Ganesh Chaturthi festive bonus",
      date: "08 Sep 2026, 04:15 PM",
    },
  ]);
  const list = useMemo(
    () =>
      accounts.filter((a) =>
        (a.name + a.id + a.email + a.type)
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [accounts, search],
  );
  const total = accounts.reduce((s, a) => s + a.balance, 0);
  function apply(x) {
    setAccounts((rows) =>
      rows.map((a) =>
        x.ids.includes(a.id)
          ? {
              ...a,
              balance: Math.max(
                0,
                a.balance + (x.mode === "add" ? x.amount : -x.amount),
              ),
              purchased: a.purchased + (x.mode === "add" ? x.amount : 0),
              spent:
                a.spent +
                (x.mode === "withdraw" ? Math.min(x.amount, a.balance) : 0),
            }
          : a,
      ),
    );
    setTx((t) => [
      {
        id: "TXN-" + Date.now().toString().slice(-6),
        account:
          x.ids.length === accounts.length
            ? "All accounts"
            : `${x.ids.length} selected account${x.ids.length > 1 ? "s" : ""}`,
        action: x.mode === "add" ? "Add" : "Withdraw",
        credits: x.amount,
        reason: x.reason,
        date: new Date().toLocaleString("en-IN"),
      },
      ...t,
    ]);
    setModal(null);
    setToast(
      `Credits ${x.mode === "add" ? "added" : "withdrawn"} successfully`,
    );
    setTimeout(() => setToast(""), 2800);
  }
  return (
    <main className="min-h-screen p-3 sm:p-5 lg:p-7">
      {toast && (
        <div className="fixed right-5 top-5 z-[60] flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle2 size={18} className="text-mint" />
          {toast}
        </div>
      )}
      <header className="relative overflow-hidden rounded-[22px] bg-navy px-6 py-6 text-white sm:px-8">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-emerald-400/10" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-mint">
              <WalletCards />
            </span>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                Credit Management
              </h1>
              <p className="mt-1 text-xs text-slate-200 sm:text-sm">
                Manage wallet credits, manual adjustments and complete
                transaction history
              </p>
            </div>
          </div>
          <div className="w-fit rounded-xl border border-white/10 bg-white/10 px-5 py-3">
            <span className="block text-[9px] uppercase text-slate-300">
              Current view
            </span>
            <b className="text-xs">Admin Credit Management</b>
          </div>
        </div>
      </header>
      <section className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-2xl font-bold">Wallet & Credit Management</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add or withdraw credits from single and multiple accounts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setModal("withdraw")}
            className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 shadow-sm"
          >
            <Minus size={17} />
            Withdraw Credits
          </button>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 rounded-xl bg-mint px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            <Plus size={17} />
            Add Credits
          </button>
          <button className="rounded-xl border bg-white p-2.5">
            <RefreshCcw size={18} />
          </button>
        </div>
      </section>
      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          icon={WalletCards}
          label="Credits in wallets"
          value={`${money(total)} Credits`}
          note={`${accounts.length} accounts`}
          tone="green"
        />
        <Card
          icon={ArrowDownToLine}
          label="Credits added"
          value="25,850 Credits"
          note="Manual + purchased"
        />
        <Card
          icon={ArrowUpFromLine}
          label="Credits withdrawn"
          value="145 Credits"
          note="Across all services"
          tone="orange"
        />
        <Card
          icon={Users}
          label="Total accounts"
          value={accounts.length}
          note="Active wallets"
          tone="red"
        />
      </section>
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b px-5 py-4 md:flex-row md:items-center">
          <div className="flex gap-6">
            {["Accounts", "Transactions"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-2 border-b-2 py-3 text-sm font-semibold ${tab === t ? "border-mint text-emerald-700" : "border-transparent text-slate-400"}`}
              >
                {t === "Accounts" ? <Users size={18} /> : <History size={18} />}{" "}
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search account..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 outline-none focus:border-mint"
            />
            <Filter
              className="absolute right-3 top-3 text-slate-400"
              size={17}
            />
          </div>
        </div>
        <div className="overflow-x-auto scrollbar">
          {tab === "Accounts" ? (
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
                <tr>
                  {[
                    "Account",
                    "Account type",
                    "Purchased",
                    "Spent",
                    "Balance",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                          {a.avatar}
                        </span>
                        <div>
                          <b className="block">{a.name}</b>
                          <span className="text-[11px] text-slate-400">
                            {a.id} · {a.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{a.type}</td>
                    <td className="px-5 py-4">{money(a.purchased)}</td>
                    <td className="px-5 py-4">{money(a.spent)}</td>
                    <td className="px-5 py-4 font-bold">{money(a.balance)}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setModal("add")}
                          title="Add"
                          className="rounded-lg border p-2 text-emerald-600"
                        >
                          <Plus size={15} />
                        </button>
                        <button
                          onClick={() => setModal("withdraw")}
                          title="Withdraw"
                          className="rounded-lg border p-2 text-rose-600"
                        >
                          <Minus size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[780px] text-left">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
                <tr>
                  {[
                    "Transaction ID",
                    "Account",
                    "Type",
                    "Credits",
                    "Reason",
                    "Date",
                  ].map((h) => (
                    <th className="px-5 py-3 font-medium" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tx.map((t) => (
                  <tr className="border-t text-sm" key={t.id}>
                    <td className="px-5 py-4 font-medium">{t.id}</td>
                    <td className="px-5 py-4">{t.account}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.action === "Add" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
                      >
                        {t.action}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold">
                      {t.action === "Add" ? "+" : "-"}
                      {t.credits}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-slate-500">
                      {t.reason}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {t.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <footer className="flex items-center justify-between border-t px-5 py-4 text-xs text-slate-400">
          <span>
            Showing {tab === "Accounts" ? list.length : tx.length} records
          </span>
          <div className="flex gap-1">
            <button className="rounded-lg border p-2">
              <ChevronLeft size={15} />
            </button>
            <button className="rounded-lg bg-navy px-3 text-white">1</button>
            <button className="rounded-lg border p-2">
              <ChevronRight size={15} />
            </button>
          </div>
        </footer>
      </section>
      {modal && (
        <Modal
          mode={modal}
          onClose={() => setModal(null)}
          accounts={accounts}
          onApply={apply}
        />
      )}
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
