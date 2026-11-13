import React from 'react'
import HeroSection from "./AgentCorner/HeroSection";
import AgentCRMWorkflow from "./AgentCorner/AgentCRM";
import PricingPlans from "./AgentCorner/PricingPlans";
import ValueProposition from "./AgentCorner/ValueProposition";
import JourneySection from "./AgentCorner/JourneySection";
import NetworkSection from "./AgentCorner/NetworkSection";
import WhyAgentsLove from './AgentCorner/WhyAgentsLove';
import FAQSection from '../components/common/FAQSection';


const partnerCornerFaqs = [
  {
    title: "Seller FAQs",
    items: [
      { question: "Can I promote my property?", answer: "Where available, tap Promote Property. The request goes to your assigned DigiNiwas Partner." },
      { question: "Do I need DigiNiwas Credits?", answer: "No Seller wallet is required under the current model. The assigned Partner decides whether to approve a promotion using Partner Credits." },
      { question: "What if the Partner declines promotion?", answer: "Your property remains live normally and no Partner Credits are deducted for that request." },
    ],
  },
  {
    title: "Partner FAQs",
    items: [
      { question: "What are DigiNiwas Credits?", answer: "Platform credits used for eligible Partner services. Under the current commercial model, 1 Credit = ₹1 of platform value. Credits are not withdrawable cash." },
      { question: "What if I unlock an invalid lead?", answer: "Submit an eligible refund request within 48 hours of unlocking. DigiNiwas reviews the claim and restores applicable credits if approved." },
      { question: "Does DigiNiwas charge when an assigned property closes?", answer: "A Partner Service/Closure Fee may apply to DigiNiwas-assigned Seller properties. The applicable fee must be disclosed before you accept the assignment." },
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

const AgentCorner = () => {

  return (
    <div>
        <HeroSection />

      <ValueProposition />

      <WhyAgentsLove />
      
      <JourneySection />

      <AgentCRMWorkflow />

      <NetworkSection />

      <PricingPlans />

      <FAQSection
        title="Partner Corner FAQs"
        subtitle="Quick answers for Sellers and DigiNiwas Partners about credits, support and safety."
        groups={partnerCornerFaqs}
      />
    </div>
  )
}

export default AgentCorner