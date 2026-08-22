import type {
  FilaCruda,
  MapaFotos,
  MapeoColumnas,
  PlantillaDefinicion,
  ValoresRegistro,
} from '../types';
import { slugify } from './text';

/** Construye los valores de un carnet (uno por fila del CSV) resolviendo el
 * mapeo de columnas de la plantilla actual. */
export function construirValores(
  fila: FilaCruda,
  plantilla: PlantillaDefinicion,
  mapeo: MapeoColumnas,
): ValoresRegistro {
  const valores: ValoresRegistro = {};
  for (const campo of plantilla.camposRegistro) {
    const encabezado = mapeo[campo.key];
    valores[campo.key] = encabezado ? String(fila[encabezado] ?? '').trim() : '';
  }
  return valores;
}

/** Busca la foto de un registro en el mapa extraído del ZIP, usando el
 * campo que la plantilla designó como llave de emparejamiento. */
export function buscarFoto(valores: ValoresRegistro, plantilla: PlantillaDefinicion, fotos: MapaFotos) {
  if (!plantilla.campoFoto) return undefined; // la plantilla no usa foto de estudiante
  const valorClave = valores[plantilla.campoFoto];
  if (!valorClave) return undefined;
  return fotos.get(slugify(valorClave));
}

/** Sugiere automáticamente qué encabezado del archivo corresponde a cada
 * campo de la plantilla, comparando versiones normalizadas de label/key
 * contra los encabezados disponibles. El usuario siempre puede corregirlo. */
export function sugerirMapeo(
  plantilla: PlantillaDefinicion,
  encabezados: string[],
): MapeoColumnas {
  const encabezadosSlug = encabezados.map((h) => ({ original: h, slug: slugify(h) }));
  const mapeo: MapeoColumnas = {};

  for (const campo of plantilla.camposRegistro) {
    const candidatos = [slugify(campo.label), slugify(campo.key)];
    const match = encabezadosSlug.find((h) =>
      candidatos.some((c) => h.slug === c || h.slug.includes(c) || c.includes(h.slug)),
    );
    mapeo[campo.key] = match?.original ?? '';
  }

  return mapeo;
}
