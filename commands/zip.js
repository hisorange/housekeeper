const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { zip } = require('zip-a-folder');

async function compressDownloads(downloadsDirectory, backupsDirectory) {
  const now = new Date().toISOString().substr(0, 10);
  const basename = now + '.housekeeper-backup.zip';
  const target = join(backupsDirectory, basename);

  console.log('Compressing downloads into', basename);

  if (!existsSync(backupsDirectory)) {
    mkdirSync(backupsDirectory, { recursive: true });
  }

  await zip(downloadsDirectory, target);
}

module.exports = compressDownloads;
