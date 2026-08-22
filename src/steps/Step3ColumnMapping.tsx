import { useEffect } from 'react';
import { useWizard } from '../state/WizardContext';
import { getPlantilla } from '../templates';
import { sugerirMapeo } from '../utils/registros';

export function Step3ColumnMapping() {
  const { state, dispatch } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);

  // Al entrar por primera vez (o tras cambiar de archivo/plantilla), sugiere
  // automáticamente el mapeo comparando nombres de columna y de campo.
  useEffect(() => {
    if (!plantilla) return;
    const sinMapeoAun = plantilla.camposRegistro.every((c) => !state.mapeoColumnas[c.key]);
    if (sinMapeoAun && state.encabezados.length > 0) {
      dispatch({ type: 'SET_MAPEO', mapeo: sugerirMapeo(plantilla, state.encabezados) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantilla?.id, state.encabezados]);

  if (!plantilla) return null;

  function actualizarMapeo(campoKey: string, encabezado: string) {
    dispatch({ type: 'SET_MAPEO', mapeo: { ...state.mapeoColumnas, [campoKey]: encabezado } });
  }

  return (
    <section>
      <h2>3. Empareja las columnas de tu archivo con los campos de la plantilla</h2>
      <p className="paso-descripcion">
        Detectamos automáticamente algunas coincidencias. Revisa y corrige donde haga falta —
        los campos marcados con <b>*</b> son obligatorios.
      </p>

      <div className="mapeo-lista">
        {plantilla.camposRegistro.map((campo) => {
          const valorActual = state.mapeoColumnas[campo.key] ?? '';
          const faltante = campo.requerido && !valorActual;
          return (
            <div key={campo.key} className="mapeo-fila">
              <label className="mapeo-fila__label">
                {campo.label}
                {campo.requerido && <span className="requerido"> *</span>}
                {campo.key === plantilla.campoFoto && (
                  <span className="mapeo-fila__tag" title="El valor de esta columna (sin tildes/mayúsculas) debe coincidir con el nombre del archivo de foto en el ZIP">
                    usada para emparejar fotos
                  </span>
                )}
              </label>
              <select
                className={`mapeo-fila__select ${faltante ? 'mapeo-fila__select--error' : ''}`}
                value={valorActual}
                onChange={(e) => actualizarMapeo(campo.key, e.target.value)}
              >
                <option value="">— sin columna asignada —</option>
                {state.encabezados.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </section>
  );
}
