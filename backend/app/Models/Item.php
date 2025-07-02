<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'pregunta_id',
        'contenido',
        'imagen_url',
        'explicacion',
    ];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class);
    }

    public function secuencias()
    {
        return $this->belongsToMany(Secuencia::class, 'secuencia_item')
                    ->withPivot('posicion')
                    ->withTimestamps();
    }
}
