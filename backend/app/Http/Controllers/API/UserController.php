<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        return User::where('role', 'user')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:4',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role'      => 'user',
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, User $usuario)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email,' . $usuario->id,
        ]);

        $usuario->update([
            'full_name' => $request->full_name,
            'email'     => $request->email,
        ]);

        return response()->json($usuario);
    }

    public function destroy(User $usuario)
    {
        $usuario->delete();
        return response()->json(null, 204);
    }
}
