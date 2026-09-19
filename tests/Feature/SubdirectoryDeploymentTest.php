<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Request;
use Tests\TestCase;

class SubdirectoryDeploymentTest extends TestCase
{
    public function test_named_routes_and_assets_use_the_configured_subdirectory(): void
    {
        config()->set('app.url', 'https://kaderisasi.pelajarnumagetan.or.id/makesta');
        URL::useOrigin(config('app.url'));
        URL::forceHttps();

        $this->assertSame(
            'https://kaderisasi.pelajarnumagetan.or.id/makesta/dashboard',
            route('dashboard'),
        );

        $this->assertSame(
            'https://kaderisasi.pelajarnumagetan.or.id/makesta/images/logo-makesta.png',
            asset('images/logo-makesta.png'),
        );
    }

    public function test_root_page_exposes_the_configured_base_path_to_javascript(): void
    {
        $this->withoutVite();
        config()->set('app.url', 'https://kaderisasi.pelajarnumagetan.or.id/makesta');
        URL::useOrigin(config('app.url'));
        URL::forceHttps();

        $this->view('app', [
            'page' => [
                'component' => 'welcome',
                'props' => [],
                'url' => '/makesta/',
                'version' => null,
                'clearHistory' => false,
                'encryptHistory' => false,
            ],
        ])->assertSee('<meta name="app-base-path" content="/makesta">', false);
    }

    public function test_nginx_script_name_makes_laravel_see_the_subdirectory_as_its_base_url(): void
    {
        $request = Request::create(
            'https://kaderisasi.pelajarnumagetan.or.id/makesta/dashboard',
            server: [
                'SCRIPT_NAME' => '/makesta/index.php',
                'SCRIPT_FILENAME' => public_path('index.php'),
            ],
        );

        $this->assertSame('/makesta', $request->getBaseUrl());
        $this->assertSame('/dashboard', $request->getPathInfo());
    }
}
