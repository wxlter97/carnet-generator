import type { PlantillaDefinicion } from '../types';
import './diploma-aventura.template.css';

const plantilla: PlantillaDefinicion = {
  id: 'diploma-aventura',
  nombre: 'Aventura Espacial',
  descripcion: 'Estilo infantil con planetas, estrellas y líneas de exploración.',
  formato: 'carta',
  colorAcento: '#3567a8',
  campoFoto: null,
  camposFijos: [
    { key: 'nombreInstitucion', label: 'Nombre de la institución', requerido: true, tipo: 'texto', placeholder: 'Centro Escolar Ejemplo', valorPorDefecto: 'Centro Escolar' },
    { key: 'encabezado', label: 'Texto superior', requerido: true, tipo: 'texto', placeholder: 'Otorga el presente', valorPorDefecto: 'Otorga el presente' },
    { key: 'titulo', label: 'Título del diploma', requerido: true, tipo: 'texto', placeholder: 'Diploma de Honor al Mérito', valorPorDefecto: 'Diploma de Honor al Mérito' },
    { key: 'textoReconocimiento', label: 'Texto del reconocimiento', requerido: true, tipo: 'texto', placeholder: 'A', valorPorDefecto: 'A' },
    { key: 'textoMotivo', label: 'Motivo del reconocimiento', requerido: true, tipo: 'texto', placeholder: 'por su destacada dedicación y excelente desempeño académico.', valorPorDefecto: 'por su destacada dedicación y excelente desempeño académico.' },
    { key: 'pie', label: 'Lugar y fecha', requerido: true, tipo: 'texto', placeholder: 'Lugar y fecha', valorPorDefecto: 'Lugar y fecha' },
    { key: 'nombreFirmante', label: 'Nombre de quien firma', requerido: true, tipo: 'texto', placeholder: 'Nombre de quien firma', valorPorDefecto: 'Nombre de quien firma' },
    { key: 'cargoFirmante', label: 'Cargo de quien firma', requerido: true, tipo: 'texto', placeholder: 'Cargo de quien firma', valorPorDefecto: 'Cargo de quien firma' },
  ],
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: false, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    return (
      <article className="documento-base documento-carta tpl-diploma-aventura">
        <span className="tpl-diploma-aventura__planet" aria-hidden="true" />
        <span className="tpl-diploma-aventura__star tpl-diploma-aventura__star--one" aria-hidden="true">✦</span>
        <span className="tpl-diploma-aventura__star tpl-diploma-aventura__star--two" aria-hidden="true">✦</span>
        <div className="tpl-diploma-aventura__contenido">
          <div className="tpl-diploma-aventura__eyebrow">{fijos.nombreInstitucion || 'Centro Escolar'}</div>
          <div className="tpl-diploma-aventura__rule" />
          <div className="tpl-diploma-aventura__encabezado">{fijos.encabezado || 'Otorga el presente'}</div>
          <h1>{fijos.titulo || 'Diploma de Honor al Mérito'}</h1>
          <div className="tpl-diploma-aventura__a">{fijos.textoReconocimiento || 'A'}</div>
          <div className="tpl-diploma-aventura__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
          {valores.grado && <div className="tpl-diploma-aventura__grado">{valores.grado}</div>}
          <p>{fijos.textoMotivo || 'por su destacada dedicación y excelente desempeño académico.'}</p>
          <div className="tpl-diploma-aventura__pie">{fijos.pie || 'Lugar y fecha'}</div>
          <div className="tpl-diploma-aventura__firma">
            <span>{fijos.nombreFirmante || 'Nombre de quien firma'}</span>
            <span>{fijos.cargoFirmante || 'Cargo de quien firma'}</span>
          </div>
        </div>
      </article>
    );
  },
};

export default plantilla;
