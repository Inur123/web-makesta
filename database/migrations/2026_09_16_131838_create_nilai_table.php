<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('nilai', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('peserta_id')->constrained('peserta')->cascadeOnDelete();
            $table->foreignUuid('materi_id')->constrained('materi')->cascadeOnDelete();
            $table->smallInteger('nilai')->nullable();
            $table->unique(['peserta_id', 'materi_id']);
        });
    }
    public function down(): void { Schema::dropIfExists('nilai'); }
};