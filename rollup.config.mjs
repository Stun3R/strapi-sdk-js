import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const name = packageJson.main.split(".")[0];
const external = Object.keys(packageJson.dependencies || {});

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external,
});

export default [
  bundle({
    plugins: [
      resolve({
        resolveOnly: [/^((?!node_modules).)*$/],
        preferBuiltins: true,
      }),
      commonjs({ include: /node_modules/ }),
      esbuild({
        target: "es2018",
      }),
      json(),
    ],
    output: [
      {
        file: `${name}.cjs`,
        format: "cjs",
      },
      {
        file: `${name}.mjs`,
        format: "es",
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
