import { useRef, useState } from 'react';
import { useWizard } from '../state/WizardContext';
import { parseDataFile } from '../utils/parseFile';
import { IconCheck, IconDocument } from '../components/icons';
import { getPlantilla } from '../templates';
import type { FilaCruda } from '../types';

export function Step2UploadData() {
  const { state, dispatch } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);
  const [modoManual, setModoManual] = useState(false);
  const [filasManuales, setFilasManuales] = useState<FilaCruda[]>(() =>
    plantilla
      ? [Object.fromEntries(plantilla.camposRegistro.map((campo) => [campo.key, '']))]
      : [],
  );

  function cambiarModoManual() {
    if (!modoManual && plantilla && filasManuales.length === 0) {
      setFilasManuales([Object.fromEntries(plantilla.camposRegistro.map((campo) => [campo.key, '']))]);
    }
    setModoManual((actual) => !actual);
  }

  function actualizarFila(indice: number, campo: string, valor: string) {
    setFilasManuales((actuales) =>
      actuales.map((fila, i) => (i === indice ? { ...fila, [campo]: valor } : fila)),
    );
  }

  function guardarListadoManual() {
    if (!plantilla) return;
    const camposRequeridos = plantilla.camposRegistro.filter((campo) => campo.requerido);
    const filaInvalida = filasManuales.some((fila) =>
      camposRequeridos.some((campo) => !String(fila[campo.key] ?? '').trim()),
    );
    if (filaInvalida) {
      setError('Completa los campos obligatorios de cada estudiante antes de guardar el listado.');
      return;
    }
    const encabezados = plantilla.camposRegistro.map((campo) => campo.key);
    dispatch({
      type: 'CARGAR_DATOS',
      nombreArchivo: 'Listado ingresado desde la app',
      encabezados,
      filas: filasManuales,
    });
    dispatch({
      type: 'SET_MAPEO',
      mapeo: Object.fromEntries(encabezados.map((encabezado) => [encabezado, encabezado])),
    });
    setError(null);
  }

  async function procesarArchivo(file: File) {
    setError(null);
    setCargando(true);
    try {
      const { encabezados, filas } = await parseDataFile(file);
      dispatch({ type: 'CARGAR_DATOS', nombreArchivo: file.name, encabezados, filas });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo leer el archivo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <section>
      <h2>2. Ingresa tu lista de estudiantes</h2>
      <p className="paso-descripcion">
        Puedes cargar un CSV/Excel o escribir el listado directamente desde la app.
      </p>

      <div className="datos-opciones">
        <div
          className={`dropzone ${arrastrando ? 'dropzone--activa' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={(e) => {
            e.preventDefault();
            setArrastrando(false);
            const file = e.dataTransfer.files[0];
            if (file) void procesarArchivo(file);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void procesarArchivo(file);
              e.target.value = '';
            }}
          />
          <p className="dropzone__icono">
            <IconDocument />
          </p>
          <p>
            <strong>Elegir un archivo</strong> o arrástralo aquí
          </p>
          <p className="dropzone__hint">.csv, .xlsx o .xls</p>
        </div>
        {plantilla && (
          <button type="button" className="datos-manuales__boton" onClick={cambiarModoManual}>
            {modoManual ? 'Volver a cargar archivo' : 'Ingresar listado desde la app'}
          </button>
        )}
      </div>

      {modoManual && plantilla && (
        <div className="datos-manuales">
          <h3>Listado ingresado desde la app</h3>
          <p className="paso-descripcion">
            Agrega un estudiante por fila. Los campos marcados con <b>*</b> son obligatorios.
          </p>
          <div className="tabla-scroll">
            <table className="tabla-preview tabla-manual">
              <thead>
                <tr>
                  {plantilla.camposRegistro.map((campo) => (
                    <th key={campo.key}>{campo.label}{campo.requerido && <span className="requerido"> *</span>}</th>
                  ))}
                  <th aria-label="Acciones" />
                </tr>
              </thead>
              <tbody>
                {filasManuales.map((fila, indice) => (
                  <tr key={indice}>
                    {plantilla.camposRegistro.map((campo) => (
                      <td key={campo.key}>
                        <input
                          value={fila[campo.key] ?? ''}
                          placeholder={campo.label}
                          onChange={(e) => actualizarFila(indice, campo.key, e.target.value)}
                        />
                      </td>
                    ))}
                    <td>
                      <button
                        type="button"
                        className="boton-texto"
                        disabled={filasManuales.length === 1}
                        onClick={() => setFilasManuales((actuales) => actuales.filter((_, i) => i !== indice))}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="datos-manuales__acciones">
            <button
              type="button"
              className="boton-secundario"
              onClick={() => setFilasManuales((actuales) => [
                ...actuales,
                Object.fromEntries(plantilla.camposRegistro.map((campo) => [campo.key, ''])),
              ])}
            >
              + Agregar estudiante
            </button>
            <button type="button" className="boton-primario" onClick={guardarListadoManual}>
              Usar este listado
            </button>
          </div>
        </div>
      )}

      {cargando && <p>Leyendo archivo…</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {state.nombreArchivoDatos && !cargando && (
        <div className="resultado-archivo">
          <p>
            <IconCheck size={13} className="mensaje-ok" /> <strong>{state.nombreArchivoDatos}</strong> —{' '}
            {state.filas.length} fila(s), {state.encabezados.length} columna(s) detectadas.
          </p>
          <div className="tabla-scroll">
            <table className="tabla-preview">
              <thead>
                <tr>
                  {state.encabezados.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.filas.slice(0, 5).map((fila, i) => (
                  <tr key={i}>
                    {state.encabezados.map((h) => (
                      <td key={h}>{fila[h]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {state.filas.length > 5 && (
            <p className="tabla-preview__nota">Mostrando 5 de {state.filas.length} filas.</p>
          )}
        </div>
      )}
    </section>
  );
}
