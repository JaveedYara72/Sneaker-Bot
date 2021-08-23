module.exports = {
  champs: function(user_data){

    // Taking packages here 
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());

    var fNameVal = user_data.fNameVal1; 
    var sNameVal = user_data.sNameVal1;
    var monthVal = user_data.monthVal1;
    var dateVal = user_data.dateVal1;
    var yearVal = user_data.yearVal1;
    var zipcodeVal = user_data.zipcodeVal1;
    var emailVal = user_data.emailVal1; 
    var passwordVal = user_data.passwordVal1;
    var telephoneVal = user_data.telephoneVal1;

    // ALl the selectors requires are stored here.
    const fName = 'input[name="firstName"]';
    const sName = 'input[name="lastName"]';
    const month = 'input[name="dateofbirthmonth"]';
    const date = 'input[name="dateofbirthday"]';
    const year = 'input[name="dateofbirthyear"]';
    const zipcode = 'input[name="postalCode"]';
    const email = 'input[type="email"]';
    const password = 'input[type="password"]';
    const telephone = 'input[name="phoneNumber"]';
    const submit = 'button[class="Button"]'

    //Setting options for puppeteer 
    const chromeOptions = { 
      headless: false,
      slowMo:10,
      defaultViewport: null 
    }

    //All the main interactions
      puppeteer.launch(chromeOptions).then(async (browser) => {

        const page = await browser.newPage();
        //await page.setViewport({ width: 1200, height: 800 });

        await page.goto('https://www.champssports.com/account/create', {waitUntil: 'load', timeout: 0});

        await page.type(fName, fNameVal);
        await page.type(sName, sNameVal);
        await page.type(month, monthVal);
        await page.type(date, dateVal);
        await page.type(year, yearVal);
        await page.type(zipcode, zipcodeVal);

        await page.waitForTimeout(500);
        await page.waitForTimeout(500);
        await page.type(email, emailVal);

        await page.type(password, passwordVal);
        await page.type(telephone, telephoneVal);

        await page.waitForTimeout(500);
        
        await page.click(submit);
        await page.waitForNavigation();

        await page.waitForTimeout(1000);
        console.log("submitted");
        await page.screenshot({ path: 'example.png' });
    
    //await browser.close();
  }).catch(err => console.error(err));
  
}}


