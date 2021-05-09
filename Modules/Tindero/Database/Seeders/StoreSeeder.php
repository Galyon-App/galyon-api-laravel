<?php

namespace Modules\Tindero\Database\Seeders;

use App\Traits\Randomizer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Tindero\Entities\Store;
use Modules\Tindero\Entities\StoresMeta;
use Modules\Tindero\Model\Seeders;
use Illuminate\Foundation\Testing\WithFaker;

class StoreSeeder extends Seeder
{
    use Randomizer; use WithFaker;

    public function __construct()
    {
        $this->setUpFaker();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        Store::factory()
            ->count(10)
            ->create()
            ->each(function($store) {
                $coords = $this->randomCoordinates(array(
                    'lat'=>'14.320315',
                    'lng'=>'121.041211'
                ));

                StoresMeta::create(array(
                    'store_uuid'=>$store->uuid,
                    'meta_key'=>'phone',
                    'meta_val'=> $this->faker->unique()->userName()
                ));

                StoresMeta::create(array(
                    'store_uuid'=>$store->uuid,
                    'meta_key'=>'email',
                    'meta_val'=> $this->faker->unique()->safeEmail()
                ));

                StoresMeta::create(array(
                    'store_uuid'=>$store->uuid,
                    'meta_key'=>'lat',
                    'meta_val'=> $coords['lat']
                ));

                StoresMeta::create(array(
                    'store_uuid'=>$store->uuid,
                    'meta_key'=>'lng',
                    'meta_val'=> $coords['lng']
                ));
            });
    }
}
