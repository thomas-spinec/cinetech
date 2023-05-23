<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="/cinetech/style.css">
    <!-- Fontawesome -->
    <script src="https://kit.fontawesome.com/1a481da37a.js" crossorigin="anonymous"></script>
    <!-- JS -->
    <script defer src="/cinetech/scripts/home.js"></script>
    <script defer src="/cinetech/scripts/menu.js"></script>
    <title>Accueil</title>
</head>

<body>
    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <h2>Accueil</h2>
        <article id="movie_article">
            <h2>Quelques films</h2>
            <section class="movies">
            </section>
        </article>
        <article id="series_article">
            <h2>Quelques séries</h2>
            <section class="series">
            </section>

        </article>
    </main>


</body>

</html>