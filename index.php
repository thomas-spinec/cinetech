<?php
session_start();

use AltoRouter;
use App\Controller\AuthController;
use App\Controller\CommentController;

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
    // map récup comments movie
    ['GET', '/movie/[i:id]/comments', function ($id) {
        // require __DIR__ . '/src/View/comments.php';
    }, 'movieComments'],
    // map récup comments movie replies
    ['GET', '/movie/[i:id]/comments/[a:action]', function ($id, $action) {
        $commentController = new CommentController();
        $commentController->getReplies($id, $action, 'movie');
    }, 'movieCommentsReplies'],
    // map serie
    ['GET', '/serie/[i:id]', function ($id) {
        require __DIR__ . '/src/View/serie.php';
    }, 'serie'],
    // map récup comments serie
    ['GET', '/serie/[i:id]/comments', function ($id) {
        // require __DIR__ . '/src/View/comments.php';
    }, 'serieComments'],

    // map make comments
    ['POST', '/comments', function () {
        $commentController = new CommentController();
    }, 'comments'],
    // map make reply
    ['POST', '/reply', function () {
        $commentController = new CommentController();
        $commentController->addReply();
    }, 'reply'],

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
    // map login
    ['GET', '/login', function () {
        $authController = new AuthController();
        $authController->DisplayLogin();
    }, 'login'],
    // map login Post
    ['POST', '/login', function () {
        $authController = new AuthController();
        $authController->login();
    }, 'loginPost'],
    // map logout
    ['GET', '/logout', function () {
        $authController = new AuthController();
        $authController->logout();
    }, 'logout'],
]);


$match = $router->match();

// call closure or throw 404 status
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
