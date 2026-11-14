// import React from 'react'

// import HeroSection from './home/HeroSection'
// import DigiNiwasPrpperty from './home/DigiNiwasProperty'
// import NiwasAIFinds from './home/NiwasAiFind'
// import DiginiwasWorks from './home/DigiNiwasWorks'

// // Future ecosystem is shown on the Services page
// import IphoneSection from './home/IphoneSection'
// import ClientSays from './home/ClientSays';
// import MapSection from './home/MapSection'

// 
// const homeFaqs = [
//   {
//     title: "General FAQs",
//     items: [
//       { question: "What is DigiNiwas?", answer: "DigiNiwas is a digital real-estate platform that helps buyers discover properties, sellers list properties, and DigiNiwas Partners manage enquiries, site visits and supported property workflows more efficiently." },
//       { question: "Is DigiNiwas a property broker?", answer: "DigiNiwas operates as a technology-enabled property platform. Depending on the service, it may facilitate introductions, assign Seller-originated property opportunities to registered Partners and charge disclosed platform/service fees." },
//       { question: "Is DigiNiwas free to use?", answer: "Property discovery and many Seller features may be available without charge. Certain Partner features may require DigiNiwas Credits or other disclosed fees." },
//     ],
//   },
//   {
//     title: "Promotion FAQs",
//     items: [
//       { question: "Does promotion guarantee enquiries or a sale?", answer: "No. Promotion can increase visibility, but DigiNiwas does not guarantee a specific number of views, enquiries, visits or transactions." },
//     ],
//   },
//   {
//     title: "Support FAQs",
//     items: [
//       { question: "How do I contact DigiNiwas?", answer: "Use Help & Support in the app or email info@diginiwas.com." },
//     ],
//   },
//   {
//     title: "Safety FAQs",
//     items: [
//       { question: "How do I report a suspicious property?", answer: "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available." },
//     ],
//   },
// ];

// const Home = () => {

//   // text-[#274255] text-[#33cc99]
//   return (
//     <div className='bg-[#274255]'>
      
//         <HeroSection />
//         <MapSection />

//         <IphoneSection />
        
//         <DiginiwasWorks />
      
     
//         <NiwasAIFinds />
      
        
//         <DigiNiwasPrpperty/>
//         <FutureEcosystem /> 
      
//       <ClientSays />

//     </div>
//   )
// }

// export default Home



import React from 'react'

import HeroSection from './home/HeroSection'
import DigiNiwasPrpperty from './home/DigiNiwasProperty'
import NiwasAIFinds from './home/NiwasAiFind'
import DiginiwasWorks from './home/DigiNiwasWorks'

// Future ecosystem is shown on the Services page
import IphoneSection from './home/IphoneSection'
import ClientSays from './home/ClientSays';
import MapSection from './home/MapSection'
import PropertyResearchTools from './home/PropertyResearchTools'
import HomeSellPropertyCTA from './home/HomeSellPropertyCTA'
import HomeNewsArticles from './home/HomeNewsArticles'
import PropertyDiscoverySection from './home/PropertyDiscoverySection'
import FAQSection from '../components/common/FAQSection'


const homeFaqs = [
  {
    title: "General FAQs",
    items: [
      { question: "What is DigiNiwas?", answer: "DigiNiwas is a digital real-estate platform that helps buyers discover properties, sellers list properties, and DigiNiwas Partners manage enquiries, site visits and supported property workflows more efficiently." },
      { question: "Is DigiNiwas a property broker?", answer: "DigiNiwas operates as a technology-enabled property platform. Depending on the service, it may facilitate introductions, assign Seller-originated property opportunities to registered Partners and charge disclosed platform/service fees." },
      { question: "Is DigiNiwas free to use?", answer: "Property discovery and many Seller features may be available without charge. Certain Partner features may require DigiNiwas Credits or other disclosed fees." },
    ],
  },
  {
    title: "Promotion FAQs",
    items: [
      { question: "Does promotion guarantee enquiries or a sale?", answer: "No. Promotion can increase visibility, but DigiNiwas does not guarantee a specific number of views, enquiries, visits or transactions." },
    ],
  },
  {
    title: "Support FAQs",
    items: [
      { question: "How do I contact DigiNiwas?", answer: "Use Help & Support in the app or email info@diginiwas.com." },
    ],
  },
  {
    title: "Safety FAQs",
    items: [
      { question: "How do I report a suspicious property?", answer: "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available." },
    ],
  },
];

const Home = () => {

  // text-[#274255] text-[#33cc99]
  return (
    <div className='bg-[#274255] overflow-hidden'>
      
        <HeroSection />
        {/* <MapSection /> */}

        <IphoneSection />
        
        <DiginiwasWorks />

        {/* <PropertyResearchTools /> */}

        <NiwasAIFinds />

        <PropertyDiscoverySection variant="ai" title="Niwas AI Suggested Properties" subtitle="AI-curated live properties based on your current location and DigiNiwas inventory." compact />

        <HomeSellPropertyCTA />

        <HomeNewsArticles />

        <DigiNiwasPrpperty/>

        <ClientSays />

        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Quick answers about DigiNiwas, property promotion, support and safety."
          groups={homeFaqs}
          dark
        />

    </div>
  )
}

export default Home