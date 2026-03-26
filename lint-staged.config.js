import "dotenv/config";

export default {
	"*.php": `${process.env.PHP ?? "env php"} ./vendor/bin/pint`,
	"*.{js,cjs,mjs,vue,css}": ["npx eslint", "prettier --write --ignore-unknown"],
};
