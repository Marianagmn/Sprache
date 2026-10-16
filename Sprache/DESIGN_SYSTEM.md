# Sistema visual de Sprache

## Identidad y usos del logo

El original de marca es `imagenes/logo.jpeg`; se conserva sin modificar. Los PNG de `assets/` son derivados optimizados para cada plataforma.

| Uso | Recurso / tamaño de referencia | Aplicación |
| --- | --- | --- |
| Icono iOS, Android y web | `assets/icon.png`, 1024 × 1024 px | Arte cuadrado con fondo dorado; dejar que cada sistema aplique su máscara de icono. |
| Splash de Expo | `assets/splash-icon.png`, 1024 × 1024 px; logo de 520 px sobre fondo gris claro | Centrado, sin estirar ni añadir otra caja de esquinas redondeadas. |
| Encabezado de pantalla | `BrandLogo` con `variant="header"`, 48 × 48 dp | Marca compacta en barras o cabeceras. |
| Marca de inicio de sesión | `BrandLogo` con `variant="screen"`, 136 × 136 dp | Presentación de marca en pantallas de acceso y bienvenida. |
| Pantalla inicial nativa | `BrandLogo` con `variant="splash"`, 208 × 208 dp | Marca principal de gran tamaño. |
| Icono de pestaña | `BrandLogo` con `variant="tab"`, 40 × 40 dp | Contextos compactos; usarlo solo cuando haya espacio. |
| Web favicon | `assets/favicon.png`, 48 × 48 px | Usar la variante cuadrada del logo optimizada para tamaños pequeños. |

La versión `assets/sprache-logo.png` es para la interfaz: conserva el arte original y tiene las cuatro esquinas recortadas con transparencia y radio suave. No redondear adicionalmente la imagen ni editar el JPEG fuente.

## Paleta

- Negro `#000000`: títulos, texto principal, navegación y contornos.
- Rojo `#DD0000`: errores, alertas y estados importantes.
- Oro `#FFCE00`: acciones primarias, foco, selección y destacados.
- Blanco `#FFFFFF`: tarjetas y superficies principales.
- Gris claro `#F4F4F5`: fondo de pantallas y superficies secundarias.
- Neutros de apoyo: texto secundario `#52525B`, bordes `#E4E4E7`.
- Verde semántico se reserva para confirmar aciertos; no reemplaza al rojo de marca.

## Tipografía, iconos y componentes

- Tipografía: fuente de sistema de React Native, con escala compartida en `theme.js`: 12/14/16/20/28/36 dp; usar pesos 400, 500, 600, 700 y 800.
- Iconografía: Ionicons (`@expo/vector-icons`), trazo simple; mantener un mismo tamaño en cada jerarquía de control.
- Botones: oro con texto negro para acción primaria; secundarios blancos o transparentes, con texto negro y borde neutro.
- Tarjetas y campos: superficie blanca, borde neutro, sin sombras pesadas; utilizar los radios centralizados de `theme.js`.
- Espaciado: escala de 4, 8, 12, 16, 24 y 32 dp; conservar márgenes de pantalla consistentes.
