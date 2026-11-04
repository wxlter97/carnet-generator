import type { PlantillaDefinicion } from '../types';
import './diploma-fiesta.template.css';

const camposFijos = [
  { key: 'nombreInstitucion', label: 'Nombre de la institución', requerido: true, tipo: 'texto' as const, placeholder: 'Centro Escolar Ejemplo', valorPorDefecto: 'Centro Escolar' },
  { key: 'encabezado', label: 'Texto superior', requerido: true, tipo: 'texto' as const, placeholder: 'Otorga el presente', valorPorDefecto: 'Otorga el presente' },
  { key: 'titulo', label: 'Título del diploma', requerido: true, tipo: 'texto' as const, placeholder: 'Diploma de Honor al Mérito', valorPorDefecto: 'Diploma de Honor al Mérito' },
  { key: 'textoReconocimiento', label: 'Texto del reconocimiento', requerido: true, tipo: 'texto' as const, placeholder: 'A', valorPorDefecto: 'A' },
  { key: 'textoMotivo', label: 'Motivo del reconocimiento', requerido: true, tipo: 'texto' as const, placeholder: 'por su destacada dedicación y excelente desempeño académico.', valorPorDefecto: 'por su destacada dedicación y excelente desempeño académico.' },
  { key: 'pie', label: 'Lugar y fecha', requerido: true, tipo: 'texto' as const, placeholder: 'Lugar y fecha', valorPorDefecto: 'Lugar y fecha' },
  { key: 'nombreFirmante', label: 'Nombre de quien firma', requerido: true, tipo: 'texto' as const, placeholder: 'Nombre de quien firma', valorPorDefecto: 'Nombre de quien firma' },
  { key: 'cargoFirmante', label: 'Cargo de quien firma', requerido: true, tipo: 'texto' as const, placeholder: 'Cargo de quien firma', valorPorDefecto: 'Cargo de quien firma' },
];

const plantilla: PlantillaDefinicion = {
  id: 'diploma-fiesta',
  nombre: 'Fiesta de Colores',
  descripcion: 'Diseño infantil con globos, arcoíris, confeti y formas alegres.',
  formato: 'carta',
  colorAcento: '#ef6b62',
  campoFoto: null,
  camposFijos,
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: false, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    return (
      <article className="documento-base documento-carta tpl-diploma-fiesta">
        <img className="tpl-diploma-fiesta__arcoiris" src="/illustrations/openmoji-rainbow.svg" alt="" />
        <img className="tpl-diploma-fiesta__estrella" src="/illustrations/openmoji-star.svg" alt="" />
        <img className="tpl-diploma-fiesta__globo tpl-diploma-fiesta__globo--one" src="/illustrations/openmoji-balloon.svg" alt="" />
        <img className="tpl-diploma-fiesta__globo tpl-diploma-fiesta__globo--two" src="/illustrations/openmoji-balloon.svg" alt="" />
        <img className="tpl-diploma-fiesta__globo tpl-diploma-fiesta__globo--three" src="/illustrations/openmoji-balloon.svg" alt="" />
        <div className="tpl-diploma-fiesta__confeti" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="tpl-diploma-fiesta__contenido">
          <div className="tpl-diploma-fiesta__institucion">{fijos.nombreInstitucion || 'Centro Escolar'}</div>
          <div className="tpl-diploma-fiesta__encabezado">{fijos.encabezado || 'Otorga el presente'}</div>
          <h1>{fijos.titulo || 'Diploma de Honor al Mérito'}</h1>
          <div className="tpl-diploma-fiesta__a">{fijos.textoReconocimiento || 'A'}</div>
          <div className="tpl-diploma-fiesta__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
          {valores.grado && <div className="tpl-diploma-fiesta__grado">{valores.grado}</div>}
          <p>{fijos.textoMotivo || 'por su destacada dedicación y excelente desempeño académico.'}</p>
          <div className="tpl-diploma-fiesta__pie">{fijos.pie || 'Lugar y fecha'}</div>
          <div className="tpl-diploma-fiesta__firma">
            <span>{fijos.nombreFirmante || 'Nombre de quien firma'}</span>
            <span>{fijos.cargoFirmante || 'Cargo de quien firma'}</span>
          </div>
        </div>
      </article>
    );
  },
};

export default plantilla;
