<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Webpatser\Uuid\Uuid;

class UserController extends Controller
{
    public function __contructor()
    {
        $this->middleware('auth:api', ['except', ['login', 'register']]);
    }

    /**
     * @param $uuid
     * @param $pword
     * @return mixed
     */
    private function getToken($uuid, $pword)
    {
        try {
            if (!$token = JWTAuth::attempt(['uuid' => $uuid, 'password' => $pword])) {
                return false;
            } else {
                return $token;
            }
        } catch (JWTAuthException $e) {
            return false;
        }
    }

    /**
     * Check if the $number is a valid phone number.
     * @param $number
     * @return boolean
     */
    private function is_phone($number, $min = 10, $max = 14)
    {
        // Allow +, - and . in phone number
        $filtered_phone_number = filter_var($number, FILTER_SANITIZE_NUMBER_INT);

        //Check if phone dont contains characters.
        if($number !== $filtered_phone_number) {
            return false;
        }

        // Remove "-" from number
        $phone_to_check = str_replace("-", "", $filtered_phone_number);

        // This can be customized if you want phone number from a specific country
        if (strlen($phone_to_check) < $min || strlen($phone_to_check) > $max) {
            return false;
        }

        return true;
    }

    /**
     * Authenticate user using username/phone/email with their password and return uid and jwt token.
     * @param $request
     * @return mixed
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usercred' => 'required|string|min:4',
            'password' => 'required|string|min:4'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>"Invalid credential"
            ], 201);
        }

        if(filter_var( $request->usercred, FILTER_VALIDATE_EMAIL )) {
            $user = DB::table('users')
                ->join('user_metas', 'users.uuid', '=', 'user_metas.uuid')
                ->where('meta_key', 'email')
                ->where('meta_val', $request->usercred)
                ->select('users.id', 'users.uuid', 'users.password')
                ->get()
                ->first();
        } else {
            if($this->is_phone($request->usercred)) {
                $user = DB::table('users')
                    ->join('user_metas', 'users.uuid', '=', 'user_metas.uuid')
                    ->where('meta_key', 'phone')
                    ->where('meta_val', $request->usercred)
                    ->select('users.id', 'users.uuid', 'users.password')
                    ->get()
                    ->first();
            } else {
                $user = DB::table('users')
                    ->join('user_metas', 'users.uuid', '=', 'user_metas.uuid')
                    ->where('meta_key', 'username')
                    ->where('meta_val', $request->usercred)
                    ->select('users.id', 'users.uuid', 'users.password')
                    ->get()
                    ->first();
            }
        }

        if($user == null) {
            return response()->json([
                'success'=>false,
                'message'=>"User cant be found"
            ], 201);
        }

        if(!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success'=>false,
                'message'=>"Password is incorrect"
            ], 201);
        }

        if(!$token = $this->getToken($user->uuid, $request->password)) {
            return response()->json([
                'success'=>false,
                'message'=>"Failed to verify token"
            ], 201);
        }

        return response()->json([
            'success'=>true,
            'id'=>$user->id,
            'uuid'=>(string)$user->uuid,
            'token'=>$token
        ], 200);
    }

    /**
     * Register user with Username / Phone / Email and Password.
     * @param $request
     * @return mixed
     */
    public function register(Request $request)
    {
        if(isset($request->uname)) {
            $uname_exist = DB::table('user_metas')
                ->where('meta_key', 'username')
                ->where('meta_val', $request->uname)
                ->exists();

            if($uname_exist) {
                return response()->json([
                    'success'=>false,
                    'message'=>"Username already existing."
                ], 201);
            }

            $uname_validator = Validator::make($request->all(), [
                'uname' => 'required|string|between:4,100',
            ]);

            if($uname_validator->fails()) {
                return response()->json([
                    'success'=>false,
                    'message'=>$uname_validator->errors()
                ], 201);
            }
            $uname = $request->uname;
        }

        if(isset($request->phone)) {
            $phone_exist = DB::table('user_metas')
                ->where('meta_key', 'phone')
                ->where('meta_val', $request->phone)
                ->exists();

            if($phone_exist) {
                return response()->json([
                    'success'=>false,
                    'message'=>"Phone number already existing."
                ], 201);
            }

            $phone_validator = Validator::make($request->all(), [
                'phone' => 'required|string',
            ]);

            if($phone_validator->fails()) {
                return response()->json([
                    'success'=>false,
                    'message'=>$phone_validator->errors()
                ], 201);
            }

            $phone = $this->is_phone($request->phone);
            if(!$phone) {
                return response()->json([
                    'success'=>false,
                    'message'=>"Invalid phone number"
                ], 201);
            }

            //TODO: https://github.com/BytesCrafter/BusiNext-Laravel/issues/1
            // $hasPhone = DB::table('users')
            //         ->where('phone', $phone)
            //         ->exists();

            // if($hasPhone) {
            //     return response()->json([
            //         'success'=>false,
            //         'message'=>"Phone already registered".$phone
            //     ], 201);
            // }
            $phone = $request->phone;
        }

        if(isset($request->email)) {
            $email_exist = DB::table('user_metas')
                ->where('meta_key', 'email')
                ->where('meta_val', $request->email)
                ->exists();

            if($email_exist) {
                return response()->json([
                    'success'=>false,
                    'message'=>"Email address already existing."
                ], 201);
            }

            $email_validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);

            if($email_validator->fails()) {
                return response()->json([
                    'success'=>false,
                    'message'=>$email_validator->errors()
                ], 201);
            }
            $email = $request->email;
        }

        if(isset($uname) || isset($phone) || isset($email)) {
            $password_validator = Validator::make($request->all(), [
                'password' => 'required|string|confirmed|min:5',
            ]);

            if($password_validator->fails()) {
                return response()->json([
                    'success'=>false,
                    'message'=>"$password_validator->errors()"
                ], 201);
            }

            $user = User::create(array(
                'uuid' => Uuid::generate(4),
                'password' => bcrypt($request->password)
            ));

            if(isset($uname)) {
                UserMeta::create(array(
                    'uuid' => $user->uuid,
                    'meta_key' => 'username',
                    'meta_val' => $uname,
                ));
            }

            if(isset($phone)) {
                UserMeta::create(array(
                    'uuid' => $user->uuid,
                    'meta_key' => 'phone',
                    'meta_val' => $phone,
                ));
            }

            if(isset($email)) {
                UserMeta::create(array(
                    'uuid' => $user->uuid,
                    'meta_key' => 'email',
                    'meta_val' => $email,
                ));
            }

            if(!$token = $this->getToken($user->uuid, $request->password)) {
                return response()->json([
                    'success'=>false,
                    'message'=>"Failed to verify token"
                ], 201);
            }

            return response()->json([
                'success'=>true,
                'id'=>$user->id,
                'uuid'=>(string)$user->uuid,
                'token'=>$token
            ], 200);
        } else {
            return response()->json([
                'success'=>false,
                'message'=>"Must contain username, phone, or email.",
            ], 201);
        }

    }

    /**
     * Verify the blank request with the bearer token passed.
     * @param $request
     * @return mixed
     */
    public function verify(Request $request) {
        try {
            $user = auth()->userOrFail();
            return response()->json([
                'success' => false,
                'data' => $user
            ]);
        } catch(UserNotDefinedException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token is not valid'
            ]);
        }
    }

    protected function guard()
    {
        return Auth::guard();
    }
}
