module.exports = {
  hooks: {
    "before:git:release": "npm run docs:releases",
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
