<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'user' => 'required|string',
            'password' => 'required|string',
        ]);

        $remember = $request->input('remember', false); // Verifica se o usuário quer lembrar a sessão

        $token_ttl = $remember ? 43200 : 60; // 43200 minutos (30 dias) ou 60 minutos (1 hora)
        JWTAuth::factory()->setTTL($token_ttl);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            //Log::warning('Login falhou', ['credentials' => $credentials]);
            return response()->json(['error' => 'Usuário ou Senha estão incorretos'], 401);
        }
        // Armazena o `remember_token` no banco de dados se "Lembrar-me" estiver ativado
        $user = Auth::guard('api')->user();
    
        // Certifique-se de que o usuário seja uma instância da model User
        if ($remember && $user instanceof \App\Models\User) {
            $user->update(['remember_token' => $token]);
        }
        Log::info('Login bem-sucedido', ['user' => Auth::user()]);
        return response()->json(['token' => $token, 'user' => Auth::guard('api')->user()]);
    }

    public function logout()
    {
        $user = Auth::guard('api')->user();

        // Verifique se $user é uma instância válida de User antes de chamar update
        if ($user instanceof \App\Models\User) {
            $user->update(['remember_token' => null]); // Limpa o `remember_token` ao sair
        }

        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Logout Realizado com Sucesso']);
    }

    public function user()
    {
        return response()->json(Auth::guard('api')->user());
    }

}