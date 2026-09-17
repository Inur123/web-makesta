<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Peserta extends Model {
    use HasFactory, HasUuids;
    protected $table = 'peserta';
    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    protected $fillable = ['kegiatan_id', 'nama', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'no_hp', 'sekolah'];
    public function kegiatan(): BelongsTo { return $this->belongsTo(Kegiatan::class, 'kegiatan_id'); }
    public function nilai(): HasMany { return $this->hasMany(Nilai::class, 'peserta_id'); }
}