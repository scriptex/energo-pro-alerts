# Energo Pro Varna Alerts

[![Send Email and Deploy](https://github.com/scriptex/energo-pro-alerts/actions/workflows/playwright.yml/badge.svg)](https://github.com/scriptex/energo-pro-alerts/actions/workflows/playwright.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/16296604bcb64660a17f66310c10c06b)](https://app.codacy.com/gh/scriptex/energo-pro-alerts/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CodeFactor](https://www.codefactor.io/repository/github/scriptex/energo-pro-alerts/badge)](https://www.codefactor.io/repository/github/scriptex/energo-pro-alerts)
[![DeepScan grade](https://deepscan.io/api/teams/3574/projects/29095/branches/936158/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3574&pid=29095&bid=936158)
[![Analytics](https://ga-beacon.atanas.info/api/analytics?account=UA-83446952-1&page=github.com/scriptex/energo-pro-alerts&pixel)](https://github.com/scriptex/energo-pro-alerts/)

> Email and web notifications for planned repairs and outages from Energo Pro - Varna

## About

Energo Pro (Енерго Про) is the local electricity supplier for Varna region in Bulgaria. They post notifications about planned repairs on their website but it is not possible to subscribe to those notifications and receive them immediately - instead one should check their website frequently.

The code in this repository serves as a middleware between the website and the user - it sends hourly notifications on email which contain the latest news related to planned repairs and outages.

The way the code is structured allows for integration with any other website which has a dedicated page for this purpose.

## Usage

In order to use this repository, one must clone it and adjust the repository secrets found under `settings/secrets/actions` in the repository and add their own configuration:

```sh
# The email address of the sender of the notifications
EMAIL_FROM="sender@example.com"

# The subject in the email
EMAIL_SUBJECT="Planned outages and repairs"

# The email address of the recipient of the notifications
EMAIL_TO="recipient@example.com"

# API key for Brevo (formerly known as Sendinblue)
SENDINBLUE_API_KEY="abc-123"

# Array of Credential tuples: [USERNAME, PASSWORD]
# USERNAME is your client ID as shown in the invoices and the contract
# PASSWORD is the last four digits of your unique ID (ЕГН)
CREDENTIALS='[[USERNAME, PASSWORD]]'
```

## Available ways to use the code in this repository

The code is deployed via Vercel and can be accessed [here](https://energo-pro-alerts.atanas.info).

When forked and correctly set up, this repository creates a CRON job which sends an email at 0 (zero) o'clock each hour between 5:00 and 14:00 UTC.

One can adjust this by modifying the parameters in the [action configuration](https://github.com/scriptex/energo-pro-alerts/blob/main/.github/workflows/playwright.yml)

## Visitor stats

![GitHub stars](https://img.shields.io/github/stars/scriptex/energo-pro-alerts?style=social)
![GitHub forks](https://img.shields.io/github/forks/scriptex/energo-pro-alerts?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/scriptex/energo-pro-alerts?style=social)
![GitHub followers](https://img.shields.io/github/followers/scriptex?style=social)

## Code stats

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/scriptex/energo-pro-alerts)
![GitHub repo size](https://img.shields.io/github/repo-size/scriptex/energo-pro-alerts?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/scriptex/energo-pro-alerts?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/scriptex/energo-pro-alerts?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/energo-pro-alerts?style=plastic)

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" width="32" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" width="24" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
 <img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
 <img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
 <img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
 <img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
 <img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
 <img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
 <img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
 <img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
 <img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
