# stack.md — Química Dalton

## Framework y requisitos
- **Astro** (última estable), salida estática (`output: 'static'`), TypeScript estricto.
- **Responsive y mobile-first**: diseño y CSS partiendo de 360px; breakpoints 640 / 768 / 1024 / 1280.
- **Velocidad y SEO** como prioridad: 0 JS por defecto (islands sólo donde haga falta: menú mobile, carrusel), objetivo Lighthouse ≥ 95 en Performance, SEO, Accesibilidad y Best Practices.
- Sin analytics (por indicación de la skill).

## Estructura de carpetas
```
labs-quimica-dalton/
├─ astro.config.mjs        # site + base para GitHub Pages
├─ public/
│  ├─ favicon.svg, robots.txt
│  └─ fonts/               # Barlow Condensed e Inter self-hosted (woff2)
├─ src/
│  ├─ assets/images/       # originales -> optimizadas a WebP con astro:assets
│  ├─ components/
│  │  ├─ layout/           # Header, Footer, WhatsAppFab
│  │  ├─ sections/         # Hero, ProductLines, Featured, Descamiva, WhyDalton, Locations, Resellers, Reviews
│  │  └─ ui/               # Button, Card, ProductCard, Badge, Stars
│  ├─ data/                # site.ts (contacto/horarios), products.json, lines.ts, reviews.json
│  ├─ layouts/BaseLayout.astro
│  ├─ pages/index.astro, 404.astro
│  ├─ styles/              # tokens.css (paleta/tipografía de design.md), global.css
│  ├─ lib/                 # seo.ts, whatsapp.ts (armado de links), hours.ts
│  └─ types/
├─ design.md, stack.md, research.json
└─ package.json
```

## Calidad de código (SOLID, mantenible)
- **Single responsibility:** cada sección es un componente con una sola función; los datos viven en `src/data`, nunca hardcodeados en el markup.
- **Open/closed:** líneas de producto, sedes y reseñas se agregan editando datos, sin tocar componentes.
- **Liskov / Interface segregation:** props tipadas y mínimas por componente (`ProductCardProps`, `LocationProps`); `Button` con variantes por prop, no por componentes duplicados.
- **Dependency inversion:** los componentes reciben datos por props; `lib/` aísla lógica (armado de URL de WhatsApp, cálculo "abierto ahora" desde `hours.ts`) para poder testearla.
- Tokens de diseño únicos en `tokens.css` (custom properties); sin colores sueltos en componentes.
- ESLint + Prettier + `astro check` sin errores antes de cada entrega.

## Performance
- Imágenes: descargadas del research, convertidas a **WebP**, con `srcset`/`sizes`, `loading="lazy"` salvo el hero (`fetchpriority="high"`), dimensiones explícitas (sin CLS).
- Fuentes self-hosted, `woff2`, subset latino, `font-display: swap`, preload de las 2 críticas.
- CSS crítico inline vía Astro; sin frameworks CSS pesados.
- Mapas: no embed directo; imagen/estático con click para cargar el iframe.

## SEO
- `title`/`description` por página con ciudad y rubro ("Química Dalton | Fábrica de productos químicos en Córdoba desde 1978").
- Un solo `h1`, jerarquía de headings correcta, `lang="es-AR"`.
- Open Graph + Twitter cards, canonical, sitemap (`@astrojs/sitemap`), `robots.txt`.
- **JSON-LD** `LocalBusiness`/`Store` con las dos sedes, horarios y teléfonos, y `aggregateRating` de Google.
- Textos alternativos descriptivos en todas las imágenes; links con texto significativo.

## Accesibilidad
Contraste AA (verificar naranja sobre blanco: usar texto oscuro sobre naranja), foco visible, navegación por teclado, `prefers-reduced-motion`, botones y links de ≥ 44px en mobile.

## Verticales / integraciones
- **Catálogo: Tienda Nube.** Tema personalizado con los tokens de `design.md`; landing enlaza a colecciones/productos. Precios de la propuesta **ficticios** (`price_is_placeholder`), a reemplazar en la entrega.
- **Contacto:** botón/links de WhatsApp por sede (`wa.me` con mensaje predefinido), `tel:` y `mailto:`. Formulario opcional vía servicio externo sólo si se aprueba.

## Deploy (Paso 5, sólo con tu confirmación)
- Repo independiente: **`labs-quimica-dalton`**.
- GitHub Pages en `labs.mondistudio.com.ar/quimica-dalton` → en `astro.config.mjs`: `site: 'https://labs.mondistudio.com.ar'`, `base: '/quimica-dalton'`; todas las rutas de assets respetan `base`.
- GitHub Actions con `withastro/action` + `deploy-pages`.
- No tocar `mondistudio.com.ar/labs` (Mondilabs).
