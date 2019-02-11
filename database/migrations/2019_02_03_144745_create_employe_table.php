<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $client = new GearmanClient();
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',700);
            $table->string('position',700);
            $table->bigInteger('hired');
            $table->double('salary',15,2);
            $table->bigInteger('boss_id')->nullable(); // if no boss, then null
            $table->timestamps();
            $table->index('name');
            $table->index('position');
            $table->index('hired');
            $table->index('salary');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
