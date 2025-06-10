# proyectoWeb
REQUISITOS PARA EL SISTEMA 
PHP 7.4.22
npm 10.4.0
composer 2.8.8
xampp 3.3.0
react 18.2.0

Comandos de git:
# Con este comando, sabrar en que rama te encuantra y tambien te mostrara la ramas que hayas creado localmente y remotamente 
git branch

# Con este comando vamos estar creando una nueva rama local
git branch nombre_de_la_rama

# Con este comando sabras los cambios guardados y nos guardados que hayas tenido en tu rama actual
git status

# Con este comando podran ir altermando entre rama y rama 
git switch

# Con este comando vamos a anadir los cambios mostrados con el comando git status de manera local
git add .

# Con este momando vamos guardar los cambios mostrador con el comando git status de manera local, este procedimiento se guardara 
git commit -m "Mensaje descriptivo"

# Con este comando vamos bajar los cambios a nuestra rama
git pull

# Con este comando vamos subir al repositorio la rama
git push

# Con este comando vamos bajar los cambios de una rama salecionada a nuestra rama
git pull origin nombre_de_rama

# Con este comando vamos subir al repositorio en una rama especifica nuestro cambios la rama
git push origin nombre_de_rama

# Esto nos sirve para unir dos ramas, tenga cuidado si hay conflintos
git merge

# Con este comando vamos ver el historia de commits de todos lo colaboradores
git log

EJECUCION DEL PROYECTO
# Ejecucion del Frontend
npm install
npm start

# Ejecuion del Backend
php artisan serve

IMPORTANTE 
- Asegurece de estar en la rama correcta 
- Antes de subir cambios, siempre ejecute git pull origin nombre_de_rama, este en caso de estar trabanjando con otra persona en una misma rama.
- No olvide no puede subir cambios a la main si antes entrar en concenso con el resto de colaboradores. 
- Actulizar constatemente su progreso con git status, add . y commit.

# Servidor de prueba para ejecutar el bakcned:
php -S 127.0.0.1:8000 -t public

# Como crear un controlador:
php artisan make:controller nombre

# Como crear una migracion:
php artisan make:migration agregar_columna_contraseña_a_tabla

# Como crear un modelo:
php artisan make:model nombre_del_modelo

# Como crear una migracion:
php artisan make:migration create_nombre_de_la_tabla_table

# Reiniciar las credenciales de Laravel 
php artisan config:clear
php artisan cache:clear   
php artisan optimize

# Para dejar de depender de los paquetes de composer
composer install --ignore-platform-reqs

# Como volver a un estado anterior del commit 
git checkout 641d5f45897e7c26883b54591aaf8c95dfaa8bef   

# Deshacer una migration utilize el siguiente comando:
php artisan migrate:rollback --step=0

# Para crear tu .evn ejecute:
cp .env.example .env

# Para migrar la base de datos creada en laravel a mysql o mariaDB
php artisan migrate

# Para eliminar la base de datos
php artisan db:wipe


#GESTION DE PREGUNTAR BD ENTIDADES
Usuario
 - id_usuario
 - nombre
 - apellido
 - correo
 - contraseña
 - area

Pregunta
 - id_pregunta
 - titulo
 - descripcion
 - tipo_pregunta
 - dificultad
 - id_usuario

Respuesta
 - id_respuesta
 - id_pregunta
 - descripcion

Administrador
 - id_administrador
 - nombre
 - apellido
 - contraseña
