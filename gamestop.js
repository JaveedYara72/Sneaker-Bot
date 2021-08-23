module.exports = {
  gamestop:function(user_data){
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    const poll = require('promise-poller').default;
    const request = require('request-promise-native');
    puppeteer.use(StealthPlugin());
    
    var fNameVal = user_data.fNameVal1;
    var sNameVal = user_data.sNameVal1;
    var emailVal = fNameVal+sNameVal+ Math.floor(Math.random() * (100 - 2 + 1)) + 2 + "@gmail.com";
    var passwordVal = user_data.passwordVal1;
    var telephoneVal = user_data.telephoneVal1;

    const fName = '#registration-form-fname';
    const sName = '#registration-form-lname';
    const email = '#registration-form-email';
    const password = '#registration-form-password';
    const telephone = '#registration-form-phone';
    const submit = '#create-account-redesign > div.create-account-forms.col-6 > div.create-account-form > form > div.row > div > button';

      
    const config = {
        sitekey: '6LfW5QQTAAAAAA3dNAQxY-moKXlb6Ok8hhxkEhNz',
        pageurl: 'https://www.gamestop.com/create-account/', 
        apiKey: '9aa4a69ef85871e6aeec20b62d28103e',
        apiSubmitUrl: 'http://2captcha.com/in.php',
        apiRetrieveUrl: 'http://2captcha.com/res.php' 
      }

      puppeteer.launch( {headless: false, slowMo: 30}).then(async (browser) => {

    try{
      const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });
        await page.goto('https://www.gamestop.com/create-account/' ,{waitUntil: 'load', timeout: 0});

        const requesttId = await initiateCaptchaRequest(config.apiKey, config.sitekey, config.pageurl, config.apiSubmitUrl);
        const requestId = requesttId.substring(3);
        console.log(requestId);
        
        await page.waitForSelector(fName);
        await page.type(fName, fNameVal);
        await page.type(sName, sNameVal);
        await page.type(email, emailVal);
        await page.type(password, passwordVal);
        await page.type(telephone, telephoneVal);
        
        const response = await pollForRequestResults(config.apiKey, requestId);
        console.log(`Awaiting 2captcha response ${response}`);
        await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

        //await page.evaluate(`document.getElementById("g-recaptcha-response").value="${response}";`);
        
        await page.waitForTimeout(5000);
        await page.click(submit);
        //await page.waitForTimeout(4000);
        console.log("Process completed successfully, Account created!");

    }
    catch (err){
      console.log(err);
    }
        
      });


    async function initiateCaptchaRequest(apiKey, sitekey, siteurl, apiSubmitUrl) {
      const formData = {
        method: 'userrecaptcha',
        googlekey: sitekey,
        key: apiKey,
        pageurl: siteurl,
        json: 0
      };
      console.log("Sumbitting to 2captcha..");
      console.log("in intia-------");
      const response = await request.post(`${apiSubmitUrl}?key=${apiKey}&method=userrecaptcha&googlekey=${sitekey}&pageurl=${siteurl}`,{form: formData});
      //const response = await request.post(apiSubmitUrl,{form: formData});

      //console.log(`http://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${sitekey}&pageurl=${siteurl}`);
      console.log(response);
      return response;

    }
    
    
    async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
      console.log("Waiting.....");
      await timeout(delay);
      console.log()
      return poll({
        taskFn: requestCaptchaResults(key, id),
        interval,
        retries
      });
    }

    function requestCaptchaResults(apiKey, requestId) {
      const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=0`;

      return async function() {
        return new Promise(async function(resolve, reject){
          var resp = 'CHA_NOT_READY'; 
          while(resp==='CHA_NOT_READY'){
            console.log("polling for response");
          var rawResponse = await request.get(url);
          resp = rawResponse.substring(3);
          console.log(`Response: ${resp}`);
          
          }
          console.log("Response Received");
          resolve(resp);
        });
      }
    }

    const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))
  }
}
  