<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    /**
     * Get an address by its uuid.
     * @param $request
     * @return array
     */
    public function getByUuid(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required|string|min:36',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>"Invalid input fields"
            ], 201);
        }

        $address_table = (new Address)->getTable();

        $address = DB::table($address_table)
            ->where('uuid', $request->uuid)
            ->select('title', 'address', 'landmark', 'zipcode', 'lat', 'lng')
            ->get()
            ->first();

        if(!$address) {
            return response()->json([
                'success'=>false,
                'message'=>"Address not found"
            ], 201);
        }

        return response()->json([
            'success'=>true,
            'data'=>$address
        ], 200);
    }
}
