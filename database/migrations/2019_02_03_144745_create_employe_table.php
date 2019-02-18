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
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',99);
            $table->string('position',99);
            $table->bigInteger('hired');
            $table->double('salary',15,2);
            $table->bigInteger('boss_id')->unsigned()->nullable(); // if no boss, then null
            $table->timestamps();

            $table->index(array('name','position'));
            $table->index(array('hired','salary'));
            $table->index(array('id','boss_id'));
            $table->index('boss_id');

            $table->foreign('boss_id')->references('id')->on('employees');
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
