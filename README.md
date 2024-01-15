# Github Searcher

Aplicación web centrada en la búsqueda de usuarios de GitHub.
Desarrollada con Angular Framework.

## Índice  
1. [Funcionalidades](#funcionalidades)
2. [Mejoras](#mejoras)
3. [Instalacion](#instalacion)
4. [Estructura](#estructura)
5. [Capturas](#capturas)
6. [Troubleshooting](#troubleshooting)

## Funcionalidades

* Búsqueda de usuarios de GitHub

### Mejoras

1. TODO: Crear carrousel para mostrar usuarios. (Añadir toogle para cambiar entre la vista de tabla y la de carrousel).
2. TODO: Añadir pantalla con ruta al perfil del usuario, donde muestre sus datos como por ejemplo, un gráfico de barras con el número de seguidores de cada usuario (ChartJS).
4. TODO; Unit & Integration testing.

## Instalación

1. Instalar las dependencias con `npm install`.
2. (Opcional) Crear un archivo `.env` siguiendo el de ejemplo [.env.example](/.env.example) y rellenar las variables.
3. Lanzar con `ng serve --open`.

## Estructura

La aplicación se ha creado con la siguiente estructura:

```
├───app
│   ├───core
│   │   ├───interceptors
│   │   ├───services
│   │   ├───guards
│   │   ├───types
│   │   └───utils
│   ├───features
│   │   ├───home
│   │   │   ├───components
│   │   │   ├───services
│   │   │   ├───types
│   ├───shared
│   │   ├───components
│   │   ├───directives
│   │   ├───pipes
│   │   └───types
└───assets
```

* **core**: se incluirán bajo este directorio todos los elementos que se utilizarán en toda la aplicación (generalmente como Singleton), como los servicios, interceptors, guards, etc.
* **features**: se listarán bajo este directorio todas las funcionalidades, generalmente con ruta propia. Cada funcionalidad tendrá su propio directorio con los componentes, servicios, guards, etc. que sean necesarios. (Anteriormente cada una de estas features tendría su propio módulo con lazy-loading)
* **shared**: se incluirán bajo este directorio todos los elementos reutilizables a través de la aplicación. En el futuro mucha de esta funcionalidad se podrá mover a librerías de Angular.

## Capturas

### Mobile

<p align="center"> Sin resultados ni búsqueda | Con resultados | Con búsqueda pero sin resultados encontrados</p>
<p align="center">
    <img width='28%' style="margin-right: 1rem;" src="./screenshots/iPhone-8_empty.png" alt="Imagen de iPhone 8 sin resultados ni búsqueda" />
    <img width='28%' style="margin-right: 1rem;" src="./screenshots/iPhone-8_results.png" alt="Imagen de iPhone 8 con resultados" />
    <img width='28%' src="./screenshots/iPhone-8_404.png" alt="Imagen de iPhone 8 sin resultados encontrados" />
</p>

### Tablet

<p align="center">Tablet con resultados</p>
<p align="center">
  <img width='80%' src="./screenshots/tablet_results.png" alt="Tablet con resultados" />
</p>

### Desktop

<p align="center">Desktop con resultados</p>
<p align="center">
  <img width='80%' src="./screenshots/desktop_results.png" alt="Desktop con resultados" />
</p>

## Troubleshooting

> [!CAUTION]
> La API de Github solo permite los primeros 1.000 resultados, por lo tanto si páginas más allá de la página 100, a 10 resultados por cada página (10 * 100 = 1.000 resultados) llegas al límite y la API devuelve un error.

> [!NOTE]
> La API de GitHub es pública y permite hacer peticiones sin autenticación, pero tiene un límite de peticiones temporal por IP, por lo que si se supera el límite, la API devuelve un error.
