# Sistema de Cine: Películas y Actores

Este proyecto incluye un componente web personalizado que representa un encabezado para un sistema de cine.

# Componente: `CustomHeader`

## Descripción

El componente `CustomHeader` es un elemento de encabezado personalizado que utiliza Web Components y Shadow DOM para crear un encabezado estilizado para un sistema de cine. 

### Funcionalidades

- **Encabezado Visual**: Muestra el logo de la ESPE y el título "Sistema de Cine: Películas y Actores".
- **Estilo**: Presenta un diseño centrado con un fondo oscuro, texto blanco y un borde inferior.
- **Flexibilidad**: Utiliza flexbox para alinear el logo y el texto, permitiendo un espaciado adecuado entre ellos.
- **Encapsulamiento**: Los estilos están encapsulados dentro del Shadow DOM, evitando interferencias con otros estilos de la página.

# Componente: `CustomMain`

## Descripción

El componente `CustomMain` es un elemento de contenedor principal personalizado que utiliza Web Components y Shadow DOM para crear una sección principal en una aplicación web.

### Funcionalidades

- **Contenedor Principal**: Actúa como un bloque que puede contener otros elementos y se utiliza para estructurar el contenido de la página.
- **Estilo**: Aplica un relleno interno de 20 píxeles y una altura mínima de 500 píxeles, asegurando que el contenido se visualice adecuadamente.
- **Encapsulamiento**: Los estilos están encapsulados dentro del Shadow DOM, lo que evita interferencias con otros estilos de la página.

# Componente: `CustomMenu`

## Descripción

El componente `CustomMenu` es un menú de navegación personalizado que utiliza Web Components y Shadow DOM para facilitar la navegación en un sistema de cine.

### Funcionalidades

- **Menú Interactivo**: Muestra un título "SISTEMA DE CINE" y varias opciones de navegación (Inicio, Películas, Actores, Participaciones, Acerca de).
- **Estilo**: Utiliza flexbox para alinear los elementos del menú, con un fondo oscuro y texto blanco. Incluye efectos de hover para mejorar la experiencia del usuario.
- **Navegación Dinámica**: Al hacer clic en las opciones del menú, actualiza el contenido del componente principal (`custom-main`) con diferentes secciones, como listas de películas y actores, y otras páginas relacionadas.

# Componente: `CustomInicio`

## Descripción

El componente `CustomInicio` es una sección de bienvenida personalizada que utiliza Web Components y Shadow DOM para presentar un mensaje introductorio en un sistema de cine.

### Funcionalidades

- **Diseño Atractivo**: Muestra un mensaje de bienvenida centrado en la pantalla con un fondo azul y texto blanco, utilizando bordes redondeados y sombra para un efecto visual agradable.
- **Contenido Dinámico**: Incluye un mensaje que describe brevemente las funcionalidades del sistema, permitiendo a los usuarios entender de inmediato lo que pueden hacer.
- **Estilo**: Utiliza flexbox para centrar el contenido y aplicar un diseño responsivo que se adapta a diferentes tamaños de pantalla.

# Componente: `Peliculas`

## Descripción

El componente `PeliculasList` es una lista interactiva de películas que permite a los usuarios ver, agregar, editar y eliminar películas en un sistema de cine utilizando Web Components y Shadow DOM.

### Funcionalidades

- **Carga Dinámica**: Realiza una solicitud a una API para obtener la lista de películas y las muestra en la interfaz.
- **Agregar Películas**: Permite a los usuarios agregar nuevas películas mediante un formulario.
- **Editar Películas**: Los usuarios pueden editar los detalles de una película seleccionada.
- **Eliminar Películas**: Permite eliminar películas de la lista con una confirmación visual.
- **Interacción Amigable**: Incluye botones para realizar acciones (editar, eliminar) y un botón para agregar nuevas películas.

### Estilo

- Utiliza un diseño limpio con bordes redondeados y colores suaves para mejorar la experiencia del usuario.
- El formulario para agregar o editar películas se oculta y se muestra según sea necesario, manteniendo la interfaz organizada.

