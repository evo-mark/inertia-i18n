import FullReload from "vite-plugin-full-reload";
import { resolveConfig } from "./config.js";
import { hasPhpTranslations } from "./analyse.js";
import { parseAll } from "./parse.js";

export default (userConfig = {}) => {
    const config = resolveConfig(userConfig);
    const shouldProcess = hasPhpTranslations(config.langDirectory);

    return [
        {
            name: "inertia-i18n",
            enforce: "post",
            config: () => ({
                resolve: {
                    alias: {
                        "inertia-i18n-files": config.outputDirectory,
                    },
                },
            }),
            handleHotUpdate(ctx) {
                if (
                    shouldProcess &&
                    ctx.file.startsWith(config.langDirectory) &&
                    ctx.file.endsWith(".php")
                ) {
                    parseAll(config.langDirectory, config.outputDirectory);
                }
            },
            buildStart() {
                if (shouldProcess) {
                    parseAll(config.langDirectory, config.outputDirectory);
                }
            },
        },
        FullReload([config.langDirectory + "/**/*.php"]),
    ];
};
