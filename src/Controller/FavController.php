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
                echo '<button class="btn btn-danger deleteFav" id="deleteFav">Supprimer des favoris</button>';
            } else {
                // sinon on affiche le bouton pour ajouter le favori
                echo '<button class="btn btn-success addFav" id="addFav">Ajouter aux favoris</button>';
            }
        } else {
            // si l'utilisateur n'est pas connecté on affiche le bouton pour se connecter
            echo '<a href="/cinetech/login">Se connecter pour ajouter aux favoris</a>';
        }
    }

    public function toggleFav()
    {
        // on vérifie que les données sont bien envoyées
        if (isset($_POST['id_type']) && isset($_POST['type'])) {
            // on récupère l'id de l'utilisateur
            $id_user = $_SESSION['user']['id_user'];
            // on instancie le model
            $favModel = new FavModel();
            // Si le state = add on ajoute le favori
            if ($_POST['state'] == 'add') {
                $fav = $favModel->addFav([
                    ':id_type' => $_POST['id_type'],
                    ':type' => $_POST['type'],
                    ':id_user' => $id_user
                ]);
                // Si le state = remove on le supprime
            } elseif ($_POST['state'] == 'remove') {
                $fav = $favModel->deleteFav([
                    'id_type' => $_POST['id_type'],
                    'type' => $_POST['type'],
                    'id_user' => $id_user
                ]);
            }
            // si le favori est bien ajouté ou supprimé on renvoie un message de succès
            if ($fav) {
                echo json_encode(['success' => 'Modification réussie']);
            } else {
                // si il y a une erreur on renvoie un message d'erreur
                echo json_encode(['error' => 'Il y a eu une erreur']);
            }
        } else {
            // si les données ne sont pas envoyées on renvoie un message d'erreur
            echo json_encode(['error' => 'Il y a eu une erreur lors de l\'envoi des données']);
        }
    }
}
