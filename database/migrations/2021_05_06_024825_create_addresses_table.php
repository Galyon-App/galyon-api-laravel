<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)
                ->index('uuid', 'addresses_uuid_unique');
            $table->string('title', 255);
            $table->text('address');
            $table->string('landmark', 255)
                ->default('');
            $table->string('zipcode', 10)
                ->default('');
            $table->string('lat', 100);
            $table->string('lng', 100);
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
        Schema::drop('addresses');
    }
}
