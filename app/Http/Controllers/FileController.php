<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;

class FileController extends Controller
{
    public function upload(Request $request, $file = 'file')
    {
        $validator = Validator::make($request->all(), [
            $file => 'required|mimes:png,jpg,jpeg,csv,txt,pdf|max:2048'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>"Invalid file format"
            ], 201);
        }

        if(!$user = auth()->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Token is invalid'
            ]);
        }

        $path = 'public';
        $data = $request->file($file);
        $extention = $data->extension();
        $filename = $data->getClientOriginalName();

        $upload = $request->file($file)->storePublicly($path);

        $hashonly = explode("/", $upload);
        $hashonly = $hashonly[count($hashonly)-1];
        $hashonly = explode(".", $hashonly);
        $hashname = $hashonly[0];

        //Insert to database.
        File::create(array(
            'uuid' => Uuid::generate(4),
            'filename' => $filename,
            'hashname' => $hashname,
            'extention' => $extention,
            'user_uuid' => $user->uuid
        ));

        return response()->json([
            'success'=>true,
            'data' => asset(Storage::url($hashname.".".$extention)),
        ]);
    }
}
