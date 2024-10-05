import { router } from "@inertiajs/vue3";
import { createI18n } from "vue-i18n";
import { nextTick } from "vue";

let i18n;
const lang = import.meta.glob("inertia-i18n-files/**/*.json", {
	eager: false,
});

const resolveLang = (locale) => {
	const key = Object.keys(lang).find((file) => {
		const filename = file.replace(/^.*[\\/]/, "");
		return filename === `php_${locale}.json`;
	});
	return lang[key];
};

export default (props) => {
	let preload = null,
		preloadFallback = null;
	let currentLocale = props.initialPage.props.i18n.current;
	const fallbackLocale = props.initialPage.props.i18n.default;

	return {
		load: async () => {
			const promises = [resolveLang(currentLocale)()];
			if (currentLocale !== fallbackLocale) {
				promises.push(resolveLang(fallbackLocale)());
			}
			return Promise.all(promises).then(([current, fallback]) => {
				if (current) preload = current.default;
				if (fallback) preloadFallback = fallback.default;
				return true;
			});
		},
		install: (app, config = {}) => {
			const isLegacy = config.legacy === true;

			i18n = createI18n({
				legacy: isLegacy,
				locale: currentLocale,
				fallbackLocale,
			});

			if (preload) {
				i18n.global.setLocaleMessage(currentLocale, preload);
			} else {
				loadLocaleMessages(currentLocale);
			}

			if (currentLocale !== fallbackLocale) {
				if (preloadFallback) {
					i18n.global.setLocaleMessage(fallbackLocale, preloadFallback);
				} else {
					loadLocaleMessages(fallbackLocale);
				}
			}
			app.use(i18n);

			router.on("navigate", async (ev) => {
				const newLocale = ev.detail.page.props.i18n.current;
				if (newLocale !== currentLocale) {
					if (!i18n.global.availableLocales.includes(newLocale)) {
						await loadLocaleMessages(newLocale);
					}
					setLanguage(newLocale);
					currentLocale = newLocale;
				}
			});
		},
	};
};

/**
 * @param { string } newLocale The locale to switch to
 */
function setLanguage(newLocale) {
	if (i18n.mode === "legacy") {
		i18n.global.locale = newLocale;
	} else {
		i18n.global.locale.value = newLocale;
	}
}

/**
 * @param { string } locale The locale to load
 * @returns { Promise } The next application tick
 */
async function loadLocaleMessages(locale) {
	const messages = await resolveLang(locale)();
	i18n.global.setLocaleMessage(locale, messages.default);

	return nextTick();
}
