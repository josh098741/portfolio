export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-base-300 absolute inset-0" />

      <div
        className="animate-drift absolute -top-[18%] -left-[12%] size-[46rem] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, oklch(60% 0.2 258 / 0.5), transparent 68%)',
        }}
      />
      <div
        className="animate-drift absolute top-[18%] -right-[14%] size-[40rem] rounded-full blur-[130px]"
        style={{
          animationDelay: '-8s',
          background:
            'radial-gradient(circle, oklch(70% 0.18 195 / 0.4), transparent 68%)',
        }}
      />
      <div
        className="animate-drift absolute bottom-[-16%] left-[24%] size-[38rem] rounded-full blur-[140px]"
        style={{
          animationDelay: '-15s',
          background:
            'radial-gradient(circle, oklch(64% 0.2 335 / 0.38), transparent 68%)',
        }}
      />

      <div className="grid-mesh absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, oklch(11% 0.017 285), transparent)',
        }}
      />
    </div>
  )
}