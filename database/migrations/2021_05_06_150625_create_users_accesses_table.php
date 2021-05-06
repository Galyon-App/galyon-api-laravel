<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_accesses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_uuid', 36)
                ->index('user_uuid', 'users_accesses_uuid_index');
            $table->string('role_uuid', 36);
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
        Schema::drop('users_accesses');
    }
}
