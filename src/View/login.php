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
    <script defer src="/cinetech/scripts/menu.js"></script>
    <script defer src="/cinetech/scripts/research.js"></script>
    <script defer src="/cinetech/scripts/login.js"></script>
    <title>Connexion</title>
</head>

<body>

    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <h2>Connexion</h2>

        <h4>Pas encore membre? <a href="/cinetech/register">Cliquez ici</a>!</h4>

        <?php if (isset($_SESSION['flash'])) : ?>
            <?php foreach ($_SESSION['flash'] as $type => $message) : ?>
                <div class="flash <?= $type; ?>">
                    <?= $message; ?>
                </div>
            <?php endforeach; ?>
            <?php unset($_SESSION['flash']); ?>
        <?php endif; ?>

        <!-- FORM -->
        <form method="POST" id="formLogin" class="forms">
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required>
                <p></p>
            </div>
            <div>
                <label for="password">Mot de passe</label>
                <input type="password" name="password" id="password" required>
                <p></p>
            </div>
            <div>
                <input type="submit" value="Connexion">
            </div>
        </form>
        <p></p>
    </main>

    <footer>
        <?php require_once 'includes/footer.php'; ?>
    </footer>


</body>

</html>