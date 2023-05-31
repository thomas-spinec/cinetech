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
    <!-- script -->
    <script defer src="/cinetech/scripts/research.js"></script>
    <script defer src="/cinetech/scripts/menu.js"></script>
    <script defer src="/cinetech/scripts/profil.js"></script>
    <title>profil</title>
</head>

<body>
    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <section class="intro">
            <h1>Profil</h1>
            <p>Bonjour <?= $_SESSION['user']['name'] ?></p>
        </section>
        <section class="onglet">
            <button id="infos">informations</button>
            <button id="favs">favoris</button>
        </section>
        <section class="display"></section>
    </main>

</body>

</html>