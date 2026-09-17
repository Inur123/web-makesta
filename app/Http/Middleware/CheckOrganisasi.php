<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class CheckOrganisasi {
    public function handle(Request $request, Closure $next): Response {
        $org = $request->route('org');
        $kegiatan = $request->route('kegiatan');
        if ($kegiatan && $kegiatan->organisasi !== $org) abort(404);
        return $next($request);
    }
}