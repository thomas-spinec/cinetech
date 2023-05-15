<?php
require 'vendor/autoload.php';


$router = new AltoRouter();
$router->setBasePath('/cinetech');

$router->addRoutes([
    // map homepage
    ['GET', '/', function () {
        require __DIR__ . '/src/View/home.php';
    }, 'home'],
]);


$match = $router->match();

// call closure or throw 404 status
if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
