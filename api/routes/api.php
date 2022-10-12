<?php

use App\Http\Controllers\api\v1\TodoController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Middleware\TokenControl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware([TokenControl::class])->controller(TodoController::class)->group(function () {
    Route::get("/todos", "getAll");
    Route::get("/todo/{id}", "getSingle");
    Route::get("/user/{id}/todos", "getUserTodos");
    Route::post("/todo", "create");
    Route::put("/todo", "update");
    Route::delete("/todo/{id}", "delete");
});

Route::controller(UserController::class)->group(function () {
    Route::post("/auth/signin", "signIn");
    Route::post("/auth", "auth");
    Route::get("/auth/signout/{id}", "signOut");
});