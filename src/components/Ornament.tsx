export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold-deep)]" />
      <svg 
        width="60" 
        height="60" 
        viewBox="0 0 200 200" 
        fill="none" 
        className="text-[var(--gold-deep)] animate-spin-slow"
        style={{ stroke: "currentColor", strokeWidth: "1.5" }}
      >
        {/* Outer decorative ring */}
        <circle cx="100" cy="100" r="95" fill="none" strokeWidth="2"/>
        
        {/* Outer pattern */}
        <g>
          <path d="M 100 10 Q 110 25 115 40 Q 112 35 100 30 Q 88 35 85 40 Q 90 25 100 10" fill="currentColor" opacity="0.8"/>
          <path d="M 190 100 Q 175 110 160 115 Q 165 112 170 100 Q 165 88 160 85 Q 175 90 190 100" fill="currentColor" opacity="0.8"/>
          <path d="M 100 190 Q 90 175 85 160 Q 88 165 100 170 Q 112 165 115 160 Q 110 175 100 190" fill="currentColor" opacity="0.8"/>
          <path d="M 10 100 Q 25 90 40 85 Q 35 88 30 100 Q 35 112 40 115 Q 25 110 10 100" fill="currentColor" opacity="0.8"/>
        </g>

        {/* Spiral patterns */}
        <g opacity="0.6">
          <path d="M 100 50 Q 110 55 115 65 Q 120 75 115 85 Q 105 90 95 85 Q 90 75 95 65 Q 100 55 100 50" fill="none" strokeWidth="1"/>
          <path d="M 150 100 Q 145 110 135 115 Q 125 120 115 115 Q 110 105 115 95 Q 125 90 135 95 Q 145 90 150 100" fill="none" strokeWidth="1"/>
          <path d="M 100 150 Q 90 145 85 135 Q 80 125 85 115 Q 95 110 105 115 Q 110 125 105 135 Q 100 145 100 150" fill="none" strokeWidth="1"/>
          <path d="M 50 100 Q 55 90 65 85 Q 75 80 85 85 Q 90 95 85 105 Q 75 110 65 105 Q 55 110 50 100" fill="none" strokeWidth="1"/>
        </g>

        {/* Center diamond */}
        <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.7"/>
        <circle cx="100" cy="100" r="4" fill="white" opacity="0.5"/>

        {/* Inner decorative circles */}
        <circle cx="100" cy="100" r="70" fill="none" strokeWidth="0.5" opacity="0.4"/>
        <circle cx="100" cy="100" r="50" fill="none" strokeWidth="0.5" opacity="0.3"/>
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold-deep)]" />
    </div>
  );
}
