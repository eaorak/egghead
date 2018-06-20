#! /usr/bin/env node

const puppeteer = require("puppeteer");
const download = require("download");
const getArgs = require("./opts");

const options = getArgs();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log("Logging in to egghead.io");
  await page.goto("https://egghead.io/users/sign_in");
  await page.type("#user_email", options.username);
  await page.type("#user_password", options.password);
  await page.click("#new_user > div.form-group.flexbox-between > input");
  await page.waitForNavigation();
  await page.goto(`https://egghead.io/api/v1/series/${options.course}`);
  const resp = await page.evaluate(() => {
    const content = document.querySelector("pre");
    return content ? JSON.parse(content.innerHTML) : {};
  });
  browser.close();
  if (!resp.download_url) {
    console.log("Can not access download url. Check the parameters provided. Exiting.");
    process.exit(-1);
  }
  console.log(`Downloading "${options.course}"...`);
  download(resp.download_url, ".").then(() => console.log("Download completed!"));
})();
