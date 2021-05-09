<?php
namespace Modules\Tindero\Database\factories;

use App\Traits\Randomizer;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoreCategoryFactory extends Factory
{
    use Randomizer;
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\Tindero\Entities\StoresCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => $this->faker->unique()->uuid(),
            'title' => $this->faker->unique()->jobTitle(),
            'is_active' => $this->randomString(['1', '0'])
        ];
    }
}

