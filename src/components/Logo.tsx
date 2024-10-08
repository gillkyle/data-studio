export function Logo({ size = 48 }: { size?: number }) {
  const aspectRatio = 40 / 48;
  const width = Math.round(size * aspectRatio);

  return (
    <svg
      fill="none"
      height={size}
      width={width}
      viewBox="0 0 40 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="m0 4h10v10h-10z" />
        <path d="m20 4h10v10h-10z" opacity=".6" />
        <path d="m10 14h10v10h-10z" opacity=".6" />
        <path d="m20 14h10v10h-10z" opacity=".45" />
        <path d="m30 14h10v10h-10z" opacity=".3" />
        <path d="m0 24h10v10h-10z" opacity=".6" />
        <path d="m10 24h10v10h-10z" opacity=".45" />
        <path d="m20 24h10v10h-10z" opacity=".3" />
        <path d="m30 24h10v10h-10z" opacity=".15" />
        <path d="m10 34h10v10h-10z" opacity=".3" />
        <path d="m20 34h10v10h-10z" opacity=".15" />
      </g>
    </svg>
  );
}
