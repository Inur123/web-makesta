<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('organisasi');
            $table->string('nama');
            $table->string('lokasi');
            $table->string('tanggal_teks');
            $table->text('catatan')->nullable();
            $table->boolean('selesai')->default(false);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('kegiatan'); }
};