<?php

namespace Database\Factories;

use App\Models\Address;
use App\Traits\Randomizer;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    use Randomizer;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $coords = $this->randomCoordinates(array(
            'lat'=>'14.633230',
            'lng'=>'121.054412'
        ));
        return [
            'uuid' => $this->faker->unique()->uuid(),
            'title' => $this->randomString(['Home', 'Work', 'Other']),
            'address' => $this->faker->address(),
            'lat' => $coords['lat'],
            'lng' => $coords['lng'],
        ];
    }
}
