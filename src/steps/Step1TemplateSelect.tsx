import { plantillas } from '../templates';
import type { PlantillaDefinicion } from '../types';
import { useWizard } from '../state/WizardContext';

/** Genera valores de ejemplo para poder mostrar una miniatura real de la
 * plantilla (no un mockup aparte) en el selector. */
function datosDeEjemplo(plantilla: PlantillaDefinicion) {
  const muestrasRegistro: Record<string, string> = {
    nombreCompleto: 'Ana Lucía Martínez',
    grado: '6°',
    seccion: 'A',
    codigo: '00124',
    tipoSangre: 'O+',
  };
  const valores: Record<string, string> = {};
  for (const c of plantilla.camposRegistro) {
    valores[c.key] = muestrasRegistro[c.key] ?? c.label;
  }
  const fijos: Record<string, string> = {};
  for (const c of plantilla.camposFijos) {
    fijos[c.key] = c.placeholder ?? c.label;
  }
  return { valores, fijos };
}

export function Step1TemplateSelect() {
  const { state, dispatch } = useWizard();

  return (
    <section>
      <h2>1. Elige una plantilla de carnet</h2>
      <p className="paso-descripcion">
        Cada plantilla trae su propio diseño y sus propios campos. Podrás llenarlos en los
        siguientes pasos.
      </p>
      <div className="plantillas-grid">
        {plantillas.map((plantilla) => {
          const { valores, fijos } = datosDeEjemplo(plantilla);
          const seleccionada = state.plantillaId === plantilla.id;
          return (
            <button
              key={plantilla.id}
              type="button"
              className={`plantilla-card ${seleccionada ? 'plantilla-card--activa' : ''}`}
              onClick={() => dispatch({ type: 'ELEGIR_PLANTILLA', plantillaId: plantilla.id })}
            >
              <div className="plantilla-miniatura">
                <div className="plantilla-miniatura__escala">
                  <plantilla.Render valores={valores} fijos={fijos} />
                </div>
              </div>
              <div className="plantilla-card__info">
                <span
                  className="plantilla-card__punto"
                  style={{ background: plantilla.colorAcento }}
                />
                <div>
                  <div className="plantilla-card__nombre">{plantilla.nombre}</div>
                  <div className="plantilla-card__desc">{plantilla.descripcion}</div>
                </div>
              </div>
              {seleccionada && <span className="plantilla-card__check">✓ Seleccionada</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
