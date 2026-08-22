/** Normaliza un texto para comparaciones tolerantes: minúsculas, sin tildes,
 * sin espacios/símbolos extra. Se usa tanto para emparejar fotos del ZIP
 * como para sugerir automáticamente el mapeo de columnas. */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita diacríticos (tildes, diéresis)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Quita la extensión de un nombre de archivo (foto.jpg -> foto). */
export function stripExtension(filename: string): string {
  const idx = filename.lastIndexOf('.');
  return idx > 0 ? filename.slice(0, idx) : filename;
}

const EXTENSIONES_IMAGEN = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

export function esArchivoImagen(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXTENSIONES_IMAGEN.has(ext);
}
