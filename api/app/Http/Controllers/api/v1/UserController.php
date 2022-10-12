<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Token;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signIn(Request $request)
    {
        try {
            $user = User::where("email", "=", $request->email)->where("password", "=", base64_encode(base64_encode($request->password)))->first();

            if (!$user) {
                return response()->json(["message" => "User Not Found!"], 200);
            }

            $tokenKey = bin2hex(openssl_random_pseudo_bytes(32));

            $token = new Token();
            $token->user_id = $user->id;
            $token->token = $tokenKey;

            $tokens = Token::where("user_id", "=", $user->id)->get();

            if ($tokens) {
                foreach ($tokens as $item) {
                    Token::destroy($item->id);
                }
            }

            $token->save();
            $user->password = null;

            return response()->json(["user" => $user, "token" => $tokenKey], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function auth(Request $request)
    {
        try {
            $token = $request->token;
            $tokenControl = Token::where("token", "=", $token)->first();

            if ($tokenControl) {
                $user = User::find($tokenControl->user_id);
                $user->password = "";
                
                return response()->json(["user" => $user, "token" => $token], 200);
            }

            return response()->json(["token" => null], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }

    public function signOut($id)
    {
        try {
            $tokens = Token::where("user_id", "=", $id)->get();

            if ($tokens) {
                foreach ($tokens as $item) {
                    Token::destroy($item->id);
                }
            }

            return response()->json(["message" => "Logout Successful!"], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }
}
