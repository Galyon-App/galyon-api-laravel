<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresCategoriesAssignTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores_categories_assigns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('store_uuid', 36)
                ->index('store_uuid', 'store_uuid_index');
            $table->string('category_uuid', 36);
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
        Schema::dropIfExists('stores_categories_assigns');
    }
}
