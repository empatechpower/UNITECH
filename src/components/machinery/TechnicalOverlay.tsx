'use client';

interface TechnicalOverlayProps {
  index: number;
  variant?: 'left' | 'right' | 'center';
}

export default function TechnicalOverlay({ index, variant = 'left' }: TechnicalOverlayProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Corner coordinate markers */}
      {variant === 'left' && (
        <>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-3 h-px bg-accent-cyan/30" />
            <div className="w-px h-3 bg-accent-cyan/30" />
          </div>
          <span className="absolute top-5 left-10 font-mono text-[9px] text-accent-cyan/25 tracking-wider">
            {num}.00
          </span>
        </>
      )}

      {variant === 'right' && (
        <>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="w-px h-3 bg-accent-cyan/30" />
            <div className="w-3 h-px bg-accent-cyan/30" />
          </div>
          <span className="absolute top-5 right-10 font-mono text-[9px] text-accent-cyan/25 tracking-wider">
            SYS.{num}
          </span>
        </>
      )}

      {/* Blueprint dash line */}
      <div
        className={`absolute top-0 ${variant === 'right' ? 'right-0' : 'left-0'} w-px h-full`}
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(6,182,212,0.12) 0px, rgba(6,182,212,0.12) 4px, transparent 4px, transparent 12px)',
        }}
      />

      {/* Large ghost number */}
      <div className={`absolute ${variant === 'right' ? '-right-4 md:-right-6' : '-left-4 md:-left-6'} -bottom-6 md:-bottom-4`}>
        <span className="font-display text-[120px] md:text-[180px] leading-none text-white/[0.02] select-none">
          {num}
        </span>
      </div>
    </div>
  );
}
