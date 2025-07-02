<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Secuencia extends Model
{
    use HasFactory;

    protected $fillable = [
        'pregunta_id',
        'nombre',
        'explicacion',
    ];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'secuencia_item')
                    ->withPivot('posicion')
                    ->withTimestamps();
    }
}
