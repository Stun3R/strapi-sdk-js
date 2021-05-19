/**
 * Module dependencies
 */

// Node.js core.
import { join } from "path";

// Extra feature for fs Node.js core module.
import { ensureDir, outputFile } from "fs-extra";

// CLI color mode.
import { blue } from "chalk";

// Enquire engine.
import { prompt } from "enquirer";

// Codegen core.
import { codegen } from "@graphql-codegen/core";
import { Types } from "@graphql-codegen/plugin-helpers/types";

// GraphQL Dependencies in order to use Codegen.
import * as typescriptPlugin from "@graphql-codegen/typescript";
import { printSchema, parse, GraphQLSchema } from "graphql";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";

// Options get by the prompt.
export interface GenerateOptions {
  host: string;
  name: string;
  dir: string;
}

// Prompt's configuration
const promptOptions = [
  {
    type: "input",
    name: "host",
    message: "What is your Strapi host?",
    initial: "http://localhost:1337",
  },
  {
    type: "input",
    name: "dir",
    message: "Where do you want to generate your types?",
    initial: "./models/",
  },
  {
    type: "input",
    name: "name",
    message: "How do you want to name the generated file?",
    initial: "types.ts",
  },
];

/**
 * `$ strapi-sdk generate`
 *
 * Generate Typescript types based on your GraphQL Schema.
 */

export const generateTypes = async (): Promise<void> => {
  try {
    // Get options from prompt.
    const options: GenerateOptions = await prompt(promptOptions);

    // Build initial scope.
    const scope = {
      host: options.host,
      outputDir: options.dir,
      outputName: options.name,
      filePath: join(`${options.dir}/${options.name}`),
    };

    // Load schema from Strapi API
    const schema: GraphQLSchema = await loadSchema(`${scope.host}/graphql`, {
      loaders: [new UrlLoader()],
    });

    // Build Codegen config.
    const config: Types.GenerateOptions = {
      schema: parse(printSchema(schema)),
      filename: scope.outputName,
      documents: [],
      config: {},
      plugins: [
        {
          typescript: {},
        },
      ],
      pluginMap: {
        typescript: typescriptPlugin,
      },
    };

    // Generate types
    const output: string = await codegen(config);

    // Create output directorie recursively.
    await ensureDir(scope.outputDir);

    // Write the generated type.
    await outputFile(scope.filePath, output);

    // Log the success.
    console.log(`${blue("Info")}: Generated your types at ${scope.filePath}.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
