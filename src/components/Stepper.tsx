import { IconCheck } from './icons';

interface StepperProps {
  pasoActual: number;
  maxPasoHabilitado: number;
  onIrAPaso: (paso: number) => void;
}

const PASOS = [
  'Plantilla',
  'Datos',
  'Mapeo',
  'Campos fijos',
  'Fotos',
  'Vista previa e impresión',
];

export function Stepper({ pasoActual, maxPasoHabilitado, onIrAPaso }: StepperProps) {
  return (
    <ol className="stepper no-imprimir">
      {PASOS.map((label, i) => {
        const numero = i + 1;
        const habilitado = numero <= maxPasoHabilitado;
        const estado =
          numero === pasoActual ? 'actual' : numero < pasoActual ? 'completo' : 'pendiente';
        return (
          <li key={label} className={`stepper__item stepper__item--${estado}`}>
            <button
              type="button"
              className="stepper__boton"
              disabled={!habilitado}
              onClick={() => onIrAPaso(numero)}
            >
              <span className="stepper__numero">
                {estado === 'completo' ? <IconCheck size={11} /> : numero}
              </span>
              <span className="stepper__label">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
