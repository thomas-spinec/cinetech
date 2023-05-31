<?php
session_start();

// use AltoRouter;
use App\Controller\FavController;
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
        $commentController = new CommentController();
        $commentController->getComments($id, 'movie');
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
        $commentController = new CommentController();
        $commentController->getComments($id, 'tv');
    }, 'serieComments'],
    // map récup comments serie replies
    ['GET', '/serie/[i:id]/comments/[a:action]', function ($id, $action) {
        $commentController = new CommentController();
        $commentController->getReplies($id, $action, 'tv');
    }, 'serieCommentsReplies'],

    // map make comment or reply
    ['POST', '/comment', function () {
        $commentController = new CommentController();
        $commentController->addComment();
    }, 'comments'],
    // map make reply
    ['POST', '/reply', function () {
        $commentController = new CommentController();
        $commentController->addReply();
    }, 'reply'],

    // map pour afficher le bouton d'ajout aux favoris
    ['POST', '/favoriteButton/[i:id]', function ($id) {
        $commentController = new FavController();
        $commentController->displayFavButton($id, $_POST['type']);
    }, 'Favorite'],

    //map pour toggle le favori
    ['POST', '/favorite', function () {
        $commentController = new FavController();
        $commentController->toggleFav();
    }, 'toggleFav'],

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
