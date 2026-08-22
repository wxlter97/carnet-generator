import Papa from 'papaparse';
import type { FilaCruda } from '../types';

export interface ArchivoParseado {
  encabezados: string[];
  filas: FilaCruda[];
}

/** Lee un CSV o Excel (.xlsx/.xls) subido por el usuario y lo normaliza a
 * filas de objetos { encabezado: valor }. Todo ocurre en el navegador. */
export async function parseDataFile(file: File): Promise<ArchivoParseado> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (ext === 'csv') {
    return parseCsv(file);
  }
  if (ext === 'xlsx' || ext === 'xls') {
    return parseExcel(file);
  }
  throw new Error(
    `Formato "${ext || 'desconocido'}" no soportado. Sube un archivo .csv, .xlsx o .xls.`,
  );
}

function parseCsv(file: File): Promise<ArchivoParseado> {
  return new Promise((resolve, reject) => {
    Papa.parse<FilaCruda>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        if (result.errors.length > 0) {
          const fatal = result.errors.find((e) => e.type !== 'FieldMismatch');
          if (fatal) {
            reject(new Error(`Error leyendo el CSV: ${fatal.message}`));
            return;
          }
        }
        const encabezados = result.meta.fields ?? [];
        if (encabezados.length === 0) {
          reject(new Error('El CSV no tiene encabezados de columna.'));
          return;
        }
        resolve({ encabezados, filas: result.data });
      },
      error: (err: Error) => reject(err),
    });
  });
}

async function parseExcel(file: File): Promise<ArchivoParseado> {
  // Import perezoso: xlsx (SheetJS) pesa bastante y solo hace falta si el
  // usuario efectivamente sube un Excel, no en la carga inicial de la app.
  const XLSX = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const primeraHoja = workbook.SheetNames[0];
  if (!primeraHoja) {
    throw new Error('El archivo Excel no tiene hojas.');
  }
  const hoja = workbook.Sheets[primeraHoja];
  const filas = XLSX.utils.sheet_to_json<FilaCruda>(hoja, {
    defval: '',
    raw: false, // fuerza strings (evita números/fechas como tipos nativos)
  });
  if (filas.length === 0) {
    throw new Error('La primera hoja del Excel no tiene filas de datos.');
  }
  const encabezados = Object.keys(filas[0]).map((h) => h.trim());
  return { encabezados, filas };
}
