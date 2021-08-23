// Taking packages here 
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

//Custom input, later to be done through CLI 
var fNameVal = 'Some';
var sNameVal = 'Genius';
var emailVal = 'RandomNoob1' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@gmail.com';
var passwordVal = 'JOlaMola24@';

// ALl the selectors requires are stored here.
const fName = 'input[name="register.firstname"]';
const sName = 'input[name="register.lastname"]';
const email = 'input[name="register.email"]';
const password = 'input[name="register.password"]';
const submit = '#section-register > div > form > div:nth-child(7) > button';
//Seeting options for puppeteer 
const chromeOptions = {
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    slowMo: 10,
    defaultViewport: null
}

//All the main interactions
puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async (browser) => {

    const page = await browser.newPage();
    //await page.setViewport({ width: 1200, height: 800 });

    await page.goto('https://www.zalando.co.uk/login/?view=register', {
        waitUntil: 'load',
        timeout: 0
    });


    await page.type(fName, fNameVal);
    await page.type(sName, sNameVal);
    await page.waitFor(1000);
    console.log("email: " + emailVal);
    await page.type(email, emailVal);
    console.log("entered email");
    await page.type(password, passwordVal);


    await page.waitFor(1000);
    await page.click('#section-register > div > form > div:nth-child(5) > div > div:nth-child(4) > div > div:nth-child(2) > div > label');
    await page.waitForSelector(submit);
    await page.focus(submit);
    await page.keyboard.type('\n');
    console.log("submitted");
    await page.screenshot({
        path: 'example.png'
    });

    await browser.close();
}).catch(err => console.error(err));