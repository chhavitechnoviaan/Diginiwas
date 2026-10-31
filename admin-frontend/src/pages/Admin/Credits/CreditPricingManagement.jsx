import AllPromotionRequests from "./AllPromotionRequests";
import CustomPromotionPlans from "./CustomPromotionPlans";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BadgeIndianRupee,
  Bolt,
  Crown,
  MapPin,
  Save,
  RotateCcw,
  UnlockKeyhole,
  UserRound,
  Building2,
  WalletCards,
  Activity,
  CheckCircle2,
} from "lucide-react";

import {
  getCreditSettingsApi,
  updateCreditSettingsApi,
  resetCreditSettingsApi,
} from "../../../Services/creditSettingService";

const PRODUCT_GROUPS = [
  {
    id: "boost",
    title: "Boost Management",
    description:
      "Configure partner and property boost credit charges.",
    icon: Bolt,
    items: [
      "PARTNER_BOOST",
      "PROPERTY_BOOST",
    ],
  },

  {
    id: "featured",
    title: "Featured Management",
    description:
      "Manage featured placement pricing.",
    icon: Crown,
    items: [
      "PARTNER_FEATURED",
      "FEATURED_7_DAYS",
    ],
  },

  {
    id: "locality",
    title: "Locality Management",
    description:
      "Configure locality top ranking charges.",
    icon: MapPin,
    items: [
      "PARTNER_LOCALITY_TOP",
      "LOCALITY_TOP_30_DAYS",
    ],
  },
];

const defaultProducts = [
  {
    code: "LEAD_UNLOCK",
    label: "Lead Unlock",
    credits: 25,
    targetType: "Lead",
    durationDays: null,
    isActive: true,
  },

  {
    code: "PARTNER_BOOST",
    label: "Boost Partner",
    credits: 99,
    targetType: "Partner",
    durationDays: 7,
    isActive: true,
  },

  {
    code: "PROPERTY_BOOST",
    label: "Boost Property",
    credits: 100,
    targetType: "Property",
    durationDays: 7,
    isActive: true,
  },

  {
    code: "PARTNER_FEATURED",
    label: "Featured Partner",
    credits: 149,
    targetType: "Partner",
    durationDays: 7,
    isActive: true,
  },

  {
    code: "FEATURED_7_DAYS",
    label: "Featured Property",
    credits: 160,
    targetType: "Property",
    durationDays: 7,
    isActive: true,
  },

  {
    code: "PARTNER_LOCALITY_TOP",
    label: "Partner Locality Top",
    credits: 200,
    targetType: "Partner",
    durationDays: 30,
    isActive: true,
  },

  {
    code: "LOCALITY_TOP_30_DAYS",
    label: "Property Locality Top",
    credits: 210,
    targetType: "Property",
    durationDays: 30,
    isActive: true,
  },
];

const getTypeIcon = (
  type
) => {
  if (type === "Partner")
    return UserRound;

  if (type === "Property")
    return Building2;

  return UnlockKeyhole;
};

const InputLabel = ({
  children,
}) => (
  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
    {children}
  </p>
);

