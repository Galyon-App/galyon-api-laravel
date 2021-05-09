<?php

use Illuminate\Http\Request;
use Modules\Tindero\Http\Controllers\CityController;
use Modules\Tindero\Http\Controllers\StoreController;

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

// All about stores
Route::post('/stores/active', [StoreController::class, 'active']);
Route::post('/stores/getById', [StoreController::class, 'getById']);
Route::post('/stores/getByCategory', [StoreController::class, 'getByCategory']);

//Available Cities related routes
Route::post('/cities/active', [CityController::class, 'active']);
Route::post('/cities/getById', [CityController::class, 'getById']);
