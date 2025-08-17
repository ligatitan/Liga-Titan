# Plantilla: GitHub Pages + Google Sheets (Tabla de Clasificación)

Esta plantilla muestra una tabla de clasificación alimentada por Google Sheets y desplegada en GitHub Pages.

## Estructura
- `index.html`: HTML principal.
- `styles.css`: estilos básicos.
- `app.js`: lógica para leer tu Google Sheet.

## Pasos rápidos
1. Crea una Hoja de Cálculo con columnas **Nombre | Puntos** y rellena algunas filas.
2. En Google Sheets, ve a **Archivo → Compartir → General** y pon **Cualquier usuario con el enlace: Lector**.
3. (Recomendado) Ve a **Archivo → Publicar en la web** y pulsa **Publicar** para que el endpoint público funcione.
4. Copia el **ID** del documento (entre `/d/` y `/edit` en la URL).
5. Abre `app.js` y sustituye `SHEET_ID` por el tuyo.
6. Sube estos archivos a tu repositorio en GitHub y activa **Settings → Pages** para desplegar.

## Notas
- Si tu tabla está en otra pestaña, pon su `gid` en `SHEET_GID`.
- El script ordena de mayor a menor por puntos.