const ServiceCard = ({
  product,
  onChange,
}) => {
  const TypeIcon =
    getTypeIcon(
      product.targetType
    );

  return (
    <div
      className="
        rounded-[18px]
        border border-[#d8e1e8]
        p-4
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_10px_30px_rgba(15,45,70,0.08)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-11 w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#e8f7f4]
              text-[#007566]
            "
          >
            <TypeIcon
              size={21}
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-bold text-[#1F3C50]">
              {product.label}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              {
                product.targetType
              }{" "}
              Service
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange(
              product.code,
              "isActive",
              !product.isActive
            )
          }
          className={`
            rounded-full
            px-3 py-1.5
            text-[10px]
            font-bold
            transition
            ${
              product.isActive
                ? "bg-[#e6f7f3] text-[#007566]"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          {product.isActive
            ? "ACTIVE"
            : "DISABLED"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <InputLabel>
            Credit Price
          </InputLabel>

          <div className="relative">
            <input
              type="number"
              min="0"
              value={
                product.credits
              }
              onChange={(e) =>
                onChange(
                  product.code,
                  "credits",
                  e.target.value
                )
              }
              className="
                h-11 w-full
                rounded-xl
                border border-[#d8e1e8]
                bg-[#f8fafc]
                px-3 pr-16
                text-sm
                font-bold
                text-[#1F3C50]
                outline-none
                transition
                focus:border-[#007566]
                focus:bg-white
                focus:ring-2
                focus:ring-[#007566]/10
              "
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
              CREDITS
            </span>
          </div>
        </div>

        <div>
          <InputLabel>
            Duration
          </InputLabel>

          <div className="relative">
            <input
              type="number"
              min="1"
              disabled={
                product.durationDays ===
                null
              }
              value={
                product.durationDays ??
                ""
              }
              onChange={(e) =>
                onChange(
                  product.code,
                  "durationDays",
                  e.target.value
                )
              }
              placeholder="N/A"
              className="
                h-11 w-full
                rounded-xl
                border border-[#d8e1e8]
                bg-[#f8fafc]
                px-3 pr-12
                text-sm
                font-bold
                text-[#1F3C50]
                outline-none
                disabled:bg-slate-100
                disabled:text-slate-400
                focus:border-[#007566]
              "
            />

            {product.durationDays !==
              null && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
                DAYS
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">
          Customer pays
        </span>

        <span className="text-sm font-extrabold text-[#007566]">
          {product.credits ||
            0}{" "}
          Credits
        </span>
      </div>
    </div>
  );
};

export default function CreditPricingManagement() {
  const [
    creditsPerRupee,
    setCreditsPerRupee,
  ] = useState(1);

  const [
    products,
    setProducts,
  ] = useState(
    defaultProducts
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    version,
    setVersion,
  ] = useState(1);

  const loadSettings =
    async () => {
      try {
        setLoading(true);

        const response =
          await getCreditSettingsApi();

        const data =
          response?.data;

        if (data) {
          setCreditsPerRupee(
            Number(
              data.creditsPerRupee ||
                1
            )
          );

          if (
            Array.isArray(
              data.products
            )
          ) {
            setProducts(
              data.products
            );
          }

          setVersion(
            data.version || 1
          );
        }
      } catch (error) {
        console.error(
          error
        );

        setMessage(
          "Unable to load credit pricing."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSettings();
  }, []);

  const productMap =
    useMemo(() => {
      return Object.fromEntries(
        products.map(
          (product) => [
            product.code,
            product,
          ]
        )
      );
    }, [products]);

  const updateProduct = (
    code,
    key,
    value
  ) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.code === code
          ? {
              ...item,

              [key]:
                key ===
                  "credits" ||
                key ===
                  "durationDays"
                  ? value === ""
                    ? ""
                    : Number(
                        value
                      )
                  : value,
            }
          : item
      )
    );
  };

  const saveSettings =
    async () => {
      try {
        setSaving(true);
        setMessage("");

        const payload = {
          creditsPerRupee:
            Number(
              creditsPerRupee
            ),

          products:
            products.map(
              (item) => ({
                code:
                  item.code,

                credits:
                  Number(
                    item.credits ||
                      0
                  ),

                durationDays:
                  item.durationDays ===
                    "" ||
                  item.durationDays ===
                    null
                    ? null
                    : Number(
                        item.durationDays
                      ),

                isActive:
                  item.isActive,
              })
            ),
        };

        const response =
          await updateCreditSettingsApi(
            payload
          );

        if (
          response?.success
        ) {
          setVersion(
            response.data
              ?.version ||
              version
          );

          setMessage(
            "Credit pricing saved successfully."
          );

          await loadSettings();
        }
      } catch (error) {
        console.error(
          error
        );

        setMessage(
          error?.response?.data
            ?.message ||
            "Unable to save settings."
        );
      } finally {
        setSaving(false);
      }
    };

  const resetSettings =
    async () => {
      const confirmed =
        window.confirm(
          "Reset all credit prices to default values?"
        );

      if (!confirmed)
        return;

      try {
        setSaving(true);

        await resetCreditSettingsApi();

        await loadSettings();

        setMessage(
          "Default pricing restored."
        );
      } catch (error) {
        setMessage(
          "Unable to reset pricing."
        );
      } finally {
        setSaving(false);
      }
    };

  const leadUnlock =
    productMap.LEAD_UNLOCK;

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#f4f6f8]">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#007566]/20 border-t-[#007566]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-1 md:p-1">
      {/* ============================= */}
      {/* TOP TITLE */}
      {/* ============================= */}

      <div className="rounded-[18px]  px-1 py-1 ">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold text-[#1F3C50]">
              Credit Pricing
              Management
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Control credit
              conversion, lead
              unlock and promotion
              pricing from one
              place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* <div className="rounded-full bg-[#e8f7f4] px-4 py-2 text-xs font-bold text-[#007566]">
              Active: Credit
              Management
            </div> */}

            <div className="rounded-full bg-[#eef4f8] px-4 py-2 text-xs font-bold text-[#1F3C50]">
              Pricing Version{" "}
              {version}
            </div>
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* SUMMARY */}
      {/* ============================= */}

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={
            BadgeIndianRupee
          }
          title="Credit Conversion"
          value={`₹1 = ${creditsPerRupee} Credit${
            Number(
              creditsPerRupee
            ) === 1
              ? ""
              : "s"
          }`}
          subtext="Current purchase rate"
        />

        <SummaryCard
          icon={
            UnlockKeyhole
          }
          title="Lead Unlock"
          value={`${
            leadUnlock
              ?.credits || 0
          } Credits`}
          subtext="Per lead"
        />

        <SummaryCard
          icon={WalletCards}
          title="Services"
          value={`${
            products.filter(
              (item) =>
                item.isActive
            ).length
          } Active`}
          subtext={`${products.length} configured`}
        />

        <SummaryCard
          icon={Activity}
          title="Configuration"
          value={`Version ${version}`}
          subtext="Live pricing"
        />
      </div>

      {/* ============================= */}
      {/* CREDIT RATE */}
      {/* ============================= */}

      <div className="mt-4 rounded-[18px] border border-[#d8e1e8] bg-white p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f3ff] text-[#2386d9]">
              <BadgeIndianRupee
                size={23}
              />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-[#1F3C50]">
                Credit Conversion
                Rate
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Decide how many
                wallet credits a
                partner receives
                against ₹1.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="flex h-12 items-center rounded-xl border border-[#d8e1e8] bg-[#f8fafc]">
              <div className="px-4 font-extrabold text-[#1F3C50]">
                ₹1
              </div>

              <div className="text-slate-300">
                =
              </div>

              <input
                type="number"
                min="0.01"
                step="0.01"
                value={
                  creditsPerRupee
                }
                onChange={(e) =>
                  setCreditsPerRupee(
                    e.target.value
                  )
                }
                className="h-full w-24 bg-transparent px-3 text-center font-extrabold text-[#007566] outline-none"
              />

              <div className="pr-4 text-xs font-bold uppercase text-slate-500">
                Credits
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[100, 500, 1000].map(
            (amount) => (
              <div
                key={amount}
                className="rounded-xl bg-[#f6f8fa] px-4 py-3"
              >
                <p className="text-xs text-slate-500">
                  Partner pays ₹
                  {amount}
                </p>

                <p className="mt-1 font-extrabold text-[#1F3C50]">
                  Receives{" "}
                  {Math.floor(
                    amount *
                      Number(
                        creditsPerRupee ||
                          0
                      )
                  )}{" "}
                  Credits
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* ============================= */}
      {/* LEAD UNLOCK */}
      {/* ============================= */}

      {leadUnlock && (
        <div className="mt-4">
          <SectionHeader
            icon={
              UnlockKeyhole
            }
            title="Lead Unlock Pricing"
            description="Set the number of credits charged whenever a partner unlocks one lead."
          />

          <div className="mt-3 grid gap-4 xl:grid-cols-2">
            <ServiceCard
              product={
                leadUnlock
              }
              onChange={
                updateProduct
              }
            />

            <div className="rounded-[18px] border border-[#d8e1e8] bg-[#1F3C50] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Partner Experience
              </p>

              <h3 className="mt-3 text-xl font-extrabold">
                Unlock Lead
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/70">
                Contact details
                become available
                only after the
                required credits
                are successfully
                debited.
              </p>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span className="text-sm">
                  Unlock Cost
                </span>

                <strong className="text-lg text-[#38d7ac]">
                  {
                    leadUnlock.credits
                  }{" "}
                  Credits
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* SERVICE GROUPS */}
      {/* ============================= */}

      {PRODUCT_GROUPS.map(
        (group) => {
          const groupProducts =
            group.items
              .map(
                (code) =>
                  productMap[
                    code
                  ]
              )
              .filter(Boolean);

          return (
            <div
              key={group.id}
              className="mt-5"
            >
              <SectionHeader
                icon={
                  group.icon
                }
                title={
                  group.title
                }
                description={
                  group.description
                }
              />

              {group.id === "locality" && <AllPromotionRequests/>}
              <div className="mt-3 grid gap-4 lg:grid-cols-2">
                {groupProducts.map(
                  (
                    product
                  ) => (
                    <ServiceCard
                      key={
                        product.code
                      }
                      product={
                        product
                      }
                      onChange={
                        updateProduct
                      }
                    />
                  )
                )}
              </div>
            </div>
          );
        }
      )}

      <CustomPromotionPlans/>

      {/* ============================= */}
      {/* SAVE FOOTER */}
      {/* ============================= */}

      <div className="sticky bottom-4 z-20 mt-6 rounded-[18px] border border-[#d8e1e8] bg-white/95 p-4 shadow-[0_10px_35px_rgba(12,47,73,0.14)] backdrop-blur">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            {message ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-[#007566]">
                <CheckCircle2
                  size={17}
                />

                {message}
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-[#1F3C50]">
                  Credit
                  configuration
                </p>

                <p className="text-xs text-slate-500">
                  Saved values
                  become applicable
                  to new
                  transactions.
                </p>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={
                resetSettings
              }
              disabled={saving}
              className="
                flex h-11
                items-center
                gap-2
                rounded-xl
                border
                border-[#d8e1e8]
                px-4
                text-sm
                font-bold
                text-[#1F3C50]
                transition
                hover:bg-slate-50
              "
            >
              <RotateCcw
                size={16}
              />

              Reset
            </button>

            <button
              onClick={
                saveSettings
              }
              disabled={saving}
              className="
                flex h-11
                items-center
                gap-2
                rounded-xl
                bg-[#007566]
                px-6
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-[#007566]/15
                transition
                hover:bg-[#005f54]
                disabled:opacity-60
              "
            >
              <Save
                size={16}
              />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtext,
}) {
  return (
    <div className="rounded-[18px] border border-[#d8e1e8] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
          <Icon size={19} />
        </div>

        <span className="rounded-full bg-[#f1f5f7] px-2.5 py-1 text-[9px] font-bold uppercase text-slate-500">
          Live
        </span>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-[21px] font-extrabold text-[#1F3C50]">
        {value}
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        {subtext}
      </p>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7f4] text-[#007566]">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-[17px] font-extrabold text-[#1F3C50]">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}