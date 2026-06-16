<?php

namespace App\Controllers\Api;

use App\Libraries\OAuth;
use App\Models\OAuthModel;
use App\Models\RatingModel;
use CodeIgniter\RESTful\ResourceController;

class RatingApi extends ResourceController
{
    protected $model;
    protected $oauth;

    public function __construct()
    {
        $this->model = new RatingModel();
    }

    public function rating() // Отображение всех записей
    {
        $this->oauth = new OAuth();

        if ($this->oauth->isLoggedIn()) {
            $oAuthModel = new OAuthModel();

            $model = $this->model;
            $per_page = $this->request->getPost('per_page');
            $search = $this->request->getPost('search');

            $data = $this->model->getRatings(
                $oAuthModel->getUser()->group_name == 'admin' ? null : $oAuthModel->getUser()->id,
                $search,
                $per_page
            );

            // Ответ контроллера включает данные (ratings) и параметры пагинации (pager)
            return $this->respond([
                'ratings' => $data,
                'pager' => $model->pager->getDetails('group1')
            ]);
        } else {
            $this->oauth->server->getResponse()->send();
        }
    }
}