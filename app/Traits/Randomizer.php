<?php
    namespace App\Traits;

    trait Randomizer {

        /**
         * Randomized a given latitude and longhitude with a defaul radius of 10 miles.
         * @param $origin
         * @param $maxRadius
         * @return $array
         */
        public function randomCoordinates($origin, $maxRadius = 10)
        {
            $latitude = (float) $origin['lat'];
            $longitude = (float) $origin['lng'];;
            $radius = rand(1,$maxRadius); // in miles

            //$lat_min = $latitude - ($radius / 69);
            $lat_max = $latitude + ($radius / 69);
            //$lng_min = $longitude - $radius / abs(cos(deg2rad($latitude)) * 69);
            $lng_max = $longitude + $radius / abs(cos(deg2rad($latitude)) * 69);

            return array(
                'lat'=>$lat_max,
                'lng'=>$lng_max
            );
        }


        /**
         * Randomized list of strings.
         * @param $strings
         * @return string
         */
        public function randomString($strings)
        {
            $picked = rand(0, count($strings)-1);

            return $strings[$picked];
        }
    }
