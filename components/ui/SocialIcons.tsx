import type { SocialName } from "@/data/site";

/**
 * lucide v1 removed brand marks, so the four we need are inlined here as
 * plain paths. Currentcolor + 24px viewBox keeps them drop-in compatible
 * with the lucide icons used elsewhere.
 */
const paths: Record<SocialName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.6" />
      <path d="M7 10.4v6.6" />
      <circle cx="7" cy="7.3" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11.3 17v-6.6M11.3 13.2c0-1.6 1-2.6 2.4-2.6s2.5 1 2.5 2.7V17" />
    </>
  ),
  facebook: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <path d="M15.2 8.1h-1.5c-1 0-1.6.6-1.6 1.6V12m-1.7 0h5m-3.3 0v6" />
    </>
  ),
  x: <path d="M3.4 3.2h4.1l5 6.7 5.4-6.7h2.4l-6.7 8.3 7 9.3h-4.1L10.9 13l-6 8.1H2.5l7.2-8.9z" />,
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialName;
  className?: string;
}) {
  const isFilled = name === "x";

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
