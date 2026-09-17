<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Nilai extends Model {
    use HasFactory, HasUuids;
    protected $table = 'nilai';
    public $timestamps = false;
    protected $fillable = ['peserta_id', 'materi_id', 'nilai'];
    protected $casts = ['nilai' => 'integer'];
    public function peserta(): BelongsTo { return $this->belongsTo(Peserta::class, 'peserta_id'); }
    public function materi(): BelongsTo { return $this->belongsTo(Materi::class, 'materi_id'); }
}