import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line
export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { react: (await import("eslint-plugin-react")).default },
    rules: {
      "no-console": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "no-nested-ternary": 0,
      "consistent-return": 0,
      "no-alert": 0,
      "react/jsx-no-constructed-context-values": 0,
      "import/extensions": 0,
      "react/prop-types": 0,
      "linebreak-style": 0,
      "react/state-in-constructor": 0,
      "import/prefer-default-export": 0,
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "max-len": [2, 550],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 1,
        },
      ],
      "no-underscore-dangle": [
        "error",
        {
          allow: ["_d", "_dh", "_h", "_id", "_m", "_n", "_t", "_text"],
        },
      ],
      "object-curly-newline": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-one-expression-per-line": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/alt-text": 0,
      "jsx-a11y/no-autofocus": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "react/no-array-index-key": 0,
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["to", "hrefLeft", "hrefRight"],
          aspects: ["noHref", "invalidHref", "preferButton"],
        },
      ],
    },
  },
];
