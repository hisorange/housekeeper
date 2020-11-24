#!/usr/bin/env node
const downloadGitLabRepositories = require('./commands/gitlab');
const downloadGitHubRepositories = require('./commands/github');
const downloadBitBucketRepositories = require('./commands/bitbucket');
const compressDownloads = require('./commands/zip');
const { join } = require('path');
const uploadBackups = require('./commands/gdrive');
const notifySlack = require('./commands/notify');
const { mkdirSync } = require('fs');

async function main() {
  require('dotenv').config();

  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
  const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

  const GITLAB_ACCES_TOKEN = process.env.GITLAB_ACCES_TOKEN;
  const GITHUB_ACCES_TOKEN = process.env.GITHUB_ACCES_TOKEN;

  const BITBUCKET_USERNAME = process.env.BITBUCKET_USERNAME;
  const BITBUCKET_PASSWORD = process.env.BITBUCKET_PASSWORD;

  const GDRIVE_FOLDER_ID = process.env.GDRIVE_FOLDER_ID;
  const GDRIVE_ACCESS_KEY = process.env.GDRIVE_ACCESS_KEY
    ? JSON.parse(
        Buffer.from(process.env.GDRIVE_ACCESS_KEY, 'base64').toString(),
      )
    : undefined;

  const downloadsDirectory = join(__dirname, '.downloads');
  const backupsDirectory = join(__dirname, '.backups');

  mkdirSync(downloadsDirectory, { recursive: true });
  mkdirSync(backupsDirectory, { recursive: true });

  if (GITLAB_ACCES_TOKEN) {
    await downloadGitLabRepositories(downloadsDirectory, GITLAB_ACCES_TOKEN);
  }

  if (GITHUB_ACCES_TOKEN) {
    await downloadGitHubRepositories(downloadsDirectory, GITHUB_ACCES_TOKEN);
  }

  if (BITBUCKET_USERNAME && BITBUCKET_PASSWORD) {
    await downloadBitBucketRepositories(
      downloadsDirectory,
      BITBUCKET_USERNAME,
      BITBUCKET_PASSWORD,
    );
  }

  await compressDownloads(downloadsDirectory, backupsDirectory);

  if (GDRIVE_FOLDER_ID && GDRIVE_ACCESS_KEY) {
    await uploadBackups(backupsDirectory, GDRIVE_FOLDER_ID, GDRIVE_ACCESS_KEY);
  }

  if (SLACK_BOT_TOKEN && SLACK_CHANNEL_ID) {
    await notifySlack(SLACK_BOT_TOKEN, SLACK_CHANNEL_ID);
  }
}

main();
