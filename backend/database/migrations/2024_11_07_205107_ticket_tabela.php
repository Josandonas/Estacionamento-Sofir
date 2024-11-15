<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket', function (Blueprint $table) {
            $table->id();
            $table->string('nome_cliente')->nullable();
            $table->string('placa_carro')->nullable();
            $table->string('tipo_vaga')->nullable();
            $table->string('tipo_estadia')->nullable();
            $table->dateTime('hora_entrada')->nullable();
            $table->dateTime('hora_saida');
            $table->double('total');
            $table->boolean('status');
            $table->foreign('nome_cliente')->references('cpf')->on('cliente')->onDelete('cascade');
            $table->foreign('placa_carro')->references('placa')->on('carro')->onDelete('cascade');
            $table->foreignId('vaga_id')->constrained('vaga')->onDelete('cascade');
            $table->foreignId('estadia_id')->constrained('estadia')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket', function (Blueprint $table) {
            $table->dropForeign(['nome_cliente']);
            $table->dropForeign(['placa_carro']);
            $table->dropForeign(['vaga_id']);
            $table->dropForeign(['estadia_id']);
        });
        Schema::dropIfExists('ticket');
    }
};
