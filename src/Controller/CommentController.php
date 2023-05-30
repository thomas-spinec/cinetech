<?php

namespace App\Controller;

use App\Model\CommentModel;

class CommentController
{
    public function addComment()
    {
        // vérifier que les données sont bien envoyées
        if (isset($_POST['content'])) {
            // faire un array avec des htmlspecialchar
            $array = [
                ':type' => htmlspecialchars($_POST['type']),
                ':comment' => htmlspecialchars($_POST['content'])
            ];
            // si c'est une réponse 
            if (isset($_POST['comment_id'])) {
                $array[':id_comment'] = htmlspecialchars($_POST['comment_id']);
            }
            // si c'es un film
            if (isset($_POST['movie_id'])) {
                $array[':id_type'] = (int)htmlspecialchars($_POST['movie_id']);
            } elseif (isset($_POST['serie_id'])) {
                // si c'est une série
                $array[':id_type'] = (int)htmlspecialchars($_POST['serie_id']);
            }
            // si l'utilisateur est connecté on rajoute son id
            if (isset($_SESSION['user'])) {
                $array[':id_user'] = (int)$_SESSION['user']['id_user'];
            }
            // on ajoute le commentaire
            $CommentModel = new CommentModel();
            $result = $CommentModel->addComment($array);
            // si le commentaire est bien ajouté on renvoie un message de succès
            if ($result) {
                echo json_encode(['success' => 'Votre commentaire a bien été ajouté']);
            } else {
                // si le commentaire n'est pas ajouté on renvoie une erreur
                echo json_encode(['error' => 'Il y a eu une erreur lors de l\'envoi du commentaire']);
            }
        } else {
            // si les données ne sont pas envoyées on renvoie une erreur
            echo json_encode(['error' => 'c\'est vide']);
        }
    }

    public function addReply()
    {
        // vérifier que les données sont bien envoyées
        if (isset($_POST['content'])) {
            // faire un array avec des htmlspecialchar
            $array = [
                ':type' => htmlspecialchars($_POST['type']),
                ':comment' => htmlspecialchars($_POST['content']),
                ':id_comment' => htmlspecialchars($_POST['comment_id'])
            ];
            // si c'es un film
            if (isset($_POST['movie_id'])) {
                $array[':id_type'] = (int)htmlspecialchars($_POST['movie_id']);
            } elseif (isset($_POST['serie_id'])) {
                // si c'est une série
                $array[':id_type'] = (int)htmlspecialchars($_POST['serie_id']);
            }
            // si l'utilisateur est connecté on rajoute son id
            if (isset($_SESSION['user'])) {
                $array[':id_user'] = (int)$_SESSION['user']['id'];
            }
            // on ajoute le commentaire
            $CommentModel = new CommentModel();
            $result = $CommentModel->addComment($array);
            // si le commentaire est bien ajouté on renvoie un message de succès
            if ($result) {
                echo json_encode(['success' => 'Votre commentaire a bien été ajouté']);
            } else {
                // si le commentaire n'est pas ajouté on renvoie une erreur
                echo json_encode(['error' => 'Il y a eu une erreur lors de l\'envoi du commentaire']);
            }
        } else {
            // si les données ne sont pas envoyées on renvoie une erreur
            echo json_encode(['error' => 'c\'est vide']);
        }
    }

    public function getComments($id, $type)
    {
        $commentModel = new CommentModel();
        $comments = $commentModel->getComments($id, $type);
        if ($comments) {
            echo json_encode($comments);
        } elseif ($comments === []) {
            echo json_encode(['error' => 'Il n\'y a pas de commentaire']);
        } else {
            echo json_encode(['error' => 'Il y a eu une erreur lors de la récupération des commentaires']);
        }
    }

    public function getReplies($id, $action, $type)
    {
        $commentModel = new CommentModel();
        $replies = $commentModel->getReplies($id, $action, $type);
        if ($replies) {
            echo json_encode($replies);
        } elseif ($replies === []) {
            echo json_encode(['error' => 'Il n\'y a pas de réponse à ce commentaire']);
        } else {
            echo json_encode(['error' => 'Il y a eu une erreur lors de la récupération des commentaires']);
        }
    }
}
