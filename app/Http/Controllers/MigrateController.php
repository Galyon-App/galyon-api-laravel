<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MigrateController extends Controller
{
    public function migrate()
    {
        Artisan::call('migrate');
        return response()->json([
            'message'=>'Migrate was executed.'
        ]);
    }
}
