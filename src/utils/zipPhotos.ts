import type { MapaFotos } from '../types';
import { esArchivoImagen, slugify, stripExtension } from './text';

/** Extrae todas las imágenes de un ZIP y las indexa por nombre de archivo
 * (sin extensión, slugificado) para poder emparejarlas contra una columna
 * del CSV. Las URLs devueltas son object URLs (blob:) — hay que revocarlas
 * cuando ya no se usen para no filtrar memoria. */
export async function extraerFotosDeZip(
  file: File,
  onProgress?: (procesadas: number, total: number) => void,
): Promise<MapaFotos> {
  // Import perezoso: jszip solo hace falta en el paso 5 (subir fotos), no
  // en la carga inicial de la app.
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(file);

  const entradas = Object.values(zip.files).filter(
    (entry) =>
      !entry.dir &&
      !entry.name.startsWith('__MACOSX/') &&
      !entry.name.split('/').pop()?.startsWith('.') &&
      esArchivoImagen(entry.name),
  );

  const mapa: MapaFotos = new Map();
  let procesadas = 0;

  for (const entry of entradas) {
    const blob = await entry.async('blob');
    const url = URL.createObjectURL(blob);
    const nombreArchivo = entry.name.split('/').pop() ?? entry.name;
    const key = slugify(stripExtension(nombreArchivo));
    mapa.set(key, { url, nombreOriginal: nombreArchivo });
    procesadas += 1;
    onProgress?.(procesadas, entradas.length);
  }

  return mapa;
}

/** Libera todos los object URLs de un mapa de fotos. */
export function revocarFotos(mapa: MapaFotos): void {
  for (const foto of mapa.values()) {
    URL.revokeObjectURL(foto.url);
  }
}
