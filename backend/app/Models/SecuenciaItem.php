<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SecuenciaItem extends Model
{
    use HasFactory;

    protected $table = 'secuencia_item';

    protected $fillable = [
        'secuencia_id',
        'item_id',
        'posicion',
    ];
}
