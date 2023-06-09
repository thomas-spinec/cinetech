<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="/cinetech/style.css">
    <link rel="icon" type="images/png" sizes="64x64" href="img/Logo_onglet.png" />
    <!-- Fontawesome -->
    <script src="https://kit.fontawesome.com/1a481da37a.js" crossorigin="anonymous"></script>
    <!-- script -->
    <script defer src="/cinetech/scripts/research.js"></script>
    <script defer src="/cinetech/scripts/movies.js"></script>
    <script defer src="/cinetech/scripts/menu.js"></script>
    <title>Movies</title>
</head>

<body>
    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <article id="movies_week">
            <h2>Les prochaines sorties</h2>
            <section class="movies">
        </article>

        <article id="movies_by_genre">
            <h2>Quelques films</h2>
            <select name="genre" id="genre"></select>
            <section class="moviesWrap">
            </section>
        </article>
    </main>

    <footer>
        <?php require_once 'includes/footer.php'; ?>
    </footer>

</body>

</html>