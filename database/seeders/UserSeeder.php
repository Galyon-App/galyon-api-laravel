<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserMeta;
use App\Models\UsersCredential;
use Illuminate\Database\Seeder;
use Faker\Generator;
use Illuminate\Container\Container;

class UserSeeder extends Seeder
{
    /**
     * The current Faker instance.
     *
     * @var \Faker\Generator
     */
    protected $faker;

    /**
     * Create a new seeder instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }

    /**
     * Get a new Faker instance.
     *
     * @return \Faker\Generator
     */
    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->count(10)
            ->create()
            ->each(function($user) {
                UsersCredential::create(array(
                    'uuid'=>$user->uuid,
                    'meta_key'=>'uname',
                    'meta_val'=> $this->faker->unique()->userName()
                ));

                UsersCredential::create(array(
                    'uuid'=>$user->uuid,
                    'meta_key'=>'phone',
                    'meta_val'=> $this->faker->unique()->phoneNumber()
                ));

                UsersCredential::create(array(
                    'uuid'=>$user->uuid,
                    'meta_key'=>'email',
                    'meta_val'=> $this->faker->unique()->safeEmail()
                ));
            });
    }
}
