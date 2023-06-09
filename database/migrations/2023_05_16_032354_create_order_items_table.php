<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
	function up(): void{
		Schema::create('order_items', function (Blueprint $table) {
		  $table->id();
			$table->unsignedBigInteger('order_id'); 
		  $table->foreign("order_id")->references("id")->on("orders")->onDelete("cascade");
		  $table->foreignId('book_id')->constrained();
		  $table->integer('quantity');
		  $table->timestamps();
	});
	}

	function down(): void{
		Schema::dropIfExists('order_items');
	}
};
