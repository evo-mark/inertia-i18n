<?php

namespace EvoMark\InertiaI18n;

use EvoMark\InertiaI18n\Middleware\InertiaMiddleware;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Http\Kernel;

class Provider extends ServiceProvider
{
    public function register()
    {
        //
    }

    /**
     * @param \Illuminate\Foundation\Http\Kernel $kernel
     */
    public function boot(Kernel $kernel)
    {
        $kernel->prependMiddleware(InertiaMiddleware::class);
    }
}
