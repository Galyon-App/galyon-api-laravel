<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsCategoriesAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_categories_assigns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('category_uuid', 36)
                ->index('category_uuid', 'category_uuid_uuid_index');
            $table->string('posts_uuid', 36);
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
        Schema::dropIfExists('posts_categories_assigns');
    }
}
