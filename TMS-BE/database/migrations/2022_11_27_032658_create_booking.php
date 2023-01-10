<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooking extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('pickup_place');
            $table->dateTime('datetime_start');
            $table->dateTime('datetime_end')->nullable();
            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->timestamps();
            $table->foreign('vehicle_id', 'fk_booking_vehicle')
                ->references('id')
                ->on('vehicles')
                ->onDelete('cascade');

            $table->foreign('created_by', 'fk_booking_user_created')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('updated_by', 'fk_booking_user_updated')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('current_booking_id')->nullable();
            $table->dateTime('last_booking_end_time')->nullable();

            $table->foreign('current_booking_id', 'fk_vehicle_booking')
                ->references('id')
                ->on('bookings')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booking');
    }
}
