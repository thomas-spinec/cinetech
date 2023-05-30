<?php

namespace App\Model;

class CommentModel extends AbstractModel
{
    protected $bdd;
    protected $table = 'comments';

    public function __construct()
    {
        parent::__construct();
    }

    public function addComment($array)
    {
        return $this->insert($array);
    }

    public function getReplies($id, $action, $type)
    {
        // requête pour récupérer les réponses d'un commentaire qui donne le nom de l'auteur
        $sql = "SELECT *, users.name as author FROM $this->table INNER JOIN users on $this->table.id_user = users.id_user WHERE id_type = :id AND id_comment = :action AND type = :type";

        $req = $this->bdd->prepare($sql);
        $req->execute([
            'id' => $id,
            'action' => $action,
            'type' => $type
        ]);
        return $req->fetchAll(\PDO::FETCH_ASSOC);

        // $sql = "SELECT * FROM $this->table WHERE id_type = :id AND id_comment = :action AND type = :type";
        // $req = $this->bdd->prepare($sql);
        // $req->execute([
        //     'id' => $id,
        //     'action' => $action,
        //     'type' => $type
        // ]);
        // return $req->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getComments($id, $type)
    {
        $sql = "SELECT *, users.name as author FROM $this->table INNER JOIN users on $this->table.id_user = users.id_user WHERE id_type = :id AND type = :type AND id_comment IS NULL";
        $req = $this->bdd->prepare($sql);
        $req->execute([
            'id' => $id,
            'type' => $type
        ]);
        return $req->fetchAll(\PDO::FETCH_ASSOC);
    }
}
