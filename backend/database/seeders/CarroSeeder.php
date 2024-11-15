<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carro')->insert([
            [
                'modelo' => 'Ford Ka',
                'placa' => 'HSO3373',
                'status' => true,
                'cliente_id' => 25,
            ],
            [
                'modelo' => 'Chevrolet Onix',
                'placa' => 'HQK9530',
                'status' => false,
                'cliente_id' => 25,
            ],
            [
                'modelo' => 'Fiat Palio',
                'placa' => 'HQF3561',
                'status' => true,
                'cliente_id' => 57,
            ],
        ]);
    }
}
