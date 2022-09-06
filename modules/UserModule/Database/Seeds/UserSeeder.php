<?php

namespace Modules\UserModule\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Modules\UserModule\Models\UserModel;

class UserSeeder extends Seeder
{
	public function run()
	{
		$user_object = new UserModel();

		$user_object->insertBatch([
			[
				"name" => "HS",
				"email" => "hs_student@gmail.com",
				"mobile" => "12345678",
				"user_name" => "hs_student@gmail.com",
				"password" => password_hash("12345678", PASSWORD_DEFAULT),
				"role_id" => "3",
				"parent_id" => "0",
				"country" => "India",
				"region" => "Rajasthan",
				"otp" => "",
				"last_login" => "",
				"last_login" => "",
				"status" => "0",
				"flag" => "0",
			],
		]);
	}
}