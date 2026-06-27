import ServiceLayout from "@/components/shared/ServiceLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quantitative Research — Prime Eye Research",
  description: "Large-scale surveys, statistical analysis, and data modeling. Turn market opinions into measurable, actionable intelligence.",
};

export default function QuantitativeResearchPage() {
  return (
    <ServiceLayout
      badge="Quantitative Research"
      title="Measure Markets with"
      titleBlue="Statistical Precision"
      subtitle="Transform opinions into data. Our quantitative research services deliver statistically robust measurements of attitudes, behaviors, and market dynamics — at scale, with speed."
      overview="Quantitative research is the engine of evidence-based strategy. Prime Eye Research designs and executes surveys across consumer and B2B audiences worldwide, combining best-practice questionnaire design with rigorous statistical methodology. From straightforward tracking studies to complex conjoint analyses and MaxDiff prioritization exercises, our team handles the full research lifecycle — study design, programming, field management, data processing, and final analysis. We go beyond reporting what happened to model what drives it, using multivariate techniques that isolate the true levers of consumer behavior."
      methodology={[
        { step: "Questionnaire Design", desc: "We design surveys that balance analytical power with respondent experience — minimizing fatigue while capturing all required measurement dimensions." },
        { step: "Sample Design", desc: "Quota frameworks, weighting strategies, and panel selection are defined to ensure statistical representativeness for your target population." },
        { step: "Survey Programming & Testing", desc: "Surveys are programmed with skip logic, randomization, and quality checks, then piloted before full-field launch." },
        { step: "Field Management", desc: "Real-time monitoring of completion rates, data quality flags, and quota progress. Adjustments are made proactively to protect data integrity." },
        { step: "Data Processing", desc: "Cleaning, weighting, and coding are applied systematically. Open-ended responses are coded using a combination of AI tools and analyst review." },
        { step: "Statistical Analysis", desc: "We apply the right techniques — regression, factor analysis, segmentation, key driver analysis — to answer your specific business questions." },
      ]}
      benefits={[
        "Statistically projectable results to defined target populations",
        "Ability to track metrics over time with consistent methodology",
        "Competitive benchmarking with normative databases",
        "Segmentation to identify and size distinct audience groups",
        "Predictive modeling to forecast consumer behavior",
        "Rapid turnaround through automated field management",
      ]}
      useCases={[
        { title: "Brand Health Tracking", desc: "Measure awareness, consideration, preference, and equity over time to quantify the impact of marketing investment." },
        { title: "Customer Satisfaction", desc: "Systematic measurement of satisfaction, loyalty, and NPS across customer touchpoints to drive experience improvement." },
        { title: "Market Sizing & Segmentation", desc: "Quantify market opportunity and identify distinct consumer segments to focus product and marketing strategy." },
        { title: "Concept & Product Testing", desc: "Evaluate new product concepts or features using validated volumetric models to forecast launch success." },
      ]}
      industries={["Retail", "FMCG", "Technology", "Financial Services", "Healthcare", "Automotive", "Telecoms", "Media & Entertainment"]}
      deliverables={[
        "Questionnaire document and programming specifications",
        "Survey completion dashboard with real-time field statistics",
        "Cleaned, weighted data files (SPSS, Excel, CSV)",
        "Full cross-tabulation tables",
        "Statistical analysis output with significance testing",
        "Executive summary and strategic implications report",
        "Presentation deck with data visualizations",
      ]}
      faqs={[
        { q: "What sample size do I need?", a: "Sample requirements depend on the level of precision needed and the number of subgroups to be analyzed independently. For a typical consumer study requiring ±5% margin of error at 95% confidence, n=400 is a common starting point. We'll calculate the right sample for your specific objectives." },
        { q: "How do you ensure data quality?", a: "We use multiple quality controls: speeder detection (removing respondents who complete surveys too quickly), consistency checks (duplicate questions with different phrasing), and open-end quality scoring. We also use digital fingerprinting to prevent duplicate participation." },
        { q: "Can you track the same survey over time?", a: "Yes. We design tracking studies with consistent methodology and benchmarking controls. We maintain longitudinal datasets for clients running wave-over-wave studies." },
        { q: "Do you offer advanced analytics like conjoint or MaxDiff?", a: "Yes. Our analytics team is experienced in a full range of advanced techniques including CBC conjoint, MaxDiff, TURF analysis, driver analysis, and segmentation. We'll recommend the right approach for your decision." },
      ]}
      ctaTitle="Ready to measure what matters in your market?"
    />
  );
}
