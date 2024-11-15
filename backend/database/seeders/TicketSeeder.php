<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ticket')->insert([
            [
                'nome_cliente' => '64690623180',
                'placa_carro' => 'HSO3373',
                'tipo_vaga' => 'Publico',
                'tipo_estadia' => 'Temporario',
                'hora_entrada' => '2024-10-01 13:00:00',
                'hora_saida' => '2024-10-01 15:00:00',
                'total' => 12.00,
                'status' => true,
                'vaga_id' => 12,
                'estadia_id' => 1,
            ],
            [
                'nome_cliente' => '64690623180',
                'placa_carro' => 'HQK9530',
                'tipo_vaga' => 'Publico',
                'tipo_estadia' => 'Temporario',
                'hora_entrada' => '2023-11-01 08:00:00',
                'hora_saida' => '2023-11-01 10:01:00',
                'total' => 12.00,
                'status' => false,
                'vaga_id' => 33,
                'estadia_id' => 1,
            ],
        ]);
    }
}
