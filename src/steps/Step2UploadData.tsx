import { useRef, useState } from 'react';
import { useWizard } from '../state/WizardContext';
import { parseDataFile } from '../utils/parseFile';
import { IconCheck, IconDocument } from '../components/icons';

export function Step2UploadData() {
  const { state, dispatch } = useWizard();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

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
      <h2>2. Sube tu lista de estudiantes (CSV o Excel)</h2>
      <p className="paso-descripcion">
        El archivo debe tener una fila de encabezados y una fila por estudiante. En el siguiente
        paso podrás decidir qué columna corresponde a cada campo.
      </p>

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
          <strong>Haz clic para elegir un archivo</strong> o arrástralo aquí
        </p>
        <p className="dropzone__hint">.csv, .xlsx o .xls</p>
      </div>

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
