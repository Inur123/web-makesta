<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () { if (auth()->check()) { return redirect()->route('dashboard'); } return inertia('welcome'); })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('{org}')->whereIn('org', ['ipnu', 'ippnu'])->middleware('check.org')->group(function () {
        Route::get('kegiatan', [\App\Http\Controllers\KegiatanController::class, 'index'])->name('kegiatan.index');
        Route::get('kegiatan/create', [\App\Http\Controllers\KegiatanController::class, 'create'])->name('kegiatan.create');
        Route::post('kegiatan', [\App\Http\Controllers\KegiatanController::class, 'store'])->name('kegiatan.store');
        Route::get('kegiatan/{kegiatan}', [\App\Http\Controllers\KegiatanController::class, 'show'])->name('kegiatan.show');
        Route::get('kegiatan/{kegiatan}/export', [\App\Http\Controllers\KegiatanController::class, 'export'])->name('kegiatan.export');
        Route::post('kegiatan/{kegiatan}/sertifikat', [\App\Http\Controllers\KegiatanController::class, 'generateSertifikat'])->name('kegiatan.sertifikat');
        Route::get('kegiatan/{kegiatan}/edit', [\App\Http\Controllers\KegiatanController::class, 'edit'])->name('kegiatan.edit');
        Route::put('kegiatan/{kegiatan}', [\App\Http\Controllers\KegiatanController::class, 'update'])->name('kegiatan.update');
        Route::delete('kegiatan/{kegiatan}', [\App\Http\Controllers\KegiatanController::class, 'destroy'])->name('kegiatan.destroy');
        Route::patch('kegiatan/{kegiatan}/status', [\App\Http\Controllers\KegiatanController::class, 'toggleStatus'])->name('kegiatan.status');
        
        Route::post('kegiatan/{kegiatan}/materi', [\App\Http\Controllers\MateriController::class, 'store'])->name('materi.store');
        Route::put('materi/{materi}', [\App\Http\Controllers\MateriController::class, 'update'])->name('materi.update');
        Route::delete('materi/{materi}', [\App\Http\Controllers\MateriController::class, 'destroy'])->name('materi.destroy');
        Route::patch('materi/{materi}/up', [\App\Http\Controllers\MateriController::class, 'moveUp'])->name('materi.up');
        Route::patch('materi/{materi}/down', [\App\Http\Controllers\MateriController::class, 'moveDown'])->name('materi.down');
        
        Route::get('kegiatan/{kegiatan}/peserta/create', [\App\Http\Controllers\PesertaController::class, 'create'])->name('peserta.create');
        Route::get('kegiatan/{kegiatan}/peserta/{peserta}', [\App\Http\Controllers\PesertaController::class, 'show'])->name('peserta.show');

        Route::post('kegiatan/{kegiatan}/peserta', [\App\Http\Controllers\PesertaController::class, 'store'])->name('peserta.store');
        Route::get('kegiatan/{kegiatan}/peserta/{peserta}/edit', [\App\Http\Controllers\PesertaController::class, 'edit'])->name('peserta.edit');
        Route::put('peserta/{peserta}', [\App\Http\Controllers\PesertaController::class, 'update'])->name('peserta.update');
        Route::delete('peserta/{peserta}', [\App\Http\Controllers\PesertaController::class, 'destroy'])->name('peserta.destroy');


    });
});
require __DIR__.'/settings.php';
