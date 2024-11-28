<?php

namespace App\Http\Controllers;

use App\Models\Carro;
use Illuminate\Http\Request;

class CarroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Carro::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'modelo' => 'required|string|max:255',
            'placa' => 'required|string|max:16|unique:carro',
            'cliente_id' => 'required|max:20',
        ]);

        $carro = Carro::create([
            'modelo' => $request->modelo,
            'placa' => $request->placa,
            'cliente_id' => $request->cliente_id,
            'status' => true, // Define o status padrão como ativo
        ]);

        return response()->json(['message' => 'Carro criado com sucesso', 'carro' => $carro], 201);
    }

    /**
     * Display the specified resource.
     */
    // Método para buscar um carro específico
    public function show($id)
    {
        $carro = Carro::find($id);

        if (!$carro) {
            return response()->json(['error' => 'Carro não encontrado'], 404);
        }

        return response()->json($carro);
    }

    //Metodo que atualiza os dados do carro
    public function update(Request $request, $id)
    {
        $carro = Carro::find($id);

        if (!$carro) {
            return response()->json(['error' => 'Carro não encontrado'], 404);
        }

        $request->validate([
            'modelo' => 'required|string|max:255',
            'placa' => 'required|string|max:16|unique:carro,placa,' . $id,
            'cliente_id' => 'required|max:20',
        ]);

        $carro->update($request->all());

        return response()->json(['message' => 'Carro atualizado com sucesso', 'carro' => $carro]);
    }

    //Metodo que atualiza o  status do carro
    public function updateStatus($id)
    {
        $carro = Carro::find($id);

        if (!$carro) {
            return response()->json(['error' => 'Carro não encontrado'], 404);
        }

        $carro->status = !$carro->status;
        $carro->save();

        return response()->json(['message' => 'Status atualizado com sucesso', 'Carro' => $carro]);
    }
}
