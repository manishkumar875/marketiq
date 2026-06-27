import SolutionLayout from "@/components/shared/SolutionLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Research Solutions — Prime Eye Research",
  description: "Student and alumni experience research, program perception studies, and enrollment journey insights for educational institutions.",
};

export default function EducationPage() {
  return (
    <SolutionLayout
      badge="Industry Solution · Education"
      title="Research That Strengthens Educational Institutions"
      subtitle="From enrollment to alumni advocacy, understand the full student experience and make evidence-based decisions about programs, services, and institutional strategy."
      challenges={[
        { title: "Enrollment Funnel Inefficiency", desc: "Institutions invest heavily in enrollment marketing without always understanding which messages, channels, and value propositions actually drive applications and acceptances." },
        { title: "Student Retention Risk", desc: "Early warning signals of student disengagement are often invisible to administrators until the student has already decided to leave." },
        { title: "Program Relevance Pressure", desc: "Rapid workforce change means programs can become misaligned with employer expectations and student career aspirations faster than traditional curriculum cycles can respond." },
        { title: "Alumni Engagement Decline", desc: "Alumni networks are critical fundraising and reputation assets, but engagement rates are declining as the relationship post-graduation weakens." },
      ]}
      approach={[
        { title: "Enrollment Journey Research", desc: "Prospective student studies that map the decision process from initial awareness through enrollment — identifying the moments and messages that convert." },
        { title: "Student Experience Surveys", desc: "Validated instruments that measure academic quality, student services, campus life, and overall satisfaction at key moments in the student journey." },
        { title: "Program Perception Studies", desc: "Research among current students, prospective students, employers, and alumni to assess program relevance, reputation, and competitive positioning." },
        { title: "Alumni Relationship Research", desc: "Understanding what motivates alumni to stay engaged — and what can re-engage those who have drifted — to inform alumni programming and giving campaigns." },
        { title: "Employer & Workforce Research", desc: "Surveys and interviews with employers to understand graduate skills gaps, hiring preferences, and the evolving competency requirements of your key graduate industries." },
        { title: "Institutional Brand Research", desc: "Perception studies among key stakeholder audiences — prospective students, parents, employers, and the broader public — to track and strengthen institutional reputation." },
      ]}
      caseStudy={{
        context: "A private university wanted to understand why applications were declining despite investing significantly in marketing and campus improvements.",
        approach: "We conducted 800 interviews among prospective students who had enquired but not applied, combined with qualitative sessions among current students and a competitive perception study.",
        outcome: "Discovered that career outcome transparency — not facilities or brand — was the primary enrollment driver. Publishing detailed graduate outcomes data by program drove a 24% increase in application conversion within one admissions cycle.",
      }}
      benefits={[
        "Evidence base for program development and discontinuation decisions",
        "Early identification of student satisfaction issues before they drive attrition",
        "Enrollment marketing optimization backed by prospective student insight",
        "Alumni engagement strategy grounded in relationship research",
        "Competitive positioning intelligence relative to peer institutions",
      ]}
      deliverables={[
        "Enrollment journey map with conversion driver analysis",
        "Student experience measurement report with benchmark comparisons",
        "Program perception analysis across stakeholder audiences",
        "Alumni engagement segmentation and strategy recommendations",
        "Employer satisfaction and graduate outcome gap analysis",
      ]}
      ctaTitle="Ready to put student insight at the heart of your strategy?"
    />
  );
}
