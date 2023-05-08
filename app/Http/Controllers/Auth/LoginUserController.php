<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginUserRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class LoginUserController extends Controller{

	function create(): Response{
		return Inertia::render('Auth/Login', [
			'canResetPassword' => Route::has('password.request'),
			'status' => session('status'),
		]);
	}

		/**
		 * Handle an incoming authentication request.
		 */
	function store(LoginUserRequest $request){
		$request->authenticate();

		$request->session()->regenerate();

		$user = currentAuthenticatedUser();

		if ($user["type"]==="customer") {
			return redirect()->intended(RouteServiceProvider::HOME);
		}
	
		return redirect("admin");
	}

	/**
	 * Destroy an authenticated session.
	 */
	function destroy(Request $request): RedirectResponse{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect('/');
	}
}