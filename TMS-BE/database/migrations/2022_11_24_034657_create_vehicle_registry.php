<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehicleRegistry extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicle_registry', function (Blueprint $table) {
            $table->id();
            $table->string('chassis_number')->comment('Số khung');
            $table->string('engine_number')->comment('Số máy');
            $table->date('date_range')->comment('Ngày cấp');
            $table->string('issued_by')->comment('Nơi cấp');
            $table->dateTime('expired_date');
            $table->timestamps();

            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->foreign('vehicle_id', 'fk_vehicle_registry_vehicle')
                ->references('id')
                ->on('vehicles')
                ->onDelete('cascade');

            $table->foreign('created_by', 'fk_vehicle_registry_user_created')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('updated_by', 'fk_vehicle_registry_user_updated')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_registry_id')->nullable();
            $table->foreign('vehicle_registry_id', 'fk_vehicle_vehicle_registry')
                ->references('id')
                ->on('vehicle_registry')
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
        Schema::dropIfExists('vehicle_registry');
    }
}
