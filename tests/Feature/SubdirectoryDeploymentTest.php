<?php

namespace Tests\Feature;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
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

    public function test_inertia_keeps_the_subdirectory_in_the_browser_url(): void
    {
        config()->set('app.url', 'https://kaderisasi.pelajarnumagetan.or.id/makesta');

        $resolver = app(HandleInertiaRequests::class)->urlResolver();

        $this->assertSame('/makesta', $resolver(Request::create('/')));
        $this->assertSame('/makesta/login', $resolver(Request::create('/login')));
        $this->assertSame('/makesta/login?next=%2Fdashboard', $resolver(
            Request::create('/login?next=%2Fdashboard'),
        ));
        $this->assertSame('/makesta/login', $resolver(Request::create('/makesta/login')));
    }
}
