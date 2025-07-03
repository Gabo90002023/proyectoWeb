<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemController extends Controller
{
    public function index()
    {
        return Item::with('pregunta')->get();
    }

    public function store(Request $request)
    {
        $item = Item::create($request->only([
            'pregunta_id',
            'contenido',
            'imagen_url',
            'explicacion',
        ]));

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return Item::with('pregunta')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->only([
            'contenido',
            'imagen_url',
            'explicacion',
        ]));

        return response()->json($item);
    }

    public function destroy($id)
    {
        Item::destroy($id);
        return response()->json(['mensaje' => 'Item eliminado']);
    }
}
