<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cliente')->insert([
            [
                'id'=> '25',
                'nome' => 'Wandesley Firulai',
                'cpf' => '64690623180',
                'telefone' => '(67) 98765-4321',
                'status' => true,
            ],
            [
                'id'=> '57',
                'nome' => 'Maria Francisca',
                'cpf' => '65223626192',
                'telefone' => '(67) 91234-5678',
                'status' => false,
            ],
        ]);
    }
}
