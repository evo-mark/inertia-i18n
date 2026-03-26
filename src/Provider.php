<?php

namespace EvoMark\InertiaI18n;

use EvoMark\InertiaI18n\Middleware\InertiaMiddleware;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\ServiceProvider;

class Provider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(
            path: __DIR__.'/config.php',
            key: 'inertia-i18n'
        );
    }

    /**
     * @param  \Illuminate\Foundation\Http\Kernel  $kernel
     */
    public function boot(Kernel $kernel)
    {
        $kernel->prependMiddleware(InertiaMiddleware::class);
        $this->publishes([
            __DIR__.'/config.php' => config_path('inertia-i18n.php'),
        ], 'inertia-i18n');
    }
}
