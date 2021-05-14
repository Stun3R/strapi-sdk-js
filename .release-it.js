module.exports = {
  git: {
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
