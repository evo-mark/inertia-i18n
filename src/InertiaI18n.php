<?php

namespace EvoMark\InertiaI18n;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void setApp(string $app)
 *
 * @see \EvoMark\InertiaI18n\InertiaI18n;
 */
class InertiaI18n extends Facade
{
    protected static function getFacadeAccessor()
    {
        return InertiaI18nService::class;
    }
}
