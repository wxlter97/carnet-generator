import { useWizard } from '../state/WizardContext';
import { getPlantilla } from '../templates';
import { obtenerValoresFijos, valoresFijosPorDefecto } from '../utils/fijos';

export function Step4FixedFields() {
  const { state, dispatch } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);
  if (!plantilla) return null;
  const plantillaActual = plantilla;
  const valores = obtenerValoresFijos(plantillaActual, state.valoresFijos);

  function actualizarValor(campoKey: string, valor: string) {
    dispatch({ type: 'SET_VALORES_FIJOS', valores: { ...state.valoresFijos, [campoKey]: valor } });
  }

  function restablecerValoresPorDefecto() {
    dispatch({ type: 'SET_VALORES_FIJOS', valores: valoresFijosPorDefecto(plantillaActual.camposFijos) });
  }

  return (
    <section>
      <h2>4. Completa los datos fijos del lote</h2>
      <p className="paso-descripcion">
        Estos valores se aplican a todos los documentos de esta tanda. Si dejas un campo vacío,
        se usará su valor por defecto.
      </p>

      <div className="form-fijos">
        {plantillaActual.camposFijos.map((campo) => (
          <label key={campo.key} className="form-fijos__campo">
            <span>
              {campo.label}
              {campo.requerido && <span className="requerido"> *</span>}
            </span>
            <input
              type={campo.tipo === 'numero' ? 'number' : campo.tipo === 'fecha' ? 'date' : 'text'}
              value={valores[campo.key] ?? ''}
              placeholder={campo.placeholder}
              onChange={(e) => actualizarValor(campo.key, e.target.value)}
            />
          </label>
        ))}
      </div>
      <button type="button" className="boton-secundario boton-limpiar-fijos" onClick={restablecerValoresPorDefecto}>
        Restablecer valores por defecto
      </button>
    </section>
  );
}
