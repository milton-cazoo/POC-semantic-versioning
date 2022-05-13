import babel from "@rollup/plugin-babel";
import commonJS from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelConfig = require("./babel.config");

import { DEFAULT_EXTENSIONS } from "@babel/core";

const extensions = [".js", ".ts", ".tsx"];

const plugins = (target) => [
  peerDepsExternal({
    includeDependencies: true,
  }),
  resolve({
    extensions,
    preferBuiltins: false,
  }),
  replace({
    preventAssignment: true,
    values: { "process.env.NODE_ENV": JSON.stringify("production") },
  }),
  json(),
  commonJS({
    sourceMap: false,
    include: "node_modules/**",
  }),
  babel({
    skipPreflightCheck: true,
    exclude: "node_modules/**",
    babelHelpers: "runtime",
    extensions: [...DEFAULT_EXTENSIONS, ...extensions],
    ...babelConfig(null, target),
  }),
];

const baseOptions = {
  input: ["src/index.ts"],
  external: [/@babel\/runtime/],
};

const baseOutputOptions = {
  dir: "build",
  preserveModules: true,
  preserveModulesRoot: "src",
  sourcemap: true,
};

export default [
  {
    ...baseOptions,
    output: [
      {
        ...baseOutputOptions,
        format: "cjs",
        exports: "named",
        entryFileNames: "[name].js",
      },
    ],
    plugins: plugins("cjs"),
  },
  {
    ...baseOptions,
    output: [
      {
        ...baseOutputOptions,
        format: "esm",
        entryFileNames: "[name].esm.js",
      },
    ],
    plugins: plugins("esm"),
  },
];
