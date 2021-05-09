<?php

namespace Modules\Tindero\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Modules\Tindero\Entities\City;

class CityController extends Controller
{
    public function active()
    {
        $cities = City::where('is_active', '1')
            ->select('uuid', 'name', 'lat', 'lng')
            ->get();
        return response()->json([
            'data'=>$cities
        ], 200);
    }

    public function getById(Request $request)
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

        $cities = City::where('uuid', $request->uuid)
            ->select('uuid', 'name', 'lat', 'lng')
            ->first();

        if(!$cities) {
            return response()->json([
                'success' => false,
                'data'=>$cities
            ], 201);
        }

        return response()->json([
            'success' => true,
            'data'=>$cities
        ], 200);
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        return view('tindero::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('tindero::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('tindero::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('tindero::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }
}
