<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Estadium
 * 
 * @property int $id
 * @property string $tipo
 * @property float $valor
 * @property string $descricao
 * @property bool $status
 * 
 * @property Collection|Ticket[] $tickets
 *
 * @package App\Models
 */
class Estadia extends Model
{
	protected $table = 'estadia';
	public $timestamps = false;

	protected $casts = [
		'valor' => 'double',
		'status' => 'bool'
	];

	protected $fillable = [
		'tipo',
		'valor',
		'descricao',
		'status'
	];

	public function tickets()
	{
		return $this->hasMany(Ticket::class, 'estadia_id');
	}
}
