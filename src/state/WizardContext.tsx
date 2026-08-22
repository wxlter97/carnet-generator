import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { FilaCruda, MapaFotos, MapeoColumnas, ValoresFijos, WizardState } from '../types';
import { cargarEstado, guardarEstado, limpiarEstado } from '../utils/storage';
import { revocarFotos } from '../utils/zipPhotos';

const ESTADO_INICIAL: WizardState = {
  paso: 1,
  plantillaId: null,
  nombreArchivoDatos: null,
  encabezados: [],
  filas: [],
  mapeoColumnas: {},
  valoresFijos: {},
  nombreArchivoFotos: null,
  zoomPreview: 1,
};

type Accion =
  | { type: 'IR_A_PASO'; paso: number }
  | { type: 'ELEGIR_PLANTILLA'; plantillaId: string }
  | { type: 'CARGAR_DATOS'; nombreArchivo: string; encabezados: string[]; filas: FilaCruda[] }
  | { type: 'SET_MAPEO'; mapeo: MapeoColumnas }
  | { type: 'SET_VALORES_FIJOS'; valores: ValoresFijos }
  | { type: 'SET_ARCHIVO_FOTOS'; nombreArchivo: string | null }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'REINICIAR' }
  | { type: 'RESTAURAR'; estado: WizardState };

function reducer(state: WizardState, action: Accion): WizardState {
  switch (action.type) {
    case 'IR_A_PASO':
      return { ...state, paso: action.paso };
    case 'ELEGIR_PLANTILLA':
      // Cambiar de plantilla invalida el mapeo y los campos fijos anteriores,
      // porque cada plantilla define sus propios campos.
      return {
        ...state,
        plantillaId: action.plantillaId,
        mapeoColumnas: {},
        valoresFijos: {},
      };
    case 'CARGAR_DATOS':
      return {
        ...state,
        nombreArchivoDatos: action.nombreArchivo,
        encabezados: action.encabezados,
        filas: action.filas,
        mapeoColumnas: {},
      };
    case 'SET_MAPEO':
      return { ...state, mapeoColumnas: action.mapeo };
    case 'SET_VALORES_FIJOS':
      return { ...state, valoresFijos: action.valores };
    case 'SET_ARCHIVO_FOTOS':
      return { ...state, nombreArchivoFotos: action.nombreArchivo };
    case 'SET_ZOOM':
      return { ...state, zoomPreview: action.zoom };
    case 'REINICIAR':
      return ESTADO_INICIAL;
    case 'RESTAURAR':
      return action.estado;
    default:
      return state;
  }
}

interface WizardContextValue {
  state: WizardState;
  dispatch: Dispatch<Accion>;
  fotos: MapaFotos;
  setFotos: (fotos: MapaFotos) => void;
  reiniciarTodo: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL, (inicial) => {
    const guardado = cargarEstado();
    return guardado ? { ...inicial, ...guardado } : inicial;
  });

  // Las fotos NO viven en el reducer persistido: son object URLs pesados que
  // no tiene sentido serializar. Se guardan aparte y se pierden en un
  // refresh (el usuario debe volver a subir el ZIP, paso en el que además
  // ya le avisamos con nombreArchivoFotos si antes había subido uno).
  const [fotos, setFotosState] = useState<MapaFotos>(() => new Map());

  useEffect(() => {
    guardarEstado(state);
  }, [state]);

  // Revoca los object URLs al desmontar la app (cierre de pestaña/recarga).
  useEffect(() => {
    return () => revocarFotos(fotos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<WizardContextValue>(
    () => ({
      state,
      dispatch,
      fotos,
      setFotos: (nuevas) => {
        setFotosState((anteriores) => {
          if (anteriores !== nuevas) revocarFotos(anteriores);
          return nuevas;
        });
      },
      reiniciarTodo: () => {
        setFotosState((anteriores) => {
          revocarFotos(anteriores);
          return new Map();
        });
        limpiarEstado();
        dispatch({ type: 'REINICIAR' });
      },
    }),
    [state, fotos],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard debe usarse dentro de <WizardProvider>');
  return ctx;
}
