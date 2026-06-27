import ServiceLayout from "@/components/shared/ServiceLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Research — Prime Eye Research",
  description: "Digital-first online panels, mobile surveys, and real-time data collection across 40+ countries.",
};

export default function OnlineResearchPage() {
  return (
    <ServiceLayout
      badge="Online Research"
      title="Digital-First Research,"
      titleBlue="Global Reach"
      subtitle="Reach verified respondents anywhere in the world through our proprietary online panel network. Faster, more flexible, and more cost-effective than traditional research without sacrificing quality."
      overview="Online research has transformed the speed and economics of consumer intelligence. Prime Eye Research operates one of the most rigorously managed online panel networks in the industry — with over 5 million pre-verified respondents across 40+ countries, segmented by 400+ demographic, behavioral, and attitudinal attributes. Our digital infrastructure enables rapid sample deployment, real-time monitoring, and automated quality control, while our research team ensures every study is designed and analyzed to the same exacting standards as any other methodology."
      methodology={[
        { step: "Panel Qualification", desc: "Every panel member is double opted-in, identity verified, and profiled across 400+ attributes before being available for studies." },
        { step: "Targeted Sample Selection", desc: "Sophisticated targeting algorithms match study requirements to panel member profiles, ensuring sample relevance and minimizing screening waste." },
        { step: "Multi-device Survey Delivery", desc: "Studies are optimized for desktop, tablet, and mobile. Respondents can complete surveys on any device without degradation in experience." },
        { step: "Real-time Quality Monitoring", desc: "Live dashboards track response quality, completion rates, and quota progress. Automated flags identify suspicious patterns for analyst review." },
        { step: "Geo-targeted Sampling", desc: "For location-specific studies, we can target by country, region, city, or even proximity to a specific location or retail outlet." },
        { step: "Data Delivery", desc: "Results are available in real-time during fieldwork and delivered as cleaned, weighted datasets upon project completion." },
      ]}
      benefits={[
        "Dramatically faster field times — 24-72 hours for standard samples",
        "Access to hard-to-reach audiences through specialist panels",
        "Lower cost per completed interview versus telephone or in-person",
        "Real-time data visibility during fieldwork",
        "Seamless multi-country deployment from a single platform",
        "Mobile-first design for higher completion rates among younger demographics",
      ]}
      useCases={[
        { title: "Rapid Consumer Pulse Studies", desc: "Get quick, reliable read on consumer sentiment, product reactions, or news events within 24-48 hours of brief." },
        { title: "Multi-Country Tracking", desc: "Run consistent brand or category tracking across multiple markets simultaneously with centralized reporting." },
        { title: "B2B Professional Panels", desc: "Reach business decision-makers, IT professionals, healthcare practitioners, and other specialist audiences through our B2B panel network." },
        { title: "Behavioral Profiling Studies", desc: "Combine survey data with behavioral attributes to build rich, actionable consumer segments." },
      ]}
      industries={["Technology", "Financial Services", "Retail", "FMCG", "Healthcare", "Media", "Telecoms", "Education"]}
      deliverables={[
        "Sample specification and targeting brief",
        "Real-time field dashboard access",
        "Quality-controlled dataset with response metadata",
        "Demographic and behavioral profile of achieved sample",
        "Data tables and analysis outputs",
        "Final report and strategic recommendations",
      ]}
      faqs={[
        { q: "How quickly can you field an online survey?", a: "Standard consumer samples (n=500 general population) typically complete within 24-72 hours. Harder-to-reach audiences or large samples may require 3-5 days. We can accommodate urgent timelines with expedited service." },
        { q: "How do you prevent professional respondents from gaming your panel?", a: "We use digital fingerprinting, IP monitoring, speeder detection, consistency traps, and open-end quality scoring. Panel members who fail quality checks are removed from future studies." },
        { q: "Can I access the raw data?", a: "Yes. We deliver clean, labeled SPSS or Excel data files at project completion. We can also set up ongoing data feeds for tracking studies." },
        { q: "Do you have panels in Asia, Middle East, and Africa?", a: "Yes. Our panel network covers 40+ countries across Asia-Pacific, South Asia, Middle East, Africa, Europe, and the Americas. Contact us for coverage details specific to your target markets." },
      ]}
      ctaTitle="Ready to reach your audience faster and smarter?"
    />
  );
}
