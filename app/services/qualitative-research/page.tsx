import ServiceLayout from "@/components/shared/ServiceLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qualitative Research — Prime Eye Research",
  description: "In-depth qualitative research including focus groups, IDIs, and online communities. Uncover the why behind consumer behavior.",
};

export default function QualitativeResearchPage() {
  return (
    <ServiceLayout
      badge="Qualitative Research"
      title="Understand the"
      titleBlue="Why Behind Behavior"
      subtitle="Go beyond what consumers do and discover why they do it. Our qualitative research methods reveal motivations, attitudes, and emotional drivers that quantitative data alone cannot capture."
      overview="Qualitative research is the foundation of deep consumer understanding. At Prime Eye Research, we design and execute exploratory studies that generate rich, nuanced insights through rigorous analytical frameworks. Whether you need to explore an emerging market opportunity, understand the emotional dimensions of brand loyalty, or co-create new product concepts with consumers, our expert moderators and analysts deliver findings that move strategy forward. We combine traditional methods like focus groups and in-depth interviews with modern digital approaches — online communities, video ethnography, and AI-assisted verbatim analysis — to give you faster, deeper answers."
      methodology={[
        { step: "Research Brief & Design", desc: "We translate your business questions into a precise research design — selecting the right methodology, participant criteria, and analytical approach." },
        { step: "Screener & Recruitment", desc: "Rigorous screening ensures every participant genuinely represents your target audience. We recruit from our validated panel and via targeted outreach." },
        { step: "Moderation & Fieldwork", desc: "Experienced moderators guide conversations to surface authentic responses. All sessions are recorded, transcribed, and stored securely." },
        { step: "Analysis & Synthesis", desc: "Our analysts code themes, identify patterns, and build conceptual frameworks. AI-assisted tools accelerate open-end coding without replacing human judgment." },
        { step: "Reporting & Presentation", desc: "Deliverables are designed for action — clear executive summaries, illustrated narratives, and strategic implications." },
        { step: "Debrief & Follow-up", desc: "We present findings to your team, answer questions, and support the integration of insights into your decision-making process." },
      ]}
      benefits={[
        "Reveals the emotional and rational drivers behind consumer choices",
        "Generates hypotheses for subsequent quantitative validation",
        "Surfaces unexpected insights that surveys alone would miss",
        "Supports product development, positioning, and communication strategy",
        "Faster timelines than traditional qualitative through AI-assisted analysis",
        "Available across 40+ countries with multilingual moderation",
      ]}
      useCases={[
        { title: "New Product Ideation", desc: "Explore unmet needs and co-create concept directions with target consumers before committing to development investment." },
        { title: "Brand Perception Audits", desc: "Understand the emotional territory your brand owns — and the gaps between intended and perceived positioning." },
        { title: "Customer Journey Mapping", desc: "Trace the full path from awareness through purchase and post-purchase experience to identify friction and opportunity points." },
        { title: "Communication Pre-Testing", desc: "Evaluate advertising, packaging, and messaging concepts before expensive production and launch." },
      ]}
      industries={["FMCG", "Retail", "Healthcare", "Technology", "Financial Services", "Education", "Automotive", "Media"]}
      deliverables={[
        "Full moderator's guide and discussion framework",
        "Session recordings and verbatim transcripts",
        "Thematic coding framework and analysis workbook",
        "Executive summary with strategic implications",
        "Illustrated narrative report with consumer quotes",
        "Presentation-ready slide deck",
      ]}
      faqs={[
        { q: "How many participants do I need for a qualitative study?", a: "It depends on the research objectives and audience heterogeneity. A typical focus group project runs 4-6 groups (8-10 participants each). In-depth interview studies commonly use 20-40 interviews. We'll recommend the right sample size based on your specific goals." },
        { q: "Can qualitative research be conducted internationally?", a: "Yes. We have multilingual moderators and recruitment capabilities across 40+ countries. We can run studies simultaneously across markets or sequence them for iterative learning." },
        { q: "How long does a qualitative project take?", a: "A focused 4-group study typically takes 3-5 weeks from briefing to final report. Complex multi-market studies may run 6-10 weeks. We offer expedited timelines for time-sensitive decisions." },
        { q: "Is online qualitative as good as in-person?", a: "For most objectives, online qualitative delivers comparable insight with faster recruitment, lower cost, and geographic flexibility. Some situations — sensory product testing, vulnerable populations — still benefit from in-person approaches." },
      ]}
      ctaTitle="Ready to uncover the real story behind your consumers?"
    />
  );
}
