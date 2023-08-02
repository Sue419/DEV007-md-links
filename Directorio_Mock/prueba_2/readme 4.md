## 1. Definición del proyecto

Nuestro proyecto LABGRAM nacio de la necesidad de compilar ejercicios de programación de nuestro bootcamp, al realizar esta actividad semanalmente, creimos necesario un espacio donde compartir las posibles soluciones a estos ejercicios y asi aprender en comunidad.
Esta pagina esta desarrollada como una SPA [Single-page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application)
[_responsive_](https://curriculum.laboratoria.la/es/topics/css/02-responsive) (con más de una vista / página).
Esta app utilizara los servicios de Firebase para autenticarse, crear registros, escribir post, editar, borrar, etc.

## 2. Historias de usuarios

Para este proyecto realizamos encuesta a traves de formulario. 
Registramos las necesidades y como poder aceptarlas como finalizadas.
Recopilamos siete historias de usuario, que podemos ver a continuación, tambien dejamos el link con archivo en drive para ver detalles.

[Link historias de usuarios](https://docs.google.com/spreadsheets/d/1ytLTevb_3QAbttfVcF-lRlaGXfcJpWaV/edit?usp=sharing&ouid=105057202485758423586&rtpof=true&sd=true)


## 6. Planificación

Durante todo el proyecto utilizamos nuestra planificación de tareas en Trello, esta herramienta nos permitio realizar diseño paso a paso, teniendo a mano recursos y actividades para cada sprint.

Link Trello [Link Trello](https://trello.com/b/YE89Cj6d/social-network)

![trello](imgReadMe/resumenTrello.jpg)

## 7. Material utilizado

### Mobile first

El concepto de [_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
hace referencia a un proceso de diseño y desarrollo donde partimos de cómo se ve
y cómo funciona la aplicación en un dispositivo móvil primero, y más adelante se
ve como adaptar la aplicación a pantallas progresivamente grandes y
características específicas del entorno desktop.

### Múltiples vistas

En proyectos anteriores nuestras aplicaciones habían estado compuestas de una
sola _vista_ principal (una sóla _página_). En este proyecto se introduce la
necesidad de tener que dividir nuestra interfaz en varias _vistas_ o _páginas_
y ofrecer una manera de navegar entre estas vistas. Este problema se puede
afrontar de muchas maneras: con archivos HTML independientes (cada uno con su
URL) y links tradicionales, manteniendo estado en memoria y rederizando
condicionalmente (sin refrescar la página), [manipulando el historial del
navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)
con [`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
En este proyecto te invitamos a explorar opciones y decidir una opción
de implementación.

### Escritura de datos

En los proyectos anteriores hemos consumido (leído) datos, pero todavía no
habíamos escrito datos (salvar cambios, crear datos, borrar, ...). En este
proyecto tendrás que crear (salvar) nuevos datos, así como leer, actualizar y
modificar datos existentes. Estos datos se podrán guardar de forma remota
usando [Firebase](https://firebase.google.com/).

Para usar Firebase hay que crear un proyecto en la consola de Firebase e
instalar la dependencia `firebase` utilizando `npm`.
Lee [las instrucciones paso a paso aqui](https://firebase.google.com/docs/web/setup).

Otras:

* [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)
* [Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
* [Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
* [Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)
* [Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)
* [Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
