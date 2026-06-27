import SolutionLayout from "@/components/shared/SolutionLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Research Solutions — Prime Eye Research",
  description: "Product-market fit testing, UX research, feature prioritization, and developer experience research for technology companies.",
};

export default function TechnologyPage() {
  return (
    <SolutionLayout
      badge="Industry Solution · Technology"
      title="Research That Accelerates Technology Growth"
      subtitle="From product-market fit validation to developer experience research, we provide the consumer and market intelligence that technology companies need to build, launch, and scale confidently."
      challenges={[
        { title: "Product-Market Fit Uncertainty", desc: "Technology companies often build for assumed needs. Validating that real users care about the problem — and prefer your solution — before committing to scale is critical." },
        { title: "Feature Prioritization Pressure", desc: "Roadmaps are always longer than resources allow. Research-backed feature prioritization aligns product investment with what users actually need most." },
        { title: "UX Friction Identification", desc: "Conversion and retention problems often trace to friction points that analytics can identify but not explain. User research provides the why." },
        { title: "B2B Buyer Journey Complexity", desc: "Enterprise technology purchase decisions involve multiple stakeholders, long cycles, and competing evaluation criteria that require multi-audience research approaches." },
      ]}
      approach={[
        { title: "Product-Market Fit Testing", desc: "Sean Ellis methodology, Jobs-to-be-Done frameworks, and competitive substitution analysis to validate PMF before scaling investment." },
        { title: "UX & Usability Research", desc: "Task-based usability testing, cognitive walkthroughs, and heuristic evaluation to identify and prioritize friction in digital products." },
        { title: "Feature Prioritization", desc: "MaxDiff analysis, Kano model studies, and conjoint experiments to understand which features drive acquisition, retention, and willingness to pay." },
        { title: "Developer Experience Research", desc: "Specialist qualitative and quantitative research with developer audiences — understanding documentation quality, API experience, and toolchain preferences." },
        { title: "NPS & Retention Analysis", desc: "Systematic measurement of satisfaction and loyalty among user cohorts, with driver analysis to identify what to protect and improve." },
        { title: "Competitive Landscape Research", desc: "Perception and preference studies that map your competitive position against alternatives — including non-obvious substitutes." },
      ]}
      caseStudy={{
        context: "A SaaS company with strong trial conversion but poor 90-day retention needed to understand why users were churning before realizing value from the product.",
        approach: "We conducted 40 depth interviews with churned users and 25 with power users, combined with a 600-respondent survey mapping the onboarding experience and first-value moment.",
        outcome: "Discovered that the onboarding flow was optimized for feature exploration rather than first-value achievement. Restructuring the onboarding sequence improved 90-day retention by 31%.",
      }}
      benefits={[
        "Validate product decisions with real user evidence before commitment",
        "Prioritize roadmap features by actual impact on acquisition and retention",
        "Understand competitive switching triggers and loyalty drivers",
        "Access developer and technical audiences through specialist panels",
        "Faster iteration cycles through rapid research turnaround",
      ]}
      deliverables={[
        "Product-market fit assessment and opportunity sizing",
        "UX research report with prioritized friction inventory",
        "Feature prioritization model with MaxDiff utilities",
        "User segmentation with behavioral and attitudinal profiles",
        "Competitive positioning map and strategic recommendations",
      ]}
      ctaTitle="Ready to build with confidence, not assumptions?"
    />
  );
}
