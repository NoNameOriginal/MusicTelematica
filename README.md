# MusicTelematica
APP de Musica By: Christian Londoño Cañas
Descripción de aplicación

Aplicación web que permite gestionar imagenes, un CRUD básico de (titulo, lugar y description) por cada imagen, creacion de perfil de usuario(nombres, apellidos y usuario) , y el compartir con usuarios en manera de lista

. Análisis

1.1 Requisitos funcionales:

Crear Articulo. Buscar articulo por parte del titulo Borrar articulo por Id de articulo Listar todos los articulos de la base de datos en la página home o index

1.2 Definición de tecnología de desarrollo y despliegue para la aplicación: Lenguaje de Programación: JS/NODEJS Framework web backend: NodeJS - Express Framework web frontend: Angular Base de datos: Mysql Web App Server: NodeJS Web Server: Apache Web Server

Desarrollo
Se generó la base, con Yeoman:

$ yo express

(este generador, crea una app base ejemplo MVC para gestión de articulos)

Diseño:
3.1 Modelo de datos:

imagenes:

{ titulo: String, lugar: String, descripcion: String }

3.2 Servicios Web

/* Servicio Web: Inserta un registro de usuario en la Base de datos Método: POST URI: /Guardar */

/* Servicio Web: ingresa el usuario a su perfil y le muestra sus datos e canciones Metodo: POST URI:/Ingresar*/

/* Servicio Web: Inserta un registro de cancion en la Base de datos Método: POST URI: /Crear */

/* Servicio Web: Permite editar una cacion. Método: POST URI: /VistaEditar */

/* Servicio Web: Permite editar un perfil. Método: POST URI: /EditarPerfil */

/* Servicio Web: Borra una cancion de la Base de datos. Método: POST URI: /Eliminar */

/* Servicio Web: guarda los cambios de el perfil de usuario en la Base de datos. Método: GET URI: /UpdatePerfil*/

/* Servicio Web: Realiza la búsqueda en la base de datos, por cualquier campo Método: POST URI: /Buscar */

/* Servicio Web: Inserta un registro de compartir en la Base de datos Método: POST URI: /ICompartir */

/* Servicio Web: elimina un registro de compartir en la Base de datos Método: POST URI: /ECompartir */

Despligue en un Servidor Centos 7.x en el DCA
Instalar MySQL MySQL debe instalarse desde el repositorio de la comunidad .

Descargue y añada el repositorio y actualice.

1 Wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm 2 Sudo rpm -vh mysql-community-release-el7-5.noarch.rpm 3 Yum actualización

Instalar MySQL e iniciar el servicio.

1 Sudo yum instalar mysql-server 2 Sudo systemctl inicio mysqld

Root Login Para iniciar sesión en MySQL como usuario root:

1 Mysql -u root -p
