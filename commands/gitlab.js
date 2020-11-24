const { Gitlab } = require('@gitbeaker/node');
const { join } = require('path');
const cloneRepository = require('./repo-loader');

async function downloadGitLabRepositories(downloadsDirectory, token) {
  const Api = new Gitlab({
    host: 'https://gitlab.com',
    token,
  });

  const gitLabDirectory = join(downloadsDirectory, 'GitLab');
  const projects = await Api.Projects.all({
    owned: true,
  });

  for (const project of projects) {
    await cloneRepository(
      gitLabDirectory,
      project.path_with_namespace,
      project.ssh_url_to_repo,
    );
  }
}

module.exports = downloadGitLabRepositories;
