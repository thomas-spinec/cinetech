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
    <script defer src="/cinetech/scripts/menu.js"></script>
    <script defer src="/cinetech/scripts/research.js"></script>
    <script defer src="/cinetech/scripts/register.js"></script>
    <title>Inscription</title>
</head>

<body>

    <header>
        <?php require_once 'includes/header.php'; ?>
    </header>

    <main>
        <h2>Inscription</h2>

        <h4>Vous avez déjà un compte? <a href="/cinetech/login">Cliquez ici</a>!</h4>

        <?php if (isset($_SESSION['flash'])) : ?>
            <?php foreach ($_SESSION['flash'] as $type => $message) : ?>
                <div class="flash <?= $type; ?>">
                    <?= $message; ?>
                </div>
            <?php endforeach; ?>
            <?php unset($_SESSION['flash']); ?>
        <?php endif; ?>
        <form method="POST" id="formInsc" class="forms">
            <div>
                <label for="name">Prénom</label>
                <input type="text" name="name" id="name" required>
                <p></p>
            </div>
            <div>
                <label for="lastname">Nom</label>
                <input type="text" name="lastname" id="lastname" required>
                <p></p>
            </div>
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
                <label for="password_confirm">Confirmer le mot de passe</label>
                <input type="password" name="password_confirm" id="password_confirm" required>
                <p></p>
            </div>
            <div>
                <input type="submit" value="S'inscrire">
            </div>
        </form>
        <p></p>
    </main>

</body>

</html>