import SolutionLayout from "@/components/shared/SolutionLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Research Solutions — Prime Eye Research",
  description: "Omnichannel experience research, loyalty measurement, and assortment optimization for retail businesses.",
};

export default function RetailPage() {
  return (
    <SolutionLayout
      badge="Industry Solution · Retail"
      title="Research Built for the Retail Reality"
      subtitle="From high-street to e-commerce, understand what drives shopper decisions, loyalty, and basket size — with research designed for the pace and complexity of modern retail."
      challenges={[
        { title: "Omnichannel Experience Gaps", desc: "Retailers struggle to understand how online and in-store experiences interact — where they reinforce each other and where they create friction." },
        { title: "Declining Loyalty", desc: "Price comparison and switching costs are lower than ever. Understanding what creates genuine loyalty versus price-driven behavior is critical." },
        { title: "Assortment Complexity", desc: "Proliferating SKUs and private label growth make range optimization increasingly data-dependent. Shopper research is the only reliable guide." },
        { title: "Shopper Journey Evolution", desc: "The path to purchase has fragmented across touchpoints. Research must track the full journey, not just the transaction." },
      ]}
      approach={[
        { title: "Shopper Journey Mapping", desc: "Qualitative and quantitative approaches that trace the complete path from need recognition through post-purchase evaluation." },
        { title: "Store Experience Research", desc: "Mystery shopping, ethnographic observation, and exit surveys that reveal how physical retail environments drive or deter purchase." },
        { title: "Loyalty Driver Analysis", desc: "Statistical models that isolate the true drivers of repeat purchase and customer lifetime value, beyond price sensitivity." },
        { title: "Assortment Optimization", desc: "MaxDiff and TURF analysis to identify the optimal product range that maximizes penetration across shopper segments." },
        { title: "Pricing Research", desc: "Price sensitivity measurement, Gabor-Granger analysis, and competitive price benchmarking to support margin and volume optimization." },
        { title: "Brand Equity Tracking", desc: "Ongoing measurement of retail brand health across awareness, perception, preference, and advocacy dimensions." },
      ]}
      caseStudy={{
        context: "A mid-size grocery retailer wanted to understand why basket sizes were declining despite stable store traffic. Customer surveys pointed to satisfaction, but sales data told a different story.",
        approach: "We combined exit interviews with a 3,000-respondent online survey and a MaxDiff analysis of 40 product categories, segmented by shopping mission.",
        outcome: "Identified that three high-margin categories were being systematically skipped during top-up shopping missions. Fixture and promotional changes delivered a 7% average basket size increase within one quarter.",
      }}
      benefits={[
        "Understand the real drivers of shopper conversion across channels",
        "Identify loyalty segments and their distinct value propositions",
        "Optimize assortment and range architecture with data",
        "Benchmark against category leaders and track competitive shifts",
        "Support store design and visual merchandising decisions",
      ]}
      deliverables={[
        "Shopper journey mapping report with touchpoint analysis",
        "Segmented shopper profile and behavior analysis",
        "Category and assortment optimization recommendations",
        "Brand health tracking dashboard",
        "Strategic recommendations with commercial prioritization",
      ]}
      ctaTitle="Ready to understand your shoppers more deeply?"
    />
  );
}
