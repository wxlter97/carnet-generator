import { useWizard } from '../state/WizardContext';
import { getPlantilla } from '../templates';

export function Step4FixedFields() {
  const { state, dispatch } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);
  if (!plantilla) return null;

  function actualizarValor(campoKey: string, valor: string) {
    dispatch({ type: 'SET_VALORES_FIJOS', valores: { ...state.valoresFijos, [campoKey]: valor } });
  }

  return (
    <section>
      <h2>4. Completa los datos fijos del lote</h2>
      <p className="paso-descripcion">
        Estos valores se llenan una sola vez y se aplican a todos los carnets de esta tanda.
      </p>

      <div className="form-fijos">
        {plantilla.camposFijos.map((campo) => (
          <label key={campo.key} className="form-fijos__campo">
            <span>
              {campo.label}
              {campo.requerido && <span className="requerido"> *</span>}
            </span>
            <input
              type={campo.tipo === 'numero' ? 'number' : campo.tipo === 'fecha' ? 'date' : 'text'}
              value={state.valoresFijos[campo.key] ?? ''}
              placeholder={campo.placeholder}
              onChange={(e) => actualizarValor(campo.key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
