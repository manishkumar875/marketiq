import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Twitter, Youtube } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Qualitative Research", href: "/services/qualitative-research" },
      { label: "Quantitative Research", href: "/services/quantitative-research" },
      { label: "Online Research", href: "/services/online-research" },
      { label: "Telephone Surveys", href: "/services/telephone-surveys" },
      { label: "Business Research", href: "/services/business-research" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Retail", href: "/solutions/retail" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Technology", href: "/solutions/technology" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Education", href: "/solutions/education" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Panel Book", href: "#" },
      { label: "ESOMAR 28", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="surface-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1.5 inline-flex">
                <Image
                  src="/images/logo.jpeg"
                  alt="Prime Eye Research"
                  width={200}
                  height={60}
                  style={{ width: 'auto' }}
                  className="h-10 sm:h-12 object-contain mix-blend-multiply"
                />
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-[200px]">
              Global market research and consumer intelligence, accelerated by AI.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-blue-100 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-blue-200">
            © 2025 Prime Eye Research, Inc. All rights reserved.
          </p>
          <p className="text-sm text-blue-200">ESOMAR-aligned | ISO 20252 certified</p>
        </div>
      </div>
    </footer>
  );
}
