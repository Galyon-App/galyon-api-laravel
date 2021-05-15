<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitiesAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities_assigns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('city_uuid', 36)
                ->index('city_uuid', 'city_uuid_index');
            $table->string('store_uuid', 36);
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
        Schema::dropIfExists('cities_assigns');
    }
}
