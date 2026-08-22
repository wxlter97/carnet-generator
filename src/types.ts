// Tipos compartidos por toda la app: definición de plantillas, datos importados
// y el estado global del asistente (wizard) de 6 pasos.

export type TipoCampo = 'texto' | 'fecha' | 'numero';

/** Un campo que se llena UNA VEZ por lote (ej. "Centro Escolar", "Año Lectivo"). */
export interface CampoFijo {
  key: string;
  label: string;
  requerido: boolean;
  tipo: TipoCampo;
  placeholder?: string;
}

/** Un campo que viene del CSV/Excel, uno por estudiante/carnet. */
export interface CampoRegistro {
  key: string;
  label: string;
  requerido: boolean;
  tipo: TipoCampo;
}

/** Datos de un registro ya resueltos: valores de camposRegistro + foto opcional. */
export type ValoresRegistro = Record<string, string>;
export type ValoresFijos = Record<string, string>;

export interface CarnetRenderProps {
  valores: ValoresRegistro;
  fijos: ValoresFijos;
  fotoUrl?: string;
}

export interface PlantillaDefinicion {
  id: string;
  nombre: string;
  descripcion: string;
  /** Campo de camposRegistro cuyo valor (slugificado) debe coincidir con el nombre de archivo de la foto en el ZIP. */
  campoFoto: string;
  camposFijos: CampoFijo[];
  camposRegistro: CampoRegistro[];
  /** Colores/acento usado en la miniatura del selector de plantillas. */
  colorAcento: string;
  Render: (props: CarnetRenderProps) => React.ReactElement;
}

/** Fila cruda tal cual viene del archivo importado (claves = encabezados originales). */
export type FilaCruda = Record<string, string>;

/** Mapa: key de CampoRegistro -> encabezado original del archivo importado ('' = sin mapear). */
export type MapeoColumnas = Record<string, string>;

export interface FotoExtraida {
  url: string;
  nombreOriginal: string;
}

/** Mapa: nombre de archivo slugificado (sin extensión) -> foto extraída del ZIP. */
export type MapaFotos = Map<string, FotoExtraida>;

export interface WizardState {
  paso: number; // 1..6
  plantillaId: string | null;
  nombreArchivoDatos: string | null;
  encabezados: string[];
  filas: FilaCruda[];
  mapeoColumnas: MapeoColumnas;
  valoresFijos: ValoresFijos;
  nombreArchivoFotos: string | null;
  zoomPreview: number; // 1 = 100%
}
