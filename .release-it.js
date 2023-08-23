module.exports = {
  hooks: {
    "after:git:bump": "npm run docs:release",
  },
  git: {
    tagName: "v${version}",
    commitMessage: "chore(release): ${version}",
  },
  github: {
    release: true,
    releaseName: "v${version}",
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: "angular",
      infile: "CHANGELOG.md",
    },
  },
};
