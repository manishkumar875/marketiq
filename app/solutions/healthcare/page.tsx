import SolutionLayout from "@/components/shared/SolutionLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Research Solutions — Prime Eye Research",
  description: "Patient experience, HCP perception, and treatment journey research under strict compliance standards.",
};

export default function HealthcarePage() {
  return (
    <SolutionLayout
      badge="Industry Solution · Healthcare"
      title="Insight-Driven Research for Healthcare"
      subtitle="Patient experience, HCP perceptions, and treatment journey mapping — conducted under the strict compliance and ethical standards that healthcare demands."
      challenges={[
        { title: "Patient Experience Measurement", desc: "Healthcare organizations need robust, validated instruments to measure patient experience consistently and identify improvement priorities." },
        { title: "HCP Perception Complexity", desc: "Healthcare professional attitudes toward products, guidelines, and brands are shaped by clinical evidence, peer influence, and system pressures that require specialist research approaches." },
        { title: "Treatment Journey Gaps", desc: "Understanding the path from symptom to diagnosis to treatment adherence involves multiple stakeholders and touchpoints that are rarely captured in a single study." },
        { title: "Compliance & Ethics", desc: "Healthcare research must navigate complex regulatory and ethical requirements — from patient privacy to HCP engagement guidelines — that general market research firms often underestimate." },
      ]}
      approach={[
        { title: "Patient Experience Research", desc: "Validated survey instruments and qualitative protocols designed to capture the patient voice across care settings, disease states, and treatment phases." },
        { title: "HCP Studies", desc: "Structured surveys and interviews with physicians, nurses, pharmacists, and other healthcare professionals using compliant recruitment and engagement protocols." },
        { title: "Treatment Journey Mapping", desc: "Multi-stage research that follows patients from awareness of symptoms through diagnosis, treatment selection, adherence, and outcomes." },
        { title: "Payer & Health System Research", desc: "Understanding of formulary decision-making, value assessment frameworks, and health system procurement priorities." },
        { title: "Brand Perception Tracking", desc: "Regular measurement of product awareness, perception, prescribing intent, and competitive positioning among relevant HCP audiences." },
        { title: "Patient Adherence Research", desc: "Qualitative and quantitative analysis of the barriers to and enablers of treatment adherence, informing patient support program design." },
      ]}
      caseStudy={{
        context: "A pharmaceutical company needed to understand why adherence rates for a chronic disease treatment were 30% below clinical trial levels in real-world settings.",
        approach: "We conducted depth interviews with 60 patients across adherence segments, combined with a 1,200-respondent quantitative survey mapping the treatment experience and barrier landscape.",
        outcome: "Identified that injection anxiety — not cost or access — was the primary dropout driver. The resulting patient support program redesign improved 6-month adherence rates by 22%.",
      }}
      benefits={[
        "Research designed to meet ESOMAR and ICH GCP standards",
        "Specialist healthcare panel with verified HCP profiles",
        "Patient research conducted with appropriate ethical oversight",
        "Insight across the full patient and HCP journey",
        "Actionable recommendations linked to clinical and commercial outcomes",
      ]}
      deliverables={[
        "Patient or HCP research report with validated instruments",
        "Journey map with touchpoint analysis and barrier identification",
        "Segmentation of patients or HCPs by behavior or attitude",
        "Brand health tracking outputs with competitive benchmarks",
        "Strategic recommendations for product, patient support, or marketing",
      ]}
      ctaTitle="Ready to put patients and HCPs at the center of your strategy?"
    />
  );
}
