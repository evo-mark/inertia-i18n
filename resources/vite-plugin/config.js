import { isAbsolute, resolve } from "node:path";
import { normalizePath } from "vite";

export const defaultConfig = {
    langDirectory: normalizePath(`${process.cwd()}/lang`),
    outputDirectory: null,
};

const processUserConfig = (userConfig) => {
    if (userConfig?.langDirectory) {
        userConfig.langDirectory = isAbsolute(userConfig?.langDirectory)
            ? normalizePath(userConfig.langDirectory)
            : normalizePath(resolve(userConfig.langDirectory));
    }

    if (userConfig?.outputDirectory) {
        userConfig.outputDirectory = isAbsolute(userConfig?.outputDirectory)
            ? normalizePath(userConfig.outputDirectory)
            : normalizePath(resolve(userConfig.outputDirectory));
    } else {
        userConfig.outputDirectory = userConfig.langDirectory;
    }

    return userConfig;
};

export function resolveConfig(userConfig) {
    return processUserConfig(Object.assign({}, defaultConfig, userConfig));
}
