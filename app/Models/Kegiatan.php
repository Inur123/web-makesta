<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Kegiatan extends Model {
    use HasFactory, HasUuids;
    protected $table = 'kegiatan';
    protected $fillable = ['organisasi', 'nama', 'lokasi', 'tanggal_teks', 'catatan', 'selesai', 'pengaturan_sertifikat'];
    protected $casts = ['selesai' => 'boolean', 'pengaturan_sertifikat' => 'array'];
    public function petugas(): HasMany { return $this->hasMany(KegiatanPetugas::class, 'kegiatan_id'); }
    public function materi(): HasMany { return $this->hasMany(Materi::class, 'kegiatan_id'); }
    public function peserta(): HasMany { return $this->hasMany(Peserta::class, 'kegiatan_id'); }
}