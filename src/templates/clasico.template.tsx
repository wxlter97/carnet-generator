import type { PlantillaDefinicion } from '../types';
import { FotoCarnet } from '../components/FotoCarnet';
import '../styles/carnet-base.css';
import './clasico.template.css';

const plantilla: PlantillaDefinicion = {
  id: 'clasico',
  nombre: 'Clásico Institucional',
  descripcion: 'Banda azul y oro, escudo y foto enmarcada. Ideal para uso formal.',
  colorAcento: '#0e4d7a',
  campoFoto: 'nombreCompleto',
  camposFijos: [
    { key: 'centroEscolar', label: 'Centro Escolar', requerido: true, tipo: 'texto', placeholder: 'Complejo Educativo San José' },
    { key: 'direccion', label: 'Dirección (opcional)', requerido: false, tipo: 'texto', placeholder: 'Calle Principal, San Salvador' },
    { key: 'anioLectivo', label: 'Año Lectivo', requerido: true, tipo: 'texto', placeholder: '2026' },
  ],
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: true, tipo: 'texto' },
    { key: 'seccion', label: 'Sección', requerido: false, tipo: 'texto' },
    { key: 'codigo', label: 'N° de carnet / código', requerido: true, tipo: 'texto' },
    { key: 'tipoSangre', label: 'Tipo de sangre', requerido: false, tipo: 'texto' },
  ],
  Render({ valores, fijos, fotoUrl }) {
    return (
      <div className="carnet-base tpl-clasico">
        <div className="tpl-clasico__foto-col">
          <div className="tpl-clasico__foto-marco">
            <FotoCarnet url={fotoUrl} nombre={valores.nombreCompleto ?? ''} />
          </div>
          {valores.codigo && <div className="tpl-clasico__codigo">{valores.codigo}</div>}
        </div>
        <div className="tpl-clasico__cuerpo">
          <div className="tpl-clasico__header">
            <svg className="tpl-clasico__escudo" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"
                fill="currentColor"
                opacity="0.9"
              />
              <path d="M8.5 12.5l2.3 2.3L15.5 10" stroke="#0e4d7a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="tpl-clasico__header-texto">
              <div className="tpl-clasico__centro">{fijos.centroEscolar || 'Centro Escolar'}</div>
              {fijos.direccion && <div className="tpl-clasico__direccion">{fijos.direccion}</div>}
            </div>
          </div>
          <div className="tpl-clasico__contenido">
            <div className="tpl-clasico__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
            <div className="tpl-clasico__linea-datos">
              {valores.grado && (
                <span>
                  <b>Grado:</b> {valores.grado}
                  {valores.seccion ? ` "${valores.seccion}"` : ''}
                </span>
              )}
              {valores.tipoSangre && (
                <span>
                  <b>Tipo de sangre:</b> {valores.tipoSangre}
                </span>
              )}
            </div>
          </div>
          <div className="tpl-clasico__footer">
            <span>Carnet estudiantil</span>
            <span>{fijos.anioLectivo}</span>
          </div>
        </div>
      </div>
    );
  },
};

export default plantilla;
