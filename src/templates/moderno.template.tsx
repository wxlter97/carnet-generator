import type { PlantillaDefinicion } from '../types';
import { FotoCarnet } from '../components/FotoCarnet';
import '../styles/carnet-base.css';
import './moderno.template.css';

const plantilla: PlantillaDefinicion = {
  id: 'moderno',
  nombre: 'Moderno Vibrante',
  descripcion: 'Gradiente de color, foto circular y acentos redondeados. Ideal para primaria.',
  colorAcento: '#6c5ce7',
  campoFoto: 'nombreCompleto',
  camposFijos: [
    { key: 'centroEscolar', label: 'Centro Escolar', requerido: true, tipo: 'texto', placeholder: 'Escuela Estrellitas' },
    { key: 'anioLectivo', label: 'Año Lectivo', requerido: true, tipo: 'texto', placeholder: '2026' },
    { key: 'lema', label: 'Lema (opcional)', requerido: false, tipo: 'texto', placeholder: '¡Aprender jugando!' },
  ],
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: true, tipo: 'texto' },
    { key: 'seccion', label: 'Sección', requerido: false, tipo: 'texto' },
    { key: 'codigo', label: 'N° de carnet / código', requerido: true, tipo: 'texto' },
  ],
  Render({ valores, fijos, fotoUrl }) {
    return (
      <div className="carnet-base tpl-moderno">
        <span className="tpl-moderno__blob tpl-moderno__blob--1" />
        <span className="tpl-moderno__blob tpl-moderno__blob--2" />
        <div className="tpl-moderno__top">
          <div className="tpl-moderno__foto-marco">
            <FotoCarnet url={fotoUrl} nombre={valores.nombreCompleto ?? ''} />
          </div>
          <div>
            <div className="tpl-moderno__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
            {valores.grado && (
              <span className="tpl-moderno__grado-pill">
                {valores.grado}
                {valores.seccion ? ` "${valores.seccion}"` : ''}
              </span>
            )}
          </div>
        </div>
        <div className="tpl-moderno__datos">
          {valores.codigo && (
            <span>
              <b>N°:</b> {valores.codigo}
            </span>
          )}
          {fijos.lema && <span>“{fijos.lema}”</span>}
        </div>
        <div className="tpl-moderno__footer">
          <span className="tpl-moderno__footer-centro">{fijos.centroEscolar || 'Centro Escolar'}</span>
          <span>{fijos.anioLectivo}</span>
        </div>
      </div>
    );
  },
};

export default plantilla;
