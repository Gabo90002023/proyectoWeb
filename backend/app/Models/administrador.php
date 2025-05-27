<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
use HasFactory;
    protected $table = 'administrador';
    protected $primaryKey = 'id_administrador';

    protected $fillable =[
        "nombre",
        "apellido_paterno",
        "apellido_materno",
        "correo_electronico",
        "contraseña",
    ];
}
