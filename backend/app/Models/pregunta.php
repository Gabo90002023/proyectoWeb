<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
use HasFactory;
    protected $table = 'pregunta';
    protected $primaryKey = 'id_pregunta';

    protected $fillable =[
        "id_usuario",
        "titulo",
        "descripcion",
        "tipo_pregunta",
        "dificultad"
    ];
}
