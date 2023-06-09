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
    <script defer src="/cinetech/scripts/series.js"></script>
    <script defer src="/cinetech/scripts/menu.js"></script>
    <title>Series</title>
</head>

<body>
    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <article id="series_week">
            <h2>Les séries de la semaine</h2>
            <section class="series">
        </article>

        <article id="series_by_genre">
            <h2>Quelques séries</h2>
            <select name="genre" id="genre"></select>
            <section class="seriesWrap">
            </section>
        </article>
    </main>

    <footer>
        <?php require_once 'includes/footer.php'; ?>
    </footer>

</body>

</html>