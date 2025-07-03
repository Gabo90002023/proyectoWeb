<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsUserAuth;

use App\Http\Controllers\API\PreguntaController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\SecuenciaController;
use App\Http\Controllers\API\AdminController;

use App\Http\Controllers\API\UserController;

//TODO: Rutas Publicas

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
//Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
//Route::post('email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');

//TODO: Rutas Privadas
Route::middleware([IsUserAuth::class])->group(
    function () {
        Route::controller(AuthController::class)->group(
            function () {
                Route::post('logout', 'logout');
                Route::get('me', 'getUser');
            }
        );

        Route::middleware([IsAdmin::class])->group(
            function () {
                // Mas Rutas de Admin ........
                Route::get('/admin/profesores/count', [AdminController::class, 'contarProfesores']);
                Route::get('/admin/preguntas/count', [AdminController::class, 'contarPreguntas']);
                Route::apiResource('/admin/usuarios', UserController::class);

            }
        );

        //TODO: Rutas Para Usuario que no es administrador
        Route::prefix('user')->group(function () {

            Route::apiResource('preguntas', PreguntaController::class);

            Route::apiResource('items', ItemController::class);
            Route::apiResource('secuencias', SecuenciaController::class);
            

        });
        
    }
);

