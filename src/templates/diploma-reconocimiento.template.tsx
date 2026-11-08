import type { PlantillaDefinicion } from '../types';
import './diploma-reconocimiento.template.css';

const base = (nombre: string) => `${import.meta.env.BASE_URL}illustrations/${nombre}`;

const camposFijos = [
  { key: 'nombreInstitucion', label: 'Nombre de la institución', requerido: true, tipo: 'texto' as const, placeholder: 'Centro Escolar Ejemplo', valorPorDefecto: 'Centro Escolar' },
  { key: 'encabezado', label: 'Texto superior', requerido: true, tipo: 'texto' as const, placeholder: 'Otorga el presente', valorPorDefecto: 'Otorga el presente' },
  { key: 'titulo', label: 'Título del diploma', requerido: true, tipo: 'texto' as const, placeholder: 'Reconocimiento', valorPorDefecto: 'Reconocimiento' },
  { key: 'textoReconocimiento', label: 'Texto del reconocimiento', requerido: true, tipo: 'texto' as const, placeholder: 'A', valorPorDefecto: 'A' },
  { key: 'textoMotivo', label: 'Motivo del reconocimiento', requerido: true, tipo: 'texto' as const, placeholder: 'por su esfuerzo, alegría y excelente desempeño.', valorPorDefecto: 'por su esfuerzo, alegría y excelente desempeño.' },
  { key: 'pie', label: 'Lugar y fecha', requerido: true, tipo: 'texto' as const, placeholder: 'Lugar y fecha', valorPorDefecto: 'Lugar y fecha' },
  { key: 'nombreFirmante', label: 'Nombre de quien firma', requerido: true, tipo: 'texto' as const, placeholder: 'Nombre de quien firma', valorPorDefecto: 'Nombre de quien firma' },
  { key: 'cargoFirmante', label: 'Cargo de quien firma', requerido: true, tipo: 'texto' as const, placeholder: 'Cargo de quien firma', valorPorDefecto: 'Cargo de quien firma' },
];

const plantilla: PlantillaDefinicion = {
  id: 'diploma-reconocimiento',
  nombre: 'Reconocimiento Infantil',
  descripcion: 'Estilo alegre inspirado en diplomas escolares ilustrados para niños.',
  formato: 'carta',
  colorAcento: '#1554a4',
  campoFoto: null,
  camposFijos,
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: false, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    return (
      <article className="documento-base documento-carta tpl-diploma-reconocimiento">
        <div className="tpl-diploma-reconocimiento__garabato" aria-hidden="true" />
        <img className="tpl-diploma-reconocimiento__cap" src={base('openmoji-cap.svg')} alt="" />
        <img className="tpl-diploma-reconocimiento__nino tpl-diploma-reconocimiento__nino--left" src={base('openmoji-child.svg')} alt="" />
        <img className="tpl-diploma-reconocimiento__nino tpl-diploma-reconocimiento__nino--right" src={base('openmoji-child.svg')} alt="" />
        <img className="tpl-diploma-reconocimiento__estrella tpl-diploma-reconocimiento__estrella--left" src={base('openmoji-star.svg')} alt="" />
        <img className="tpl-diploma-reconocimiento__estrella tpl-diploma-reconocimiento__estrella--right" src={base('openmoji-star.svg')} alt="" />
        <div className="tpl-diploma-reconocimiento__contenido">
          <div className="tpl-diploma-reconocimiento__institucion">{fijos.nombreInstitucion || 'Centro Escolar'}</div>
          <div className="tpl-diploma-reconocimiento__encabezado">{fijos.encabezado || 'Otorga el presente'}</div>
          <h1>{fijos.titulo || 'Reconocimiento'}</h1>
          <div className="tpl-diploma-reconocimiento__a">{fijos.textoReconocimiento || 'A'}</div>
          <div className="tpl-diploma-reconocimiento__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
          {valores.grado && <div className="tpl-diploma-reconocimiento__grado">{valores.grado}</div>}
          <p>{fijos.textoMotivo || 'por su esfuerzo, alegría y excelente desempeño.'}</p>
          <div className="tpl-diploma-reconocimiento__pie">{fijos.pie || 'Lugar y fecha'}</div>
          <div className="tpl-diploma-reconocimiento__firmas">
            <div><span>{fijos.nombreFirmante || 'Nombre de quien firma'}</span><small>{fijos.cargoFirmante || 'Cargo de quien firma'}</small></div>
            <div><span>{fijos.nombreInstitucion || 'Centro Escolar'}</span><small>Con cariño</small></div>
          </div>
        </div>
      </article>
    );
  },
};

export default plantilla;
