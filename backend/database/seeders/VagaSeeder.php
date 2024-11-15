<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VagaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vaga')->insert([
            [
                'id' => 12,
                'tipo' => 'Publico',
                'status' => true,
            ],
            [
                'id' => 33,
                'tipo' => 'Privado',
                'status' => true,
            ],
            [
                'id' => 26,
                'tipo' => 'Idoso',
                'status' => false,
            ],
        ]);
    }

}
