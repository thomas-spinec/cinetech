<?php

namespace App\Controller;

class AuthController
{
    private $user;

    public function __construct()
    {
        if (isset($_SESSION['user'])) {
            $this->user = $_SESSION['user'];
        }
    }

    public function DisplayLogin()
    {
        if (isset($_SESSION['user'])) {
            header('Location: /cinetech');
        } else {
            require_once __DIR__ . '/../View/login.php';
        }
    }

    public function DisplayRegister()
    {
        if (isset($_SESSION['user'])) {
            header('Location: /cinetech');
        } else {
            require_once __DIR__ . '/../View/register.php';
        }
    }

    public function logout()
    {
        session_destroy();
        header('Location: /cinetech');
    }



    public function register()
    {
        // vérification des données
        if (empty($_POST['name']) || empty($_POST['lastname']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['password_confirm'])) {
            $_SESSION['flash']['error'] = 'Tous les champs sont obligatoires';
            require_once __DIR__ . '/../View/register.php';
            return;
        } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $_SESSION['flash']['error'] = 'Email invalide';
            require_once __DIR__ . '/../View/register.php';
            return;
        } else if ($_POST['password'] != $_POST['password_confirm']) {
            $_SESSION['flash']['error'] = 'Les mots de passe ne correspondent pas';
            require_once __DIR__ . '/../View/register.php';
            return;
        }
        // vérification si l'email existe déjà
        $user = new \App\Model\UserModel();
        $userDispo = $user->findBy(['email' => htmlspecialchars($_POST['email'])]);
        if ($userDispo) {
            $_SESSION['flash']['error'] = 'Email déjà utilisé';
            require_once __DIR__ . '/../View/register.php';
            return;
        }
        // création du compte avec hachage du mot de passe et htmlspecialchars sur les autres données
        $params = [
            'name' => htmlspecialchars($_POST['name']),
            'lastname' => htmlspecialchars($_POST['lastname']),
            'email' => htmlspecialchars($_POST['email']),
            'password' => password_hash($_POST['password'], PASSWORD_DEFAULT)
        ];

        $user->register($params);
        // si l'inscription s'est bien passée on redirige vers la page de connexion après avoir affiché un message
        if (isset($_SESSION['flash']['success'])) {
            header('Location: /cinetech/login');
        } else {
            require_once __DIR__ . '/../View/register.php';
        }
    }

    public function login()
    {
        // vérification des données
        if (empty($_POST['email']) || empty($_POST['password'])) {
            $_SESSION['flash']['error'] = 'Tous les champs sont obligatoires';
            require_once __DIR__ . '/../View/login.php';
            return;
        } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $_SESSION['flash']['error'] = 'Email invalide';
            require_once __DIR__ . '/../View/login.php';
            return;
        }
        // vérification si l'email existe déjà
        $user = new \App\Model\UserModel();
        $userDispo = $user->findBy(['email' => htmlspecialchars($_POST['email'])]);

        if (!$userDispo) {
            $_SESSION['flash']['error'] = 'Email ou mot de passe incorrect';
            require_once __DIR__ . '/../View/login.php';
            return;
        }
        // vérification du mot de passe
        if (!password_verify($_POST['password'], $userDispo['password'])) {
            $_SESSION['flash']['error'] = 'Email ou mot de passe incorrect';
            require_once __DIR__ . '/../View/login.php';
            return;
        }
        // si tout est ok on connecte l'utilisateur et on le redirige vers la page d'accueil
        $_SESSION['user'] = $userDispo;
        header('Location: /cinetech');
    }
}
