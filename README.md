## Información General
Este proyecto es una Rest Api de users, cuenta con un una unica tabla en la db para almacenar usuarios. <br>
El proyecto cuenta con test unitarios de la api(supertest para probar app con todas su dependencias) y
un test unitario de userService.

## Arquitectura
Esta api fue diseñada siguiendo los conceptos de clean architecture y SOLID, el handler de cada ruta esta siguiendo la arquitectura 3 layers. <br>

Controller para controlar a req y res, pasarle valores a services y responder en base a lo que nos devuelva service. <br>
Service para controlar la logica de negocio y ocupar a Model. <br>
Model para representar una tabla de la db como objeto, el modelo es generado mediante sequelize-cli y los metodos<br>
que adquiere son de este orm.

Controller y service estan ocupando los conceptos SOLID para generar una clase limpia y que podamos testear sin problemas. <br>
Para apoyar el testing de estas clases, aplique inyección de dependencias en su constructor para que puedas ocupar mocks o simplemente pasarle su dependencia real.
## Caching
Estoy ocupando el paquete npm redis para generar una conexion con el redis local. <br>
El cliente es inyectado en el servicio de user, posteriormente lo uso para hacer caching de getOne. <br>
La llave de getOne esta configurara para morir en 240 segundos, como tambien esta siendo modificada cuando se ocupa <br>
updateOne(set de los datos actualizados) y deleteOne(del de la llave). 
## Testing
userApi esta usando supertest, con esta libreria podemos simular que nuestra api fue levantada completamente y hacer consultas HTTP sobre ella. <br>
Este test es util si lo quieres usar para probar tus rutas sin la dependencia de postman/insomia. <br >

userService esta validando el comportamiento del service, podemos testear sus metodos siempre y cuando inyectemos la dependencia de modelo.
 
## Sequelize cli
Este proyecto esta conectandose a la base de datos mediante el orm sequelize. <br>
Su cli nos permite autogenerar la configuración inicial de sequelize(models/index.js)
, generar modelos mediante su cli, crear la db y correr migraciones. <br>
## Importante!
Te recomiendo que despues de hacer npm install y antes de levantar la api con docker, ejecutes estos comandos para que ahorres tiempo en interactuar directamente con postgres. <br>
sequelize-cli db:create  //  para crear la base de datos en base a los datos de config.json en la carpeta config <br>
sequelize-cli db:migrate  // para crear la tabla de users en base al modelo de este.
## Scripts npm

En este proyecto, puedes usar:

### `npm run start`

Para correr el proyecto en producción.<br />

### `npm run dev`

Para que puedas trabajar con reinicio automatico de servidor ante cambios en el codigo.<br />

### `npm run test`

Para correr test unitarios con Jest.

