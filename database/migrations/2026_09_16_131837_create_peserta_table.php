<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('peserta', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kegiatan_id')->constrained('kegiatan')->cascadeOnDelete();
            $table->string('nama');
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('sekolah')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('peserta'); }
};