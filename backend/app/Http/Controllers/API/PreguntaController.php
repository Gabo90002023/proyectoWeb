<?php

namespace App\Http\Controllers\API;

use App\Models\Pregunta;
use App\Models\Item;
use App\Models\Secuencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;


use App\Http\Controllers\Controller;

class PreguntaController extends Controller
{
    public function index()
    {
        $preguntas = Pregunta::with(['items', 'secuencias.items'])
            ->where('user_id', Auth::id()) // 🔐 Solo las del usuario logueado
            ->get();
        return response()->json($preguntas);
    }

    public function show($id)
    {
        $pregunta = Pregunta::with(['items', 'secuencias.items'])->findOrFail($id);
        if ($pregunta->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return response()->json($pregunta);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $pregunta = new Pregunta($request->only([
                'titulo',
                'categoria',
                'instrucciones',
                'pregunta',
                'explicacion_general',
            ]));
            $pregunta->user_id = Auth::id(); // 🔥 Asocia la pregunta al usuario autenticado
            $pregunta->save();

            // Guardar ítems
            $items = [];
            foreach ($request->items as $itemData) {
                $item = $pregunta->items()->create([
                    'contenido' => $itemData['contenido'] ?? '',
                    'imagen_url' => $itemData['imagen_url'] ?? '',
                    'explicacion' => $itemData['explicacion'] ?? '',
                ]);

                // Verifica si el ID de frontend existe
                if (isset($itemData['id'])) {
                    $items[$itemData['id']] = $item->id;
                }
            }

            // Guardar secuencias
            foreach ($request->secuencias as $secuenciaData) {
                $secuencia = $pregunta->secuencias()->create([
                    'nombre' => $secuenciaData['nombre'],
                    'explicacion' => $secuenciaData['explicacion'] ?? null,
                ]);

                // Insertar ítems en orden
                foreach ($secuenciaData['items'] as $index => $itemFrontendId) {
                    if (isset($items[$itemFrontendId])) {
                        $secuencia->items()->attach($items[$itemFrontendId], ['posicion' => $index]);
                    }
                }
            }
            DB::commit();
            return response()->json($pregunta->load(['items', 'secuencias.items']), 201);

        } catch (\Throwable $e) {
            
            DB::rollBack();
            return response()->json([
                'error' => 'Error al guardar la pregunta',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $pregunta = Pregunta::findOrFail($id);
        if ($pregunta->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $pregunta->delete();
        return response()->json(['message' => 'Pregunta eliminada correctamente.']);
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $pregunta = Pregunta::findOrFail($id);

            if ($pregunta->user_id !== Auth::id()) {
                return response()->json(['error' => 'No autorizado'], 403);
            }

            // 1. Actualizar campos de la pregunta
            $pregunta->update($request->only([
                'titulo',
                'categoria',
                'instrucciones',
                'pregunta',
                'explicacion_general',
            ]));

            // 2. Eliminar ítems y secuencias anteriores
            $pregunta->items()->delete(); // Esto también elimina de secuencia_item por cascada
            $pregunta->secuencias()->each(function ($seq) {
                $seq->items()->detach(); // Limpia la tabla pivote
                $seq->delete();
            });

            // 3. Volver a crear ítems
            $items = [];
            foreach ($request->items as $itemData) {
                $item = $pregunta->items()->create([
                    'contenido' => $itemData['contenido'] ?? '',
                    'imagen_url' => $itemData['imagen_url'] ?? '',
                    'explicacion' => $itemData['explicacion'] ?? '',
                ]);

                // Verifica si el ID de frontend existe
                if (isset($itemData['id'])) {
                    $items[$itemData['id']] = $item->id;
                }
            }
            // 4. Volver a crear secuencias
            foreach ($request->secuencias as $secuenciaData) {
                $secuencia = $pregunta->secuencias()->create([
                    'nombre' => $secuenciaData['nombre'],
                    'explicacion' => $secuenciaData['explicacion'] ?? null,
                ]);
                foreach ($secuenciaData['items'] as $index => $itemFrontendId) {
                    if (isset($items[$itemFrontendId])) {
                        $secuencia->items()->attach($items[$itemFrontendId], ['posicion' => $index]);
                    }
                }
            }
            DB::commit();

            return response()->json($pregunta->load(['items', 'secuencias.items']), 200);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar la pregunta', 'details' => $e->getMessage()], 500);
        }
    }

}
