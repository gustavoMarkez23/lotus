import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/dist", "./data", "./husky", "**/mysql_data"],
}, ...compat.extends("standard-with-typescript"), {
    files: ["**/*.ts"],
    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/method-signature-style": ["off", "method"],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "n/handle-callback-err": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-argument": "off"
    },
}];