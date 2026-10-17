import {
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowTrendingUp,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineUserGroup,
    title: "More Visibility",
    description: "Get discovered by serious buyers & tenants.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Quality Leads",
    description: "Receive genuine inquiries that convert.",
  },
  {
    icon: HiOutlineArrowTrendingUp,
    title: "Digital Growth",
    description: "Tools and insights to scale your business.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Trusted Platform",
    description: "Be part of a verified & trusted real estate network.",
  },
];



const WhyAgentsLove = () => {
  return (
   <section className="w-full bg-[#274255] py-20 sm:py-10 md:py-12 lg:py-28 px-4">
      <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-7xl">
        <div className="rounded-[24px] border border-white/10 bg-[#0B1725] shadow-[0_0_40px_rgba(0,0,0,0.35)] p-6 sm:p-8 md:p-10">
          <h2 className="text-white font-semibold text-xl sm:text-2xl md:text-3xl leading-tight">
            Why Partners Love DigiNiwas
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 ">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl p-3 hover:border hover:border-[#33cc99] transition-all duration-300 hover:bg-white/5"
                >
                  <div className="sm:flex h-14 w-14 hidden  sm:h-16 sm:w-16 md:h-[68px] md:w-[68px] shrink-0 items-center justify-center rounded-full bg-[#274255]/60">
                    <Icon className="text-[#33cc99] text-2xl sm:text-[28px]" />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl whitespace-nowrap">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[#B5BDC8] text-sm sm:text-[15px] leading-6 max-w-[220px">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyAgentsLove