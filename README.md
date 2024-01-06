<p align="center">
    <a href="https://evomark.co.uk" target="_blank" alt="Link to evoMark's website">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--dark.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--light.svg">
          <img alt="evoMark company logo" src="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--light.svg" width="500">
        </picture>
    </a>
</p>

<p align="center">
    <a href="https://packagist.org/packages/evo-mark/inertia-i18n">
        <img src="https://img.shields.io/packagist/v/evo-mark/inertia-i18n?logo=packagist&logoColor=white" alt="Build status" />
    </a>
    <a href="https://packagist.org/packages/evo-mark/inertia-i18n">
        <img src="https://img.shields.io/packagist/dt/evo-mark/inertia-i18n" alt="Total Downloads">
    </a>
    <a href="https://packagist.org/packages/evo-mark/inertia-i18n">
        <img src="https://img.shields.io/packagist/l/evo-mark/inertia-i18n" alt="License">
    </a>
    <img src="https://github.com/evo-mark/inertia-i18n/actions/workflows/tests.yml/badge.svg?branch=main">
</p>

# Inertia I18n

## Installation

```sh
composer require evo-mark/inertia-i18n
```

```sh
npm install ./vendor/evo-mark/inertia-i18n
--
pnpm add ./vendor/evo-mark/inertia-i18n
```

```js
import InertiaI18n from "inertia-i18n/vite";

export default {
    plugins: [InertiaI18n()],
};
```

```js
import useInertiaI18nVue from "inertia-i18n/vue";

createInertiaApp({
    setup({ el, App, props, plugin }) {
        const inertiaI18nPlugin = useInertiaI18nVue(props);

        createSSRApp({ render: () => h(App, props) })
            .use(plugin)
            .use(inertiaI18nPlugin)
            .mount(el);
    },
});
```
