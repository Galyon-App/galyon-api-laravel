<?php

namespace Database\Factories;

use App\Models\Setting;
use App\Traits\Randomizer;
use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
{
    use Randomizer;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Setting::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'guard' => $this->randomString(['admin', 'user', null]),
            'opt_key' => $this->faker->unique()->uuid(),
            'opt_val' => $this->faker->name(),
        ];
    }
}
