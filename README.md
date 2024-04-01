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

## Usage

After installation, you can use your frontend localisation package as usual:

```html
<template>
    <div>{{ $t('messages.hello_world') }}</div>
</template>
```

OR

```js
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const translated = computed(() => t('message.hello_world));
</script>
```

See the documentation for the respective frontend packages for more information:

Vue: [vue-i18n](https://vue-i18n.intlify.dev/)
