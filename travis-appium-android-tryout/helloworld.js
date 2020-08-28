const fs = require('fs')
const wdio = require("webdriverio");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "7.1.1",
    app: "/root/apk_pool/ApiDemos-debug.apk",
    fullReset: true
    // deviceName: "nexus_5_7.1.1",
    // appPackage: "io.appium.android.apis",
    // appActivity: ".view.TextFields",
    // automationName: "UiAutomator2"
  }
};

async function main () {
  const client = await wdio.remote(opts);

  let screenshot = await client.takeScreenshot();
  fs.writeFileSync('test.png',screenshot,{encoding:'base64'})

  await client.deleteSession();
}

main();
