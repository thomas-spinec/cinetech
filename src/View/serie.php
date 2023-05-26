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
    <script defer src="/cinetech/scripts/detailSerie.js"></script>
    <script defer src="/cinetech/scripts/menu.js"></script>
    <script defer src="/cinetech/scripts/research.js"></script>
    <title>Serie</title>
</head>

<body>
    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <article id="serie">
        </article>

        <article id="commentsPart">
            <h2>Commentaires</h2>
            <section id="comments">
            </section>

            <section id="addComment">
                <h3>Ajouter un commentaire</h3>
                <form method="POST">
                    <label for="comment">Commentaire</label>
                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                    <input type="submit" value="Envoyer">
                </form>
            </section>
        </article>

        <article id="series_week">
            <h2>Les séries similaires</h2>
            <section class="series">
        </article>
    </main>

</body>

</html>