<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class respuesta extends Model
{
    use HasFactory;
    protected $table = 'respuesta';
    protected $primaryKey = 'id_respuesta';

    protected $fillable =[
        "id_usuario",
        "id_pregunta",
        "descripcion",        
    ];
}
