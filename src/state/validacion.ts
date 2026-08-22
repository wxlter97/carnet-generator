import type { PlantillaDefinicion, WizardState } from '../types';

export function paso1Valido(state: WizardState): boolean {
  return state.plantillaId !== null;
}

export function paso2Valido(state: WizardState): boolean {
  return state.encabezados.length > 0 && state.filas.length > 0;
}

export function paso3Valido(state: WizardState, plantilla: PlantillaDefinicion | undefined): boolean {
  if (!plantilla) return false;
  return plantilla.camposRegistro
    .filter((c) => c.requerido)
    .every((c) => !!state.mapeoColumnas[c.key]);
}

export function paso4Valido(state: WizardState, plantilla: PlantillaDefinicion | undefined): boolean {
  if (!plantilla) return false;
  return plantilla.camposFijos
    .filter((c) => c.requerido)
    .every((c) => (state.valoresFijos[c.key] ?? '').trim() !== '');
}

/** paso5 (fotos) es siempre "válido" para avanzar: las fotos son opcionales,
 * los carnets sin foto simplemente muestran una silueta de respaldo. */
export function paso5Valido(): boolean {
  return true;
}

export function pasoValido(
  paso: number,
  state: WizardState,
  plantilla: PlantillaDefinicion | undefined,
): boolean {
  switch (paso) {
    case 1:
      return paso1Valido(state);
    case 2:
      return paso2Valido(state);
    case 3:
      return paso3Valido(state, plantilla);
    case 4:
      return paso4Valido(state, plantilla);
    case 5:
      return paso5Valido();
    default:
      return true;
  }
}
