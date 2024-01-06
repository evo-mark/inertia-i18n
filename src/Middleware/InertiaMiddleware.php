<?php

namespace EvoMark\InertiaI18n\Middleware;

use Closure;
use EvoMark\InertiaI18n\Services\MessageService;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;

class InertiaMiddleware
{
    public function handle($request, Closure $next)
    {
        Inertia::share('i18n', function () {
            return [
                'current' => App::currentLocale(),
                'default' => config('app.fallback_locale'),
            ];
        });

        return $next($request);
    }
}
