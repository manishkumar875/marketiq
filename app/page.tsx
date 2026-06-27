import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const ServicesPreview = dynamic(() => import("@/components/ServicesPreview"));
const SolutionsPreview = dynamic(() => import("@/components/SolutionsPreview"));
const ResourcesCertifications = dynamic(() => import("@/components/ResourcesCertifications"));

export const metadata: Metadata = {
  title: "Prime Eye Research — Global Market Research & Consumer Insights",
  description: "Turning consumer data into business growth. Global respondent access, rigorous methodology, and AI-assisted analysis. 200+ clients, 10,000+ projects, 40+ countries.",
  openGraph: {
    title: "Prime Eye Research — Global Market Research & Consumer Insights",
    description: "Turning consumer data into business growth. Global respondent access, rigorous methodology, and AI-assisted analysis.",
    url: "https://primeeyeresearch.com",
    siteName: "Prime Eye Research",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <ServicesPreview />
      <SolutionsPreview />
      <ResourcesCertifications />
      <Footer />
    </div>
  );
}
