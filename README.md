# chords.alday.dev

Chords API es una API Rest pública en la que puedes obtener información sobre acordes musicales.

Es ideal para desarrolladores que están aprendiendo y/o amantes de la música, ya que es sencilla pero completa.

## Tecnologías utilizadas:

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=FFFFFF)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=FFFFFF)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=FFFFFF)
![EJS](https://img.shields.io/badge/EJS-0C0C0C?style=for-the-badge&logo=ejs&logoColor=FFFFFF)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=000000)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=FFFFFF)
![JSDoc](https://img.shields.io/badge/JSDoc-CB3837?style=for-the-badge&logo=npm&logoColor=FFFFFF)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=000000)
![Winston](https://img.shields.io/badge/Winston-000000?style=for-the-badge&logo=logstash&logoColor=FFFFFF)
![Dotenv](https://img.shields.io/badge/Dotenv-8B7490?style=for-the-badge&logo=dotenv&logoColor=FFFFFF)
![CORS](https://img.shields.io/badge/CORS-F9DC3E?style=for-the-badge&logo=webcomponents.org&logoColor=000000)
![YAML](https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=FFFFFF)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=000000)



## Características principales:

- Incluye 68 acordes, 15notas, 4 tipos de acorde.
- Respuestas en formato json, pensadas para ser usadas en inglés o español.
- Mensajes de error claros y standarizados (inglés).
- Documentación en Swagger y JSDoc en inglés.
- Podrás obtener el listado de acordes filtrándolos por nota y tipo (query params);
- Podrás crear una paginación utilizando "limit" y "page" (query params).
- Podrás obtener un acorde a través de su id (path param).
- Podrás obtener un tipo de acorde a través de su id (path param).

## Documentación:

- [Website](https://chords.alday.dev)-> Vista creada a través de  EJS con documentación sencilla en inglés para una visión general.
- [Swagger](https://chords.alday.dev/api-docs) -> Documentación en inglés con swagger para que los desarrolladores que están empezando se puedan familiarizar con este formato.
- [JSDoc](https://chords.alday.dev/jsdoc) -> Funciones y elementos clave del código documentados en inglés a trabés de JSDoc para que los desarrolladores junior puedan familiarizarse con este tipo de documentaciones.


sprint-5 / 15-04-2025 / validations tests with jest finished

## SPRINT 5 (API)

Objetivos:

* Configuración inicial de jest apra pruebas unitarias.
* tests/validations.test.js -> npm run test tests/validations.test.js

## SPRINT 4 (API)

Objetivos:

* Configuración inicial de JSDoc (npx jsdoc -c jsdoc.json).
* Documentación de todas las funciones y controladores clave de la API.
* Correciones de estilo en documentación con JSDoc.
* Agregar información a la página iniciall de JSDoc.
* Repaso y finalización de la documentación (swagger y jsdoc).

## SPRINT 3 (API)

Objetivos:

* Reorganizar directorios (src y public) y checkear todo
* Instalación y configuración EJS
* Instalación y configuración bootstrap
* Creación de "partials" (navbar, footer, head, contents)
* Creación de "pages" (index, about, notFound)


## SPRINT 2 (API)

Objetivos:

* Revisión respuestas y errores
* Comentarios de código actual
* Endpoint para encontrar 'chord' por su '_id'
* Endpoint para encotnrar 'chord type' por su '_id'
* Validación y respuestas de error query y path params
* Documentación con swagger (Configuración, endpoints actuales)

## SPRINT 1 (API)

Objetivos:

* Inicializar el proyecto
* Configuraciones iniciales (BD, logger)
* Crear los modelos
* Crear error middlewares (error y notFound)
* Rutas iniciales
* Controladores inciales
* Servicios iniciales