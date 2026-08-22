import type { WizardState } from '../types';

const STORAGE_KEY = 'carnet-generator:wizard:v1';

/** Lo único que NO persistimos son las fotos (viven como object URLs en
 * memoria; un ZIP puede pesar demasiado para localStorage y las URLs no
 * sobreviven a un refresh de todos modos). Todo lo demás sí. */
export type EstadoPersistible = Omit<WizardState, 'nombreArchivoFotos'> & {
  nombreArchivoFotos: string | null; // se guarda solo el nombre, como recordatorio
};

export function guardarEstado(state: WizardState): void {
  try {
    const payload: EstadoPersistible = { ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage lleno o no disponible (modo privado, etc.) — no es fatal,
    // simplemente no persistimos.
  }
}

export function cargarEstado(): EstadoPersistible | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EstadoPersistible;
  } catch {
    return null;
  }
}

export function limpiarEstado(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
