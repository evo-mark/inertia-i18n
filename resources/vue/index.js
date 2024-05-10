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
    let currentLocale = props.initialPage.props.i18n.current;
    const fallbackLocale = props.initialPage.props.i18n.default;

    return {
        install: (app, config = {}) => {
            const isLegacy = config.legacy === true;

            i18n = createI18n({
                legacy: isLegacy,
                locale: currentLocale,
                fallbackLocale,
            });
            loadLocaleMessages(currentLocale);
            if (currentLocale !== fallbackLocale) {
                loadLocaleMessages(fallbackLocale);
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

function setLanguage(newLocale) {
    if (i18n.mode === "legacy") {
        i18n.global.locale = newLocale;
    } else {
        i18n.global.locale.value = newLocale;
    }
}

async function loadLocaleMessages(locale) {
    const messages = await resolveLang(locale)();
    i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
}
