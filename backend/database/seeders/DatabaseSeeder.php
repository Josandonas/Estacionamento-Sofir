<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(ClienteSeeder::class);
        $this->call(CarroSeeder::class);
        $this->call(VagaSeeder::class);
        $this->call(EstadiaSeeder::class);
        $this->call(TicketSeeder::class);
    }
}
