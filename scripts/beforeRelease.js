#!/usr/bin/node

const { writeFileSync, readFileSync } = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");

const CHANGELOG_PATH = join(__dirname, "..", "CHANGELOG.md");
const RELEASES_PATH = join(__dirname, "..", "docs", "content", "4.releases.md");

const VERSION_REGEX = /\[(.*?)\]\(.*?\) \(.*?\)/g;

async function main() {
  try {
    const file = readFileSync(CHANGELOG_PATH, "utf-8");

    releases = file.replace(VERSION_REGEX, "v$1").replace(/###/g, "####");

    writeFileSync(RELEASES_PATH, `# Releases\r\n\r\n${releases}`, {
      flag: "w+",
    });

    execSync(`git add ${RELEASES_PATH}`);

    console.log("✨ Successfully generated the releases page.");
  } catch (error) {
    console.error(error);
  }
}

main().catch((err) => console.log(err));
