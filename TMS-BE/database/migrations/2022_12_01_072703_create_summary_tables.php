<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSummaryTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('summary_per_month', function (Blueprint $table) {
            $table->id();
            $table->string('month_year');
            $table->decimal('total', 14, 2);
            $table->enum('type', [
                \App\Models\SummaryPerMonth::TYPE_AMOUNT,
                \App\Models\SummaryPerMonth::TYPE_BOOKING,
                \App\Models\SummaryPerMonth::TYPE_USER,
            ]);
            $table->unique(['month_year', 'type']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('summary_per_month');
    }
}
