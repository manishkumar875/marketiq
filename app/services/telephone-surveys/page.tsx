import ServiceLayout from "@/components/shared/ServiceLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telephone Surveys — Prime Eye Research",
  description: "CATI telephone interviews for B2B and B2C audiences. High response quality and access to audiences who don't participate in online panels.",
};

export default function TelephoneSurveysPage() {
  return (
    <ServiceLayout
      badge="Telephone Surveys"
      title="High-Quality Reach Through"
      titleBlue="Telephone Interviewing"
      subtitle="Access audiences that online panels cannot reach. Our CATI infrastructure delivers structured telephone interviews with the quality controls and response rates that premium research demands."
      overview="Telephone surveys remain the gold standard for certain research objectives — particularly when reaching older demographics, rural populations, business decision-makers, or audiences with low internet penetration. Prime Eye Research operates a disciplined CATI (Computer-Assisted Telephone Interviewing) operation with trained interviewers, systematic call management, and rigorous quality monitoring. We combine traditional telephone methodology with modern management tools to deliver high-quality data efficiently, whether the study requires 200 or 20,000 completed interviews."
      methodology={[
        { step: "Sample Frame Development", desc: "We work with you to define the target population and source appropriate calling lists — whether consumer RDD (random digit dialing), business directories, or client-supplied lists." },
        { step: "Questionnaire Optimization", desc: "Telephone questionnaires require specific design considerations — flow, length, and response option structure are optimized for the audio medium to reduce interviewer-introduced bias." },
        { step: "Interviewer Training", desc: "Project-specific briefing and training ensures every interviewer understands the study objectives, probing protocols, and quality standards." },
        { step: "CATI Programming & Piloting", desc: "Survey logic is programmed into our CATI system and piloted with a small sample to validate routing, timing, and data capture." },
        { step: "Supervised Fieldwork", desc: "Active supervisor monitoring of live interviews identifies problems early. Call recordings are reviewed for quality compliance." },
        { step: "Data Processing & Delivery", desc: "Completed interviews are processed, cleaned, and delivered as analysis-ready datasets within agreed timelines." },
      ]}
      benefits={[
        "Access to demographics with low digital penetration",
        "Higher response rates than online for certain B2B audiences",
        "Interviewer probing captures richer responses than self-completion",
        "Random sampling from population frames, not opt-in panels",
        "Strong perceived legitimacy — respondents take calls more seriously",
        "Suitable for sensitive or complex survey content",
      ]}
      useCases={[
        { title: "Political & Public Opinion Research", desc: "Random digit dialing ensures representative samples unbiased by self-selection into online panels." },
        { title: "B2B Decision-Maker Surveys", desc: "Reach C-suite executives, procurement managers, and other senior business audiences who are difficult to engage via online panels." },
        { title: "Customer Satisfaction Callbacks", desc: "Post-purchase or post-service contact surveys using client-supplied customer lists for maximum relevance and response rate." },
        { title: "Rural & Hard-to-Reach Populations", desc: "Telephone remains the most effective method for populations with limited internet access or digital literacy." },
      ]}
      industries={["Financial Services", "Healthcare", "Government & Public Sector", "Utilities", "Automotive", "Retail", "Telecoms"]}
      deliverables={[
        "Finalized questionnaire and CATI script",
        "Calling frame and call attempt statistics",
        "Response rate and disposition report",
        "Interviewer quality monitoring results",
        "Cleaned dataset with call metadata",
        "Analysis outputs and final research report",
      ]}
      faqs={[
        { q: "What response rates should I expect?", a: "Response rates vary significantly by audience, list quality, and study topic. Consumer RDD studies typically achieve 15-30%. Business lists with warm outreach can reach 25-45%. We'll provide a realistic projection based on your specific study parameters." },
        { q: "How long can a telephone interview be?", a: "The optimal length is 10-15 minutes. Studies up to 20 minutes are feasible with engaging content. Beyond 20 minutes, response quality degrades significantly and we'll recommend splitting the questionnaire or moving some content online." },
        { q: "Can you conduct multilingual telephone surveys?", a: "Yes. We have interviewers fluent in multiple languages and can conduct studies in English, Hindi, and other major languages depending on the geography." },
        { q: "Do you comply with TRAI and DND regulations?", a: "Yes. All telephone operations comply with applicable regulations including Do-Not-Call lists and privacy legislation in each operating market." },
      ]}
      ctaTitle="Need to reach audiences beyond the online panel?"
    />
  );
}
