<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarroController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:api')->get('/user', [AuthController::class, 'user']);

// Rotas Clientes
Route::get('/clientes', [ClienteController::class, 'index']); // Lista todos os clientes
Route::post('/clientes', [ClienteController::class, 'store']); // Criar clientes
Route::get('/clientes/{id}', [ClienteController::class, 'show']); // Busca um cliente específico
Route::put('/clientes/{id}', [ClienteController::class, 'update']); // Atualiza os dados do cliente
Route::put('/clientes/{id}/status', [ClienteController::class, 'updateStatus']); // Alterna o status do cliente

//Rotas Carros
Route::get('/carros',[CarroController::class,'index']); //Lista os carros
Route::get('/carros/{id}', [CarroController::class, 'show']); // Busca um carro específico
Route::post('/carros', [CarroController::class, 'store']); // Criar carro
Route::put('/carros/{id}', [CarroController::class, 'update']); // Atualiza os dados do carro
Route::put('/carros/{id}/status', [CarroController::class, 'updateStatus']); // Alterna o status do carro
