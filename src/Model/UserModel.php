<?php

namespace App\Model;

class UserModel extends AbstractModel
{
    protected $bdd;
    protected $table = "users";

    public function __construct()
    {
        parent::__construct();
    }

    public function register($param)
    {
        $req = $this->bdd->prepare('INSERT INTO users (name, lastname, email, password) VALUES (:name, :lastname, :email, :password)');
        $req->execute($param);

        // si l'inscription s'est bien passée
        if ($req) {
            $_SESSION['flash']['success'] = 'Vous êtes bien inscrit';
        } else {
            $_SESSION['flash']['error'] = 'Une erreur est survenue';
        }
    }
}
