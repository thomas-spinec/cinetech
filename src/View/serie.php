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

            <?php if (isset($_SESSION['user'])) : ?>
                <section id="addComment">
                    <h3>Ajouter un commentaire</h3>
                    <form method="POST">
                        <label for="content">Commentaire</label>
                        <textarea name="content" id="comment" cols="30" rows="10"></textarea>
                        <input type="submit" value="Envoyer">
                    </form>
                </section>
            <?php else : ?>
                <section id="addComment" class="hidden">
                    <h3>Ajouter un commentaire</h3>
                    <form method="POST">
                        <label for="content">Commentaire</label>
                        <textarea name="content" id="comment" cols="30" rows="10"></textarea>
                        <input type="submit" value="Envoyer">
                    </form>
                </section>
                <p>Vous devez être connecté pour ajouter un commentaire, <a href="/cinetech/login">cliquez ici!</a></p>
            <?php endif; ?>
        </article>

        <article id="series_week">
            <h2>Les séries similaires</h2>
            <section class="series">
        </article>

        <section id="popup" class="hidden">
            <div id="pop">
                <div id="formReponse">
                </div>
            </div>
        </section>
    </main>

</body>

</html>