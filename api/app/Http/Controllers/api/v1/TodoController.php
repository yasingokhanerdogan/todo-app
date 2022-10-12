<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function getAll()
    {
        try {
            $todos = Todo::all();
            return response()->json(["todos" => $todos], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function getSingle($id)
    {
        try {
            $todo = Todo::find($id);
            return response()->json(["todo" => $todo], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function getUserTodos($id)
    {
        try {
            $user = User::find($id);
            $user->role == "admin" ? $todos = Todo::all() : $todos = Todo::where("user_id", "=", $id)->get();

            return response()->json(["todos" => $todos], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function create(Request $request)
    {
        try {
            $todo = new Todo();
            $todo->user_id = $request->user_id;
            $todo->todo = $request->todo;
            $todo->status = $request->status;

            $todo->save();

            return response()->json(["todo" => $todo, "message" => "Insertion Successful!"], 201);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function update(Request $request)
    {
        try {
            $todo = Todo::find($request->id);

            if ($todo) {
                $request->todo && $todo->todo = $request->todo;
                $request->status && $todo->status = $request->status;
                $todo->save();

                return response()->json(["todo" => $todo, "message" => "Update Successful!"], 200);
            }

            return response()->json(["message" => "Todo Not Found!"], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function delete($id)
    {
        try {
            $todo = Todo::find($id);

            if ($todo) {
                Todo::destroy($id);
                return response()->json(["todo" => $todo, "message" => "Delete Successful!"], 200);
            }

            return response()->json(["message" => "Todo Not Found!"], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }
}
