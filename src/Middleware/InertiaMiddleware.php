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
        $locales = collect([App::currentLocale(), App::getFallbackLocale()])->unique();
        $json = null;

        foreach ($locales as $locale) {
            $file = lang_path('php_' . $locale . '.json');
            $json = json_decode(file_get_contents($file), associative: true);
            if (!empty($json)) {
                break;
            }
        }

        Inertia::share('i18n', function () use ($json) {
            return [
                'current' => App::currentLocale(),
                'default' => config('app.fallback_locale'),
                'messages' => $json
            ];
        });

        return $next($request);
    }
}
