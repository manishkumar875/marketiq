import ServiceLayout from "@/components/shared/ServiceLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Research — Prime Eye Research",
  description: "Strategic market assessment, competitive intelligence, and business research to support growth decisions.",
};

export default function BusinessResearchPage() {
  return (
    <ServiceLayout
      badge="Business Research"
      title="Strategic Intelligence for"
      titleBlue="Growth Decisions"
      subtitle="Move beyond consumer research into competitive intelligence, market assessment, and business analytics. We deliver the strategic insight your leadership team needs to make confident growth decisions."
      overview="Business research at Prime Eye Research bridges the gap between consumer insight and strategic intelligence. We combine primary research — surveys, interviews, and ethnography — with secondary research, competitive analysis, and market modeling to deliver integrated intelligence packages that support the decisions that matter most: entering a new market, launching a new product, evaluating an acquisition, or repositioning against a competitor. Our business research team includes economists, strategy consultants, and data scientists alongside our core research professionals."
      methodology={[
        { step: "Scope & Objective Definition", desc: "We work with your leadership team to precisely define the business decision being supported, the intelligence required, and the analytical frameworks most appropriate." },
        { step: "Secondary Research & Desk Analysis", desc: "Systematic review of industry reports, public financial data, regulatory filings, news archives, and competitive intelligence sources." },
        { step: "Primary Data Collection", desc: "Targeted surveys of customers, prospects, channel partners, or industry experts to fill gaps that secondary research cannot address." },
        { step: "Expert Interviews", desc: "Structured interviews with industry experts, former executives, analysts, or technical specialists to validate and enrich quantitative findings." },
        { step: "Market Modeling", desc: "Bottom-up market sizing, scenario modeling, and competitive landscape mapping using primary and secondary data sources." },
        { step: "Strategic Synthesis", desc: "Integrated analysis translating research findings into strategic options, recommendations, and implementation considerations." },
      ]}
      benefits={[
        "Integrated view combining primary and secondary intelligence",
        "Market sizing with methodology and confidence intervals documented",
        "Competitive landscape mapped at depth — not just surface benchmarking",
        "Expert network access providing on-the-ground market context",
        "Scenario modeling to stress-test strategic assumptions",
        "Decision-ready output, not just data — clear strategic implications",
      ]}
      useCases={[
        { title: "Market Entry Assessment", desc: "Full assessment of a new geographic or category market — sizing, competitive dynamics, regulatory landscape, and consumer readiness." },
        { title: "Competitive Intelligence", desc: "Systematic monitoring and analysis of competitor strategies, positioning, pricing, and performance to inform your competitive response." },
        { title: "M&A Due Diligence Support", desc: "Market validation, customer sentiment assessment, and competitive positioning analysis to support acquisition or partnership decisions." },
        { title: "Strategic Growth Planning", desc: "Research-backed analysis of growth opportunities, adjacency moves, and portfolio priorities to inform long-range strategy." },
      ]}
      industries={["Technology", "Financial Services", "Healthcare", "Industrial & B2B", "Consumer Goods", "Retail", "Education", "Professional Services"]}
      deliverables={[
        "Research scope document and methodology brief",
        "Secondary research synthesis and annotated bibliography",
        "Primary data collection outputs (surveys, interview notes)",
        "Market sizing model with assumptions documented",
        "Competitive landscape mapping",
        "Strategic implications report with executive summary",
        "Presentation deck for leadership or board use",
      ]}
      faqs={[
        { q: "How is business research different from consumer research?", a: "Business research typically involves smaller samples of more expert respondents, more extensive use of secondary data, and closer integration with strategic decision-making frameworks. The output is usually a comprehensive intelligence package rather than a single data report." },
        { q: "Do you sign NDAs for competitive intelligence projects?", a: "Yes. We operate under strict confidentiality agreements and our research methodology complies with all relevant ethical and legal standards. We do not use any deceptive practices to obtain information." },
        { q: "What is a typical business research timeline?", a: "A focused market assessment typically requires 4-6 weeks. Comprehensive strategic intelligence projects may run 8-12 weeks depending on scope. We can expedite for urgent strategic decisions." },
        { q: "Can you combine quantitative surveys with qualitative expert interviews?", a: "Absolutely — in fact, we recommend it. Mixed-method approaches that triangulate findings across multiple data sources produce the most robust and defensible strategic intelligence." },
      ]}
      ctaTitle="Need strategic intelligence to back your next big decision?"
    />
  );
}
