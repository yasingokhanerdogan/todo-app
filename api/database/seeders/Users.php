<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'role' => "admin",
            "first_name" => "Gökhan",
            "last_name" => "Erdoğan",
            'email' => 'yasingokhanerdogan@gmail.com',
            'password' => "WVdSdGFXNHhNak0wTlE9PQ==",//admin12345
        ]);

        DB::table('users')->insert([
            'role' => "user",
            "first_name" => "Ahmet",
            "last_name" => "Kara",
            'email' => 'akara@email.com',
            'password' => "WVd0aGNtRXhNak0wTlE9PQ==",//akara12345
        ]);

        DB::table('users')->insert([
            'role' => "user",
            "first_name" => "Mehmet",
            "last_name" => "Kara",
            'email' => 'mkara@email.com',
            'password' => "Yld0aGNtRXhNak0wTlE9PQ==",//mkara12345
        ]);
    }
}
