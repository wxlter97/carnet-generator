// Iconos de línea minimalistas (estilo SF Symbols: trazo redondeado,
// currentColor) para reemplazar los emoji en la UI de la app y acercarla al
// lenguaje visual de Apple. Deliberadamente simples: un solo <svg> cada uno,
// sin dependencias externas.

type IconProps = { size?: number; className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconBadge({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <path d="M9 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <circle cx="12" cy="10.5" r="2.5" />
      <path d="M8 17c0-2 1.8-3.2 4-3.2s4 1.2 4 3.2" />
    </svg>
  );
}

export function IconDocument({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 2.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V4A1.5 1.5 0 0 1 7 2.5Z" />
      <path d="M14 2.5V7h4" />
      <path d="M9 12.5h6M9 16h6" />
    </svg>
  );
}

export function IconFolder({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 6.2A1.7 1.7 0 0 1 5.2 4.5h4l1.8 2h8.3a1.7 1.7 0 0 1 1.7 1.7v9.1a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7Z" />
    </svg>
  );
}

export function IconPrinter({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 8.5V3.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5" />
      <rect x="3.5" y="8.5" width="17" height="8.5" rx="2" />
      <path d="M7 15h10v5.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1Z" />
      <path d="M7.2 12h.01" />
    </svg>
  );
}

export function IconCheck({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.8 9.5 18l10-13" />
    </svg>
  );
}

export function IconChevronLeft({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function IconChevronRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function IconMinus({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconPlus({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
