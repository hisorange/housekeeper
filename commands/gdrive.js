const NodeGoogleDrive = require('google-drive-connect');
const { basename } = require('path');
const { createReadStream, unlinkSync } = require('fs');
const walk = require('walkdir');

async function uploadBackups(backupsDirectory, folderId, credentials) {
  const googleDriveInstance = new NodeGoogleDrive({
    ROOT_FOLDER: folderId,
  });

  await googleDriveInstance.useServiceAccountAuth(credentials);

  const listFilesResponse = await googleDriveInstance.listFiles(
    folderId,
    null,
    false,
  );

  const backups = new Set();

  for (const file of listFilesResponse.files) {
    backups.add(file.name);
  }

  const files = walk.sync(backupsDirectory);

  for (const file of files) {
    const name = basename(file);

    if (backups.has(name)) {
      console.log('Skipping', name);
      continue;
    } else {
      console.log('Uploading', name);
    }

    await googleDriveInstance.create({
      source: createReadStream(file),
      name: name,
    });
  }
}

module.exports = uploadBackups;
