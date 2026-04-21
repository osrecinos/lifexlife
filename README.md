# LifexLife Foundation Website

## Estructura del sitio

```
lifexlife/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← Todos los estilos
├── js/
│   ├── main.js             ← JavaScript principal
│   └── components.js       ← Componentes compartidos
└── pages/
    ├── iniciativas.html    ← Todas las iniciativas
    ├── spark.html          ← SPARK
    ├── rooted.html         ← ROOTED
    ├── thrive.html         ← THRIVE
    ├── lead.html           ← LEAD
    ├── impacto.html        ← Impacto / métricas
    ├── nosotros.html       ← About / equipo
    ├── blog.html           ← Noticias (editable)
    ├── donar.html          ← Donaciones
    └── contacto.html       ← Contacto / voluntariado
```

## Cómo subir a Netlify (GRATIS)

1. Ve a **netlify.com** → crea cuenta gratis
2. Arrastra la carpeta `lifexlife/` al panel de Netlify
3. Tu sitio quedará en vivo en `algo.netlify.app`
4. Para conectar tu dominio: Settings → Domain management → Add custom domain

## Cómo agregar noticias al Blog

El blog está en `pages/blog.html`. Para agregar una noticia:

1. Abre `blog.html` con cualquier editor de texto (VS Code, Notepad)
2. Copia uno de los `.blog-card` existentes
3. Cambia: imagen placeholder, título, descripción, fecha y `data-cat`
4. Guarda y sube a Netlify

**Categorías disponibles:** `spark` | `rooted` | `thrive` | `lead`

## Para el futuro: Blog con CMS (sin tocar código)

Cuando quieras editar noticias desde un panel visual:
1. Ve a **netlify.com** → instala Netlify CMS
2. Agrega el archivo `admin/config.yml`
3. Edita noticias desde `/admin` con editor visual

## Datos importantes

- **EIN:** 41-4788665
- **Status:** 501(c)(3)
- **Email:** Info@lifexlife.org
- **Dominio objetivo:** lifexlife.org

## Personalizar antes de publicar

- [ ] Reemplazar colores de fondo en slides con **fotos reales** de tus programas
- [ ] Actualizar número de PayPal en `donar.html` (busca `YOUR_BUTTON_ID`)
- [ ] Actualizar números de impacto reales en `impacto.html`
- [ ] Agregar nombres reales del equipo en `nosotros.html`
- [ ] Subir logo oficial cuando esté listo

## Dark/Light Mode

El sitio detecta automáticamente el sistema del usuario (dark/light).
El visitante puede cambiarlo con el botón `☾ DARK` / `☀ LIGHT` en el nav.
