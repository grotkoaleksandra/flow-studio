type WaveProps = {
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
};

export function WaveDivider({ from = "#faf8f5", to = "#f5f0ea", flip = false, className = "" }: WaveProps) {
  return (
    <div className={`wave-separator relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] md:h-[100px]"
      >
        <defs>
          <linearGradient id={`wg-${flip ? "f" : "n"}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#wg-${flip ? "f" : "n"})`}
          d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,40 L1440,120 L0,120 Z"
        />
        <path
          fill={to}
          opacity="0.5"
          d="M0,60 C200,20 400,90 720,40 C1040,0 1240,80 1440,50 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

export function WaveDividerAlt({ from = "#faf8f5", to = "#f5f0ea", className = "" }: Omit<WaveProps, "flip">) {
  return (
    <div className={`wave-separator relative w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[50px] sm:h-[70px] md:h-[90px]"
      >
        <path
          fill={to}
          d="M0,80 Q360,0 720,60 Q1080,120 1440,30 L1440,100 L0,100 Z"
        />
        <path
          fill={from}
          opacity="0.3"
          d="M0,90 Q300,30 600,70 Q900,110 1200,40 Q1350,20 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
