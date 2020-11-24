const { Octokit } = require('@octokit/rest');
const { join } = require('path');
const cloneRepository = require('./repo-loader');

async function downloadGitHubRepositories(downloadsDirectory, token) {
  const Api = new Octokit({
    baseUrl: 'https://api.github.com',
    auth: token,
  });
  const gitHubDirectory = join(downloadsDirectory, 'GitHub');

  const orgs = await Api.orgs.listForAuthenticatedUser();

  for (const org of orgs.data) {
    const repositories = await Api.repos.listForOrg({
      org: org.login,
    });

    for (const repository of repositories.data) {
      if (repository.fork) {
        console.log('Skipping fork', repository.ssh_url);
        continue;
      }

      await cloneRepository(
        gitHubDirectory,
        repository.full_name,
        repository.ssh_url,
      );
    }
  }

  {
    const repositories = await Api.repos.listForAuthenticatedUser({
      affiliation: 'owner',
      visibility: 'all',
    });

    for (const repository of repositories.data) {
      if (repository.fork) {
        console.log('Skipping fork', repository.ssh_url);
        continue;
      }

      await cloneRepository(
        gitHubDirectory,
        repository.full_name,
        repository.ssh_url,
      );
    }
  }
}

module.exports = downloadGitHubRepositories;
