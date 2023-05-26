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
        $this->insert($array);
    }
}
