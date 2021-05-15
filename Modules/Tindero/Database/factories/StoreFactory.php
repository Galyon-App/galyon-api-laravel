<?php
namespace Modules\Tindero\Database\factories;

use App\Traits\Randomizer;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoreFactory extends Factory
{
    use Randomizer;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\Tindero\Entities\Store::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid'=>$this->faker->unique()->uuid(),
            'title'=>$this->faker->unique()->name(),
            'is_active'=>$this->randomString(['1', '0']),
            'is_terminated'=>'0',
        ];
    }
}

