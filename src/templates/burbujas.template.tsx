import type { PlantillaDefinicion } from '../types';
import '../styles/carnet-base.css';
import './burbujas.template.css';

const plantilla: PlantillaDefinicion = {
  id: 'burbujas',
  nombre: 'Burbujas de Colores',
  descripcion: 'Fondo de burbujas pastel, sin foto. Ideal para parvularia/preescolar.',
  colorAcento: '#ff8a65',
  campoFoto: null, // esta plantilla no usa foto de estudiante
  camposFijos: [
    {
      key: 'centroEscolar',
      label: 'Centro Escolar',
      requerido: true,
      tipo: 'texto',
      placeholder: 'Centro Escolar Cantón Shucutitán',
    },
  ],
  camposRegistro: [
    { key: 'nombreCompleto', label: 'Nombre completo', requerido: true, tipo: 'texto' },
    { key: 'grado', label: 'Grado', requerido: true, tipo: 'texto' },
  ],
  Render({ valores, fijos }) {
    return (
      <div className="carnet-base tpl-burbujas">
        <span className="tpl-burbujas__burbuja tpl-burbujas__b1" />
        <span className="tpl-burbujas__burbuja tpl-burbujas__b2" />
        <span className="tpl-burbujas__burbuja tpl-burbujas__b3" />
        <span className="tpl-burbujas__burbuja tpl-burbujas__b4" />
        <span className="tpl-burbujas__burbuja tpl-burbujas__b5" />
        <span className="tpl-burbujas__burbuja tpl-burbujas__b6" />
        <div className="tpl-burbujas__cuerpo">
          <div className="tpl-burbujas__centro">
            {valores.grado && <span className="tpl-burbujas__pill">{valores.grado}</span>}
            <div className="tpl-burbujas__nombre">{valores.nombreCompleto || 'Nombre del estudiante'}</div>
          </div>
          <div className="tpl-burbujas__footer">{fijos.centroEscolar || 'Centro Escolar'}</div>
        </div>
      </div>
    );
  },
};

export default plantilla;
