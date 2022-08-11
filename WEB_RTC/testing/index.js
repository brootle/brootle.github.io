
// var webdriver = require('selenium-webdriver');
 
// var driver = new webdriver.Builder().
//    withCapabilities(webdriver.Capabilities.chrome()).
//    build();
 
// driver.get('http://www.lambdatest.com');

require('chromedriver');

const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

(async function example() {


    let streamUrl = process.argv[2]

    console.log("streamUrl:", streamUrl)

    // let driver = await new Builder().forBrowser(Browser.CHROME).build();

    // const service = new chrome.ServiceBuilder('C:');
    // const driver = await new Builder().forBrowser('chrome').setChromeService(service).build();    

    let options = new chrome.Options().headless();

    // let driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();    

    let driver = new webdriver.Builder().forBrowser('chrome').build(); 

    await driver.get('http://127.0.0.1:8887/');

    await driver.findElement(By.id('url')).sendKeys(streamUrl)

    console.log("wait 5 seconds")
    await sleep(5000)
    console.log("click start")

    await driver.findElement(By.id('start')).click()

    // if pause button is visible it means it's playing
    // <i class="op-con op-pause" style="display: block;"></i>



    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

    // await driver.findElement(By.id('url')).sendKeys('wss://live-f5184859-3afa-4ecc-9ced-be938a1d059d.qencode.com:3334/qlive/877ced8a-8e67-4189-88d8-253552c86fbc')

    // await driver.findElement(By.id('start')).click()


  })();


//const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

// (async function example() {
//   let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
//   try {
//     await driver.get('http://www.google.com/ncr');
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//     await driver.quit();
//   }
// })();

// (async function example() {

//     let driver = await new Builder().forBrowser(Browser.CHROME).build();

//     await driver.get('http://127.0.0.1:8887/');

//     //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

//     // await driver.findElement(By.id('url')).sendKeys('wss://live-f5184859-3afa-4ecc-9ced-be938a1d059d.qencode.com:3334/qlive/877ced8a-8e67-4189-88d8-253552c86fbc')

//     // await driver.findElement(By.id('start')).click()

//   })();