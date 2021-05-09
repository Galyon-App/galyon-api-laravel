<?php

namespace Modules\Tindero\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Modules\Tindero\Entities\Store;
use Modules\Tindero\Entities\StoresCategoriesAssign;
use Modules\Tindero\Entities\StoresMeta;

class StoreController extends Controller
{
    /**
     * Get all store that is involve in this category.
     */
    public function getByCategory(Request $request)
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

        $assings = StoresCategoriesAssign::where('category_uuid', $request->uuid)
            ->select('store_uuid AS uuid')
            ->get()
            ->each(function ($store) {
                $stores = Store::where('uuid', $store->uuid)
                    ->select('title', 'desc')
                    ->first();
                $store->title = $stores->title;
                $store->desc = $stores->desc;

                $metas = StoresMeta::where('store_uuid', $store->uuid)
                    ->select('meta_key', 'meta_val')
                    ->get();
                foreach($metas as $meta) {
                    $store[$meta->meta_key] = $meta->meta_val;
                }
            });

        return response()->json([
            'data'=>$assings
        ], 200);
    }

    /**
     * Get the specific store with this uuid.
     */
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

        $store = Store::where('is_active', '1')
            ->where('is_terminated', '0')
            ->where('uuid', $request->uuid)
            ->select('uuid', 'title', 'desc')
            ->get()
            ->each(function ($store) {
                $metas = StoresMeta::where('store_uuid', $store->uuid)
                    ->select('meta_key', 'meta_val')
                    ->get();
                foreach($metas as $meta) {
                    $store[$meta->meta_key] = $meta->meta_val;
                }
            });

        return response()->json([
            'data'=>count($store) > 0 ? $store[0] : null
        ], 200);
    }

    /**
     * Get the list of store which is active and not terminated.
     */
    public function active()
    {
        $stores = Store::where('is_active', '1')
            ->where('is_terminated', '0')
            ->select('uuid', 'title', 'desc')
            ->get()
            ->each(function ($store) {
                $metas = StoresMeta::where('store_uuid', $store->uuid)
                    ->select('meta_key', 'meta_val')
                    ->get();
                foreach($metas as $meta) {
                    $store[$meta->meta_key] = $meta->meta_val;
                }
            });

        return response()->json([
            'data'=>$stores
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
