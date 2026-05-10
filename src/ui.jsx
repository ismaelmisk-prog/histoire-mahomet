// SVG geometric patterns (8-point star tessellation, hexagons) + shared UI
// All patterns are CSS-injectable via data URI or rendered as inline SVG.

const StarPattern = ({ opacity = 0.06, color = "currentColor", scale = 1 }) => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <defs>
      <pattern
        id={`star8-${scale}`}
        x="0"
        y="0"
        width={80 * scale}
        height={80 * scale}
        patternUnits="userSpaceOnUse"
      >
        <g
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={opacity}
          transform={`translate(${40 * scale}, ${40 * scale})`}
        >
          {/* 8-point star: two overlapping squares rotated */}
          <rect x={-22 * scale} y={-22 * scale} width={44 * scale} height={44 * scale} />
          <rect
            x={-22 * scale}
            y={-22 * scale}
            width={44 * scale}
            height={44 * scale}
            transform="rotate(45)"
          />
          <circle cx="0" cy="0" r={31 * scale} />
        </g>
        <g
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={opacity}
        >
          <line x1="0" y1={40 * scale} x2={80 * scale} y2={40 * scale} />
          <line x1={40 * scale} y1="0" x2={40 * scale} y2={80 * scale} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#star8-${scale})`} />
  </svg>
);

const HexPattern = ({ opacity = 0.05, color = "currentColor" }) => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <defs>
      <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
          <polygon points="15,2 45,2 60,26 45,50 15,50 0,26" />
          <polygon points="45,28 75,28 90,52 75,76 45,76 30,52" transform="translate(-30, -26)" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

// Decorative star strip — used in chapter headers
const StarStrip = ({ color = "currentColor", count = 9 }) => (
  <div
    aria-hidden="true"
    style={{
      display: "flex",
      gap: "14px",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.55,
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="-12 -12 24 24" style={{ color }}>
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="-7" y="-7" width="14" height="14" />
          <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
        </g>
      </svg>
    ))}
  </div>
);

// Tiny inline icons (no external lib)
const Icon = ({ name, size = 18, stroke = 1.5 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2V5z" />
          <path d="M8 7h7M8 11h7" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "spread":
      return (
        <svg {...common}>
          <path d="M4 6h6v12H4zM14 6h6v12h-6z" />
          <path d="M10 9l4 0M10 13l4 0" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l-2 6h6l-2-6M19 7l-2 6h6l-2-6" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 3v18" />
          <path d="M5 4h12l-2 4 2 4H5" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "quiz":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-1 .5-1 1.2-1 1.7" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="1.5" />
          <path d="M3 10h18" />
        </svg>
      );
    case "timeline":
      return (
        <svg {...common}>
          <path d="M4 12h16" />
          <circle cx="7" cy="12" r="2" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="2" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.5 6 6.5.5-5 4.4 1.6 6.4L12 17l-5.6 3.3L8 14l-5-4.4 6.5-.6L12 3z" />
        </svg>
      );
    case "starFill":
      return (
        <svg {...common} fill="currentColor">
          <path d="m12 3 2.5 6 6.5.5-5 4.4 1.6 6.4L12 17l-5.6 3.3L8 14l-5-4.4 6.5-.6L12 3z" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M20 14.5A8 8 0 1 1 9.5 4 7 7 0 0 0 20 14.5z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m4 12 5 5L20 6" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "step":
      return (
        <svg {...common}>
          <path d="M5 19h14M9 19V9l6 5-6 5" />
        </svg>
      );
    case "scroll":
      return (
        <svg {...common}>
          <path d="M5 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a2 2 0 0 1-2-2V5z" />
          <path d="M9 9h7M9 13h5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "rotate":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 15 2-5 5-2-2 5-5 2z" />
        </svg>
      );
    default:
      return null;
  }
};

// — Atoms —————————————————————————————————————

const Tag = ({ children, tone = "default" }) => (
  <span className={`tag tag-${tone}`}>{children}</span>
);

const Card = ({ children, className = "", as = "div", ...rest }) => {
  const C = as;
  return (
    <C className={`card ${className}`} {...rest}>
      {children}
    </C>
  );
};

const Button = ({ children, variant = "primary", icon, ...rest }) => (
  <button className={`btn btn-${variant}`} {...rest}>
    {icon && <Icon name={icon} size={16} />}
    <span>{children}</span>
  </button>
);

const Kicker = ({ children }) => <div className="kicker">{children}</div>;

const SectionTitle = ({ kicker, title, sub }) => (
  <header className="section-title">
    {kicker && <Kicker>{kicker}</Kicker>}
    <h1>{title}</h1>
    {sub && <p className="section-sub">{sub}</p>}
  </header>
);

// — Favorite button (uses outer state via prop) ——————————————
const FavoriteToggle = ({ active, onClick, label = "Mettre en favori" }) => (
  <button
    type="button"
    className={`fav-btn ${active ? "is-active" : ""}`}
    aria-pressed={active}
    aria-label={label}
    onClick={onClick}
  >
    <Icon name={active ? "starFill" : "star"} size={16} />
    <span>{active ? "Favori" : "Favori"}</span>
  </button>
);

// — Progress bar (fictive) ——————————————————————————
const ProgressBar = ({ value, max = 100, label }) => (
  <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
    {label && <div className="progress-label"><span>{label}</span><span>{Math.round((value / max) * 100)}%</span></div>}
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  </div>
);

// Image placeholder with monospace explainer
const ImagePlaceholder = ({ label, ratio = "16 / 9", note }) => (
  <div className="img-placeholder" style={{ aspectRatio: ratio }}>
    <svg className="img-placeholder-bg" aria-hidden="true">
      <defs>
        <pattern id="diag" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag)" />
    </svg>
    <div className="img-placeholder-content">
      <div className="img-placeholder-mono">{label}</div>
      {note && <div className="img-placeholder-note">{note}</div>}
    </div>
  </div>
);

window.HISTOIRE_UI = {
  StarPattern,
  HexPattern,
  StarStrip,
  Icon,
  Tag,
  Card,
  Button,
  Kicker,
  SectionTitle,
  FavoriteToggle,
  ProgressBar,
  ImagePlaceholder,
};
