import { Command } from "commander";

import { generateTypes } from "../lib/commands/generate";

import { version } from "../../package.json";

// Initial program setup
const program = new Command();

// `$ strapi version || strapi -v || strapi --version`
program.version(version, "-v, --version", "Output the version number");
program
  .command("version")
  .description("Output your version of Strapi SDK")
  .action(() => {
    process.stdout.write(version + "\n");
    process.exit(0);
  });

// `$ strapi generate`
program
  .command("generate")
  .description("generate Typescript's types based on your GraphQL Schema")
  .action(async () => {
    await generateTypes();
  });

program.parse(process.argv);
