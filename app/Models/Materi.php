<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Materi extends Model {
    use HasFactory, HasUuids;
    protected $table = 'materi';
    public $timestamps = false;
    protected $fillable = ['kegiatan_id', 'nama', 'urutan'];
    public function kegiatan(): BelongsTo { return $this->belongsTo(Kegiatan::class, 'kegiatan_id'); }
    public function nilai(): HasMany { return $this->hasMany(Nilai::class, 'materi_id'); }
}