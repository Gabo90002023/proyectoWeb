<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pregunta extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'categoria',
        'instrucciones',
        'pregunta',
        'explicacion_general',
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function secuencias()
    {
        return $this->hasMany(Secuencia::class);
    }

    public function usuario()
{
    return $this->belongsTo(User::class, 'user_id');
}

}