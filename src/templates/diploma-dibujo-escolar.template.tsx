import type { PlantillaDefinicion } from '../types';
import './diploma-dibujo-escolar.template.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}illustrations/${name}`;

// Colores de crayón que se repiten letra por letra (DIPLOMA, SEGUNDO GRADO...)
const COLORES = ['#e8473f', '#f39a2b', '#f5c518', '#4caf50', '#2f86e0', '#8a56c9', '#ec5a9a'];

function multicolor(texto: string) {
  let i = 0;
  return texto.split('').map((c, k) => {
    if (c === ' ') return <span key={k}>{'\u00A0'}</span>;
    const color = COLORES[i++ % COLORES.length];
    return (
      <span key={k} style={{ color }}>
        {c}
      </span>
    );
  });
}

const camposFijos = [
  { key: 'nombreInstitucion', label: 'Nombre de la institución', requerido: true, tipo: 'texto' as const, placeholder: 'Rinconcito de Miss Ile', valorPorDefecto: 'Rinconcito de Miss Ile' },
  { key: 'encabezado', label: 'Texto superior', requerido: true, tipo: 'texto' as const, placeholder: 'Se otorga el presente', valorPorDefecto: 'Se otorga el presente' },
  { key: 'titulo', label: 'Título del diploma', requerido: true, tipo: 'texto' as const, placeholder: 'DIPLOMA', valorPorDefecto: 'DIPLOMA' },
  { key: 'textoReconocimiento', label: 'Texto de la cinta', requerido: true, tipo: 'texto' as const, placeholder: 'a nuestro(a) querido(a) alumno(a)', valorPorDefecto: 'a nuestro(a) querido(a) alumno(a)' },
  { key: 'textoMotivo', label: 'Motivo (línea 1)', requerido: true, tipo: 'texto' as const, placeholder: 'por haber completado con alegría y esfuerzo', valorPorDefecto: 'por haber completado con alegría y esfuerzo' },
  { key: 'textoEtapa', label: 'Texto antes del grado actual', requerido: true, tipo: 'texto' as const, placeholder: 'su etapa en', valorPorDefecto: 'su etapa en' },
  { key: 'gradoActual', label: 'Grado actual', requerido: true, tipo: 'texto' as const, placeholder: 'SEGUNDO GRADO', valorPorDefecto: 'SEGUNDO GRADO' },
  { key: 'textoListo', label: 'Texto después del grado actual', requerido: true, tipo: 'texto' as const, placeholder: 'y estar listo(a)', valorPorDefecto: 'y estar listo(a)' },
  { key: 'textoPara', label: 'Palabra de enlace', requerido: false, tipo: 'texto' as const, placeholder: 'para', valorPorDefecto: 'para' },
  { key: 'textoPasar', label: 'Texto antes del grado siguiente', requerido: true, tipo: 'texto' as const, placeholder: '¡pasar a', valorPorDefecto: '¡pasar a' },
  { key: 'gradoSiguiente', label: 'Grado siguiente', requerido: true, tipo: 'texto' as const, placeholder: 'TERCER GRADO', valorPorDefecto: 'TERCER GRADO' },
  { key: 'mensajeFinal', label: 'Mensaje final', requerido: false, tipo: 'texto' as const, placeholder: '¡Felicidades, sigue brillando y aprendiendo!', valorPorDefecto: '¡Felicidades, sigue brillando y aprendiendo!' },
  { key: 'nombreFirmante', label: 'Cargo de quien firma (izquierda)', requerido: true, tipo: 'texto' as const, placeholder: 'Maestra(o)', valorPorDefecto: 'Maestra(o)' },
  { key: 'nombreDirector', label: 'Nombre del director (derecha)', requerido: true, tipo: 'texto' as const, placeholder: 'Nombre del director', valorPorDefecto: 'Nombre del director' },
];

