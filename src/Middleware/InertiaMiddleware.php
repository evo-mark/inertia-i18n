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
        $firstLoadOnlyProps = $request->inertia() ? null : function () use ($request) {
            $locales = collect([App::currentLocale(), App::getFallbackLocale()])->unique();
            $messages = collect();

            foreach ($locales as $locale) {
                if ($messages->has($locale)) {
                    continue;
                }
                $file = lang_path('php_' . $locale . '.json');
                $messages->put($locale, json_decode(file_get_contents($file), associative: true));
            }

            return $messages;
        };

        Inertia::share('i18n', function () use ($firstLoadOnlyProps) {
            return [
                'current' => App::currentLocale(),
                'default' => config('app.fallback_locale'),
                'messages' => $firstLoadOnlyProps
            ];
        });

        return $next($request);
    }
}
