import { useMemo } from 'react';
import { useWizard } from './state/WizardContext';
import { getPlantilla } from './templates';
import { Stepper } from './components/Stepper';
import { Step1TemplateSelect } from './steps/Step1TemplateSelect';
import { Step2UploadData } from './steps/Step2UploadData';
import { Step3ColumnMapping } from './steps/Step3ColumnMapping';
import { Step4FixedFields } from './steps/Step4FixedFields';
import { Step5UploadPhotos } from './steps/Step5UploadPhotos';
import { Step6Preview } from './steps/Step6Preview';
import { pasoValido } from './state/validacion';

const TOTAL_PASOS = 6;

function App() {
  const { state, dispatch, reiniciarTodo } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);

  // El máximo paso al que se puede saltar es el primero que falla + 1: no
  // tiene sentido dejar entrar a "mapeo" si todavía no hay archivo cargado.
  const maxPasoHabilitado = useMemo(() => {
    for (let p = 1; p <= TOTAL_PASOS; p++) {
      if (!pasoValido(p, state, plantilla)) return p;
    }
    return TOTAL_PASOS;
  }, [state, plantilla]);

  const puedeContinuar = pasoValido(state.paso, state, plantilla);
  const esUltimoPaso = state.paso === TOTAL_PASOS;

  function irAPaso(paso: number) {
    dispatch({ type: 'IR_A_PASO', paso });
  }

  return (
    <div className="app-shell">
      <header className="app-header no-imprimir">
        <h1>🪪 Generador de Carnets</h1>
        <button type="button" className="boton-texto" onClick={() => {
          if (confirm('Esto borra la plantilla elegida, los datos cargados y las fotos. ¿Continuar?')) {
            reiniciarTodo();
          }
        }}>
          Empezar de nuevo
        </button>
      </header>

      <Stepper pasoActual={state.paso} maxPasoHabilitado={maxPasoHabilitado} onIrAPaso={irAPaso} />

      <main className="app-main">
        {state.paso === 1 && <Step1TemplateSelect />}
        {state.paso === 2 && <Step2UploadData />}
        {state.paso === 3 && <Step3ColumnMapping />}
        {state.paso === 4 && <Step4FixedFields />}
        {state.paso === 5 && <Step5UploadPhotos />}
        {state.paso === 6 && <Step6Preview />}
      </main>

      {!esUltimoPaso && (
        <footer className="app-footer no-imprimir">
          <button
            type="button"
            className="boton-secundario"
            disabled={state.paso === 1}
            onClick={() => irAPaso(state.paso - 1)}
          >
            ← Atrás
          </button>
          <button
            type="button"
            className="boton-primario"
            disabled={!puedeContinuar}
            onClick={() => irAPaso(state.paso + 1)}
          >
            Continuar →
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
