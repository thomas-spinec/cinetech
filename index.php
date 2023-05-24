<?php
session_start();

use App\Controller\AuthController;

require 'vendor/autoload.php';


$router = new AltoRouter();
$router->setBasePath('/cinetech');

$router->addRoutes([
    // map homepage
    ['GET', '/', function () {
        require __DIR__ . '/src/View/home.php';
    }, 'home'],
    // map movies
    ['GET', '/movies', function () {
        require __DIR__ . '/src/View/movies.php';
    }, 'movies'],
    // map series
    ['GET', '/series', function () {
        require __DIR__ . '/src/View/series.php';
    }, 'series'],
    // map movie
    ['GET', '/movie/[i:id]', function ($id) {
        require __DIR__ . '/src/View/movie.php';
    }, 'movie'],
    // map serie
    ['GET', '/serie/[i:id]', function ($id) {
        require __DIR__ . '/src/View/serie.php';
    }, 'serie'],
    // map register
    ['GET', '/register', function () {
        $authController = new AuthController();
        $authController->DisplayRegister();
    }, 'register'],
    // map register Post
    ['POST', '/register', function () {
        $authController = new AuthController();
        $authController->register();
    }, 'registerPost'],
]);


$match = $router->match();

// call closure or throw 404 status
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
