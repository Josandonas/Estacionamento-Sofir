<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ticket
 * 
 * @property int $id
 * @property string|null $nome_cliente
 * @property string|null $placa_carro
 * @property string|null $tipo_vaga
 * @property string|null $tipo_estadia
 * @property Carbon|null $hora_entrada
 * @property Carbon $hora_saida
 * @property float $total
 * @property bool $status
 * @property int $vaga_id
 * @property int $estadia_id
 * 
 * @property Estadium $estadium
 * @property Cliente|null $cliente
 * @property Carro|null $carro
 * @property Vaga $vaga
 *
 * @package App\Models
 */
class Ticket extends Model
{
	protected $table = 'ticket';
	public $timestamps = false;

	protected $casts = [
		'hora_entrada' => 'datetime',
		'hora_saida' => 'datetime',
		'total' => 'double',
		'status' => 'bool',
		'vaga_id' => 'int',
		'estadia_id' => 'int'
	];

	protected $fillable = [
		'nome_cliente',
		'placa_carro',
		'tipo_vaga',
		'tipo_estadia',
		'hora_entrada',
		'hora_saida',
		'total',
		'status',
		'vaga_id',
		'estadia_id'
	];

	public function estadium()
	{
		return $this->belongsTo(Estadia::class, 'estadia_id');
	}

	public function cliente()
	{
		return $this->belongsTo(Cliente::class, 'nome_cliente', 'cpf');
	}

	public function carro()
	{
		return $this->belongsTo(Carro::class, 'placa_carro', 'placa');
	}

	public function vaga()
	{
		return $this->belongsTo(Vaga::class);
	}
}
