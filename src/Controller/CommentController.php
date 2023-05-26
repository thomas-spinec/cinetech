<?php

namespace App\Controller;

use App\Model\CommentModel;

class CommentController
{
    public function addComment($array)
    {
    }

    public function addReply()
    {
        // vérifier que les données sont bien envoyées
        if (isset($_POST['type']) && isset($_POST['movie_id']) && isset($_POST['content']) && isset($_POST['comment_id'])) {
            // faire un array avec des htmlspecialchar
            $array = [
                'type' => htmlspecialchars($_POST['type']),
                'id_type' => htmlspecialchars($_POST['movie_id']),
                'comment' => htmlspecialchars($_POST['content']),
                'id_comment' => htmlspecialchars($_POST['comment_id'])
            ];
            // si l'utilisateur est connecté on rajoute son id
            if (isset($_SESSION['user'])) {
                $array['id_user'] = $_SESSION['user']['id'];
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
            echo json_encode(['error' => 'Il y a eu une erreur lors de l\'envoi du commentaire']);
        }
    }

    public function getComments($id, $type)
    {
        // $comments = $this->commentManager->getComments($id, $type);
        // return $comments;
    }
}
