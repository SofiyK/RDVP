<?php

namespace App\Controllers;

use App\Models\OAuthModel;
use App\Services\OAuth;
use OAuth2\Request;

class OAuthController extends BaseController
{
    private $OAuthModel;
    private $OAuth;

    public function __construct()
    {
        $this->OAuth = new OAuth();

        // CORS headers
        header('Access-Control-Allow-Origin: *'); // для разрешения любого домена, небезопасно
        header('Access-Control-Allow-Headers: *'); // для разрешения любых заголовков, небезопасно
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    }

    public function Authorize()
    {
        $request = Request::createFromGlobals();
        $this->OAuth->server->handleTokenRequest($request)->send();
    }
}