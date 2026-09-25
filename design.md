# design.md — Química Dalton (propuesta de rediseño)

Basado en `research.json` (aprobado 2026-09-25). Vertical: **catálogo**, enlatado **Tienda Nube**.

## 1. Identidad de marca

**Concepto:** "Química seria, trato cercano". 46 años de fábrica propia (desde 1978) con la calidez de la mascota Dr. Dalton. Industrial-confiable, no frío ni de laboratorio.

**Paleta** (aproximada, validar muestreando el logo en la implementación)

| Rol | Color | Uso |
|---|---|---|
| Primaria | Azul Dalton `#0B5CAD` | Header, títulos, botones principales, footer |
| Primaria oscura | `#083F78` | Hover, fondos de bloques oscuros |
| Secundaria | Naranja Dalton `#F28C1E` | CTA de contacto, acentos, badges |
| Acento | Amarillo Dr. Dalton `#F5B81C` | Highlights puntuales (promo del martes, sellos) |
| Neutros | `#0F1B2D` texto, `#5B6B7F` secundario, `#F3F6FA` fondos alternos, `#FFFFFF` | Base |
| Semántico | Verde WhatsApp `#25D366` | Solo botón de WhatsApp |

Cada línea de producto tiene un color de apoyo (como en su Instagram): piscinas `#1FA8D6`, limpieza `#2FB36D`, industrial `#0B5CAD`, automotor `#E5484D`, pozos `#8A5A2B`, droguería `#6B4FBB`. Se usa como tinte de la tarjeta de categoría, nunca como color de marca.

**Tipografía** (self-hosted, `font-display: swap`)
- Títulos: **Barlow Condensed** 700/800 (industrial, ecos del "QUÍMICA DALTON" del logo, compacta para nombres largos de producto).
- Cuerpo: **Inter** 400/500/600 (legible en fichas técnicas y precios).
- Escala: 14 / 16 / 18 / 24 / 32 / 48 / 64 con `clamp()`.

**Criterio de rubro:** químicos B2B+B2C → jerarquía clara, alto contraste, datos técnicos legibles; la mascota aporta cercanía sin volver el sitio infantil (uso acotado, ver §5).

## 2. Tono de comunicación

Cercano, directo y técnico cuando hace falta. Voseo argentino. Beneficio primero, dato después. Sin jerga vacía.

| Sí | No |
|---|---|
| "Todo para limpiar, desinfectar y tratar agua. Fabricado en Córdoba desde 1978." | "Somos una empresa líder en soluciones integrales de excelencia." |
| "Pedí tu presupuesto por WhatsApp." | "Solicite cotización a través de nuestros canales oficiales." |
| "Tu pozo se llenó? Activalo con Descamiva." | "Descamiva es un producto revolucionario." |
| "Desinfecta el 99,9% de las bacterias." (dato verificable) | Claims sin respaldo |
| "Martes 10% de descuento." | Mayúsculas y signos de exclamación en cadena |

Textos cortos en cards, más descriptivos en ficha de producto.

## 3. Estructura de layout (landing + tienda)

Landing en Astro; tienda en Tienda Nube enlazada desde la landing (ver §5).

1. **Header sticky:** logo, nav (Productos, Descamiva, Sucursales, Revendedores, Contacto), buscador que lleva a la tienda, botón "Pedir presupuesto" (naranja). En mobile: menú hamburguesa + botón WhatsApp fijo.
2. **Hero:** título "Química para cada trabajo. Fabricada en Córdoba desde 1978." + subtítulo con líneas; 2 CTAs: **Ver productos** (tienda) y **Escribinos por WhatsApp**. Visual: packshots agrupados con el Dr. Dalton. Franja de confianza debajo: `46 años · Fábrica propia · +1000 productos · 4,4★ en Google (1.284 opiniones)`.
3. **Líneas de producto:** grilla de 6 cards (Industrial, Limpieza, Piscinas, Automotor, Droguería industrial, Pozos y cámaras sépticas), cada una con su color, ícono, 2-3 ejemplos y link a su colección en la tienda.
4. **Destacados:** carrusel/grilla de 8 productos con precio (ficticio, ver §5) y botón "Agregar" / "Ver en tienda".
5. **Descamiva:** bloque de marca propia (bolsa 20 kg, cómo funciona, "¿Dónde lo consigo?", foro de opiniones enlazado a descamiva.com.ar). Conserva el peso que tiene hoy pero acotado a una sección.
6. **Por qué Dalton:** 4 puntos (fabricación propia, asesoramiento técnico, envíos, atención por sucursal). Incluye "Martes 10% DTO" como banda amarilla.
7. **Sucursales:** dos cards (Casa central/Fábrica y Sucursal Centro) con dirección, horarios reales de Google, teléfono, WhatsApp propio de cada una y mapa (embed lazy, click-to-load).
8. **Revendedores:** "Sumate como distribuidor de Descamiva" con email + WhatsApp.
9. **Reseñas:** 3 reseñas reales de Google (a completar en la implementación con su autorización/atribución) + estrellas.
10. **Footer:** logo, datos de contacto, horarios, redes (IG 88K, FB), links a tienda, © 1978-año.

**Botón flotante de WhatsApp** en todas las páginas (apunta a la sucursal Centro por defecto).

