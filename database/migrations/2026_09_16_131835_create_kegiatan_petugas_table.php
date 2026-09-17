<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('kegiatan_petugas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('kegiatan_id')->constrained('kegiatan')->cascadeOnDelete();
            $table->string('peran');
            $table->string('nama');
        });
    }
    public function down(): void { Schema::dropIfExists('kegiatan_petugas'); }
};