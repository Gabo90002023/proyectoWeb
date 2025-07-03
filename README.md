# PROYECTO WEB

# INSTALACION DE LAS DEPENDENCIAS
1 Descargar he instalar Git a traves del siguiente link: https://git-scm.com/downloads  

2 Descargar el node js para usar comando npm a traves: https://nodejs.org/en/download  

3 Descargar Postgres para la conexion servidor y base de datos: https://www.postgresql.org/download/  

4 Como ID descargar VScode: https://code.visualstudio.com/download  

# REQUISITOS PARA EL SISTEMA 
PHP 7.4.22  

npm 10.4.0  

composer 2.8.8  

xampp 3.3.0  

react 18.2.0  

# INSTALACION DEL PROYECTO
 1 Crear una nueva caperta

 2 Dentro de la caperta abrir una terminal de comandos

 3 Estando en la terminal y en la ruta de la carpeta coloque el siguiente comando:  

    git clone https://github.com/Gabo90002023/proyectoWeb.git  

4 Luego direjase en la ruta del proyecto ya clonado del githud con el comando:
  
    cd proyectoWeb 
    
5 Abrir el proyecto con editor de codigo VScode con el siguiente comando:

    code .
    
6 Una vez dentro del editor de codigo VScode abrir dos terminales de VScode para la instalacion de las dependecias
  del frontend y backend

7 Instalar las dependecias de frontend:
  Ve a la ruta del frontend

    cd frontend
    
  Instale las dependencias del frontend con el siguiente comando:

    npm install

8 Instalar las dependecias de backend:
  Ve a la ruta del backend

    cd backend
    
  Instale las dependencias del backend con el siguiente comando:

    composer install


# EJECUCION DEL PROYECTO
## Ejecucion del Frontend 

   npm run dev

## Para la base de datos 

  Crea una base de datos en el gestor de base datos postgresql (Ejm: pgAdmin 4)

## Ejecuion del Backend
 - Cambiar el nombre de archivo ".env.example" a ".env"
 - Configurarar los paramentros ".env" una vez cambiado de nombre
   
            DB_CONNECTION = (su coneccion)
            DB_HOST = (su local host)
            DB_PORT = (su puerto)
            DB_DATABASE = (el nombre de su base de datos)
            DB_USERNAME = (su usuario de la base de datos)
            DB_PASSWORD = (su contraseña)
   
 - Ejecutar el comando para la migracion de las tablas en la base de datos
   
     php artisan migrate
   
 - Limpia la caché del framework con siguientes comandos
   
    php artisan route:clear
    php artisan config:clear
    php artisan cache:clear
    php artisan view:clear
   
- Ejecucion del servidor del backend
   
    php artisan server

## Para crar un usuario Admin y un usuario normal por via consola ejecute el comando:

   php artisan db:seed --class=UserSeeder 

   - Credeciales del usuario Admin:
     
       email = admin@demo.com
       password = admin123
     
   - Credenciales del usuario normal:
     
       email = profesor@demo.com
       password = profesor123


# COMANDOS PARA EL SERVIDOR
## Servidor de prueba para ejecutar el bakcned:
php -S 127.0.0.1:8000 -t public

## Como crear un controlador:
php artisan make:controller nombre

## Como crear una migracion:
php artisan make:migration agregar_columna_contraseña_a_tabla

## Como crear un modelo:
php artisan make:model nombre_del_modelo

## Como crear una migracion:
php artisan make:migration create_nombre_de_la_tabla_table

## Reiniciar las credenciales de Laravel 
php artisan config:clear
php artisan cache:clear   
php artisan optimize

## Para dejar de depender de los paquetes de composer
composer install --ignore-platform-reqs

## Como volver a un estado anterior del commit 
git checkout 641d5f45897e7c26883b54591aaf8c95dfaa8bef   

## Deshacer una migration utilize el siguiente comando:
php artisan migrate:rollback --step=0

## Para crear tu .evn ejecute:
cp .env.example .env

## Para migrar la base de datos creada en laravel a mysql o mariaDB
php artisan migrate

## Para eliminar la base de datos
php artisan db:wipe

# COMANDOS DE GIT:
IMPORTANTE 
- Asegurece de estar en la rama correcta 
- Antes de subir cambios, siempre ejecute git pull origin nombre_de_rama, este en caso de estar trabanjando con otra persona en una misma rama.
- No olvide no puede subir cambios a la main si antes entrar en concenso con el resto de colaboradores. 
- Actulizar constatemente su progreso con git status, add . y commit.

## Con este comando, sabrar en que rama te encuantra y tambien te mostrara la ramas que hayas creado localmente y remotamente 
git branch

## Con este comando vamos estar creando una nueva rama local
git branch nombre_de_la_rama

## Con este comando sabras los cambios guardados y nos guardados que hayas tenido en tu rama actual
git status

## Con este comando podran ir altermando entre rama y rama 
git switch

## Con este comando vamos a anadir los cambios mostrados con el comando git status de manera local
git add .

## Con este momando vamos guardar los cambios mostrador con el comando git status de manera local, este procedimiento se guardara 
git commit -m "Mensaje descriptivo"

## Con este comando vamos bajar los cambios a nuestra rama
git pull

## Con este comando vamos subir al repositorio la rama
git push

## Con este comando vamos bajar los cambios de una rama salecionada a nuestra rama
git pull origin nombre_de_rama

## Con este comando vamos subir al repositorio en una rama especifica nuestro cambios la rama
git push origin nombre_de_rama

## Esto nos sirve para unir dos ramas, tenga cuidado si hay conflintos
git merge

## Con este comando vamos ver el historia de commits de todos lo colaboradores
git log
