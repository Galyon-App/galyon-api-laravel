<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)
                ->index('uuid', 'city_uuid_index');
            $table->string('name', 255);
            $table->string('lat', 100);
            $table->string('lng', 100);
            $table->string('operator', 36)
                ->nullable(true)
                ->default(null);
            $table->boolean('is_active')
                ->default('0');
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
        Schema::dropIfExists('cities');
    }
}