## 4. Referencias visuales

Competidores directos en Córdoba, revisados el 2026-09-25 (lectura de estructura y contenido, no captura visual):

| Referencia | Qué hace bien | Qué mejorar en Dalton |
|---|---|---|
| **puraquimica.com.ar** (Grupo Todo Droga) | Segmenta por comprador (Mayorista / Minorista / Laboratorio); tiles de categoría con cantidad de productos; 4 sucursales en Córdoba; "¿Cómo comprar?"; certificados de análisis por lote; testimonios; sello ARCA | Precios ocultos con botón "Solo consulta"; poca imagen de producto (placeholders); jerarquía visual débil, todo texto |
| **quimpro.com.ar** | Grilla de 15 categorías con conteo; WhatsApp siempre visible; "Lista de precios"; "empresa cordobesa"; mínimo de compra explícito (20 L); capacitación y asesoramiento | Categorías con imágenes escasas; sin reseñas; precios detrás de una lista |
| **Química Mainero, Científica Axon, Distribuidora MAB** | Mencionados como competidores con tienda online (Mainero no cargó al consultarlo) | Sin revisión de diseño; se pueden mirar más adelante |

**Qué tomamos:**
- Tiles de categoría con conteo de productos (Pura Química, Quimpro).
- Segmentar por tipo de comprador (Industria / Comercio e instituciones / Hogar) como acceso rápido en el hero.
- Bloque "¿Cómo comprar?" de 3 pasos (elegí, pedí presupuesto por WhatsApp o comprá en la tienda, retirá o te lo enviamos).
- Datos de confianza visibles: sucursales con horarios, mínimo de compra si aplica, fabricación propia desde 1978.

**Dónde diferenciarnos:** imagen de producto real y consistente (packshots), jerarquía visual fuerte, precios visibles en destacados, y una marca con personalidad (Dr. Dalton). Los competidores lucen planos.

## 5. Integración visual de la vertical (Tienda Nube)

- **Modelo:** la landing (Astro) es la puerta de entrada de marca; el catálogo y carrito viven en **Tienda Nube**. Para que no se sienta "pegado aparte":
  - Se personaliza el tema de Tienda Nube con la misma paleta, tipografías, botones y header/footer que la landing (tokens de diseño compartidos en este documento).
  - Los links "Ver productos", cada card de línea y cada destacado apuntan a la colección o producto correspondiente de la tienda.
  - Las cards de "Destacados" en la landing usan el mismo componente visual que las de la tienda (imagen, nombre, precio, botón).
- **Precios ficticios (decisión del cliente-proyecto):** los precios que se muestran son **inventados, sólo para la propuesta**. Se marcan así en el código (`price_is_placeholder: true`) y se cargan en la tienda demo. **No se publican como reales**; en la entrega hay que reemplazarlos por la lista de precios real de Dalton. La propuesta al cliente debe aclarar que son de ejemplo.
- **Fuente de datos:** `src/data/products.json` con los productos del research (imágenes convertidas a WebP), para mantener la landing sin depender de la API de la tienda.
- **Mascota Dr. Dalton:** hero, bloque Descamiva, estado vacío/404 y confirmación de contacto. Máximo 1 aparición por pantalla.
- **Tienda demo (plan Inicial gratis de Tiendanube, Argentina):** sirve para la propuesta. Límites verificados el 2026-09-25:
  - Sin dominio propio: queda en `algo.mitiendanube.com` (con SSL).
  - Sin edición de CSS ni acceso al código: sólo se personaliza la plantilla **Morelia** desde el editor (logo, colores, tipografías, banners, secciones).
  - Otras plantillas sólo en borrador, no publicables.
  - Pagos sólo con Pago Nube y envíos sólo con Andreani (Envío Nube).
  - Sin importación masiva de productos: se cargan a mano (11 productos, alcanza).
  - Incluye botón de WhatsApp, cupones/promos y Google Analytics (no lo usamos).
  - Además hay 7 días de prueba de cualquier plan al crear la cuenta, si quisiéramos probar plantillas o CSS propio.
- **Consecuencia de diseño:** la tienda no va a ser idéntica a la landing (header y footer son de Morelia). La coherencia se logra con logo, paleta y tipografías equivalentes en el editor y con las mismas fotos. En la propuesta se presenta como "así se vería tu tienda"; con plan pago se ajustaría el tema por completo.
- **Quién crea la cuenta:** la crea el titular de la propuesta (requiere su email). Yo puedo cargar luego los productos con Playwright si iniciás sesión en el navegador de la sesión, o te dejo el CSV/lista lista para copiar.

## 6. Datos de contacto y horarios (fuente: Google Maps, 2026-09-25)

| Sede | Dirección | Tel | WhatsApp | Horario |
|---|---|---|---|---|
| Casa central / Fábrica | Leopoldo A. Casavega 3089, Villa Aspasia | 351 894-9853 | 351 555-7944 | L-V 8:00-13:00 y 15:00-18:00 · Sáb 9:00-13:00 · Dom cerrado |
| Sucursal Centro | Rivadavia 695 (esq. Libertad) | 351 421-6691 | 351 529-8887 | L-V 8:30-17:30 · Sáb 9:00-13:00 · Dom cerrado |

Email: info@quimicadalton.com.
