/**
 * Module dependencies
 */

// Extra feature for fs Node.js core module.
import { ensureDir, outputFile, outputJson, remove } from "fs-extra";

// Better console.
import consola from "consola";

// Enquire engine.
import { prompt } from "enquirer";

// Axios.
import axios, { AxiosResponse } from "axios";

// Generator engine.
import { compile, JSONSchema } from "json-schema-to-typescript";

// Options get by the prompt.
interface GenerateOptions {
  host: string;
}

interface StrapiJSONSchema {
  $schema: string;
  title: string;
  kind: "singleType" | "collectionType";
  type: "object";
  properties: JSONSchema;
}

// Prompt's configuration
const promptOptions = [
  {
    type: "input",
    name: "host",
    message: "What is your Strapi host?",
    initial: "http://localhost:1337",
  },
];

// Generation options
const scope = {
  outputDir: "./models",
  schema: {
    outputName: "types.ts",
    filePath: "./models/types.ts",
    bannerComment:
      "/* tslint:disable */\n/**\n* This file was automatically generated by strapi-sdk.\n* DO NOT MODIFY IT BY HAND.\n*/",
  },
};

/**
 * `$ strapi-sdk generate`
 *
 * Call Typescript types & content Types generation based on your Strapi API.
 */

export const generate = async (): Promise<void> => {
  try {
    // Get Token from .env
    const token = process.env.STRAPI_JSONSCHEMA_TOKEN as string;
    // Call the prompt to get host param
    const options: GenerateOptions = await prompt(promptOptions);

    try {
      // Call SDK Bridge
      const { data }: AxiosResponse<StrapiJSONSchema[]> = await axios.get<
        StrapiJSONSchema[]
      >(`${options.host}/json-schema`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Generate Typescript types
      await generateTypes(data);
      process.exit(0);
    } catch (error) {
      // Check if error is from Strapi
      if (error.response) {
        consola.error(error.response.data.message);
      } else {
        // Check if host error
        if (error.code === "ECONNREFUSED") {
          consola.error(`Can't access to host: ${options.host}`);
        } else {
          consola.error(error);
        }
      }
      process.exit(1);
    }
  } catch (error) {
    process.exit(1);
  }
};

export const generateTypes = async (
  schema: StrapiJSONSchema[]
): Promise<void> => {
  try {
    // Create output directory if doesn't exist.
    await ensureDir(scope.outputDir);

    // Remove old types
    await remove(scope.schema.filePath);

    // Loop schema array
    for (let index = 0; index < schema.length; index++) {
      // convert json-schema to Typescript's types
      const type = await compile(
        schema[index],
        schema[index].title,
        index > 0
          ? { unknownAny: true }
          : { bannerComment: scope.schema.bannerComment, unknownAny: true }
      );

      // Write the generated types.
      await outputFile(scope.schema.filePath, type, { flag: "a" });
    }

    // Log the success.
    consola.success(
      `Successfully generated types at ${scope.schema.filePath}.`
    );
  } catch (error) {
    consola.error(error);
    process.exit(1);
  }
};