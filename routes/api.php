<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* START Protected Routes */
Route::group(['middleware' => ['jwt.auth']], function () {
    //Users related routes
    Route::post('/user/verify', [UserController::class, 'verify']);
    Route::post('/user/logout', [UserController::class, 'logout']);
    Route::post('/user/auth/refresh', [UserController::class, 'refresh']);
    Route::post('/user/profile', [UserController::class, 'profile']);

    //Address related routes
    Route::post('/address/getByUuid', [AddressController::class, 'getByUuid']);
});
/* END Protected Routes */

/* START Auth Routes */
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});
/* END Auth Routes */
