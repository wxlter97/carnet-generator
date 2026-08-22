import { useMemo, useRef, useState } from 'react';
import { useWizard } from '../state/WizardContext';
import { getPlantilla } from '../templates';
import { extraerFotosDeZip } from '../utils/zipPhotos';
import { buscarFoto, construirValores } from '../utils/registros';

export function Step5UploadPhotos() {
  const { state, dispatch, fotos, setFotos } = useWizard();
  const plantilla = getPlantilla(state.plantillaId);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);
  const [progreso, setProgreso] = useState<{ hecho: number; total: number } | null>(null);

  const stats = useMemo(() => {
    if (!plantilla) return null;
    let encontradas = 0;
    const faltantes: string[] = [];
    for (const fila of state.filas) {
      const valores = construirValores(fila, plantilla, state.mapeoColumnas);
      const foto = buscarFoto(valores, plantilla, fotos);
      if (foto) encontradas += 1;
      else faltantes.push(valores[plantilla.campoFoto] || '(sin valor)');
    }
    return { encontradas, total: state.filas.length, faltantes };
  }, [plantilla, state.filas, state.mapeoColumnas, fotos]);

  async function procesarZip(file: File) {
    setError(null);
    setCargando(true);
    setProgreso({ hecho: 0, total: 0 });
    try {
      const mapa = await extraerFotosDeZip(file, (hecho, total) => setProgreso({ hecho, total }));
      if (mapa.size === 0) {
        setError('No se encontraron imágenes (.jpg, .jpeg, .png, .webp) dentro del ZIP.');
        return;
      }
      setFotos(mapa);
      dispatch({ type: 'SET_ARCHIVO_FOTOS', nombreArchivo: file.name });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo leer el ZIP.');
    } finally {
      setCargando(false);
      setProgreso(null);
    }
  }

  if (!plantilla) return null;

  return (
    <section>
      <h2>5. Sube el ZIP con las fotos (opcional)</h2>
      <p className="paso-descripcion">
        Nombra cada foto igual que el valor de <b>{plantilla.camposRegistro.find((c) => c.key === plantilla.campoFoto)?.label}</b> (ej.{' '}
        <code>juan-perez.jpg</code>). No es sensible a mayúsculas ni tildes. Si un estudiante no
        tiene foto, su carnet se genera igual con una silueta de respaldo.
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
          if (file) void procesarZip(file);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void procesarZip(file);
            e.target.value = '';
          }}
        />
        <p className="dropzone__icono">🗂️</p>
        <p>
          <strong>Haz clic para elegir un ZIP</strong> o arrástralo aquí
        </p>
        <p className="dropzone__hint">.zip con fotos .jpg / .png / .webp</p>
      </div>

      {!cargando && fotos.size === 0 && state.nombreArchivoFotos && (
        <p className="mensaje-alerta">
          ⚠️ Habías subido <strong>{state.nombreArchivoFotos}</strong>, pero las fotos no se
          conservan al recargar la página. Súbelo de nuevo para que aparezcan en los carnets.
        </p>
      )}

      {cargando && (
        <p>
          Extrayendo fotos… {progreso && progreso.total > 0 ? `${progreso.hecho}/${progreso.total}` : ''}
        </p>
      )}
      {error && <p className="mensaje-error">{error}</p>}

      {fotos.size > 0 && stats && (
        <div className="resultado-archivo">
          <p>
            ✓ <strong>{state.nombreArchivoFotos}</strong> — {fotos.size} foto(s) extraídas.
          </p>
          <p className={stats.encontradas === stats.total ? 'mensaje-ok' : 'mensaje-alerta'}>
            {stats.encontradas} de {stats.total} estudiante(s) tienen foto emparejada.
          </p>
          {stats.faltantes.length > 0 && (
            <details>
              <summary>Ver {stats.faltantes.length} sin foto emparejada</summary>
              <ul className="lista-faltantes">
                {stats.faltantes.slice(0, 30).map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
              {stats.faltantes.length > 30 && <p>…y {stats.faltantes.length - 30} más.</p>}
            </details>
          )}
        </div>
      )}
    </section>
  );
}
