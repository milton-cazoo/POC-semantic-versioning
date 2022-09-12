module.exports = {
  branches: ["main"],
  tagFormat: "${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      { releaseRules: [{ type: "breaking change", release: "major" }] },
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        pkgRoot: "build",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "npm --no-git-tag-version version ${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
