<?php

use Illuminate\Http\Request;
use Modules\Tindero\Http\Controllers\CityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* START Protected Routes */
Route::group(['middleware' => ['jwt.auth']], function () {

});
/* END Protected Routes */

//Available Cities related routes
Route::post('/cities/active', [CityController::class, 'active']);
Route::post('/cities/getById', [CityController::class, 'getById']);
