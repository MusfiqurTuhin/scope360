/**
 * The Scope360 mark, animated.
 *
 * Two ideas from the logo drive this: the concentric fingerprint arcs behind the
 * wordmark, and the crosshair cut through the "o" of scope. Together with the 360
 * dial they read as a surveying instrument sweeping a full circle — which is the
 * company's whole proposition.
 *
 * Everything is SVG plus CSS animation, so it costs no JavaScript per frame and
 * stops entirely under prefers-reduced-motion.
 */

const TICK_COUNT = 72; // one every 5 degrees

export function ScopeDial({
  className = "",
  activeQuadrant = -1,
}: {
  className?: string;
  /** 0-3 highlights that cardinal marker; -1 highlights none. */
  activeQuadrant?: number;
}) {
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
    const angle = (360 / TICK_COUNT) * i;
    const major = i % 6 === 0; // every 30 degrees
    const cardinal = i % 18 === 0; // every 90 degrees
    return { angle, major, cardinal, quadrant: cardinal ? i / 18 : -1 };
  });

  return (
    <div
      aria-hidden
      // No positioning utility here on purpose: the caller supplies it, and a
      // `relative` here would win over an `absolute` passed in via className.
      className={`pointer-events-none aspect-square select-none ${className}`}
    >
      {/* Radar sweep. Masked to a disc so the cone fades toward the centre. */}
      <div
        className="animate-scope-sweep absolute inset-[8%] rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(245,180,42,0) 0deg, rgba(245,180,42,0) 250deg, rgba(245,180,42,0.05) 300deg, rgba(245,180,42,0.22) 350deg, rgba(245,180,42,0.45) 360deg)",
          maskImage: "radial-gradient(circle, transparent 46%, #000 58%, #000 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 46%, #000 58%, #000 100%)",
        }}
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="scope-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#f5b42a" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#f5b42a" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="scope-core">
            <stop offset="0%" stopColor="#ffd47a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5b42a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric arcs — the fingerprint texture from the logo, opened out. */}
        <g className="animate-scope-drift" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="192" fill="none" stroke="url(#scope-ring)" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="#f5b42a"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          <circle cx="200" cy="200" r="112" fill="none" stroke="#f5efe6" strokeOpacity="0.12" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="74"
            fill="none"
            stroke="#f5b42a"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="34 14"
          />
        </g>

        {/* 360-degree tick ring. */}
        <g className="animate-scope-ring" style={{ transformOrigin: "200px 200px" }}>
          {ticks.map(({ angle, major, cardinal, quadrant }) => {
            const isActive = cardinal && quadrant === activeQuadrant;
            const length = isActive ? 32 : cardinal ? 22 : major ? 13 : 6;
            return (
              <line
                key={angle}
                x1="200"
                y1={200 - 192}
                x2="200"
                y2={200 - 192 + length}
                stroke={cardinal ? "#ffd47a" : "#f5b42a"}
                strokeOpacity={isActive ? 1 : cardinal ? 0.8 : major ? 0.55 : 0.3}
                strokeWidth={isActive ? 3 : cardinal ? 2 : 1}
                transform={`rotate(${angle} 200 200)`}
                style={{ transition: "stroke-opacity 600ms ease, stroke-width 600ms ease" }}
              />
            );
          })}
        </g>

        {/* Crosshair, echoing the cut through the logo's "o". */}
        <g stroke="#f5b42a" strokeOpacity="0.24" strokeWidth="1">
          <line x1="8" y1="200" x2="82" y2="200" />
          <line x1="318" y1="200" x2="392" y2="200" />
          <line x1="200" y1="8" x2="200" y2="82" />
          <line x1="200" y1="318" x2="200" y2="392" />
        </g>

        <circle cx="200" cy="200" r="60" fill="url(#scope-core)" className="animate-scope-pulse" />

        {/* Arc pointing at the active reading. */}
        {activeQuadrant >= 0 ? (
          <circle
            cx="200"
            cy="200"
            r="168"
            fill="none"
            stroke="#f5b42a"
            strokeOpacity="0.8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="132 924"
            style={{
              transform: `rotate(${activeQuadrant * 90 - 96}deg)`,
              transformOrigin: "200px 200px",
              transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ) : null}

        {/* Marker orbiting the dial, tracing the full 360. */}
        <g className="animate-scope-orbit" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="8" r="4.5" fill="#f5b42a" />
          <circle cx="200" cy="8" r="11" fill="none" stroke="#f5b42a" strokeOpacity="0.35" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
