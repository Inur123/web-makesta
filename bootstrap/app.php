<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\CheckOrganisasi;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'check.org' => CheckOrganisasi::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->render(function (\Illuminate\Http\Exceptions\ThrottleRequestsException $e, Request $request) {
            if (! $request->expectsJson()) {
                return back()->with('error', 'Terlalu banyak permintaan. Silakan tunggu beberapa menit.');
            }
        });

        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, Request $request) {
            $status = $response->getStatusCode();
            if (in_array($status, [401, 403, 404, 419, 429, 500, 503])) {
                return \Inertia\Inertia::render('error', ['status' => $status])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            return $response;
        });
    })->create();
