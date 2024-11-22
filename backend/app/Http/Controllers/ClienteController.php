<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // Método para listar todos os clientes
    public function index()
    {
        return response()->json(Cliente::all());
    }
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:16|unique:cliente',
            'telefone' => 'required|string|max:20',
        ]);

        $cliente = Cliente::create([
            'nome' => $request->nome,
            'cpf' => $request->cpf,
            'telefone' => $request->telefone,
            'status' => true, // Define o status padrão como ativo
        ]);

        return response()->json(['message' => 'Cliente criado com sucesso', 'cliente' => $cliente], 201);
    }
    // Método para buscar um cliente específico
    public function show($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente não encontrado'], 404);
        }

        return response()->json($cliente);
    }

    // Metodo de edicao
    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente não encontrado'], 404);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:16|unique:cliente',
            'telefone' => 'required|string|max:20',
        ]);

        $cliente->update($request->all());

        return response()->json(['message' => 'Cliente atualizado com sucesso', 'cliente' => $cliente]);
    }

    //Metodo que atualiza o cliente
    public function updateStatus($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente não encontrado'], 404);
        }

        $cliente->status = !$cliente->status;
        $cliente->save();

        return response()->json(['message' => 'Status atualizado com sucesso', 'cliente' => $cliente]);
    }
}
