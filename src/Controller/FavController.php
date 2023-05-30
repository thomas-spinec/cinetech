<?php

namespace App\Controller;

use App\Model\FavModel;

class FavController
{

    public function displayFavButton($id_type, $type)
    {
        // si l'utilisateur est connecté
        if (isset($_SESSION['user'])) {
            // on récupère l'id de l'utilisateur
            $id_user = $_SESSION['user']['id_user'];
            // on instancie le model
            $favModel = new FavModel();
            // on récupère le favori
            $fav = $favModel->getFav($id_type, $type, $id_user);
            // si il y a un favori on affiche le bouton pour supprimer le favori
            if ($fav) {
                echo '<button class="btn btn-danger" id="deleteFav" data-id="' . $fav['id_fav'] . '">Supprimer des favoris</button>';
            } else {
                // sinon on affiche le bouton pour ajouter le favori
                echo '<button class="btn btn-success" id="addFav">Ajouter aux favoris</button>';
            }
        }
    }
}
