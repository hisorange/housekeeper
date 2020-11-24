const { Bitbucket } = require('bitbucket');
const { join } = require('path');
const cloneRepository = require('./repo-loader');

async function downloadBitBucketRepositories(
  downloadsDirectory,
  username,
  password,
) {
  const Api = new Bitbucket({
    baseUrl: 'https://api.bitbucket.org/2.0',
    auth: {
      username,
      password,
    },
  });

  const bitBucketDirectory = join(downloadsDirectory, 'BitBucket');
  const repositories = await Api.repositories.list({
    pagelen: 100,
    workspace: username,
  });

  for (const repo of repositories.data.values) {
    await cloneRepository(
      bitBucketDirectory,
      repo.full_name,
      repo.links.clone.find(l => l.name === 'ssh').href,
    );
  }
}

module.exports = downloadBitBucketRepositories;
