<?php

namespace Modules\Tindero\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StoresCategory extends Model
{
    use HasFactory;

    protected $fillable = [];

    protected static function newFactory()
    {
        return \Modules\Tindero\Database\factories\StoreCategoryFactory::new();
    }
}
