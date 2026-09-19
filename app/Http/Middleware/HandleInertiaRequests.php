<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Keep Inertia's browser URL on the configured deployment path even when
     * Nginx strips that path before forwarding the request to Laravel.
     */
    public function urlResolver(): Closure
    {
        return function (Request $request): string {
            $requestUri = '/'.ltrim($request->getRequestUri(), '/');
            $basePath = rtrim(
                (string) (parse_url(config('app.url'), PHP_URL_PATH) ?: ''),
                '/',
            );

            if ($basePath === '') {
                return $requestUri;
            }

            $requestPath = parse_url($requestUri, PHP_URL_PATH) ?: '/';

            if ($requestPath === $basePath || str_starts_with($requestPath, $basePath.'/')) {
                return $requestUri;
            }

            if ($requestUri === '/') {
                return $basePath;
            }

            if (str_starts_with($requestUri, '/?')) {
                return $basePath.substr($requestUri, 1);
            }

            return $basePath.$requestUri;
        };
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
