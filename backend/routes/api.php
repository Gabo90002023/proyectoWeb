<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\crear_usuario;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// CREAR
Route::post('/instanciaUsuario', [crear_usuario::class, 'registrar']);



    //EDITAR
    #Route::put('/actualizarDocente/{id_docente}', [DocenteController::class, 'editarDocentes']);


    //ELIMINAR
    #Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);


    //VER
    #Route::get('/docentes', [DocenteController::class, 'index']);
