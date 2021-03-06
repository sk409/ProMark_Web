<?php

namespace App\Http\Controllers;

use App\ChatRoom;
use App\User;
use App\Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatRoomsController extends Controller
{

    public function index(Request $request)
    {
        return Controller::narrowDownFromConditions(
            $request->all(),
            "App\ChatRoom"
        );
    }

    public function create()
    {
        $user = User::find(Auth::user()->id);
        if (is_null($user)) {
            Error::notFound();
        }
        return view("chat_room_create", [
            "user" => $user
        ]);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     "name" => "required|max:128",
        // ]);
        $chatRoom = ChatRoom::create($request->all());
        return $chatRoom->id;
    }

    public function show(int $id)
    {
        $chatRoom = ChatRoom::find($id);
        if (is_null($chatRoom)) {
            Error::notFound();
        }
        $user = User::find(Auth::user()->id);
        $attended = false;
        foreach ($user->chatRooms->all() as $c) {
            if ($chatRoom->id === $c->id) {
                $attended = true;
                break;
            }
        }
        if (!$attended) {
            Error::notFound();
        }
        return view("chat_room_show", [
            "__header" => "",
            "user" => $user,
            "chatRoom" => $chatRoom,
        ]);
    }
}
