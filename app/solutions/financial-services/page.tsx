import SolutionLayout from "@/components/shared/SolutionLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Services Research Solutions — Prime Eye Research",
  description: "Trust and satisfaction tracking, digital banking UX research, and competitive benchmarking for financial services firms.",
};

export default function FinancialServicesPage() {
  return (
    <SolutionLayout
      badge="Industry Solution · Financial Services"
      title="Building Trust Through Deeper Understanding"
      subtitle="Trust is the foundation of every financial relationship. We help banks, insurers, and fintechs measure, protect, and grow the trust that drives customer lifetime value."
      challenges={[
        { title: "Trust Erosion Risk", desc: "Financial services brands are particularly vulnerable to trust damage. Early detection of perception shifts is critical to protecting customer relationships." },
        { title: "Digital Adoption Barriers", desc: "Despite heavy investment in digital channels, many customers still prefer human interaction for complex financial decisions. Research illuminates when and why." },
        { title: "Competitive Disruption", desc: "Fintech entrants are rapidly reshaping customer expectations. Traditional players need continuous intelligence on how competitive perceptions are evolving." },
        { title: "Complex Product Communication", desc: "Financial products are inherently complex. Research reveals how customers actually understand — and misunderstand — what they're being sold." },
      ]}
      approach={[
        { title: "Trust & Satisfaction Tracking", desc: "Regular measurement of trust, satisfaction, and advocacy among customer segments, with sensitive detection of early warning signals." },
        { title: "Digital Banking UX Research", desc: "User testing of mobile and web banking interfaces, onboarding flows, and self-service journeys to identify and remove friction." },
        { title: "Competitive Benchmarking", desc: "Regular comparative assessment of your brand against direct competitors and fintech challengers across key perception dimensions." },
        { title: "Product Comprehension Testing", desc: "Research to evaluate how well customers understand product terms, pricing, and benefits — critical for compliance and customer satisfaction." },
        { title: "Customer Needs Segmentation", desc: "Attitudinal and behavioral segmentation that goes beyond demographics to understand the distinct financial needs and decision styles of customer groups." },
        { title: "Churn Risk Identification", desc: "Predictive analytics on attitudinal data to identify customers at risk of switching before they act — enabling proactive retention intervention." },
      ]}
      caseStudy={{
        context: "A retail bank was experiencing higher-than-expected attrition in its 25-34 age segment despite competitive rates and strong mobile app ratings.",
        approach: "We conducted a multi-wave tracker among current and churned customers, combined with qualitative interviews among switchers, to understand the real drivers of departure.",
        outcome: "Revealed that product complexity at account opening — not features or rates — was the primary friction point. A simplified onboarding and communication redesign reduced 12-month churn in the segment by 18%.",
      }}
      benefits={[
        "Early warning system for trust and sentiment shifts",
        "Research-backed digital experience improvement priorities",
        "Competitive intelligence on fintech and traditional competitor perceptions",
        "Regulatory-compliant research methodology and data handling",
        "Segmentation that enables targeted retention and acquisition strategy",
      ]}
      deliverables={[
        "Trust and satisfaction tracking dashboard with trend analysis",
        "Digital UX research report with prioritized improvements",
        "Competitive positioning analysis with category benchmarks",
        "Customer segmentation with behavioral and attitudinal profiles",
        "Churn risk model and retention strategy recommendations",
      ]}
      ctaTitle="Ready to turn customer insight into competitive advantage?"
    />
  );
}
