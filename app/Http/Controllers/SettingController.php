<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    /**
     * Get an address by its uuid.
     * @param $request
     * @return array
     */
    public function getByGuard(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guard' => 'nullable||min:4',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>"Invalid input fields"
            ], 201);
        }

        $setting_table = (new Setting())->getTable();

        $setting = DB::table($setting_table)
            ->where('guard', $request->guard)
            ->orWhere('guard', null)
            ->select('guard', 'opt_key', 'opt_val')
            ->get();

        if(!$setting) {
            return response()->json([
                'success'=>false,
                'message'=>"    Settings not found"
            ], 201);
        }

        return response()->json([
            'success'=>true,
            'data'=>$setting
        ], 200);
    }
}
