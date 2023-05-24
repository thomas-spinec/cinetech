<?php

namespace App\Model;

abstract class AbstractModel
{
    protected $bdd;
    protected $table = "";

    public function __construct()
    {
        // connexion à la bdd
        // variables locales
        $host = 'localhost';
        $dbname = 'cinetech';
        $dbUser = 'root';
        $dbPass = '';
        // variables serveur
        // $host = 'localhost';
        // $dbname = 'thomas-spinec_cinetech';
        // $dbUser = 'adminbdd';
        // $dbPass = 'basededonnees';

        try {
            $this->bdd = new \PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $dbUser, $dbPass);
            $this->bdd->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->bdd->exec("set names utf8");
        } catch (\PDOException $e) {
            echo "Erreur : " . $e->getMessage();
            die();
        }
    }

    public function findBy(array $array)
    {
        $sql = "SELECT * FROM $this->table WHERE ";
        $i = 0;
        foreach ($array as $key => $value) {
            if ($i == 0) {
                $sql .= "$key = '$value'";
            } else {
                $sql .= " AND $key = '$value'";
            }
            $i++;
        }
        $req = $this->bdd->prepare($sql);
        $req->execute();
        return $req->fetch();
    }
}
