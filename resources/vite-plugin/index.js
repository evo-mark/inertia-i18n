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
			handleHotUpdate({ file, server }) {
				if (shouldProcess && file.startsWith(config.langDirectory) && file.endsWith(".php")) {
					const writtenFiles = parseAll(config.langDirectory, config.outputDirectory);

					for (const file of writtenFiles) {
						const module = server.moduleGraph.getModuleById(file.path);
						if (!module) continue;

						server.moduleGraph.invalidateModule(module);

						server.ws.send({
							type: "update",
							updates: [
								{
									type: "js-update",
									path: server.moduleGraph.urlToModuleMap.get(file.path)?.url || file.path,
									acceptedPath: file.path,
									timestamp: Date.now(),
								},
							],
						});
					}
				}
			},
			buildStart() {
				if (shouldProcess) {
					parseAll(config.langDirectory, config.outputDirectory);
				}
			},
		},
	];
};
