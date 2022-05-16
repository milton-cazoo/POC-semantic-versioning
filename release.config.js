module.exports = {
  branches: ["main"],
  tagFormat: "${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
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
    "@semantic-release/git",
    "@semantic-release/github",
  ],
};
