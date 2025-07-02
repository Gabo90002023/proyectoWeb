<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;


class autenticacion extends Controller
{
    public function verificarCredenciales(Request $request)
{
    $correo = $request->input('correo');
    $password = $request->input('password');

    $usuario = Usuario::where('correo_electronico', $correo)->first();

    if (!$usuario) {
        return response()->json(['exists' => false], 404);
    }

    $contrasena_morse = $this->encriptar(trim($password));
    if ($usuario->contraseña !== $contrasena_morse) {
        return response()->json(['correcta' => false], 401);
    }

    return response()->json([
        'exists' => true,
        'correcta' => true,
        'nombre' => $usuario->nombre,
        'rol' => $usuario->tipo_usuario,
        'id' => $usuario->id_usuario,
    ]);
}
private function encriptar($texto) {
        $morse = [
            'a'=>'Acs','b'=>'Los','c'=>'52A','d'=>'568',
            'e'=>'..Qa','f'=>'OiU','g'=>'6x2','h'=>'*89',
            'i'=>'@2','j'=>'lOP','k'=>'1Qz','l'=>'23k',
            'm'=>'↓*-','n'=>'$%5','o'=>'1·#','p'=>'^?5',
            'q'=>'56/-','r'=>'A;-','s'=>'/|=','t'=>'E',
            'u'=>'iKo','v'=>'p-ws','w'=>'7gH','x'=>'2v#',
            'y'=>'><1','z'=>'*9s','0'=>'-9A-p','1'=>'.Xb2','ñ'=>'/*-+',
            '2'=>'9js','3'=>'uV1','4'=>'%q.@-','5'=>'569-',
            '6'=>'5g^','7'=>'-[]','8'=>']{L,','9'=>'Vha',  
        ];    
        $morse_texto = '';     
        for ($i = 0; $i < strlen($texto); $i++) {
            $caracter = $texto[$i];
            // Verificar si el caracter existe en el arreglo $morse
            if (isset($morse[$caracter])) {
                // Concatenar la conversión de Morse
                $morse_texto .= $morse[$caracter] . ' ';
            }
        }
        
        return trim($morse_texto);
 }

}
