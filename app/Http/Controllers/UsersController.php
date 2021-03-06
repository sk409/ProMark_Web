<?php

namespace App\Http\Controllers;

use App\Error;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    public function index(Request $request)
    {
        return Controller::narrowDownFromConditions(
            $request->all(),
            "\App\User"
        );
    }

    public function show(int $userId)
    {
        $user = User::find($userId);
        if (is_null($user)) {
            Error::notFound();
        }
        return view("user_show", [
            "user" => $user,
        ]);
    }
}
