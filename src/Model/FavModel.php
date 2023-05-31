<?php

namespace App\Model;

class FavModel extends AbstractModel
{
    protected $bdd;
    protected $table = 'fav';

    public function __construct()
    {
        parent::__construct();
    }

    public function getFav($id_type, $type, $id_user)
    {
        $sql = "SELECT * FROM $this->table WHERE id_type = :id_type AND type = :type AND id_user = :id_user";
        $req = $this->bdd->prepare($sql);
        $req->execute([
            'id_type' => $id_type,
            'type' => $type,
            'id_user' => $id_user
        ]);
        return $req->fetch(\PDO::FETCH_ASSOC);
    }

    public function addFav($array)
    {
        return $this->insert($array);
    }

    public function deleteFav($array)
    {
        return $this->delete($array);
    }
}