# Componente: `actores`

## Descripción

El componente `ActoresList` es una lista interactiva de actores que permite a los usuarios ver, agregar, editar y eliminar actores en un sistema de cine utilizando Web Components y Shadow DOM.

### Funcionalidades

- **Carga Dinámica**: Realiza una solicitud a una API para obtener la lista de actores y los muestra en la interfaz.
- **Agregar Actores**: Permite a los usuarios agregar nuevos actores mediante un formulario.
- **Editar Actores**: Los usuarios pueden editar los detalles de un actor seleccionado.
- **Eliminar Actores**: Permite eliminar actores de la lista con una confirmación visual.
- **Interacción Amigable**: Incluye botones para realizar acciones (editar, eliminar) y un botón para agregar nuevos actores.

### Estilo

- Utiliza un diseño limpio con bordes redondeados y colores suaves para mejorar la experiencia del usuario.
- El formulario para agregar o editar actores se oculta y se muestra según sea necesario, manteniendo la interfaz organizada.

# Componente: `ParticipacionesPeliculaTable`

## Descripción

El componente `ParticipacionesPeliculaTable` permite gestionar las participaciones de actores en películas a través de un formulario y una tabla que muestra las participaciones actuales. Utiliza Web Components y Shadow DOM para encapsular su funcionalidad y estilo.

### Funcionalidades

- **Carga Dinámica de Opciones**: Obtiene y muestra listas de películas y actores desde una API para seleccionar en el formulario.
- **Formulario de Participación**: Permite agregar nuevas participaciones de actores en películas, especificando el rol del actor.
- **Actualización Automática de la Tabla**: Después de agregar una participación, la tabla se actualiza automáticamente para reflejar los cambios.
- **Interfaz Amigable**: Incluye un diseño limpio y accesible, con un formulario intuitivo y una tabla bien estructurada.

### Estilo

- Utiliza un diseño con colores suaves y bordes redondeados, proporcionando una experiencia visual agradable.
- La tabla y el formulario tienen estilos claros que mejoran la legibilidad y la usabilidad.

# Componente: `SocialProfile`

## Descripción

El componente `SocialProfile` muestra un perfil social con información personal y botones de interacción. Utiliza Web Components y Shadow DOM para encapsular su funcionalidad y estilo, proporcionando una experiencia de usuario sencilla y atractiva.

### Funcionalidades

- **Visualización de Datos Personales**: Muestra información del usuario, como nombre, edad, ciudad, educación y correo electrónico, utilizando slots para permitir personalización.
- **Interacción**: Incluye botones para seguir al usuario en Facebook y enviar un mensaje directo a Instagram, abriendo los enlaces en nuevas pestañas.
- **Diseño Atractivo**: Presenta un diseño centrado con una foto de perfil y un esquema de colores amigable.

### Estilo

- Utiliza un diseño moderno con flexbox para centrar los elementos y un fondo semitransparente.
- Los botones tienen efectos de hover que mejoran la interactividad y la experiencia del usuario.

# Componente: `CustomFooter`

## Descripción

El componente `CustomFooter` crea un pie de página personalizado para aplicaciones web. Utiliza Web Components y Shadow DOM para encapsular su funcionalidad y estilo, asegurando que el pie de página se mantenga independiente y estilizado.

### Funcionalidades

- **Contenido Dinámico**: Muestra el año actual automáticamente, actualizándose cada vez que se carga la página.
- **Estilo Atractivo**: Presenta un diseño oscuro con texto claro, proporcionando un contraste agradable y fácil lectura.
- **Enlaces Personalizables**: Permite incluir enlaces que pueden ser añadidos y estilizados según sea necesario.

### Estilo

- Utiliza un fondo oscuro con texto blanco, creando una apariencia moderna y profesional.
- Los enlaces tienen un efecto de subrayado al pasar el cursor, mejorando la interactividad.

# Descripción del Proyecto final - Resuelto:

Este proyecto es un sistema de gestión para un cine, diseñado para facilitar la administración de películas, funciones y la interacción con los usuarios. A través de una interfaz intuitiva.