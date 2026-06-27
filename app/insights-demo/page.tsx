"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Globe2, BarChart2 } from "lucide-react";

const sentimentData = [
  { label: "Excellent", pct: 42, color: "#2563EB" },
  { label: "Good", pct: 31, color: "#60A5FA" },
  { label: "Neutral", pct: 15, color: "#93C5FD" },
  { label: "Poor", pct: 8, color: "#BFDBFE" },
  { label: "Very Poor", pct: 4, color: "#DBEAFE" },
];

const monthlyData = [
  { m: "Jan", v: 2400 }, { m: "Feb", v: 3100 }, { m: "Mar", v: 2800 },
  { m: "Apr", v: 4200 }, { m: "May", v: 5100 }, { m: "Jun", v: 4800 },
  { m: "Jul", v: 6300 }, { m: "Aug", v: 7100 }, { m: "Sep", v: 6800 },
  { m: "Oct", v: 8200 }, { m: "Nov", v: 9400 }, { m: "Dec", v: 8900 },
];

const max = Math.max(...monthlyData.map((d) => d.v));

const topInsights = [
  { label: "Price Sensitivity Rising", change: "+12%", up: true },
  { label: "Brand Trust Improved", change: "+8%", up: true },
  { label: "Product Awareness", change: "74%", up: true },
  { label: "Competitor Switching Risk", change: "-5%", up: false },
];

const geo = [
  { region: "South Asia", pct: 38 }, { region: "Southeast Asia", pct: 24 },
  { region: "Middle East", pct: 18 }, { region: "Europe", pct: 12 },
  { region: "Americas", pct: 8 },
];

export default function InsightsDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Insights Demo</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            See What Research Intelligence Looks Like
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sample dashboards, consumer analytics, and survey reporting outputs — giving you a preview of the intelligence Prime Eye Research delivers on every engagement.
          </p>
        </div>
      </section>

      {/* Main dashboard */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">Sample Dashboard</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Brand Health Tracking Overview</h2>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Total Respondents", value: "12,540", delta: "+18.6%", up: true },
              { icon: TrendingUp, label: "Completion Rate", value: "98.3%", delta: "+12.4%", up: true },
              { icon: Globe2, label: "Countries", value: "40+", delta: "", up: true },
              { icon: BarChart2, label: "Active Studies", value: "46", delta: "", up: true },
            ].map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="bg-slate-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500">{kpi.label}</p>
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  {kpi.delta && <p className="text-xs text-green-600 font-medium mt-1">{kpi.delta}</p>}
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Response trends chart */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Responses Over Time</h3>
              <p className="text-xs text-slate-500 mb-5">Monthly completed interviews — 12-month rolling</p>
              <div className="relative h-40">
                <svg viewBox={`0 0 ${monthlyData.length * 44} 160`} className="w-full h-full" preserveAspectRatio="none">
                  {/* Area fill */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={monthlyData.map((d, i) => `${i * 44 + 22},${140 - (d.v / max) * 120}`).join(" ")}
                    fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <polygon
                    points={[
                      ...monthlyData.map((d, i) => `${i * 44 + 22},${140 - (d.v / max) * 120}`),
                      `${(monthlyData.length - 1) * 44 + 22},140`,
                      `22,140`,
                    ].join(" ")}
                    fill="url(#chartGrad)"
                  />
                </svg>
                <div className="flex justify-between mt-1 px-1">
                  {monthlyData.map((d) => (
                    <span key={d.m} className="text-[10px] text-slate-400">{d.m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Consumer sentiment donut */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Consumer Sentiment</h3>
              <p className="text-xs text-slate-500 mb-4">Overall brand perception score</p>
              <div className="flex items-center justify-center mb-4">
                <svg viewBox="0 0 120 120" className="w-28 h-28">
                  {sentimentData.reduce<{ el: React.ReactElement[]; offset: number }>(
                    (acc, seg) => {
                      const dasharray = (seg.pct / 100) * 283;
                      const el = (
                        <circle
                          key={seg.label}
                          cx="60" cy="60" r="45"
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="18"
                          strokeDasharray={`${dasharray} ${283 - dasharray}`}
                          strokeDashoffset={-acc.offset}
                          transform="rotate(-90 60 60)"
                        />
                      );
                      return { el: [...acc.el, el], offset: acc.offset + dasharray };
                    },
                    { el: [], offset: 0 }
                  ).el}
                  <text x="60" y="55" textAnchor="middle" className="text-base" fontSize="16" fontWeight="700" fill="#1E3A5F">73%</text>
                  <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#94A3B8">Positive</text>
                </svg>
              </div>
              <div className="space-y-1.5">
                {sentimentData.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                      <span className="text-[11px] text-slate-600">{s.label}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Insights + Geo */}
      <section className="py-16 section-tint">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Consumer Insights Analytics</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top insights */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">Top Insights — Brand Tracker Wave 4</h3>
              <div className="space-y-4">
                {topInsights.map((ins) => (
                  <div key={ins.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${ins.up ? "bg-blue-600" : "bg-orange-400"}`} />
                      <span className="text-sm text-slate-700">{ins.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${ins.up ? "text-blue-600" : "text-orange-500"}`}>
                      {ins.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic distribution */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">Geographic Distribution — Sample</h3>
              <div className="space-y-3">
                {geo.map((g) => (
                  <div key={g.region}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{g.region}</span>
                      <span className="font-semibold text-slate-900">{g.pct}%</span>
                    </div>
                    <div className="h-2 bg-blue-50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey analytics sample */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Survey Analytics Sample</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { q: "How likely are you to recommend this brand?", pcts: [55, 22, 13, 6, 4], labels: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"] },
              { q: "Primary driver of purchase decision", pcts: [44, 28, 16, 8, 4], labels: ["Quality", "Price", "Brand", "Convenience", "Other"] },
              { q: "Channel preference for product research", pcts: [48, 25, 14, 9, 4], labels: ["Online search", "Social media", "Word of mouth", "In-store", "Other"] },
            ].map((survey, si) => (
              <div key={si} className="bg-slate-50 border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-slate-900 mb-4 leading-relaxed">{survey.q}</p>
                <div className="space-y-2.5">
                  {survey.pcts.map((pct, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-600">{survey.labels[i]}</span>
                        <span className="font-semibold text-slate-800">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to see insights like these for your brand?</h2>
          <p className="text-blue-100 mb-8">Every Prime Eye Research engagement delivers rich, analysis-ready reporting tailored to your objectives.</p>
          <Link href="/request-proposal" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors">
            Request a Research Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
