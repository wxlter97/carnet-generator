import type { PlantillaDefinicion } from '../types';

function escaparCsv(valor: string): string {
  return /[",\r\n]/.test(valor) ? `"${valor.replaceAll('"', '""')}"` : valor;
}

export function descargarPlantillaDatos(plantilla: PlantillaDefinicion): void {
  const encabezados = plantilla.camposRegistro.map((campo) => campo.key);
  const filaEjemplo = encabezados.map(() => '');
  const csv = `\uFEFF${encabezados.map(escaparCsv).join(',')}\r\n${filaEjemplo.join(',')}\r\n`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `plantilla-${plantilla.id}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
}
