import type { CampoFijo, PlantillaDefinicion, ValoresFijos } from '../types';

export function valoresFijosPorDefecto(campos: CampoFijo[]): ValoresFijos {
  return Object.fromEntries(
    campos
      .filter((campo) => campo.valorPorDefecto !== undefined)
      .map((campo) => [campo.key, campo.valorPorDefecto as string]),
  );
}

export function obtenerValoresFijos(
  plantilla: PlantillaDefinicion,
  valores: ValoresFijos,
): ValoresFijos {
  return { ...valoresFijosPorDefecto(plantilla.camposFijos), ...valores };
}
