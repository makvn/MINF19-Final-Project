<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('type');
            $table->string('car_number');
            $table->unsignedFloat('weight');
            $table->string('type_of_fuel');
            $table->enum('status', [
                \App\Models\Vehicle::STATUS_ACTIVE,
                \App\Models\Vehicle::STATUS_INACTIVE,
                \App\Models\Vehicle::STATUS_PENDING,
            ]);
            $table->dateTime('status_active_at')->nullable();
            $table->unsignedBigInteger('status_active_by')->nullable();
            $table->unsignedBigInteger('driver_id');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->unsignedBigInteger('book_by')->nullable();
            $table->dateTime('book_at')->nullable();

            $table->foreign('created_by', 'fk_vehicle_user_created')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('updated_by', 'fk_vehicle_user_updated')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('driver_id', 'fk_vehicle_user_driver')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('status_active_by', 'fk_vehicle_user_status_active_by')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('book_by', 'fk_vehicle_user_book_by')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

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
        Schema::dropIfExists('vehicles');
    }
}
