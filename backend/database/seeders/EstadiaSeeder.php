<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('estadia')->insert([
            [
                'id' => 1,
                'tipo' => 'Temporario',
                'valor' => 1.00,
                'descricao' => 'Valor de 1 real por cada 15 minutos',
                'status' => true,
            ],
            [
                'id' => 2,
                'tipo' => 'Fixo',
                'valor' => 1.00,
                'descricao' => 'Valor de 1 real por cada 30 minutos.',
                'status' => true,
            ],
            [
                'id' => 3,
                'tipo' => 'Diária',
                'valor' => 25.00,
                'descricao' => 'Estadia diária para veículos de grande porte por 24 horas.',
                'status' => true,
            ],
            [
                'id' => 4,
                'tipo' => 'Mensal',
                'valor' => 14480.00,
                'descricao' => 'Estadia mensal para veículos de grande porte.',
                'status' => false,
            ],
        ]);
    }
}
