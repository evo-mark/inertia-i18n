<?php

namespace EvoMark\InertiaI18n\Middleware;

use Closure;
use EvoMark\InertiaI18n\InertiaI18n;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

use function Illuminate\Filesystem\join_paths;

class InertiaMiddleware
{
    public function handle($request, Closure $next)
    {
        $firstLoadOnlyProps = $request->inertia() ? null : function () {
            $locales = collect([App::currentLocale(), App::getFallbackLocale()])->unique();
            $messages = collect();
            $basePath = InertiaI18n::getLangRoot();

            foreach ($locales as $locale) {
                if ($messages->has($locale)) {
                    continue;
                }
                $file = join_paths($basePath, 'php_'.$locale.'.json');
                $messages->put($locale, json_decode(file_get_contents($file), associative: true));
            }

            return $messages;
        };

        Inertia::share('i18n', function () use ($firstLoadOnlyProps) {
            return [
                'current' => App::currentLocale(),
                'default' => config('app.fallback_locale'),
                'messages' => $firstLoadOnlyProps,
            ];
        });

        return $next($request);
    }
}
