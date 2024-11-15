<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Cliente
 * 
 * @property int $id
 * @property string $nome
 * @property string $cpf
 * @property string $telefone
 * @property bool $status
 * 
 * @property Collection|Carro[] $carros
 * @property Collection|Ticket[] $tickets
 *
 * @package App\Models
 */
class Cliente extends Model
{
	protected $table = 'cliente';
	public $timestamps = false;

	protected $casts = [
		'status' => 'bool'
	];

	protected $fillable = [
		'nome',
		'cpf',
		'telefone',
		'status'
	];

	public function carros()
	{
		return $this->hasMany(Carro::class);
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class, 'nome_cliente', 'cpf');
	}
}
