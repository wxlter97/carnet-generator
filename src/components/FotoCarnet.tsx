interface FotoCarnetProps {
  url?: string;
  nombre: string;
  className?: string;
}

/** Foto del estudiante con silueta de respaldo cuando no hay foto (no
 * encontrada en el ZIP, o el usuario aún no la ha subido). */
export function FotoCarnet({ url, nombre, className }: FotoCarnetProps) {
  if (url) {
    return <img src={url} alt={nombre} className={className} draggable={false} />;
  }
  return (
    <div className={className} aria-label={`Sin foto: ${nombre}`}>
      <svg viewBox="0 0 64 64" width="60%" height="60%" style={{ opacity: 0.45 }}>
        <circle cx="32" cy="24" r="12" fill="currentColor" />
        <path
          d="M8 56c0-13.3 10.7-22 24-22s24 8.7 24 22"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
