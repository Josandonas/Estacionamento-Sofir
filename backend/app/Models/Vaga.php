<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Vaga
 * 
 * @property int $id
 * @property string $tipo
 * @property bool $status
 * 
 * @property Collection|Ticket[] $tickets
 *
 * @package App\Models
 */
class Vaga extends Model
{
	protected $table = 'vaga';
	public $timestamps = false;

	protected $casts = [
		'status' => 'bool'
	];

	protected $fillable = [
		'tipo',
		'status'
	];

	public function tickets()
	{
		return $this->hasMany(Ticket::class);
	}
}
