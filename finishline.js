module.exports = {
  finishline:function(user_data){

    const fs = require('fs');	
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    const poll = require('promise-poller').default;
    const request = require('request-promise-native');
    //const poll = require('promise-poller').default;
    puppeteer.use(StealthPlugin());


    var fNameVal = user_data.fNameVal1;
    var sNameVal = user_data.sNameVal1;
    var bDayVal = user_data.dobVal1;
    var emailVal = user_data.emailVal1;
    var passwordVal = user_data.passwordVal1;
    var address1Val = user_data.address1Val1;
    var address2Val = user_data.address2Val1;
    var cityVal = user_data.cityVal1; 
    var stateVal = user_data.stateVal1;
    var zipCodeVal = user_data.zipcodeVal1;
    var telephoneVal = user_data.telephoneVal1;

    const joinStatus = '#wcWrapper > div:nth-child(3) > div > div > div.bSMButtonsContainer.centered > div > div.small-12.columns.hide-for-small-only > a.cl-register-link.RB-button.button.joinFreeBtn';
    const fName = '#root > div.body > div.bg-white > div.form > form > div:nth-child(1) > input';
    const sName = 'input[name="lastName"]';
    const dob = '#root > div.body > div.bg-white > div.form > form > div:nth-child(3) > input';
    const email = 'input[type="email"]';
    const password = 'input[type="password"]';
    const submit = 'input[type = "submit"]';
    const address1 = '#address1';
    const address2 = '#address2';
    const city = '#city';
    const state = '#state';
    const zipCode = '#zip';
    const telephone = '#profilePhone';
    const save = '#saveButton';
    const continuee = '#createProfile_submit';
      
    const config = {
        sitekey: '6Lf4RNIZAAAAAAigQYYFSFKmjryLMByZ58MLH1sx',
        pageurl: 'https://account.finishline.com/register', 
        apiKey: '9aa4a69ef85871e6aeec20b62d28103e',
        apiSubmitUrl: 'http://2captcha.com/in.php',
        apiRetrieveUrl: 'http://2captcha.com/res.php' 
      }

    puppeteer.launch( { headless: false, slowMo: 30}).then(async (browser) => {

    try{
      const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });
        await page.goto('https://www.finishline.com/status?icid=LP_HP_herobanner_status_TXT' /*,{waitUntil: 'load', timeout: 0}*/);
        await page.waitForNavigation();

        const requesttId = await initiateCaptchaRequest(config.apiKey, config.sitekey, config.pageurl, config.apiSubmitUrl);
        const requestId = requesttId.substring(3);
        console.log(requestId)

        await page.click(joinStatus);
        console.log("Login Button Clicked...");

        //const requestId = await initiateCaptchaRequest(config.apiKey);
        await page.waitForSelector(fName);
        await page.type(fName, fNameVal);
        await page.type(sName, sNameVal);
        await page.type(dob, bDayVal);

        console.log("email: " + emailVal);
        await page.type(email, emailVal);
        console.log("entered email");
        await page.type(password, passwordVal);
        // const response = await pollForRequestResults(apiKey, requestId);

        // console.log(`Awaiting 2captcha response ${response}`);
        // await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);
        await page.waitForTimeout(5000);

        await page.click(submit);
        await page.waitForTimeout(4000);
        console.log("submitted");

        await page.waitForSelector(address1);
        await page.type(address1, address1Val);
        await page.type(address2, address2Val);
        await page.type(city, cityVal);
        await page.type(state, stateVal);
        await page.type(zipCode, zipCodeVal);
        await page.type(telephone, telephoneVal);

        const response = await pollForRequestResults(config.apiKey, requestId);
        console.log(`Awaiting 2captcha response ${response}`);
        await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

        await page.waitForNavigation()
        await page.click(save);
        await page.waitForTimeout(3000);

        await page.click(continuee);

    }
    catch (err){
      console.log(err);
    }
        
  });


async function initiateCaptchaRequest(apiKey) {
  const formData = {
    method: 'userrecaptcha',
    googlekey: config.sitekey,
    key: apiKey,
    pageurl: config.pageurl,
    json: 1
  };
  console.log("Sumbitting to 2captcha");
  const response = await request.post('http://2captcha.com/in.php', {form: formData});
  return JSON.parse(response).request;
}
 
 async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
  console.log("Waiting.....");
  await timeout(delay);
  return poll({
    taskFn: requestCaptchaResults(key, id),
    interval,
    retries
  });
}

function requestCaptchaResults(apiKey, requestId) {
  const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
  return async function() {
    return new Promise(async function(resolve, reject){
      console.log("polling for response");
      const rawResponse = await request.get(url);
      const resp = JSON.parse(rawResponse);
      console.log(resp);
      if (resp.status === 0) return reject(resp.request);
      console.log("Response Received")
      resolve(resp.request);
    });
  }
}

const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))


}}
