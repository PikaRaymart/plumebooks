<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable{
	use HasApiTokens, HasFactory, Notifiable;

	protected $guard = "customer";

	protected $fillable = [
		'name',
		'email',
		'password',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $casts = [
		'email_verified_at' => 'datetime'
	];

	function carts(): HasMany {
		return $this->hasMany(Cart::class);
	}

	function orders() {
		return $this->hasMany(Order::class);
	}

	function getRedirectRoute(){
		return "/";
	}

}
