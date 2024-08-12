<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', [
          'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()]
        ]);

        $user = User::create([
            'name' => $validatedRequest['name'],
            'email' => $validatedRequest['email'],
            'password' => $validatedRequest['password']


        ]);

        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
          ]);;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validatedRequest = $request->validate([
            'name' => 'required',
            'email' => 'required'
        ]);

        $user->name = $validatedRequest['name'];
        $user->email = $validatedRequest['email'];

        if($request->password != null){
            $validatedPassword = $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::defaults()]
            ]);
            $user->password = Hash::make($validatedPassword['password']);
        }

        $user->update($validatedRequest);

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index');
    }
}
