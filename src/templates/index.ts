import type { PlantillaDefinicion } from '../types';

// Registro automático de plantillas: cada archivo `*.template.tsx` en esta
// carpeta exporta un `default` de tipo PlantillaDefinicion y aparece solo en
// el selector. Para agregar una plantilla nueva, copia un archivo existente,
// cambia el `id`/`nombre`/`Render` y listo — no hay que tocar nada más.
const modulos = import.meta.glob<{ default: PlantillaDefinicion }>('./*.template.tsx', {
  eager: true,
});

export const plantillas: PlantillaDefinicion[] = Object.values(modulos)
  .map((m) => m.default)
  .sort((a, b) => a.nombre.localeCompare(b.nombre));

export function getPlantilla(id: string | null): PlantillaDefinicion | undefined {
  return plantillas.find((p) => p.id === id);
}
