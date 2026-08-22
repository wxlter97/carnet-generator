# 🪪 Generador de carnets escolares

App 100% cliente (sin backend) para generar e imprimir carnets escolares en
tamaño real (CR80, 85.6 × 54 mm), pensada para desplegarse en GitHub Pages.

## Flujo

1. **Elegir plantilla** — cada plantilla trae su propio diseño y sus propios campos.
2. **Subir datos** — un CSV o Excel con una fila por estudiante.
3. **Mapear columnas** — hacer coincidir las columnas del archivo con los campos de la plantilla (se sugiere automáticamente).
4. **Campos fijos** — datos que aplican a todo el lote (ej. Centro Escolar, Año Lectivo), se llenan una sola vez.
5. **Subir fotos (ZIP)** — cada foto debe llamarse igual que el campo designado por la plantilla para emparejar (ej. `juan-perez.jpg`); no es sensible a mayúsculas/tildes. Si falta una foto, se usa una silueta de respaldo.
6. **Vista previa e impresión** — grilla en tamaño real, imprime directo desde el navegador (`Ctrl/Cmd+P` o el botón Imprimir).

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
- `Render`: el componente que dibuja el carnet (debe usar la clase `carnet-base` compartida para respetar el tamaño CR80).

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
