<?php

namespace EvoMark\InertiaI18n;

class InertiaI18nService
{
    protected ?string $app = null;

    public function setApp($app): void
    {
        $apps = config('inertia-i18n.apps');
        if ((empty($apps) || empty($apps[$app])) && app()->isProduction() === false) {
            throw new \Exception('[Inertia I18n]: Tried to set an app ('.$app.") that doesn't exist");
        }

        $this->app = $app;
    }

    public function getApp(): ?array
    {
        return config('inertia-i18n.apps')[$this->app] ?? null;
    }

    public function getLangRoot(): string
    {
        $app = $this->getApp();
        if (! empty(data_get($app, 'path'))) {
            return data_get($app, 'path');
        } else {
            return config('inertia-i18n.path', lang_path());
        }
    }
}
