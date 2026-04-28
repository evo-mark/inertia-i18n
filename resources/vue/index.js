import { router, usePage } from "@inertiajs/vue3";
import { createI18n } from "vue-i18n";
import { nextTick, shallowRef, ref, watch } from "vue";

let i18n, stopPagePropsWatcher;
const currentLocale = ref(null);
const fallbackLocale = ref(null);
const messages = shallowRef(null);
const lang =
	typeof window === "undefined"
		? import.meta.glob("inertia-i18n-files/**/*.json", {
				eager: true,
			})
		: import.meta.glob("inertia-i18n-files/**/*.json", {
				eager: false,
			});

/**
 * Check page props for i18n state on initial hydration
 * @param {object} state The state of the `i18n` object on page props
 */
const loadFromPageProps = (state) => {
	if (state?.current) {
		i18n.global.locale.value = currentLocale.value = state.current;
		i18n.global.fallbackLocale.value = fallbackLocale.value = state.default;
	}
	if (state?.messages && i18n?.global) {
		messages.value = messages.value ? Object.assign(messages.value, state.messages) : state.messages;

		i18n.global.setLocaleMessage(currentLocale.value, messages.value[currentLocale.value]);

		if (currentLocale.value !== fallbackLocale.value) {
			i18n.global.setLocaleMessage(fallbackLocale.value, messages.value[fallbackLocale.value]);
		}

		if (stopPagePropsWatcher) {
			stopPagePropsWatcher();
		}
	}
};

const resolveLang = (locale) => {
	const key = Object.keys(lang).find((file) => {
		const filename = file.replace(/^.*[\\/]/, "");
		return filename === `php_${locale}.json`;
	});
	return lang[key];
};

export const inertiaI18nVue = {
	/**
	 *
	 * @param { import("vue").App } app The application instance
	 * @param { Omit<import("vue-i18n").I18nOptions, ['locale','fallbackLocale','messages']> } options Options object passed to the i18n instance
	 */
	install(app, options = { legacy: false }) {
		loadFromPageProps(app.config.globalProperties.$page?.props?.i18n);
		stopPagePropsWatcher = watch(() => usePage()?.props?.i18n, loadFromPageProps, {
			immediate: true,
			flush: "sync",
		});

		i18n = createI18n({
			locale: currentLocale.value,
			fallbackLocale: fallbackLocale.value,
			...options,
		});

		app.use(i18n);

		router.on("navigate", async (ev) => {
			const newLocale = ev.detail.page.props.i18n.current;
			if (newLocale !== currentLocale.value) {
				if (!i18n.global.availableLocales.includes(newLocale)) {
					await loadLocaleMessages(newLocale);
				}
				setLanguage(newLocale);
				currentLocale.value = newLocale;
			}
		});
	},
};

/**
 * Backwards compatible for factory plugin installer
 * @returns
 */
export const useInertiaI18nVue = () => {
	return inertiaI18nVue;
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
