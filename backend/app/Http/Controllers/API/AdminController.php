<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pregunta;

use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    

    public function contarProfesores() {
        $count = User::where('role', 'user')->count();
        return response()->json(['total' => $count]);
    }

    public function contarPreguntas() {
        $count = Pregunta::count();
        return response()->json(['total' => $count]);
    }


}
