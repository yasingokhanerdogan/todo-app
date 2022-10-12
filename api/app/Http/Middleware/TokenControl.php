<?php

namespace App\Http\Middleware;

use App\Models\Token;
use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;

class TokenControl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        try {
            $token = $request->header("Authorization");

            $tokenControl = Token::where("token", "=", $token)->first();

            if ($tokenControl) {
                return $next($request);
            }
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 404);
        }
    }
}
