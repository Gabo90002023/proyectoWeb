<?php

namespace App\Http\Controllers\API;

use App\Models\Secuencia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SecuenciaController extends Controller
{
    public function index()
    {
        return Secuencia::with(['pregunta', 'items'])->get();
    }

    public function store(Request $request)
    {
        $secuencia = Secuencia::create($request->only([
            'pregunta_id',
            'nombre',
            'explicacion',
        ]));

        // Asociar ítems con orden si se envía
        if ($request->has('items')) {
            foreach ($request->items as $i => $itemId) {
                $secuencia->items()->attach($itemId, ['posicion' => $i + 1]);
            }
        }

        return response()->json($secuencia->load('items'), 201);
    }

    public function show($id)
    {
        return Secuencia::with(['pregunta', 'items'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $secuencia = Secuencia::findOrFail($id);
        $secuencia->update($request->only([
            'nombre',
            'explicacion',
        ]));

        if ($request->has('items')) {
            $syncData = [];
            foreach ($request->items as $i => $itemId) {
                $syncData[$itemId] = ['posicion' => $i + 1];
            }
            $secuencia->items()->sync($syncData);
        }

        return response()->json($secuencia->load('items'));
    }

    public function destroy($id)
    {
        Secuencia::destroy($id);
        return response()->json(['mensaje' => 'Secuencia eliminada']);
    }
}
