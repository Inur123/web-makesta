<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\PesertaController;

Route::get('/', function () { 
    if (Auth::check()) { 
        return redirect()->route('dashboard'); 
    } 
    return inertia('welcome'); 
})->name('home');

// Rute khusus untuk melayani /makesta tanpa trailing slash
Route::get('/makesta', function () { 
    if (Auth::check()) { 
        return redirect()->route('dashboard'); 
    } 
    return inertia('welcome'); 
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('{org}')->whereIn('org', ['ipnu', 'ippnu'])->middleware('check.org')->group(function () {
        Route::get('kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
        Route::get('kegiatan/create', [KegiatanController::class, 'create'])->name('kegiatan.create');
        Route::post('kegiatan', [KegiatanController::class, 'store'])->name('kegiatan.store');
        Route::get('kegiatan/{kegiatan}', [KegiatanController::class, 'show'])->name('kegiatan.show');
        Route::get('kegiatan/{kegiatan}/export', [KegiatanController::class, 'export'])->name('kegiatan.export');
        Route::post('kegiatan/{kegiatan}/sertifikat', [KegiatanController::class, 'generateSertifikat'])->name('kegiatan.sertifikat');
        Route::post('kegiatan/{kegiatan}/sertifikat/simpan', [KegiatanController::class, 'simpanPengaturanSertifikat'])->name('kegiatan.sertifikat.simpan');
        Route::get('kegiatan/{kegiatan}/edit', [KegiatanController::class, 'edit'])->name('kegiatan.edit');
        Route::put('kegiatan/{kegiatan}', [KegiatanController::class, 'update'])->name('kegiatan.update');
        Route::delete('kegiatan/{kegiatan}', [KegiatanController::class, 'destroy'])->name('kegiatan.destroy');
        Route::patch('kegiatan/{kegiatan}/status', [KegiatanController::class, 'toggleStatus'])->name('kegiatan.status');
        
        Route::post('kegiatan/{kegiatan}/materi', [MateriController::class, 'store'])->name('materi.store');
        Route::put('materi/{materi}', [MateriController::class, 'update'])->name('materi.update');
        Route::delete('materi/{materi}', [MateriController::class, 'destroy'])->name('materi.destroy');
        Route::patch('materi/{materi}/up', [MateriController::class, 'moveUp'])->name('materi.up');
        Route::patch('materi/{materi}/down', [MateriController::class, 'moveDown'])->name('materi.down');
        
        Route::get('kegiatan/{kegiatan}/peserta/create', [PesertaController::class, 'create'])->name('peserta.create');
        Route::get('kegiatan/{kegiatan}/peserta/{peserta}', [PesertaController::class, 'show'])->name('peserta.show');

        Route::post('kegiatan/{kegiatan}/peserta', [PesertaController::class, 'store'])->name('peserta.store');
        Route::get('kegiatan/{kegiatan}/peserta/{peserta}/edit', [PesertaController::class, 'edit'])->name('peserta.edit');
        Route::put('peserta/{peserta}', [PesertaController::class, 'update'])->name('peserta.update');
        Route::delete('peserta/{peserta}', [PesertaController::class, 'destroy'])->name('peserta.destroy');
    });
});
require __DIR__.'/settings.php';



Route::fallback(function () {
    return \Inertia\Inertia::render('error', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});

