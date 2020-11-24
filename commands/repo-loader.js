const Git = require('simple-git');
const checkoutRemoteBranches = require('./branch-loader');
const { mkdirSync, existsSync } = require('fs');
const { join } = require('path');

const mkdir = path => {
  mkdirSync(path, { recursive: true });
};

async function cloneRepository(providerDirectory, name, ssh) {
  const baseDirectory = join(providerDirectory, name);
  const gitDirectory = join(baseDirectory, '.git');

  if (!existsSync(baseDirectory)) {
    mkdir(baseDirectory);
  }

  const git = Git({
    baseDir: baseDirectory,
  });

  if (!existsSync(gitDirectory)) {
    console.log('Cloning', ssh);
    await git.clone(ssh, baseDirectory);
  } else {
    console.log('Updating', ssh);
  }

  await checkoutRemoteBranches(git);
}

module.exports = cloneRepository;
