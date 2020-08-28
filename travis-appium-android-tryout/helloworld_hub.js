const webdriver = require('selenium-webdriver');

const GRID_HOST = 'localhost:4444/wd/hub';

function searchTextOnGoogle() {
  // Setup Input capabilities
  const capabilities = {
    platformName: "Android",
    platformVersion: "7.1.1",
    browserName: 'android'
    // app: "/root/apk_pool/ApiDemos-debug.apk",
  }

  // URL: https://{username}:{accessKey}@hub.lambdatest.com/wd/hub
  const gridUrl = 'http://' + GRID_HOST;

  // setup and build selenium driver object
  const driver = new webdriver.Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities)
      .build();

  // navigate to a url, search for a text and get title of page
  driver.get('https://www.google.com/ncr').then(function() {
      driver.findElement(webdriver.By.name('q')).sendKeys('LambdaTest\n').then(function() {
          driver.getTitle().then(function(title) {
              setTimeout(function() {
                  console.log(title);
                  driver.quit();
              }, 5000);
          });
      });
  });
}
searchTextOnGoogle();
