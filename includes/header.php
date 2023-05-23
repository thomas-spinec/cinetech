<?php
session_start();
?>

<section id="topHead">
    <a href="/cinetech/">
        <h1>Cinetech</h1>
    </a>
    <?php if (isset($_SESSION['user'])) : ?>
        <i class="fa-solid fa-user auth"></i>
    <?php else : ?>
        <i class="fa-solid fa-sign-in auth"></i>
    <?php endif; ?>
    <div class="icons">
        <i id="burger" class="fa-solid fa-bars icon-default"></i>
        <i id="close" class="fa-solid fa-times icon-active"></i>
    </div>
    <a href="/cinetech/" class="desktop">Accueil</a>
    <a href="/cinetech/movies" class="desktop">Films</a>
    <a href="/cinetech/series" class="desktop">Séries</a>
</section>

<section id="nav" class="close">
    <nav>
        <ul>
            <li><a href="/cinetech/">Accueil</a></li>
            <li><a href="/cinetech/movies">Films</a></li>
            <li><a href="/cinetech/series">Séries</a></li>
        </ul>
    </nav>
</section>


<section id="authSection" class="hidden">
    <div id="pop">
        <div id="popContent">
            <i class="fa-solid fa-times" id="closePop"></i>
            <?php if (isset($_SESSION['user'])) : ?>
                <h2>Bonjour <?= $_SESSION['user']['username'] ?></h2>
                <a href="/cinetech/profil">Profil</a>
                <a href="/cinetech/logout">Déconnexion</a>
            <?php else : ?>
                <a href="/cinetech/connexion">Connexion</a>
                <a href="/cinetech/inscription">Inscription</a>
            <?php endif; ?>
        </div>
    </div>
</section>