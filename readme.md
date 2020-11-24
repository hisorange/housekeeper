# HouseKeeper by hisorange

Backup your cloud git providers to even more cloud spaces! If you are a paranoid like me, who often messing around with git projects, then here is the solution for you :D This small script lets you backup every project of yours. There is no drawback in having more copy at more places. Up until now, we seen both GitHub and GitLab meltdowns, luckily both of them recovered with minimal losses, but you can basically eliminate the chance to lose any of your work.

What this scirpt does? It clones every repo you have (even the private ones) on your pc? (raspberry or smth) then creates an archive from it, and uploads it to GDrive, while keeping a local copy as well. With this, you have effectively 3 copy of your work at 3 different places, and 2 of them are even more redundant.

Anyways, I wrote this for myself, but open sourced it, so you don't have to :)

### How to Install

First download to your raspi or anything with linux

```
yarn add global @hisorange/housekeeper # or npm i -g @hisorange/housekeeper
```

Then add it to a CRON with a daily repetition

```
# /etc/cron.daily/housekeeper
housekeeper > ~/housekeeper.log
```

### Supported platforms

Supported git providers:

- [GitHub](https://github.com)
- [GitLab](https://gitlab.com)
- [BitBucket](https://bitbucket.org)

Supported backup targets:

- [GDrive](https://drive.google.com)

Oh, one more thing! You can get a **slack message** about each successful backup, it's a nice to have, so you don't have to monitor the process yourself.

### Configuration

You need to provide authentication tokens, you can find the [.env.sample](./env.sample) in the root of the package.
But of course everything is a separated procedure, so you only run which you need.

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

---

Cheers! ^.^
