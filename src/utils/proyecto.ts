import type { WizardState } from '../types';

const PROYECTO_VERSION = 1;

export interface ProyectoExportado {
  tipo: 'carnet-generator-proyecto';
  version: number;
  exportadoEn: string;
  estado: Omit<WizardState, 'paso' | 'zoomPreview'>;
}

function esObjeto(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function soloTextos(value: Record<string, unknown>): Record<string, string> {
  const resultado: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string') resultado[key] = item;
  }
  return resultado;
}

export function crearProyecto(state: WizardState): ProyectoExportado {
  const { paso: _paso, zoomPreview: _zoomPreview, ...estado } = state;
  return {
    tipo: 'carnet-generator-proyecto',
    version: PROYECTO_VERSION,
    exportadoEn: new Date().toISOString(),
    estado,
  };
}

export function descargarProyecto(state: WizardState): void {
  const contenido = JSON.stringify(crearProyecto(state), null, 2);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'carnet-generator-proyecto.json';
  enlace.click();
  URL.revokeObjectURL(url);
}

export async function leerProyecto(archivo: File): Promise<WizardState> {
  const contenido = await archivo.text();
  const datos: unknown = JSON.parse(contenido);

  if (
    !esObjeto(datos) ||
    datos.tipo !== 'carnet-generator-proyecto' ||
    datos.version !== PROYECTO_VERSION ||
    !esObjeto(datos.estado) ||
    !Array.isArray(datos.estado.encabezados) ||
    !Array.isArray(datos.estado.filas) ||
    !esObjeto(datos.estado.mapeoColumnas) ||
    !esObjeto(datos.estado.valoresFijos)
  ) {
    throw new Error('El archivo no es un proyecto válido de Carnet Generator.');
  }

  return {
    paso: 1,
    plantillaId: typeof datos.estado.plantillaId === 'string' ? datos.estado.plantillaId : null,
    nombreArchivoDatos:
      typeof datos.estado.nombreArchivoDatos === 'string' ? datos.estado.nombreArchivoDatos : null,
    encabezados: datos.estado.encabezados.filter((item): item is string => typeof item === 'string'),
    filas: datos.estado.filas.filter(esObjeto).map((fila) =>
      Object.fromEntries(
        Object.entries(fila).filter(([, value]) => typeof value === 'string'),
      ) as Record<string, string>,
    ),
    mapeoColumnas: soloTextos(datos.estado.mapeoColumnas),
    valoresFijos: soloTextos(datos.estado.valoresFijos),
    nombreArchivoFotos:
      typeof datos.estado.nombreArchivoFotos === 'string' ? datos.estado.nombreArchivoFotos : null,
    zoomPreview: 1,
  };
}
