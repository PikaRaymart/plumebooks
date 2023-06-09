<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
	function up(): void{
		Schema::create('orders', function (Blueprint $table) {
	    $table->id();
	    $table->string("paypal");
			$table->boolean("completed")->default(false);
			$table->string("address")->nullable();
			$table->string("buyer")->nullable();
	    $table->foreignId('customer_id')->constrained();
	    $table->timestamps();
  });
	}

	function down(): void{
		Schema::dropIfExists('orders');
	}
};
