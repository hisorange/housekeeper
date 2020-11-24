## HouseKeeper

---

Simple script which clones repositories with every branch from cloud git providers creates a daily backup in [GDrive](https://drive.google.com) and it can even send a slack message to you when finished, which can be useful to monitoring.

- [GitHub](https://github.com)
- [GitLab](https://gitlab.com)
- [BitBucket](https://bitbucket.org)

### How to Install

First download to your raspi or anything with linux

```
yarn add @hisorange/housekeeper # or npm install @hisorange/housekeeper
```

Then add it to a CRON with a daily repetition

```
# /etc/cron.daily
node /path/to/housekeeper/run.js
```

### Configuration

You need to provide authentication tokens, you can find the [.env.sample](./env.sample) in the root of the package.

| Variable           | Value                                               |
| :----------------- | :-------------------------------------------------- |
| GITLAB_ACCES_TOKEN | Access token for your GitLab account                |
| GITHUB_ACCES_TOKEN | Access token for your GitHub account                |
| BITBUCKET_USERNAME | BitBucket login username                            |
| BITBUCKET_PASSWORD | BitBucket App Password                              |
| GDRIVE_FOLDER_ID   | Target folder's ID in your GDrive                   |
| GDRIVE_ACCESS_KEY  | Google Cloud API access key in base64 encoded JSON  |
| SLACK_BOT_TOKEN    | Your slackbot access token                          |
| SLACK_CHANNEL_ID   | Slack channel's ID where the reports will be posted |

Everything is optional, so you can run it even if you only want to backup your github repos and don't need or want to report it to slack.
