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

    public function login($email, $password)
    {
        $req = $this->bdd->prepare('SELECT * FROM users WHERE email = ?');
        $req->execute(array($email));
        $user = $req->fetch();

        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user'] = $user;
                $_SESSION['flash']['success'] = 'Vous êtes bien connecté';
            } else {
                $_SESSION['flash']['error'] = 'Mot de passe incorrect';
            }
        } else {
            $_SESSION['flash']['error'] = 'Email incorrect';
        }
    }
}
