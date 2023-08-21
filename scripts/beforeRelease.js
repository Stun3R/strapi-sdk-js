#!/usr/bin/node

const axios = require("axios");
const { writeFileSync } = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");

const RELEASES_PATH = join(__dirname, "..", "docs", "content", "4.releases.md");

async function main() {
  try {
    const response = await axios.request(
      `https://api.github.com/repos/Stun3R/strapi-sdk-js/releases`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const releases = response.data.reduce((acc, cur) => {
      const name = `## ${cur.name}`;
      const body = cur.body.replace(/###/g, "####");

      acc += `${name}\r\n\r\n${body}\r\n\r\n`;

      return acc;
    }, "");

    writeFileSync(RELEASES_PATH, `# Releases\r\n\r\n${releases}`, {
      flag: "w+",
    });

    execSync(`git add ${RELEASES_PATH}`);

    console.log("Successfully generated the releases page.");
  } catch (error) {
    console.error(error);
  }
}

main().catch((err) => console.log(err));
