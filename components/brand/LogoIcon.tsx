import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
  size?: number;
}

/**
 * Prime Eye Research icon mark: a capital "P" rendered in near-black,
 * with the closed counter of the P replaced by a stylized eye (a
 * sky-blue iris with a white highlight and dark pupil), and a thin
 * angled "eyebrow" stroke above it. Transparent background so it
 * works on white, light-gray, or dark surfaces alike.
 *
 * Built as a single scalable vector — no raster assets, no baked-in
 * background — so it stays sharp at any size from a 16px favicon up
 * to a large hero treatment.
 */
export default function LogoIcon({ className, size = 40 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Prime Eye Research logo"
    >
      {/* Stem of the P */}
      <rect x="14" y="8" width="9" height="48" rx="2" fill="currentColor" />

      {/* Top arm of the P, curving into the bowl */}
      <path
        d="M14 8 H34 C44 8 51 14.5 51 23 C51 31.5 44 37 34 37 H23"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyebrow stroke above the eye, angled */}
      <path
        d="M19 19 L40 12"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* Eye — sits inside the bowl of the P, masked by a white/transparent
          knockout so the iris reads as a clean circle rather than
          overlapping the dark stroke. */}
      <circle cx="32" cy="24" r="11" fill="white" />
      <circle cx="32" cy="24" r="11" fill="#0EA5E9" fillOpacity="0.0" />
      <circle cx="32" cy="24.5" r="9.5" fill="url(#irisGradient)" />
      <circle cx="32" cy="24.5" r="9.5" fill="none" stroke="#0C4A6E" strokeWidth="0.75" strokeOpacity="0.25" />
      <circle cx="32" cy="24.5" r="4.2" fill="#0C1B2A" />
      <circle cx="29.6" cy="22" r="1.6" fill="white" fillOpacity="0.9" />

      <defs>
        <radialGradient id="irisGradient" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="55%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>
    </svg>
  );
}
