import type { PlantillaDefinicion } from '../types';
import './diploma-honor.template.css';

function claseTextoUnaLinea(texto: string): string {
  if (texto.length > 58) return 'tpl-diploma-honor__texto--largo';
  if (texto.length > 32) return 'tpl-diploma-honor__texto--mediano';
  return '';
}

const plantilla: PlantillaDefinicion = {
  id: 'diploma-honor',
  nombre: 'Diploma de Honor al Mérito',
  descripcion: 'Diploma infantil elegante, sin foto, listo para imprimir en tamaño carta.',
  formato: 'carta',
  colorAcento: '#b8860b',
  campoFoto: null,
  camposFijos: [
    {
      key: 'nombreInstitucion',
      label: 'Nombre de la institución',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Centro Escolar Ejemplo',
      valorPorDefecto: 'Centro Escolar',
    },
    {
      key: 'encabezado',
      label: 'Texto superior',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Otorga el presente',
      valorPorDefecto: 'Otorga el presente',
    },
    {
      key: 'titulo',
      label: 'Título del diploma',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Diploma de Honor al Mérito',
      valorPorDefecto: 'Diploma de Honor al Mérito',
    },
    {
      key: 'textoReconocimiento',
      label: 'Texto del reconocimiento',
      requerido: true,
      tipo: 'texto',
      placeholder: 'A',
      valorPorDefecto: 'A',
    },
    {
      key: 'textoMotivo',
      label: 'Motivo del reconocimiento',
      requerido: true,
      tipo: 'texto',
      placeholder: 'por su destacada dedicación y excelente desempeño académico.',
      valorPorDefecto: 'por su destacada dedicación y excelente desempeño académico.',
    },
    {
      key: 'pie',
      label: 'Lugar y fecha',
      requerido: true,
      tipo: 'texto',
      placeholder: 'San Salvador, noviembre de 2026',
      valorPorDefecto: 'Lugar y fecha',
    },
    {
      key: 'nombreFirmante',
      label: 'Nombre de quien firma',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Nombre de la directora o director',
      valorPorDefecto: 'Nombre de quien firma',
    },
    {
      key: 'cargoFirmante',
      label: 'Cargo de quien firma',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Directora',
      valorPorDefecto: 'Cargo de quien firma',
    },
  ],
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: false, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    return (
      <article className="documento-base documento-carta tpl-diploma-honor">
        <div className="tpl-diploma-honor__banda" />
        <div className="tpl-diploma-honor__ornamento tpl-diploma-honor__ornamento--top" aria-hidden="true" />
        <div className="tpl-diploma-honor__ornamento tpl-diploma-honor__ornamento--bottom" aria-hidden="true" />
        <div className="tpl-diploma-honor__contenido">
          <div className="tpl-diploma-honor__insignia" aria-hidden="true">★</div>
          <div className={`tpl-diploma-honor__institucion ${claseTextoUnaLinea(fijos.nombreInstitucion || '')}`}>
            {fijos.nombreInstitucion || 'Nombre de la institución'}
          </div>
          <div className="tpl-diploma-honor__linea"><span /></div>
          <div className="tpl-diploma-honor__encabezado">{fijos.encabezado || 'Otorga el presente'}</div>
          <h1 className={claseTextoUnaLinea(fijos.titulo || '')}>
            {fijos.titulo || 'Diploma de Honor al Mérito'}
          </h1>
          <div className="tpl-diploma-honor__reconocimiento">{fijos.textoReconocimiento || 'A'}</div>
          <div className={`tpl-diploma-honor__nombre ${claseTextoUnaLinea(valores.nombreCompleto || '')}`}>
            {valores.nombreCompleto || 'Nombre del estudiante'}
          </div>
          {valores.grado && <div className="tpl-diploma-honor__grado">{valores.grado}</div>}
          <p className={`tpl-diploma-honor__motivo ${claseTextoUnaLinea(fijos.textoMotivo || '')}`}>
            {fijos.textoMotivo || 'por su destacada dedicación y excelente desempeño académico.'}
          </p>
          <div className="tpl-diploma-honor__pie">{fijos.pie || 'Lugar y fecha'}</div>
          <div className="tpl-diploma-honor__firma">
            <span>{fijos.nombreFirmante || 'Nombre de quien firma'}</span>
            <span>{fijos.cargoFirmante || 'Cargo de quien firma'}</span>
          </div>
        </div>
        <div className="tpl-diploma-honor__ornamento tpl-diploma-honor__ornamento--bottom" />
      </article>
    );
  },
};

export default plantilla;
