import type { PlantillaDefinicion } from '../types';
import { FotoCarnet } from '../components/FotoCarnet';
import './reconocimiento-estrellas.template.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}illustrations/${name}`;

const camposFijos = [
  { key: 'nombreInstitucion', label: 'Nombre de la institución', requerido: true, tipo: 'texto' as const, placeholder: 'Prim. Libertad Menéndez', valorPorDefecto: 'Prim. Libertad Menéndez' },
  { key: 'encabezado', label: 'Texto superior', requerido: true, tipo: 'texto' as const, placeholder: 'Otorga el presente', valorPorDefecto: 'Otorga el presente' },
  { key: 'titulo', label: 'Título (va en arco)', requerido: true, tipo: 'texto' as const, placeholder: 'Reconocimiento', valorPorDefecto: 'Reconocimiento' },
  { key: 'textoMotivo', label: 'Motivo del reconocimiento', requerido: true, tipo: 'texto' as const, placeholder: 'Por haber obtenido un excelente aprovechamiento académico', valorPorDefecto: 'Por haber obtenido un excelente aprovechamiento académico' },
  { key: 'textoCiclo', label: 'Ciclo escolar', requerido: false, tipo: 'texto' as const, placeholder: 'durante el Ciclo Escolar 2025-2026', valorPorDefecto: 'durante el Ciclo Escolar 2025-2026' },
  { key: 'cargoIzquierda', label: 'Cargo firma izquierda', requerido: true, tipo: 'texto' as const, placeholder: 'Maestra', valorPorDefecto: 'Maestra' },
  { key: 'cargoDerecha', label: 'Cargo firma derecha', requerido: true, tipo: 'texto' as const, placeholder: 'Directora', valorPorDefecto: 'Directora' },
];

const plantilla: PlantillaDefinicion = {
  id: 'reconocimiento-estrellas',
  nombre: 'Reconocimiento Estrellas',
  descripcion: 'Marco azul, título en arco, estrellas doradas y niños graduados.',
  formato: 'carta',
  colorAcento: '#0a49a8',
  campoFoto: 'nombreCompleto',
  camposFijos,
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo del estudiante', requerido: true, tipo: 'texto' },
  ],
  Render({ valores, fijos, fotoUrl }) {
    const titulo = fijos.titulo ?? '';
    const largoTitulo = Math.min(760, titulo.length * 54);
    const nombre = valores.nombreCompleto ?? '';
    const tamNombre = nombre.length > 24 ? Math.max(14, (36 * 24) / nombre.length) : 36;

    return (
      <article className="documento-base documento-carta tpl-reconocimiento-estrellas">
        <div className="tpl-reconocimiento-estrellas__marco" aria-hidden="true" />

        <div
          className="tpl-reconocimiento-estrellas__faja"
          style={{ backgroundImage: `url(${asset('reconocimiento-faja.png')})` }}
          aria-hidden="true"
        />
        <img className="tpl-reconocimiento-estrellas__ninos tpl-reconocimiento-estrellas__ninos--izquierda" src={asset('reconocimiento-ninos.png')} alt="" />
        <img className="tpl-reconocimiento-estrellas__ninos tpl-reconocimiento-estrellas__ninos--derecha" src={asset('reconocimiento-ninos.png')} alt="" />
        <div className="tpl-reconocimiento-estrellas__foto">
          <FotoCarnet url={fotoUrl} nombre={nombre} />
        </div>

        {/* Estrellas + título en arco (mismo sistema de coordenadas 1600x1236) */}
        <svg className="tpl-reconocimiento-estrellas__svg" viewBox="0 0 1600 1236" aria-hidden="true">
          <defs>
            <linearGradient id="tpl-rec-oro" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7e04a" />
              <stop offset="1" stopColor="#f2bf1e" />
            </linearGradient>
          </defs>

          <text className="tpl-reconocimiento-estrellas__titulo-sombra" x="800" y="430" textAnchor="middle" transform="translate(7 9)" textLength={largoTitulo} lengthAdjust="spacingAndGlyphs">
            {titulo}
          </text>
          <text className="tpl-reconocimiento-estrellas__titulo" x="800" y="430" textAnchor="middle" textLength={largoTitulo} lengthAdjust="spacingAndGlyphs">
            {titulo}
          </text>
        </svg>

        <div className="tpl-reconocimiento-estrellas__institucion">{fijos.nombreInstitucion}</div>
        <div className="tpl-reconocimiento-estrellas__encabezado">{fijos.encabezado}</div>

        <div className="tpl-reconocimiento-estrellas__nombre" style={{ fontSize: `${tamNombre}pt` }}>
          {nombre}
        </div>

        <div className="tpl-reconocimiento-estrellas__texto">
          <p>{fijos.textoMotivo}</p>
          {fijos.textoCiclo && <p>{fijos.textoCiclo}</p>}
        </div>

        <div className="tpl-reconocimiento-estrellas__firmas">
          <span>{fijos.cargoIzquierda}</span>
          <span>{fijos.cargoDerecha}</span>
        </div>
      </article>
    );
  },
};

export default plantilla;