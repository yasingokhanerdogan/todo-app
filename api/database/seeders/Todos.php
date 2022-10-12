<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Todos extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todos')->insert([
            'user_id' => "2",
            "todo" => "Todo 1",
            "status" => "active"
        ]);
        
        DB::table('todos')->insert([
            'user_id' => "2",
            "todo" => "Todo 2",
            "status" => "active"
        ]);

        DB::table('todos')->insert([
            'user_id' => "3",
            "todo" => "Todo 3",
            "status" => "active"
        ]);
    }
}
