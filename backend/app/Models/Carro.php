<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Carro
 * 
 * @property int $id
 * @property string $modelo
 * @property string $placa
 * @property bool $status
 * @property int $cliente_id
 * 
 * @property Cliente $cliente
 * @property Collection|Ticket[] $tickets
 *
 * @package App\Models
 */
class Carro extends Model
{
	protected $table = 'carro';
	public $timestamps = false;

	protected $casts = [
		'status' => 'bool',
		'cliente_id' => 'int'
	];

	protected $fillable = [
		'modelo',
		'placa',
		'status',
		'cliente_id'
	];

	public function cliente()
	{
		return $this->belongsTo(Cliente::class);
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class, 'placa_carro', 'placa');
	}
}
