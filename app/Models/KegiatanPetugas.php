<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class KegiatanPetugas extends Model {
    use HasFactory, HasUuids;
    protected $table = 'kegiatan_petugas';
    public $timestamps = false;
    protected $fillable = ['kegiatan_id', 'peran', 'nama'];
    public function kegiatan(): BelongsTo { return $this->belongsTo(Kegiatan::class, 'kegiatan_id'); }
}