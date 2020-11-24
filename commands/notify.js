const Slack = require('slack');

async function notifySlack(token, channel) {
  const slack = new Slack({ token });
  await slack.chat.postMessage({
    channel,
    text:
      'Finished uploading the daily backup @' +
      new Date().toISOString().substr(0, 10),
  });
}

module.exports = notifySlack;
