<?php

namespace EvoMark\InertiaI18n\Services;

use Illuminate\Support\Facades\File;

class MessageService
{
    public static function get(string $locale): array
    {
        $files = collect(File::files(base_path('lang/' . $locale)));

        return [];
    }
}
