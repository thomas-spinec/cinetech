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
        $sql = "SELECT * FROM $this->table WHERE id_type = :id AND id_comment = :action AND type = :type";
        $req = $this->bdd->prepare($sql);
        $req->execute([
            'id' => $id,
            'action' => $action,
            'type' => $type
        ]);
        return $req->fetchAll(\PDO::FETCH_ASSOC);
    }
}
