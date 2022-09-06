<?php

namespace Modules\UserModule\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $request = service('request');
        $header  = $request->getHeader("Authorization");
        
        if (isset($header) && !empty($header->getValue())) {
            $token   = $header->getValue();
            if (!empty($header)) {
                if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                    $token = $matches[1];
                } else {
                    $token = $header->getValue();
                }
            }
            if (is_null($token) || empty($token)) {
                $response = service('response');
                $response->setBody('Access denied due to token not found');
                $response->setStatusCode(401);
                return $response;
            }
            $jwt_key = getenv('JWT_SECRET');
            try {
                JWT::decode($token, new Key($jwt_key, 'HS256'));
            } catch (\Exception $ex) {
                $response = service('response');
                $response->setBody('Access denied token expired');
                $response->setStatusCode(401);
                return $response;
            }
        } else {
            if (!session()->get('isLoggedIn')) {
                return redirect()->to(site_url('login'));
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}