const plantilla: PlantillaDefinicion = {
  id: 'diploma-dibujo-escolar',
  nombre: 'Diploma Dibujo Escolar',
  descripcion: 'Estilo crayón con arcoíris, útiles escolares y niños ilustrados.',
  formato: 'carta',
  colorAcento: '#8a56c9',
  campoFoto: null,
  camposFijos,
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    const nombre = valores.nombreCompleto ?? '';
    const tamNombre = nombre.length > 26 ? Math.max(14, (24 * 26) / nombre.length) : 24;

    return (
      <article className="documento-base documento-carta tpl-diploma-dibujo-escolar">
        <div className="tpl-diploma-dibujo-escolar__borde" aria-hidden="true" />

        {/* Ilustraciones (PNG con fondo transparente en /illustrations) */}
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__sol tpl-diploma-dibujo-escolar__sol--izquierda" src={asset('diploma-sol.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__sol tpl-diploma-dibujo-escolar__sol--derecha" src={asset('diploma-sol.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__nube tpl-diploma-dibujo-escolar__nube--izquierda" src={asset('diploma-nube.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__nube tpl-diploma-dibujo-escolar__nube--derecha" src={asset('diploma-nube.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__crayones tpl-diploma-dibujo-escolar__crayones--izquierda" src={asset('diploma-crayones.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__crayones tpl-diploma-dibujo-escolar__crayones--derecha" src={asset('diploma-crayones.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__arcoiris tpl-diploma-dibujo-escolar__arcoiris--izquierda" src={asset('diploma-arcoiris.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__arcoiris tpl-diploma-dibujo-escolar__arcoiris--derecha" src={asset('diploma-arcoiris.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__lapiz tpl-diploma-dibujo-escolar__lapiz--izquierda" src={asset('diploma-lapiz.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__lapiz tpl-diploma-dibujo-escolar__lapiz--derecha" src={asset('diploma-lapiz.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__libros tpl-diploma-dibujo-escolar__libros--izquierda" src={asset('diploma-libros.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__libros tpl-diploma-dibujo-escolar__libros--derecha" src={asset('diploma-libros.png')} alt="" />
        <div className="tpl-diploma-dibujo-escolar__personaje tpl-diploma-dibujo-escolar__nino">
          <img src={asset('diploma-nino.png')} alt="" />
        </div>
        <div className="tpl-diploma-dibujo-escolar__personaje tpl-diploma-dibujo-escolar__nina">
          <img src={asset('diploma-nina.png')} alt="" />
        </div>
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__estrella tpl-diploma-dibujo-escolar__estrella--izquierda" src={asset('diploma-estrella.png')} alt="" />
        <img className="tpl-diploma-dibujo-escolar__deco tpl-diploma-dibujo-escolar__estrella tpl-diploma-dibujo-escolar__estrella--derecha" src={asset('diploma-estrella.png')} alt="" />

        <div className="tpl-diploma-dibujo-escolar__institucion">{fijos.nombreInstitucion}</div>
        <div className="tpl-diploma-dibujo-escolar__encabezado">{fijos.encabezado}</div>
        <h1 className="tpl-diploma-dibujo-escolar__titulo">{multicolor(fijos.titulo ?? '')}</h1>

        <div className="tpl-diploma-dibujo-escolar__cinta">
          <svg viewBox="0 0 290 36" preserveAspectRatio="none" aria-hidden="true">
            <polygon
              points="1,1 289,1 280,18 289,35 1,35 10,18"
              fill="#f4effc"
              stroke="#6a4cc2"
              strokeWidth="2"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span>{fijos.textoReconocimiento}</span>
        </div>

        <div className="tpl-diploma-dibujo-escolar__nombre" style={{ fontSize: `${tamNombre}pt` }}>
          {nombre}
        </div>

        <div className="tpl-diploma-dibujo-escolar__texto">
          <div className="tpl-diploma-dibujo-escolar__linea">{fijos.textoMotivo}</div>
          <div className="tpl-diploma-dibujo-escolar__linea">
            {fijos.textoEtapa} <b className="tpl-diploma-dibujo-escolar__grado">{multicolor(fijos.gradoActual ?? '')}</b> {fijos.textoListo}
          </div>
          {fijos.textoPara && <div className="tpl-diploma-dibujo-escolar__linea">{fijos.textoPara}</div>}
          <div className="tpl-diploma-dibujo-escolar__pasar">
            {fijos.textoPasar} <b>{multicolor(fijos.gradoSiguiente ?? '')}</b>
            <span className="tpl-diploma-dibujo-escolar__signo">!</span>
          </div>
          {fijos.mensajeFinal && <div className="tpl-diploma-dibujo-escolar__mensaje">{fijos.mensajeFinal}</div>}
        </div>

        <div className="tpl-diploma-dibujo-escolar__firma tpl-diploma-dibujo-escolar__firma--izq">{fijos.nombreFirmante}</div>
        <div className="tpl-diploma-dibujo-escolar__firma tpl-diploma-dibujo-escolar__firma--der">
          {fijos.nombreDirector || fijos.pie}
        </div>
      </article>
    );
  },
};

export default plantilla;