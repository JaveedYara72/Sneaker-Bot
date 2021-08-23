module.exports = {
  yahoo:function(user_data){
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());

    //Setting the user details to be entered (Later to be done by CLI)
    var fNameVal = user_data.fNameVal1;
    var sNameVal = user_data.sNameVal1;
    var monthVal = user_data.monthVal1;
    var dateVal = user_data.dateVal1;
    var yearVal = user_data.yearVal1;
    var codeVal = '+91';
    var emailVal = user_data.fNameVal1 + user_data.sNameVal1 + '6912'; //Change the email as the site will ask for verification
    var passwordVal = user_data.passwordVal1; // set a diff password (with special char)
    var telephoneVal = user_data.telephoneVal1;
    //The selectors of all the buttons 
    const fName = 'input[id="usernamereg-firstName"]';
    const sName = 'input[id ="usernamereg-lastName"]';
    const email = 'input[id="usernamereg-yid"]';
    const password = 'input[id ="usernamereg-password"]';
    // const year = 'input[name="dateofbirthyear"]';
    const zipcode = 'input[name="postalCode"]';
    // const email = 'input[type="email"]';
    // const password = 'input[type="password"]';
    const telephone = 'input[id="usernamereg-phone"]';
    const code = 'select[class="reg-black"]';
    const month = 'select[id="usernamereg-month"]'
    const day = 'input[id="usernamereg-day"]'
    const year = 'input[id="usernamereg-year"]'
    const submit = 'button[id="reg-submit-button"]'
    //*[@id="usernamereg-firstName"]
    //Launching the site
    puppeteer.launch({
      headless: false,
      slowMo: 100
    }).then(async (browser) => {

      const page = await browser.newPage();
      await page.setViewport({
        width: 1100,
        height: 810
      });

      await page.goto('https://login.yahoo.com/account/create', {
        waitUntil: 'load',
        timeout: 0
      });
    // #ybar-inner-wrap > div._yb_16d6y._yb_kjkeg > div > div._yb_194zm.ybar-menu-hover-open > div._yb_1uwhb > div > a
    // sec:ybar;slk:sign-in;elm:signin;subsec:settings;itc:0;tar:login.yahoo.com

      // await page.click('#ybar-inner-wrap > div._yb_16d6y._yb_kjkeg > div > div._yb_194zm.ybar-menu-hover-open > div._yb_1uwhb > div > a');
      // await page.waitForNavigation();
      // await page.click("#createacc");
      // await page.waitForNavigation();
      await page.type(fName, fNameVal);
      await page.type(sName, sNameVal);
      await page.type(email, emailVal);
      await page.type(password, passwordVal);
      try {
        await page.select(`select[name="shortCountryCode"]`, `IN`);
      } catch {
        async (err) => {}
      }
      await page.type(telephone, telephoneVal);
      await page.select(`#usernamereg-month`, `8`);
      await page.type(day, dateVal);
      await page.type(year, yearVal);

      await page.waitForTimeout(2000);

      console.log("email: " + emailVal);
      // await page.type(email, emailVal);
      console.log("entered email");

      // await page.type(password, passwordVal);

      // await page.waitForTimeout(500);

      await page.click(submit);
      await page.waitForNavigation();
      await page.waitForTimeout(500);
      // await page.waitForTimeout(500);
      await page.click("#recaptcha-anchor")

      // await page.waitForTimeout(1000);
      console.log("submitted");
      await page.screenshot({
        path: 'example.png'
      });

      await browser.close();
    }).catch(err => console.error(err));
  }
}