# Changelog

## Version 3.0.0

- **Breaking**: The Vue plugin is now a named export, and should be imported like:

```js
import { inertiaI18nVue } from "inertia-i18n/vue";

createInertiaApp({
	withApp(app) {
		app.use(inertiaI18nVue);
	},
});
```

- **Breaking**: If your messages are _not_ in the default location (e.g. `lang/php_en.json`), then you'll need to publish the config with Artisan and set your path there. This should match the one passed to the Vite plugin.

```sh
php artisan v:p --tag=inertia-i18n
```

- **Feature**: Supports Inertia v3
- **Feature**: An options object can be passed when installing the plugin to `app.use(inertiaI18nVue, options)` which is forwarded to your i18n instance
- **Feature**: Current/Fallback messages are now passed via page props on the first load, any subsequent change of locale will load messages from the JSON files on the frontend
- **Feature**: No need to `await` the loading of messages when app is first loaded
- **Improvement**: Removed unneeded `MessageService` class
- **Improvement**: Added Husky, Lint-Staged, Pint, ESLint and Prettier to keep code formatted
