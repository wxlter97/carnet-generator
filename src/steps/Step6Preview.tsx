import { useMemo } from 'react';
import { useWizard } from '../state/WizardContext';
import { getPlantilla } from '../templates';
import { buscarFoto, construirValores } from '../utils/registros';
import { IconMinus, IconPlus, IconPrinter } from '../components/icons';

const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.6;
const ZOOM_PASO = 0.2;

export function Step6Preview() {
  const { state, dispatch, fotos } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);

  const registros = useMemo(() => {
    if (!plantilla) return [];
    return state.filas.map((fila, i) => {
      const valores = construirValores(fila, plantilla, state.mapeoColumnas);
      const foto = buscarFoto(valores, plantilla, fotos);
      return { id: i, valores, fotoUrl: foto?.url };
    });
  }, [plantilla, state.filas, state.mapeoColumnas, fotos]);

  if (!plantilla) return null;

  const conFoto = registros.filter((r) => r.fotoUrl).length;

  function cambiarZoom(delta: number) {
    const nuevo = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((state.zoomPreview + delta) * 100) / 100));
    dispatch({ type: 'SET_ZOOM', zoom: nuevo });
  }

  return (
    <section>
      <div className="preview-toolbar no-imprimir">
        <div>
          <h2>6. Vista previa e impresión</h2>
          <p className="paso-descripcion">
            {registros.length} carnet(s)
            {plantilla.campoFoto &&
              ` — ${conFoto} con foto, ${registros.length - conFoto} con silueta de respaldo`}
            . Tamaño real: 85.6 × 54&nbsp;mm (CR80).
          </p>
          {plantilla.campoFoto && conFoto === 0 && state.nombreArchivoFotos && (
            <p className="mensaje-alerta">
              ⚠️ Las fotos de <strong>{state.nombreArchivoFotos}</strong> no se conservaron tras
              recargar la página.{' '}
              <button type="button" className="boton-texto" onClick={() => dispatch({ type: 'IR_A_PASO', paso: 5 })}>
                Volver a subirlas
              </button>
            </p>
          )}
        </div>
        <div className="preview-toolbar__acciones">
          <div className="zoom-control">
            <button type="button" onClick={() => cambiarZoom(-ZOOM_PASO)} aria-label="Alejar">
              <IconMinus />
            </button>
            <span>{Math.round(state.zoomPreview * 100)}%</span>
            <button type="button" onClick={() => cambiarZoom(ZOOM_PASO)} aria-label="Acercar">
              <IconPlus />
            </button>
          </div>
          <button type="button" className="boton-primario" onClick={() => window.print()}>
            <IconPrinter size={17} /> Imprimir
          </button>
        </div>
      </div>

      <div className="vista-impresion">
        <div
          className="print-grid"
          style={{ zoom: state.zoomPreview } as React.CSSProperties}
        >
          {registros.map((r) => (
            <plantilla.Render key={r.id} valores={r.valores} fijos={state.valoresFijos} fotoUrl={r.fotoUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
