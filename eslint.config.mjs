import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Relax strict rules for production builds
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-empty-object-type": "warn"
    },
  }),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      ".vercel/**",
      "coverage/**",
      "dist/**",
      "**/*.d.ts",
      "next-env.d.ts",
      "legacy_html/**",
      "public/**",
      "scripts/**"
    ],
  },
];

export default eslintConfig;
