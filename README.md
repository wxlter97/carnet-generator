# 🪪 Generador de carnets y diplomas escolares

App 100% cliente (sin backend) para generar e imprimir carnets escolares en
tamaño real (CR80, 85.6 × 54 mm) y diplomas de honor al mérito en tamaño carta,
pensada para desplegarse en GitHub Pages.

## Flujo

1. **Elegir plantilla** — cada plantilla trae su propio diseño y sus propios campos.
2. **Subir datos** — un CSV o Excel con una fila por estudiante.
3. **Mapear columnas** — hacer coincidir las columnas del archivo con los campos de la plantilla (se sugiere automáticamente).
4. **Campos fijos** — datos que aplican a todo el lote (ej. Centro Escolar, Año Lectivo), se llenan una sola vez. Se guardan en `localStorage`, sobreviven a una recarga y pueden restablecerse a los valores por defecto.
5. **Subir fotos (ZIP)** — cada foto debe llamarse igual que el campo designado por la plantilla para emparejar (ej. `juan-perez.jpg`); no es sensible a mayúsculas/tildes. Si falta una foto, se usa una silueta de respaldo.
6. **Vista previa e impresión** — grilla en tamaño real, imprime directo desde el navegador (`Ctrl/Cmd+P` o el botón Imprimir). Los diplomas se imprimen uno por página en formato carta.

El progreso (plantilla, datos, mapeo, campos fijos) se guarda en `localStorage`
para sobrevivir un refresh accidental. Las fotos no se persisten (son
demasiado pesadas y viven como blobs en memoria) — hay que volver a subir el
ZIP si se recarga la página.

## Agregar una plantilla nueva

Cada plantilla vive en `src/templates/*.template.tsx` y se registra
automáticamente (no hay que tocar ningún índice a mano). Copia un archivo
existente como punto de partida:

```
src/templates/clasico.template.tsx   ← plantilla + definición de campos
src/templates/clasico.template.css   ← estilos, con prefijo .tpl-clasico
```

Una `PlantillaDefinicion` declara:

- `camposRegistro`: campos que vienen del CSV, uno por estudiante.
- `campoFoto`: cuál de esos campos se usa para emparejar la foto del ZIP.
- `camposFijos`: campos que se llenan una sola vez para todo el lote.
- Cada campo fijo puede declarar `valorPorDefecto`; si el usuario no lo modifica,
  ese valor se usa automáticamente y el paso no queda bloqueado por estar vacío.
- `formato`: `carnet` para CR80 o `carta` para documentos de 250 × 190 mm dentro de una página carta horizontal.
- `Render`: el componente que dibuja el documento (las plantillas CR80 deben usar la clase `carnet-base`; las de carta deben definir su tamaño carta).

Las plantillas de diploma usan `formato: 'carta'` en orientación horizontal y
permiten
configurar desde el paso 4 la institución, el título, los textos del
reconocimiento, el lugar/fecha y la firma. El archivo de datos solo necesita
mapear el nombre del estudiante y, opcionalmente, su grado.

Actualmente hay cuatro estilos de diploma:

- **Diploma de Honor al Mérito** — institucional contemporáneo.
- **Aventura Espacial** — planetas, estrellas y líneas de exploración.
- **Jardín de Estrellas** — constelaciones y detalles suaves.
- **Arcoíris Geométrico** — formas y acentos de colores.
- **Fiesta de Colores** — globos, arcoíris, confeti y formas infantiles.

Todos usan fondo blanco y ornamentos en líneas o formas para reducir el uso de
tinta, manteniendo los textos configurables.

Las ilustraciones de la plantilla **Fiesta de Colores** son adaptaciones locales
de OpenMoji, usadas bajo licencia **CC BY-SA 4.0**:
<https://openmoji.org/>. La aplicación conserva los SVG localmente para que la
impresión no dependa de una conexión externa.

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue a GitHub Pages

Ya incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que
compila y publica en Pages automáticamente en cada push a `main` — solo hay
que habilitar "GitHub Actions" como fuente en Settings → Pages del repo.

Alternativa manual (rama `gh-pages`):

```bash
npm run deploy
```

## Stack

- React + TypeScript + Vite
- [papaparse](https://www.papaparse.com/) (CSV) y [SheetJS/xlsx](https://sheetjs.com/) (Excel), este último cargado bajo demanda
- [JSZip](https://stuk.github.io/jszip/) para extraer las fotos, cargado bajo demanda
- Sin dependencias de servidor: todo el procesamiento ocurre en el navegador
